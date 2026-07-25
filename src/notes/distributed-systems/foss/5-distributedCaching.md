---
title: "Chapter 5: Distributed Caching"
description: "Application and Web caching"
---

# Application Caching
Application caching improves the responsiveness of a request by storing commonly used 
results from queries into fast in-memory systems.

This relieves the database from heavy read traffic.

Application-level caching is also known as the [cache-aside](https://redis.io/blog/why-your-caching-strategies-might-be-holding-you-back-and-what-to-consider-next/#Cacheaside_lazy_loading) pattern. Meaning the 
application effectively bypasses persistent storage and goes directly to the cache.

Other caching patterns include:

- **Read-through** - All read requests are accessed through the cache. If a cache-miss 
  occurs, the caching system invokes a loader function to fetch and load the data 
  from the persistent storage to the cache.
- **Write-through** - Writes and updates happen to both the cache and the persistent 
  storage. Whenever an update occurs to the cache, the caching system invokes a writer 
  to update the database as well. The request only completes when both the cache and the 
  persistent storage are updated.
- **Write-behind** - Like write-through but the application does not wait for the database 
  to be updated when the cache updates.

# Web Caching
Web caches store a copy of a given resource for a defined time period in places such as 
the browser (private cache) or by the Organization and ISP (shared caches).

Caches typically store the results of `GET` requests only where the cache key is the URI 
associated with the request.

## Content Delivery Networks (CDNs)
Edge caches (aka CDNs) are strategic content delivery sites that live in various 
geographical areas.

## HTTP Caching Directives
Services can control what results are cached and for how long they are stored using 
HTTP caching directives.

Some of these directives are the following:

### Cache-Control
The [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control) HTTP header can be used by client requests and service responses to 
specify how the caching should be utilized for the resources.

### Expires and Last-Modified
The [Expires](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Expires) and [Last-Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Last-Modified) HTTP headers interact with the `max-age` directive to control 
how long cached data is retained.

This is used for cache invalidations.

### Etag
An [Etag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ETag) is an opaque value that can be used by a web cache to check if a cached resource 
is still valid.

