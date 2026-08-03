---
title: "Chapter 7: Microservices"
description: "Microservices overview, advantages, and resilience patterns."
---

# Monoliths

A monolith is an architecture where the UI, business logic, and data access is contained 
within a single unit.

Monoliths can scale up or scale out by increasing system resources or by replicating 
resources respectively.

Monoliths can become problematic in two fundamental areas:

- **Codebase Complexity**: As the size of the application and engineering team grows: 
  adding new features, testing, and refactoring become more difficult.

- **Scaling Out**: Replicating means replicating the entire application ie. in a situation 
  where only one service within the monolith needs to scale independently.

# Breaking up the Monolith: Microservices

A microservice architecture decomposes the application into multiple independent services 
that communicate and coordinate when necessary.

Microservices offer the ff. advantages as systems grow in code size and request load:

- **Codebase Complexity**: Each service can be managed and evolved by a small team and 
  can also be developed with their own tech stack data management platform.

- **Scaling Out**: Individual services can be scaled out to meet request volume and 
  latency requirements.

## Everything is a trade-off

As with every architecture: there are pros and cons to them and Microservices are no 
stranger to it.

One of the main technical challenges within Microservices for example are their 
distributed nature.

> Read: [Martin Fowler: Microservice Trade-Off](https://martinfowler.com/articles/microservice-trade-offs.html)

## API Gateways

An API Gateway is a network service that directs API traffic to microservices as well as 
handle authorization and authentication.

## Principles of Microservices

Microservices should be:

- Modeled around a business domain
- Highly Observable
- Hides implementation details
- Decentralize all the things
- Isolate failure
- Deploys independently
- Culture of automation

## Workflows

Workflows are used for implementing use cases that require access to more than one 
microservice.

There are two main patterns:

- **Orchestration**: A central coordinator service tells each microservice what to do 
  next and tracks the state of the entire process. Good for clear steps and 
  strict control.

- **Choreography**: Services listen for events and react independently without a central 
  brain. Good for loose coupling and flexibility, but harder to track end-to-end.

## Resilience in Microservices

Resilience in microservices is the system's ability to handle errors, network drops, 
and slow response times without crashing completely.

### Patterns

- Fail Fast Pattern
- Circuit Breaker Pattern
- Bulkhead Pattern
