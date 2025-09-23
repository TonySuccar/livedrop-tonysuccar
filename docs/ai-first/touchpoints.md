#  Touchpoint Specs

## 1- Support assistant (FAQ + order status)

### Problem statement:

Shoppers frequently need answers to policy questions (shipping, returns) or want to check their order status. Today, response times are high because human agents must receive and handle each request, and maintaining 24/7 coverage requires significant staffing costs. An AI support assistant can provide instant, accurate answers grounded in existing FAQs and order data, reducing customer wait time while lowering the need for live agent capacity.

### Happy path:

1. USER prompt
2. Embedding from prompt
3. Jaibreak detection
4. Policies Guard
5. Check cache
6. Planner
7. Is chitchat
8. RAG (FAQS) or Order API
9. Embedding
10. Generate
11. Validator
12. Raw result
13. Cache
14. Answer

### Grounding & guardrails:

* **Source of truth:** Policies, FAQs, and the order‑status API.
* **Retrieval scope:** top 6 chunks.
* **max context:** 800 tokens to the model.
* **Refuse outside scope:** if no relevant chunk above similarity 0.25 or no order id when required.

### Human‑in‑the‑loop:

* **Escalation triggers:** confidence < 0.6, repeated negative feedback, missing API order number or request for human.
* * **UI surface:** “Contact an agent” button in chat, opens regular chat UI.
* * **SLA:** Human response time < 1 hour.

### Latency budget:
**Happy path**

* **Receive & normalize (edge routing):** 20 ms
  
* **Query embedding:** 60 ms
  
* **Jailbreak / bad-words detection:** 40 ms
  
* **Policy scope guard:** 20 ms

* **Cache check (miss):** 20 ms

* **Planner / intent router:** 20 ms

* **Chit-chat classifier:** 10 ms

* **Order-status API (by id) + serialize:** 150 ms

* **Retrieval (BM25 + ANN, top 4–6 chunks):** 160 ms

* **Assemble grounded context:** 30 ms

* **LLM generation (≤ 120 tokens out):** 500 ms

* **Validator (schema + redaction):** 40 ms

* **Serialize answer + citations:** 20 ms

* **Cache write:** 30 ms

* **Send response + telemetry:** 20 ms

* **Total p95:** 1140 ms (≤ 1200 ms target; buffer 60 ms)

**Cache Path**

* **Receive & normalize (edge routing):** 20 ms

* **Safety & policy gates (lightweight):** 60 ms

* **Cache read (hit):** 20 ms

* **Serialize + return + telemetry:** 50 ms

* **Total p95:** 150 ms
  
### Cache strategy: Key:

Cache: Final answers (text + citations), no PII.

Key: hash(normalize(query)) + intent + policy_version [+order_id].

TTL: FAQs 24h; order summaries 5–10 min; negative 5–10 min.

### Error & fallback: 
If models fails, gets error, has low confidence or is temporary down displlay FAQs and redirect to an agents button.

### PII handling:

* **What leaves the app:** User question with masked PII: name, age, gender etc...
* **Redaction rules:** replace with placeholders (`<NAME>`, `<EMAIL>`…).
* **Logging:** store hashed user id, intent, latency, and model tokens, mask PII.

### Success metrics:


 **Product:** 
 * **First‑contact resolution = resolved without agent / answered sessions.**
 * **Helpful rate = thumbs up / votes.**
**Business:** 
* **Support contact rate = tickets opened / sessions. (should be significantly lower than before)**

### Feasibility note: 
Policies/FAQ markdown already exist; order‑status API by id exists.Use Llama 3.1 8B Instruct via OpenRouter and somthing like email or built in system to contact agent.
Next prototype: auto suggestion for help while shopping.

---

## 1- Typeahead

### Problem statement:

With ~10k SKUs, users struggle to form effective queries, leading to zero-result searches and wasted time. We will augment the search box with as-you-type semantic suggestions (query rewrites, category shortcuts, and top product picks) grounded in our catalog. The goal is to reduce zero-result rate and increase search accuracy while keeping p95 ≤ 300 ms.

### Happy path:

1. USER type
2. Embedding
3. Check cache
4. RAG (Vectors)
5.  Generate
6.  Validator
7.  Raw result
8.  return Json
9.  if user select cache

### Grounding & guardrails:

* **Source of truth:** Catalog.
* **Retrieval scope:** titles embeddings database.
* **max context:** 128 tokens.
* **Refuse outside scope:** if unavailable product.

### Human‑in‑the‑loop:

No need at runtime, human revies analytics in admin page to manage results. 

### Latency budget:
**Happy path:**

* **USER type (client debounce): 50 ms**

* **Embedding: 20 ms**

* **Prefix-cache check (miss): 20 ms**

* **RAG vector search: 80 ms**

* **Generate: 50 ms**

* **Serialize + network back: 40 ms**

* **Total p95: < 300 ms**

**Cache-hit**

* **USER type (client debounce): 50 ms**

* **Edge routing + normalize: 20 ms**

* **Prefix-cache read (hit): 20 ms**

* **Serialize + network back: 40 ms**

* **Total p95: 130 ms**

  
### Cache strategy: Key:

Cache: Suggestions payload; no PII.

Key: hlocale + prefix(query) + index_version.

TTL: 24h.

### Error & fallback: 
If models fails, gets error, has low confidence or is temporary down show query history.

### PII handling:

Only the query string leaves the client; never send user PII. Logs store hashed session id and query.

### Success metrics:


 **Product:** 
 * **Suggestion CTR = suggestion clicks / suggestion impressions.**
 * **Zero‑result search rate.**
**Business:** 
* **Support contact rate = tickets opened / sessions. (should be significantly lower than before)**

### Feasibility note: 
Catalog exists; we can index titles/tags now. Use FAISS for ANN, Redis for cache. Optional rewrite via Llama 3.1 8B on cache misses only. Next step: suggestion package recomendation.
