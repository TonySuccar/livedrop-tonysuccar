# livedrop-tonysuccar

[https://excalidraw.com/#json=monQsqyU5g7GP5gWM7i5k,bLQyAz3m7_h0Mh3wVq8P9Q](https://excalidraw.com/#json=-PJPd87L7CCbzruE8iNOk,0h0W4_jQ1rvrYRSfuAwrwA)

1-Authentication is handled with JWT bearer tokens.
2-Browsing products and followers uses keyset pagination on DB indexes (created_at, id) to stay stable even as new data is added.
3-No oversell is guaranteed via ACID SQL transactions with row locks on the drop’s inventory during order placement.
4-Real-time notifications are delivered via WebSocket.
5-Celebrity problem is handled through sharding, and Redis caching for scalable follower retrieval.
6-Caching is event-driven with short TTLs: stock, follower pages, product etc..
7-We value consistency over availability, a trade-off that prevents inventory from ever going below zero.
8-All inter microservices communications are made using RPC.



Database:
Sql database to ensure consistency and idempotency in the inventory via ACID secure transactions
Assumptions:
1-orders acn be made only during live drops
2-multiple creators could drop the same product
3-each drop has only one product

