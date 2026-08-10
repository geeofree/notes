---
title: "Chapter 9: Eventual Consistency"
description: "Eventual consistency, replica repairs, and handling conflicts."
---

# Eventual Consistency

Eventual Consistency is a data consistency model in distributed computing where data is 
propagated to all replicas asynchronously, guaranteeing that all read requests will 
eventually be the same, updated value.

## Inconsistency Window

The inconsistency window in an eventually consistent system is the duration it takes for 
an update to propagate to all replicas.

Several factors affect the duration of the inconsistency window:

- **The number of replicas**: The more replicas you have, the more replica updates need 
  to be coordinated.

- **Operational Environment**: Any instantaneous operational glitches such as transient 
  network failures or lost packets can extend the inconsistency window.

- **Distance between replicas**: Replicas residing in different regions or continents will 
  have to have longer latencies and thus increases the inconsistency window.

## Read Your Own Writes (RYOWs)

Read Your Own Writes (RYOWs) is a property of a system that ensures if a client makes 
a persistent change to data, the updated value is guaranteed to be returned by any 
subsequent reads from the same client.

## Tunable Consistency

Tunable Consistency are configuration options and API parameters that enable tradeoffs 
between availability and data consistency of eventually consistent databases.

Tunable consistency is based on specifying the number of replicas that a request must 
access to complete a database request.

To explain how this works let's define the ff.:

- $N$: Total number of replicas
- $W$: Total number of replicas to update before confirming the update to the client.
- $R$: Total number of replicas to read from before returning a value.

For example, assume $N = 3$, then:

If $W = N$, then we require the database to update all the replicas before returning 
an update to the client. This optimizes for consistency over availability.

If $W = 1$, then we require the database to only update $1$ replica and the other two 
replicas will be updated asynchronously. This optimizes for availability over consistency.

Another trade-off to look at with this is the **read optimized** versus **write optimized** 
trade-off:

Having $W = N, R = 1$ means you're read optimized and consistent. The trade-off is slower 
writes.

Having $W = 1, R = N$ means you're write optimized and available. The trade-off is slower 
reads.

## Quorum Reads and Writes

Quorum simply means majority, which is $(\frac{N}{2}) + 1$ ie. for $3$ replicas the 
majority is $2$, for $5$ replicas the majority is $3$.

If we configure both $W$ and $R$ values to be the quorum, we can balance performance of 
reads and writes and still provide access to the latest updated value of a data object.

The trade-off here is that when any of the quorum of nodes fail ie. due to transient 
network failures, then the request simply fails.

### Sloppy Quorums

Sloppy quorums is a mechanism with which if a write fails on the designated quorum node 
(or _home_ node), then it is stored to a healthy one in the collection.

When the home node becomes available, the storing node performs a _hinted handoff_ which 
sends the latest value of the replica to the home nodes from its temporary location.

## Replica Repair

As systems tend to entropy (disorder) over time, databases need to take active measures 
to ensure replicas remain consistent.

These measures are known as anti-entropy repair.

There are two strategies for anti-entropy repair:

### Active Repair

Also known as _read repair_, active replica repair takes place in response to database 
read requests.

When a read arrives at a coordinator node, it requests the latest value for each replica.

If any of the values are inconsistent, the coordinator sends back the latest value to 
update the stale replicas.

This can be done in a blocking or non-blocking mode.

- **Blocking**: waits for the replicas to confirm updates before responding to the client.
- **Non-Blocking**: returns the latest value to the client immediately and updates stale 
  replicas asynchronously.

### Passive Repair

Is a background process that runs periodically and is targeted at fixing replicas that are 
infrequently accessed.

> See [Wikipedia: Merkle Trees](https://en.wikipedia.org/wiki/Merkle_tree) for how replicas compare each other's consistency.

# Handling Conflicts

## Last-Writer Wins (LWW)

Is a conflict resolution strategy where the write with the most recent timestamp is used 
as the latest version of the update.

The drawbacks with this approach is that distributed systems have diverging local times, 
making this approach probabilistic (ie. random) instead of deterministic.

> See [this stackoverflow comment](https://stackoverflow.com/a/49448588).

## Version Vectors

Is a conflict resolution strategy where databases stores a version number along with the 
database object.

The process is as follows:

1. When a client reads a database object, it receives the object along with a version number.
2. When a client updates a database object, it writes the new data values and the version 
   of the object that was received from the previous read.
3. If the version of the accompanying database object is:
  - The same, then the write occurs and the version number for that database object 
    gets incremented.
  - Not the same, then a conflict has occurred and the database will take action to remedy 
    the issue and make sure data is not lost.
