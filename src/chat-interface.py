#!/usr/bin/env python3
"""
Chat Interface (CLI) for the Shoplite RAG API.

Usage examples:
  # explicit URL
  py src\chat_interface.py --url https://<your-ngrok>.ngrok-free.app

  # with logging and debug flag
  py src\chat_interface.py --url https://<your-ngrok>.ngrok-free.app --logfile chat_logs.jsonl --debug

  # or via env var
  set NGROK_URL=https://<your-ngrok>.ngrok-free.app
  py src\chat_interface.py
"""

import argparse
import os
import sys
import json
import time
import datetime as dt
from typing import Any, Dict, Optional

import requests

DEFAULT_TIMEOUT = 45
RETRY_DELAYS = [0.5, 1.0, 2.0]  # simple backoff


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="CLI chat client for Shoplite RAG API.")
    p.add_argument(
        "--url",
        type=str,
        default=os.environ.get("NGROK_URL", "").strip(),
        help="Base URL of your public API, e.g. https://1234-abc.ngrok-free.app",
    )
    p.add_argument(
        "--logfile",
        type=str,
        default="chat_logs.jsonl",
        help="Path to JSONL log file (one JSON object per line).",
    )
    p.add_argument(
        "--debug",
        action="store_true",
        help="Include a 'debug' flag in /chat request to surface routing/mode info if server supports it.",
    )
    return p.parse_args()


def normalize_base_url(url: str) -> str:
    url = (url or "").strip().rstrip("/")
    if not url:
        return ""
    if not (url.startswith("http://") or url.startswith("https://")):
        url = "https://" + url
    return url


def health_check(sess: requests.Session, base_url: str) -> Optional[Dict[str, Any]]:
    url = f"{base_url}/health"
    for i, delay in enumerate([0] + RETRY_DELAYS):
        if delay:
            time.sleep(delay)
        try:
            r = sess.get(url, timeout=10)
            if r.ok:
                return r.json()
            eprint(f"[health] HTTP {r.status_code}: {r.text[:200]}")
        except requests.RequestException as e:
            eprint(f"[health] attempt {i+1} failed: {e}")
    return None


def call_chat(
    sess: requests.Session,
    base_url: str,
    question: str,
    k: int = 3,
    debug: bool = False,
) -> Dict[str, Any]:
    """
    POST /chat with {"question": "...", "k": 3, "debug": <bool>}
    Returns either the API's JSON or a fallback error JSON.
    """
    url = f"{base_url}/chat"
    payload = {"question": question, "k": k}
    if debug:
        payload["debug"] = True  # server may echo 'mode' if supported

    print("[Retrieving context...]")
    print("[Calling LLM...]")

    for i, delay in enumerate([0] + RETRY_DELAYS):
        if delay:
            time.sleep(delay)
        try:
            r = sess.post(url, json=payload, timeout=DEFAULT_TIMEOUT)
            try:
                data = r.json()
            except Exception:
                data = {"error": (r.text or "").strip()[:500]}

            if r.ok:
                return data
            return {
                "Answer": f"Server returned HTTP {r.status_code}",
                "Sources": ["None"],
                "Confidence": "Low",
                "error": data.get("error") or data,
            }
        except requests.RequestException as e:
            eprint(f"[chat] attempt {i+1} failed: {e}")

    return {
        "Answer": "Connection failed after retries. Please verify the ngrok URL is reachable.",
        "Sources": ["None"],
        "Confidence": "Low",
        "error": "network-timeout",
    }


def pretty_print(resp: Dict[str, Any]) -> None:
    """
    Print Answer/Sources/Confidence if present; otherwise dump JSON.
    Also prints 'mode' if server included it (useful to verify chitchat/greet+rag/rag routing).
    """
    if "mode" in resp:
        print(f"(mode: {resp['mode']})")
    if all(k in resp for k in ("Answer", "Sources", "Confidence")):
        print()
        print("Answer:", resp.get("Answer", ""))
        sources = resp.get("Sources") or []
        if isinstance(sources, list):
            print("Sources:", ", ".join(sources) if sources else "None")
        else:
            print("Sources:", sources)
        print("Confidence:", resp.get("Confidence", ""))
        if "error" in resp:
            print("Note:", resp["error"])
        print()
    else:
        print(json.dumps(resp, indent=2))
        print()


def append_log(logfile: str, row: Dict[str, Any]) -> None:
    os.makedirs(os.path.dirname(logfile) or ".", exist_ok=True)
    with open(logfile, "a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")


def main():
    args = parse_args()
    base_url = normalize_base_url(args.url)

    if not base_url:
        eprint("❗ Provide the ngrok base URL via --url or NGROK_URL env var.")
        eprint("   Example: --url https://1234-abc.ngrok-free.app")
        sys.exit(2)

    print(f"Connecting to: {base_url}")
    sess = requests.Session()
    sess.headers.update({"Accept": "application/json"})

    info = health_check(sess, base_url)
    if not info:
        eprint("❗ Health check failed. Ensure your Colab server and ngrok tunnel are running.")
        sys.exit(3)

    print("Server OK:", json.dumps(info, indent=2))
    print("\nHello! Ask me anything about Shoplite. I’m here to help:\n")

    try:
        while True:
            try:
                q = input("> ").strip()
            except (EOFError, KeyboardInterrupt):
                print("\nExiting…")
                break

            if not q:
                continue
            if q.lower() in {"exit", "quit", ":q"}:
                print("Goodbye!")
                break

            t0 = time.time()
            resp = call_chat(sess, base_url, q, k=3, debug=args.debug)
            dt_ms = int((time.time() - t0) * 1000)

            pretty_print(resp)

            # Log turn
            log_row = {
                "ts": dt.datetime.utcnow().isoformat() + "Z",
                "url": base_url,
                "question": q,
                "response": resp,
                "latency_ms": dt_ms,
            }
            append_log(args.logfile, log_row)

    except KeyboardInterrupt:
        print("\nExiting…")


if __name__ == "__main__":
    main()
