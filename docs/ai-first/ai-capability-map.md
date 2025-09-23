# AI Capability Map

## Capabilities list

    1-AI support chat bot
    2-Typeahead
    3-zdf adfv
    4-arvavrva


| Capability | Intent (user) | Inputs (this sprint) | Risk 1–5 (tag) | p95 ms | Est. cost/action | Fallback | Selected |
|---|---|---|---|---:|---:|---|:---:|
| AI Support chat bot | Assistance in shopping or problems related to order | Policies, FAQs, Products and their descriptions, orders request API | 3 (hallucinations) | 1200 |  | Static Bot, FAQs page or direct to an angent | YES | :---: |
| Typeahead | Help user type faster and predict their search | Products list, tags and embeddings | 2 | 200 |  | What's trending and query history | YES | :---: |
|

## Reasoning

Out of all the candidate AI capabilities, Support Chatbot and Typeahead stand out as the most impactful and beneficial. Typeahead improves conversion by helping users find products faster and reducing zero-result searches, while the Support Chatbot lowers the support contact rate by deflecting repetitive policy and order questions, this also translates into reduced support costs, since fewer live agents are needed for 24/7 coverage. Both depend only on existing data sources (FAQs, product catalog, order API), so the integration risk is low.