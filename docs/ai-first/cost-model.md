
# Cost Model

## Assumptions (Support assistant)

* **Model:** Llama 3.1 8B Instruct via OpenRouter at $0.05/1K prompt, \$0.20/1K completion
* **Avg tokens in:** 800
* **Avg tokens out:** 200
* **Requests/day:** 1,000
* **Cache hit rate:** 30% (apply miss cost only)

## Calculation

Cost/action = (tokens in/1000 × prompt price) + (tokens out/1000 × completion price)

Daily cost = Cost/action × Requests/day × (1 − cache hit rate)

## Results

* **Support assistant:** Cost/action =  $0.08, Daily = $56.00

## Cost lever if over budget

* Shorten context to ≤600 tokens; template answers per policy; defer to human for long tail; or downgrade to 7B local for “simple policy” intent.

---

## Assumptions (Typeahead)

* **Model:** Llama 3.1 8B Instruct via OpenRouter at $0.05/1K prompt, $0.20/1K completion(used only on cache misses and only if rewrite step is enabled)
* **Avg tokens in:** 80
* **Avg tokens out:** 20
* **Requests/day:** 50,000
* **Cache hit rate:** 70%

## Calculation

Cost/action = (tokens in/1000 × prompt price) + (tokens out/1000 × completion price)

Daily cost = Cost/action × Requests/day × (1 − cache hit rate)

## Results

* **Search suggestions:** Cost/action = $0.008, Daily = $120.00

## Cost lever if over budget

* Disable LLM rewrite on hot prefixes; rely on ANN + heuristics. Batch‑generate rewrites offline and serve from cache only.
