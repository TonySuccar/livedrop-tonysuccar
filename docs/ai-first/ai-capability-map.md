# AI Capability Map

## Capabilities list
1- AI Support Chatbot  
2- Typeahead (search suggestions)  
3- Return-to-Fit Advisor  
4- Drop Hype Scorer  
5- Emotional Checkout Nudge

| Capability | Intent (user) | Inputs (this sprint) | Risk 1–5 | p95 ms | Est. cost/action | Fallback | Selected |
|---|---|---|---:|---:|---:|---|:---:|
| AI Support Chatbot | Assistance in shopping or problems related to order | Policies.md, FAQ.md, product descriptions, order-status API (by id) | 3 | 1200 | ~$0.08 | Static FAQ page or route to human agent | YES |
| Typeahead (search suggestions) | Help user type faster and predict their search | Product titles, tags, categories, curated synonyms, embeddings index | 2 | 300 | ~$0.008 | Prefix search / query history | YES |
| Return-to-Fit Advisor | Size advisor helper | Size charts, SKU attributes (material/fit), recent return reasons | 3 | 600 | ~$0.02 | Show standard size chart only | NO |
| Drop Hype Scorer | “Predict if a product will be popular | Clickstream signals, follower activity, waitlist sign-ups (simple features) | 4 | 900 | ~$0.03 | Past sales-velocity heuristics | NO |
| Emotional Checkout Nudge | Help me decide at checkout to buy or search for something else | Cart/session events, abandonment patterns, (optional) chat sentiment | 4 | 700 | ~$0.01 | Standard checkout reminders | NO |


## Reasoning

Out of all the candidate AI capabilities, Support Chatbot and Typeahead stand out as the most impactful and beneficial. Typeahead improves conversion by helping users find products faster and reducing zero-result searches, while the Support Chatbot lowers the support contact rate by deflecting repetitive policy and order questions, this also translates into reduced support costs, since fewer live agents are needed for 24/7 coverage. Both depend only on existing data sources (FAQs, product catalog, order API), so the integration risk is low.