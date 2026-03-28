---
title: "Chapter 2: Distributed Systems Essentials"
description: "Partial Failures, Load Balancing, and Caching"
---

# Partial Failures
Partial failures in distributed systems occurs when some components fail while others 
continue operating, making the system partially functional and partially failing.

Unlike monoliths that fail entirely, these non-deterministic failures such as node 
crashes, network partitions, or timeouts are common and challenging, requiring design 
for resilience.

## Crash Faults

See this medium post: [Modes of Failures](https://medium.com/baseds/modes-of-failure-part-1-6687504bfed6).

## Idempotent Operations

Are operations that can be applied multiple times without changing the result beyond 
the initial application.

# Load Balancing

Load balancers are network resources that distributes requests across available services.

There are two types of load balancers:

## Network Load Balancers

Are load balancers that can only work up to the [Network Layer](https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/) which is responsible for 
sending data to different networks.

## Application Load Balancers

Are load balancers that can read the full application message.

# Distributed Caching

## Caching

Caching is the method of storing data in a temporary and fast storage and is used for 
improving resource access.

## Caching Strategies

See:

- [Redis: Caching Strategies](https://redis.io/blog/why-your-caching-strategies-might-be-holding-you-back-and-what-to-consider-next/#Caching_strategies_An_overview)
- [Hello Interview: Caching in System Design Interviews](https://www.youtube.com/watch?v=1NngTUYPdpI)
