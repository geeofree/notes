---
title: "Chapter 4: Application Services"
description: "APIs, horizontal scaling, and load balancers."
---

# Application Programming Interface (API)
An API defines the contract between client and server.

The API specifies three (3) things:

1. The types of possible requests
2. The data that is needed to accompany the requests
3. The results that will be obtained.

On the web, HTTP is the de facto communication protocol that is used for data exchange.

# Horizontal Scaling
Horizontal scaling is the act of increasing processing capacity by adding new processing 
nodes in the network.

There are two (2) prerequisites that allow horizontal scaling to work:

1. Statelessness - Processing services must never have state so that requests can be sent 
   to any replicas within the system.
   
2. Load Balancers - A service that distributes requests to processing services.

## Load Balancing
Load balancing is the process of distributing network requests over to a collection of 
services such that the collective capacity is ideally utilized.

### Load Distribution Policies
Load distribution policies dictate how the load balancer chooses a target service to 
process a request.

There are a number of policies available depending on the vendor.

The following are four (4) of the most commonly supported policies across all load 
balancers:

1. **Round Robin** - The load balancer distributes requests to available servers in a 
   [round-robin](https://en.wikipedia.org/wiki/Round-robin_scheduling) algorithm.
2. **Least connections** - The load balancer distributes new requests to the server with the 
   least open connections.
3. **HTTP Header Field** - The load balancer directs requests based on the contents of a 
   specific HTTP header field.
4. **HTTP Operation** - The load balancer directs requests based on the HTTP verb in the 
   request.

### Health Monitoring
A load balancer monitors the _health_ of its collective services by periodically pinging 
each service in the load balancing pool.

If a service becomes unresponsive or fails connection attempts, it will be removed from 
the load balancing pool.

### Elasticity
Is the capability of a system to dynamically provision new services to handle increased 
traffic loads.

### Session Affinity
Session affinity, or sticky sessions, are a load balancer feature for stateful services.

With sticky sessions, the load balancer sends all requests from the same client to the 
same service instance.

It is generally not a good idea to use sticky sessions as this will cause a load imbalance 
and complicates scalability.
