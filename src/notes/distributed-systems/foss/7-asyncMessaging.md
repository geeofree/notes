---
title: "Chapter 3: Asynchronous Messaging"
description: "Asynchronous messaging basics."
---

# Messaging Primitives

### Message Queues
Queues that store a sequence of messages

### Producers
Send messages to queues

### Consumers
Retrieve messages from queues

### Message Brokers
Manages one or more queues

![Figure 1: Message Queue](/images/figures/foss/message-queue.png)

- A message broker is a service that manages one or more queues.

- When messages are sent from producers to a queue, the broker adds messages to the queue 
in the order they arrive (FIFO).

- The broker is resonsible for efficiently managing message receipt and retention until 
one or more consumers retrieve the messages, which are then removed from the queue.

- A producer will wait until an acknowledgement message is received from the broker 
  before the send operation is considered complete.

- There are two modes of behaviour for consumers to retrieve messages, known as _pull_ or 
  _push_.

  - In pull mode, also known as polling, consumers send a request to the broker, which 
    respons with the next message available for processing. If there are no messages 
    available, the consumer must poll the queue until messages arrive.
    
  - In push mode, a consumer informs the broker that it wishes to receive messages from 
    a queue. The consumer provides a callback function that should be invoked when a 
    message is available.

- Consumers will also acknowledge message receipt. There are two modes for acknowledgement: 
  
  - Automatic acknowledgement, where messages are acknowledged as soon as they are 
    delivered to the consumer and before they are processed.
    
  - Manual acknowledgement, where messages are acknowledged if and only if it has been 
    successfully processed by the consumer.

## Message Persistence
- Queues can be configured to be persistent.

- When a message is placed on a queue by a producer, the operation does not complete until 
  the message is written to disk.

- Persistent queues have an inherent increase in the response time for send operations.

## Publish-Subscribe
- A one-to-many messaging architecture where messages are sent from one publisher to 
  multiple subscribers.

![Publish-Subscribe](/images/figures/foss/mq-pubsub.png)

## Message Replication
- Message brokers can enable logical queues and topics to be physically replicated across 
  multiple brokers, each running on their own node.
  
- If one broker fails, then producers and consumers can continue to process messages using 
  one of the replicas.
  
![Message Replication](/images/figures/foss/mq-replication.png)

## Messaging Patterns

> Read [this](https://www.enterpriseintegrationpatterns.com/patterns/messaging/) to learn more about the different messaging patterns.

### Competing Consumers

> Read [this](https://www.enterpriseintegrationpatterns.com/patterns/messaging/CompetingConsumers.html).

### Exactly-Once Processing

- Ensures that even if a system fails, retries, or experiences network issues, each message 
is processed, its state updated, and output produced exactly once.

- This prevents duplicates and data loss in distributed systems.

### Poison Messages

> Read [this](https://en.wikipedia.org/wiki/Poison_message).
> 
> Learn about [dead letter queues](https://en.wikipedia.org/wiki/Dead_letter_queue)
