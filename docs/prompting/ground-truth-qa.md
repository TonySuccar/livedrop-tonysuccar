### Q01: How do I create a seller account on Shoplite?

**Expected retrieval context:** Document 8: Seller Account Setup and Management  
**Authoritative answer:** To create a seller account, visit the Shoplite seller registration page, provide business information including tax ID, link a bank account for payouts, and complete the verification process which takes 2–3 business days.  
**Required keywords in LLM response:** ["seller registration", "business verification", "2-3 business days"]  
**Forbidden content:** ["instant approval", "no verification required", "personal accounts"]

---

### Q02: What payment methods can I use on Shoplite?

**Expected retrieval context:** Document 4: Payment Methods and Security  
**Authoritative answer:** Shoplite supports credit and debit cards, PayPal, Apple Pay, Google Pay, and in some regions bank transfers or cash-on-delivery. All transactions are processed securely through PCI-DSS compliant gateways.  
**Required keywords in LLM response:** ["credit and debit cards", "PayPal", "Apple Pay", "Google Pay", "PCI-DSS"]  
**Forbidden content:** ["unsupported", "unverified", "cryptocurrency"]

---

### Q03: How long do I have to return a product on Shoplite?

**Expected retrieval context:** Document 6: Return and Refund Policies  
**Authoritative answer:** Shoplite offers a 30-day return window starting from the delivery date. Buyers must request a return authorization number (RAN) before shipping items back.  
**Required keywords in LLM response:** ["30-day return window", "return authorization number", "delivery date"]  
**Forbidden content:** ["no returns", "lifetime returns"]

---

### Q04: How are Shoplite reviews verified?

**Expected retrieval context:** Document 7: Product Reviews and Ratings  
**Authoritative answer:** Reviews are tied to verified purchases and pass through moderation filters that block offensive or irrelevant content. Verified purchase labels ensure authenticity, and sellers cannot delete or alter customer reviews.  
**Required keywords in LLM response:** ["verified purchase", "moderation", "authenticity"]  
**Forbidden content:** ["all reviews are anonymous", "sellers can delete reviews", "AI models"]

---

### Q05: What types of delivery options are available?

**Expected retrieval context:** Document 5: Order Tracking and Delivery  
**Authoritative answer:** Buyers can choose standard (3–7 days), express (1–3 days), or same-day delivery in select regions. Notifications are provided at each stage of the order.  
**Required keywords in LLM response:** ["standard", "express", "same-day delivery"]  
**Forbidden content:** ["no delivery tracking", "pickup only"]

---

### Q06: How much commission does Shoplite charge sellers?

**Expected retrieval context:** Document 10: Commission and Fee Structure  
**Authoritative answer:** Shoplite charges 10% commission per sale plus a $0.50 transaction fee. Rates vary by category—luxury goods at 12% and digital goods as low as 5%.  
**Required keywords in LLM response:** ["10% commission", "$0.50 transaction fee", "category-based rates"]  
**Forbidden content:** ["no commission", "hidden fees"]

---

### Q07: What mobile-specific features does Shoplite provide?

**Expected retrieval context:** Document 12: Mobile App Features  
**Authoritative answer:** The mobile app includes barcode scanning, biometric login, offline browsing, push notifications, and one-tap checkout, alongside core shopping features.  
**Required keywords in LLM response:** ["barcode scanning", "biometric login", "offline browsing", "push notifications"]  
**Forbidden content:** ["mobile app not supported"]

---

### Q08: How does Shoplite protect user data?

**Expected retrieval context:** Document 14: Security and Privacy Policies  
**Authoritative answer:** Shoplite encrypts data in transit and at rest, complies with GDPR and CCPA, and provides user-controlled privacy settings. In the event of a breach, users are informed within 72 hours.  
**Required keywords in LLM response:** ["GDPR", "CCPA", "encryption", "72 hours disclosure"]  
**Forbidden content:** ["no privacy policy", "data sold by default"]

---

### Q09: What are Shoplite’s return policies and how do I track my order status?

**Expected retrieval context:** Document 6: Return and Refund Policies + Document 5: Order Tracking and Delivery  
**Authoritative answer:** Shoplite offers a 30-day return window that requires a return authorization number (RAN). Buyers can track orders in real time via the “My Orders” dashboard with updates from confirmation through delivery.  
**Required keywords in LLM response:** ["30-day return window", "return authorization", "order tracking"]  
**Forbidden content:** ["no returns accepted", "lifetime returns"]

---

### Q10: How do sellers manage stock and prevent overselling?

**Expected retrieval context:** Document 9: Inventory Management for Sellers + Document 3: Shopping Cart and Checkout  
**Authoritative answer:** Sellers manage inventory via dashboard, CSV, or API with real-time synchronization and low-stock alerts. Checkout verifies stock to prevent overselling, reserving items during the purchase flow.  
**Required keywords in LLM response:** ["real-time synchronization", "API integrations", "prevent overselling"]  
**Forbidden content:** ["overselling allowed", "no inventory system"]

---

