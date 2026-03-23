---
title: 'Chapter 1: Intro to Distributed Systems Architecture'
description: 'Broad coverage of the fundamental approaches to scaling software systems.'
---

# Basic System Architecture

## The Monolith

- Software Systems often start out as a single, monolithic system.
- A monolith comprises of a web server which is connected to a database.

- Monoliths can service relatively low requests loads which can make it process 
  requests with consistent low latency.

- Monoliths will however fail to service requests once it receives a large volume
  of it wherein it will max out its CPU and memory capacity.

### Scaling Up/Vertical Scaling

- _Scaling up/Vertical scaling_ means to increase hardware capacity.

- This is good until up to a certain point where the request load grows into an 
  unfathomable amount that no single server node will be able to handle.
  
### Scaling Out/Horizontal Scaling

- _Scaling Out/Horizontal scaling_ means increasing or replicating the nodes of the 
  services.
  
- Requests from clients are distributed across the replicas meaning if we have $N$ 
  replicas of servers and $R$ requests, each server node processes $R/N$ requests.

To scale out an application there are two fundamental elements that must exist in the 
design of the application architecture:

#### Load Balancers

- Routes requests to a target service replica which processes the request.

#### Stateless Services

- For load balancing to be effective and share requests evenly, the load balancer must be 
  free to send consecutive requests from the same client to different service instances 
  for processing.

- This means the API implementations in the services must retain no knowledge, or state, 
  associated with an individual client's session.

- Sessions are instead offloaded to an external service called the _session store_.

### Scaling Databases

At a certain point, the database becomes a bottleneck once services are able to handle 
a large volume of requests.

The ff. are strategies that can scale databases.

#### Scale Up/Vertical Scaling Strategy

- The simplest strategy there is to improve databases under high loads is to simply 
  just increase the hardware.

#### Caching

- In conjunction with scaling up, another effective approach is to query the database as 
  infrequently as possible.
  
- This can be achieved by employing _distributed caching_.

- Caching stores recently retrieved and commonly accessed database results in memory so 
  they can be quickly retrieved without placing a burden on the database.

#### Distributed Database

There are two major categories of Distributed Databases:

- **Distributed SQL Stores**: stores data across multiple disks which are queried by 
  multiple database engine replicas.
  
  These multiple engines logically appear to the application as a single database.

- **Distributed _NoSQL_ stores**: uses a variety of data models and query languages to 
  distribute data across multiple nodes running the database engine.

### Message Queues

- A _message queue_ is an asynchronous service that is suitable for situations where
  the actual response is not immediately needed or can be done in the background 
  (ie. e-mail notifications or video uploads).
