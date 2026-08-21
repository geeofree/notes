---
title: "Chapter 10: Strong Consistency"
description: "Introduction to strong consistency, consistency models, distributed transactions, and distributed consensus algorithms"
---

# Strong Consistency

Is a consistency model that ensures that every read returns the most recent write.

There are two ($2$) concepts that describe strong consistency:

## Transaction Consistency

Ensures that the [distributed] database goes from one state to another.

## Replica consistency

Clients all see the same value for a data object after it has been updated, regardless of 
the replica that the client accesses.

## Consensus Algorithms

Are algorithms that enable nodes in a distributed system to reach consensus on the value 
of some shared state.

For **transaction consistency**: all participants in the transaction must all agree to 
either commit or abort the changes executed within the transaction.

For **replica consistency**: all replicas need to agree on the same order of updates for 
replicated objects.

# ACID Transactions

Are properties in a database that guarantees data reliability and validity using four 
key rules:

- **Atomicity**: All changes to a database must execute as if they are a single operation.
- **Consistency**: Transactions will leave the database in a consistent state.
- **Isolation**: While a transaction is ongoing, any data modified by it is invisible 
  to all other concurrent transactions.
- **Durability**: If a transaction commits, the changes are permanent and recoverable in 
  the event of a system failure.

# Consistency Models

Are rules for the order and visibility of read and write operations across nodes or 
processors, balancing speed and correctness.

## Serializability

Also known as **Transactional Consistency**.

The transactions perform one or more reads and writes on multiple data objects.

Serializability guarantees that the execution of a set of concurrent transactions over 
multiple items is equivalent to some sequential execution order of the transactions.

## Linearizability

All clients should always see the most recent value of a data object.

Once a write to a data object succeeds, all subsequent reads to that data object must 
return the most recent write until the object is modified again.

---

Combining serializability with linearizability can be called _strong consistency_.

# Distributed Transactions

Are transactions that occur within a distributed database environment.

An algorithm is required to meet consensus on the transaction outcome.

## Two-Phase Commit (2PC)

A protocol driven by a coordinator, or leader.

The coordinator can be an external service or an internal database service.

In a distributed SQL database, the coordinator can be one of the partitions that is being 
updated as part of a multipartition transactional update.

**How it works**:

1. When a database client starts a transaction, a coordinator is selected.
2. The coordinator then allocates a globally unique transaction identifier (_tid_) and 
   returns this to the client.
3. The _tid_ identifies a data structured maintained by the coordinator known as the 
   transaction context.
4. The transaction context records the database partitions, or participants, that take 
   part in the transaction and the state of their communications.
5. The context is persisted by the coordinator, so that it durably maintains the state of 
   the transaction.
6. The client then executes the operations defined by the transaction, passing the _tid_ 
   to each participant that performs the database operations.
7. Each participant acquires locks on mutated objects and executes the operations locally.
   It also durably associates the _tid_ with the updates in a local transaction log.

Once all the operations in the transaction are completed successfully, the client tries to 
commit the transaction.

This is when the 2PC algorithm commences on the coordinator, which drives two rounds of 
votes with the participants:

- **Prepare Phase**: The coordinator sends a message to all participants to tell them to 
  prepare to commit the transaction. When a participant successfully prepares, it guarantees 
  that it can durably commit the transaction. After this it can no longer unilaterally 
  decide to abort the transaction.
  
  If a participant cannot prepare, it must abort. Each participant then informs the coordinator
  about its decision to commit or abort by returning a message that contains its decision.
  
- **Resolve Phase**: When all the participants have replied to the _prepare phase_, the coordinator
  examines the results.
  
  If all the participants can commit, the whole transaction can commit, and the coordinator 
  sends a commit message to each participant.
  
  If any participant has decided that it must abort, or doesn't reply to the coordinator 
  within a TTL window, the coordinator sends an abort message to each participant.

### 2PC Failure Modes

2PC has two main failure modes: participant and coordinator failure.

