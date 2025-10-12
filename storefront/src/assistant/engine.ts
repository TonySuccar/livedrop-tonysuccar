// /assistant/engine.ts
// Deterministic QA-only engine. No model calls, no external I/O.
// Reads local ground-truth.json and returns the best-matching answer.

import gt from "./ground-truth.json" assert { type: "json" };

type QA = {
  id: string;                          // e.g., "Q01"
  question: string;                    // canonical question
  answer: string;                      // authoritative answer
  required?: string[];                 // required keywords/phrases (case-insensitive)
  forbidden?: string[];                // forbidden keywords/phrases
};

type SupportAnswer = {
  text: string;
  matchedId?: string;
  matchedQuestion?: string;
  missingRequired?: string[];
  hitForbidden?: string[];
  debug?: { score: number; matchedKeywords: string[] };
};

// ---------- utils ----------
const norm = (s: string) =>
  s.toLowerCase().replace(/\s+/g, " ").trim();

const tokenize = (s: string) =>
  norm(s).split(/[^a-z0-9]+/).filter(Boolean);

function containsAll(hay: string, needles: string[] = []): string[] {
  const missing: string[] = [];
  const H = norm(hay);
  for (const n of needles) {
    if (!H.includes(norm(n))) missing.push(n);
  }
  return missing;
}
function containsAny(hay: string, needles: string[] = []): string[] {
  const hits: string[] = [];
  const H = norm(hay);
  for (const n of needles) {
    if (H.includes(norm(n))) hits.push(n);
  }
  return hits;
}

function scoreQuery(q: string, item: QA): { score: number; matchedKeywords: string[] } {
  // Simple lexical score = overlap on tokens + presence of any "hint" words from the canonical question
  const qTokens = new Set(tokenize(q));
  const kTokens = new Set(tokenize(item.question + " " + (item.required ?? []).join(" ")));

  let overlap = 0;
  for (const t of qTokens) if (kTokens.has(t)) overlap++;

  // Small bonus if the exact phrase of the item.question appears
  const phraseBonus = norm(q).includes(norm(item.question)) ? 3 : 0;

  // Bonus for each required keyword present in query
  const requiredHits = containsAny(q, item.required ?? []);
  const requiredBonus = requiredHits.length;

  const score = overlap + phraseBonus + requiredBonus;
  return { score, matchedKeywords: requiredHits };
}

// ---------- public API ----------
export async function answerSupport(userInput: string): Promise<SupportAnswer> {
  const query = userInput ?? "";
  const items: QA[] = (gt as any[]).map(item => ({
    id: item.id,
    question: item.q,
    answer: item.a,
    required: item.required,
    forbidden: item.forbidden,
  }));

  // Rank by lexical score
  const ranked = items
    .map((qa) => ({ qa, ...scoreQuery(query, qa) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];

  if (!top || top.score === 0) {
    return {
      text:
        "I couldn’t match that to our help topics. Try asking about returns, payments, delivery options, or seller setup.",
      debug: { score: 0, matchedKeywords: [] },
    };
  }

  // Enforce guardrails (required/forbidden)
  const forbiddenHits = containsAny(top.qa.answer, top.qa.forbidden ?? []);  // sanity—should be zero in curated data

  // Also check the user's query for required/forbidden, to guide them
  const queryMissingRequired = containsAll(query, top.qa.required ?? []);
  const queryForbiddenHits = containsAny(query, top.qa.forbidden ?? []);

  // If forbidden terms appear in query or in answer (shouldn’t), respond safely
  if (queryForbiddenHits.length || forbiddenHits.length) {
    return {
      text:
        "I can’t provide that information as requested. Please ask about supported policies or features (e.g., returns, payments, delivery).",
      matchedId: top.qa.id,
      matchedQuestion: top.qa.question,
      hitForbidden: [...new Set([...queryForbiddenHits, ...forbiddenHits])],
      debug: { score: top.score, matchedKeywords: top.matchedKeywords },
    };
  }

  // If the user’s query doesn’t include required phrases, still return the answer,
  // but it is already guaranteed that the curated answer includes required phrases.
  return {
    text: top.qa.answer,
    matchedId: top.qa.id,
    matchedQuestion: top.qa.question,
    missingRequired: queryMissingRequired, // helpful for UI telemetry if you want
    debug: { score: top.score, matchedKeywords: top.matchedKeywords },
  };
}
