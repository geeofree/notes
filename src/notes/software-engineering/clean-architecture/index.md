---
tagID: clean-architecture
title: Clean Architecture
description: "Clean Architecture Summaries"
---

# Part 1: Introduction

## Chapter 1: What is Design and Architecture?

- Software Architecture's goal (according to Uncle Bob) is to minimize the human 
  resources required to build and maintain the required system.

## Chapter 2: A Tale of Two Values

- Every software system provides two different values to the stakeholders:
  - Behaviour
  - Structure/Architecture

- Software developers are responsible for keeping these values high.

- Behaviour: The requirements or functionality of a machine that makes or saves money 
  for the stakeholders.

- Architecture: The structure of Software that determines how easy it is to be changed.

- Eisenhower's Matrix: Prioritize base on urgency and importance.
  - Urgent and important
  - Not urgent but important
  - Urgent but not important
  - Not urgent and not important

- The role of the Software Architecture is to allow features and functions to be easily 
  developed, modified, and extended.

# Part 3: Design Principles

## Chapter 7: The Single Responsibility Principle (SRP)

- _A module should be responsible to one, and only one, actor_

> A module is a cohesive set of functions and data structures (ie. a file, a class, etc.).

## Chapter 8: The Open-Closed Principle (OCP)

- _A software artifact should be open for extension but closed for modification._

- The goal of OCP is to make the system easy to extend without incurring a high impact 
  of change.

## Chapter 9: The Liskov Substitution Principle (LSP)

- _If for each object $o1$ of type $S$ there is an object of $o2$ of type $T$ such that for all programs $P$ defined in terms of $T$, the behaviour of $P$ is unchanged when $o1$ is substituted for $o2$, then $S$ is a subtype of $T$._

- TL;DR - Programs using an object of type $T$ must still behave correctly even if $T$'s subtype is used instead.

## Chapter 10: The Interface Segregation Principle (ISP)

- Modules must only depend on things that has all that it needs, nothing more, nothing less.

## Chapter 11: The Dependency Inversion Principle (DIP)

- Dependencies refer only to abstractions, not to concretions.

- If depending on concrete objects, make sure those objects are stable and not volatile to 
  changes.

# Part 5: Architecture

## Chapter 15: What is Architecture?

- Good architecture makes the system easy to understand, develop, maintain, and to deploy.

- The ultimate goal is to minimize the lifetime cost of the system and to maximize 
  productivity.

- The way to keep software _soft_ is to leave as many options open as possible, for as long 
  as possible.

  - The options that need to be left open are the details that don't matter.

- All software systems can be decomposed into two major elements: policy and details.

  - Policy are business rules and procedures.

  - Details are those necessary to enable humans, other systems, and programmers to 
    communicate with the policy, but that do not impact the behaviour of the policy at 
    all.

## Chapter 17: Boundaries

- Business rules must not know about their technical details to make the architecture 
  flexible.

## Chapter 20: Business Rules

- An _Entity_ is an object that embodies a small set of critical business rules that 
  operate on critical business data.

- The interface of the Entity consists of the functions that implement the critical 
  business rules that operate on that data.

- A _use case_ specifies the input to be provided by the user, the output to be returned 
  to the user, and the processing steps involved in producing that output.
  
  - A use case describes _application-specific_ business rules.

  - Use cases contain the rules that specify how and when the critical business rules 
    within the Entities are invoked.

  - Entities have no knowledge of the use cases that control them.