- **Participant Failure**: When a participant crashes before the _prepare phase_ completes, 
  the transaction is aborted by the coordinator.
  
  It's also possible for the participant to reply to the _prepare_ message and fail after.
  
  In either case, when the participant restarts, it needs to communicate with the coordinator 
  to discover transaction outcomes.

- **Coordinator Failure**: Participants will have a dilemma if the coordinator fails after 
  sending the _prepare_ message.
  
  Participants that have voted to commit must block until the coordinator informs them of 
  the transaction outcome.
  
  If the coordinator crashes before or during sending out the commit messages, participants 
  cannot proceed, as the coordinator has failed and will not send the transaction outcome 
  until it recovers.

In summary: the weakness of 2PC is that it is not tolerant of coordinator failure.

> Watch [this video](https://www.youtube.com/watch?v=7DoT2sTGulc) or [this video](https://www.youtube.com/watch?v=DOFflggE_0Q) for a good breakdown.

# Distributed Consensus Algorithms

Allow multiple computers in a network to agree on a single data value or state, even if 
some machines crash or network connections fail.

## Raft

A leader-based algorithm.

The leader accepts all updates and defines an order for their execution.

It takes the responsibility of sending the updates to all replicas in the defined order.

The updates are maintained as a log which gets replicated to all members of the system.

Raft clusters have an odd number of nodes ie. $3$ or $5$ which allows consensus to proceed 
based on quorums.

At any instant, each node is either a leader, a follower, or a candidate.

The leader sends periodic heartbeat update messages to  followers.

Each leader is associated with a monotonically increasing value known as _term_.

The _term_ is a logical clock, and each valid term value is associated with a single 
leader.

The current term value is persisted across nodes in the cluster and is essential for 
leader election.

Each heartbeat message contains the term value and leader ID and is delivered using an 
`AppendEntries()` message.

`AppendEntries()` is also used to deliver new entries to commit on the log.

During idle periods when the leader has no new requests from clients, an empty 
`AppendEntries()` suffices as the heartbeat.

During normal operations, all client updates are sent to the leader.

The leader orders the updates and appends them to a local log which are marked initially 
as uncommited.

The leader then sends the updates to the followers which appends it to its own local logs.
The follower then sends an ack. to the leader once finished.

Once the leader has been notified by a majority of the nodes, it them commits the update 
and tells the followers to do the same.

Only a majority of the followers are required to commit an entry on the log. This means 
that committed log entries may not be identical at every follower at any instant.

### Leader Election

The leader in Raft sends periodic heartbeats to followers.

Each follower maintains an election timer, which it starts after receiving a heartbeat 
message.

If the timer expires before another heartbeat is received, the follower starts an election.

Election timers are randomized to minimize the likelihood that multiple followers time out 
simultaneously and call an election.

If a follower's election timeout expires, it changes its state to candidate, increments 
the election _term_ value, and sends a `RequestVote` message to all nodes.

It also votes for itself.

The `RequestVote` message contains the candidate's identifier, the new _term_ value, and 
information about the state of the committed entries in the candidate's log.

The candidate then waits to receive a reply. If it receives the majority of positive votes, 
it will transition to leader, and start sending out heartbeats to inform the other nodes 
in the cluster about its newly acquired status.

If the majority of votes are not received, it remains a candidate and resets its election 
timer.

When followers receive a `RequestVote` message, they perform one of the following actions:

- If the term in the incoming message is greater than the locally persisted term, and the 
  candidate's log is at least up to date as the follower's, it votes for the candidate.

- If the term is less than or equal to the local term, or the follower's log has committed 
  log entries that are not present in the candidate's log, it denies the leadership request.

It's also possible for election timers of two or more followers to expire simultaneously. 
When this happens. each follower will transition to a candidate, increment the term, and 
send `RequestVote` messages.

Raft enforces a rule whereby any node can only vote once within a single term. Hence, when 
multiple candidates start an election:

- One may receive a majority of votes and win an election.
- None may receive a majority. In this case, candidates reset their election timers and 
  another election will be initiated. Eventually a leader will be elected.

> Watch [this video](https://www.youtube.com/watch?v=uXEYuDwm7e4) for a complete lecture on Raft.
