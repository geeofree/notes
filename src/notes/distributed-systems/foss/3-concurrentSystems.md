---
title: "Chapter 3: Concurrent Systems"
description: "An overview of Concurrent Systems"
---

# Concurrency
Is the ability of a system to manage multiple tasks through simultaneous execution 
or time-sharing.

## Threads
A unit of work.

_A thread of execution._

### Order of Thread Execution
When threads are spawned they are ran in a non-deterministic manner.

This is due to its managing environment system (ie. the OS or a virtual machine) 
preemptively stopping it to let other threads have a chance at progressing.

### Problems With Threads

#### Race Conditions
A race condition is a problem that occurs when multiple entities (ie. threads)
access the same data.

The problem occurs because the operations within an execution does not work _atomically_ 
ie. does not consider that all operations must be successful for it to proceed.

Data that is accessed by multiple entities is called the _critical section_.

In order to fix race conditions we must introduce the notion of _locks_ which each entity 
holds when it is executing on a critical section.

Enforcing execution order this way is called _serialization_.

#### Deadlocks
A dead lock is a problem that occurs when multiple entities cannot proceed due to 
one or more of them holding a lock that the other needs.

> See [Wikipedia: Deadlocks](https://en.wikipedia.org/wiki/Deadlock_(computer_science)) for more details.