### Q11: How does Shoplite handle fraudulent transactions?

**Expected retrieval context:** Document 4: Payment Methods and Security + Document 11: Customer Support Procedures  
**Authoritative answer:** Fraud detection algorithms flag anomalies and may pause transactions for verification. Urgent fraud cases are prioritized and escalated by customer support for rapid resolution.  
**Required keywords in LLM response:** ["fraud detection", "verification", "escalated support"]  
**Forbidden content:** ["fraud ignored", "no fraud detection"]

---

### Q12: How can developers integrate with Shoplite?

**Expected retrieval context:** Document 13: API Documentation for Developers  
**Authoritative answer:** Developers use RESTful APIs with OAuth 2.0 to manage listings, orders, inventory, and more. The platform enforces rate limits and provides a sandbox for safe testing.  
**Required keywords in LLM response:** ["RESTful APIs", "OAuth 2.0", "rate limits", "sandbox"]  
**Forbidden content:** ["no authentication", "open APIs without limits"]

---

### Q13: What are the responsibilities of sellers regarding shipping?

**Expected retrieval context:** Document 5: Order Tracking and Delivery + Document 8: Seller Account Setup and Management  
**Authoritative answer:** Sellers must provide tracking numbers within 24 hours of dispatch, define shipping policies in the Seller Dashboard, and ensure on-time delivery or face penalties.  
**Required keywords in LLM response:** ["tracking numbers", "24 hours", "shipping policies"]  
**Forbidden content:** ["no shipping responsibility", "Shoplite delivers all orders"]

---

### Q14: What customer support options are available on Shoplite?

**Expected retrieval context:** Document 11: Customer Support Procedures + Document 12: Mobile App Features  
**Authoritative answer:** Support is available 24/7 via live chat, email, phone, and an AI-powered chatbot. The Help Center and the mobile app offer self-service tools and push-notification updates.  
**Required keywords in LLM response:** ["24/7 support", "AI-powered chatbot", "Help Center"]  
**Forbidden content:** ["support not available", "limited hours only"]

---

### Q15: How does Shoplite ensure fairness in product reviews?

**Expected retrieval context:** Document 7: Product Reviews and Ratings  
**Authoritative answer:** Only verified purchasers can review; submissions are moderated to remove offensive or irrelevant content. Reviews carry a “verified purchase” label, and sellers cannot delete or alter them.  
**Required keywords in LLM response:** ["verified reviews", "moderation", "sellers cannot delete"]  
**Forbidden content:** ["fake reviews allowed", "sellers can delete reviews", "AI detection"]

---

### Q16: How are promotional codes validated at checkout?

**Expected retrieval context:** Document 15: Promotional Codes and Discounts + Document 3: Shopping Cart and Checkout  
**Authoritative answer:** Promotional codes are validated in real time at checkout. Expired or ineligible codes trigger clear error messages, and attempts to stack incompatible codes are automatically blocked.  
**Required keywords in LLM response:** ["validated in real time", "error messages", "fraudulent stacking blocked"]  
**Forbidden content:** ["any code works", "no restrictions"]

---

### Q17: How do Shoplite Plus subscriptions benefit sellers?

**Expected retrieval context:** Document 10: Commission and Fee Structure  
**Authoritative answer:** Shoplite Plus reduces commissions—sometimes to about 7%—in exchange for a monthly subscription and provides benefits like improved search placement and promotional tools.  
**Required keywords in LLM response:** ["Shoplite Plus", "reduced commissions", "monthly subscription"]  
**Forbidden content:** ["free upgrade", "no subscription required"]

---

### Q18: What measures does Shoplite take for data breaches?

**Expected retrieval context:** Document 14: Security and Privacy Policies + Document 11: Customer Support Procedures  
**Authoritative answer:** Shoplite informs affected users within 72 hours, initiates incident response and investigations immediately, and uses support channels to guide users while applying safeguards to prevent recurrence.  
**Required keywords in LLM response:** ["72 hours", "incident response", "investigations"]  
**Forbidden content:** ["no disclosure", "hidden breaches"]

---

### Q19: How do buyers receive updates about their orders?

**Expected retrieval context:** Document 5: Order Tracking and Delivery + Document 12: Mobile App Features  
**Authoritative answer:** Buyers receive updates by email, SMS, or mobile push notifications and can track progress from confirmation to delivery in the “My Orders” dashboard.  
**Required keywords in LLM response:** ["email", "SMS", "push notifications", "My Orders dashboard"]  
**Forbidden content:** ["no updates available"]

---

### Q20: How can sellers forecast demand and adjust stock?

**Expected retrieval context:** Document 9: Inventory Management for Sellers  
**Authoritative answer:** Sellers use analytics in the inventory dashboard—such as seasonal trends and historical sales—to forecast demand, set low-stock thresholds, and prioritize fast-moving items.  
**Required keywords in LLM response:** ["analytics", "forecast demand", "seasonal trends", "inventory dashboard"]  
**Forbidden content:** ["no forecasting tools", "Shoplite sets inventory"]
