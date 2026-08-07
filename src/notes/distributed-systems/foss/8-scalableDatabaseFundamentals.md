---
title: "Chapter 8: Scalable Database Fundamentals"
description: "Scaling relational databases, NoSQL, and the CAP theorem."
---

# Scaling Relational Databases

Much like application servers, scaling relational databases is a matter of scaling 
up (vertical scaling) or scaling out (horizontal scaling).

## Scaling Up

Scaling up databases mean improving the server the DB is running on as well as the 
the software.

There are three main downsides to this approach:

- **Cost**: Hardware costs tend to grow exponentially as the computational resources 
  offered grow.

- **Availability**: Running on a single node means that the DB is a single point of 
  failure.

- **Growth**: If the DB continues to grow, another migration to a more powerful hardware 
  is inevitable.


## Scaling Out

### Read Replicas

One technique for scaling out databases is creating **read replicas** where one or more 
nodes are configured as read replicas of the main database.

Here, the main database means *primary* database and the read replicas mean *secondary* 
databases.

The secondaries maintain a copy of the primary database.

Writes are only possible on the primary and all changes are asynchronously replicated 
to secondaries.

Secondaries may be physically located in different data centers or in different continents 
to support global clients.

![Database Replica Architecture](/images/figures/foss/database-replica-architecture.png)

### Partitioning Data

Splitting up, or partitioning data in a RDBMS is a technique for distributing the DB over 
multiple independent disk partitions and database engines.

In general, there are two strategies:

#### Horizontal Partitioning

Horizontal partitioning splits a logical table into multiple physical partitions.

Individual rows are allocated to a partition based on some partitioning strategy.

Common partitioning strategies include allocating rows to partitions based on some value 
in the row, or to use a hash function on the primary key.

#### Vertical Partitioning

Vertical partitioning, also known as splitting, partitions a table by the columns in a 
row.

Vertical partitioning splits a row into one or more parts.

A common strategy is to partition a row between static, read-only data, and dynamic data.

> Read more at [Wikipedia: Partitioning Methods](https://en.wikipedia.org/wiki/Partition_(database)#Partitioning_methods)

# NoSQL

NoSQL (or not-only SQL) is a database with unstructured, semi-structured, or 
non-relational data.

Unlike traditional SQL databases that use fixed tables and rows, NoSQL systems use 
diverse models like documents, key-values, and graphs to scale horizontally across 
servers.

> See [Wikipedia: NoSQL](https://en.wikipedia.org/wiki/NoSQL) and [MongoDB: NoSQL](https://www.mongodb.com/resources/basics/databases/nosql-explained)

## NoSQL Data Models

There are four main NoSQL data models, namely:

![NoSQL Data Models](/images/figures/foss/nosql-data-models.png)

### Key-Value (KV)

Key-Values are basically like hash maps. Every object in the database has a unique key 
that is used to retrieve data associated with that key.

### Document

Document databases builds on the KV model where each document in the database requires 
a unique key.

The value associated with the key is encoded, typically in JSON, making it possible to 
reference individual elements in a document in queries and for the database to build 
indexes on document fields.

### Wide Column

A wide column database extends the KV model by organizing data associated with a key in 
named columns.

It's esential a two-dimensional hash map, enabling columns within a row to be uniquely 
identified and sorted using the column name.


### Graph

Graphs are databases that uses a graph data structure to store and query highly connected 
data.

Graphs treat relationships between database objects as first-class citizens, and hence 
enable a wide range of graph-based algorithms to be efficiently implemented.

---

Regardless of data model, NoSQL databses are usually **schemaless**, that is, it doesn't 
require any format for every object you write into the database.

This makes it possible to easily evolve data object formats as there is no need for every 
object in a logical collection to have the same format.

## Data Distribution

NoSQL databases are in general designed to natively scale horizontally across distributed 
compute nodes equipped with local storage.

This is a _shared nothing_ architecture: With no shared state, bottlenecks and single 
points of failure are eliminated, and performance, scalability, and availability is 
enhanced.

## Sharding (Partitioning)

Partitioning, commonly known as sharding, requires an algorithm to distribute the
data objects in a logical database collection across multiple server nodes.

Ideally, a sharding algorithm should evenly distribute data across the available 
resources.

Sharding requires a shard or partition key that is used to allocate a given data object
to a specific partition.

When a new object is created, the shard key maps the object to a specific partition that 
resides on a server.

When a query needs to access an object, it supplies the shard key so the database engine 
can locate the object on the server it resides.

There are three main techniques for sharding:

### Hash Key

The partition for any given data object is chosen as the result of applying a hash 
function to the shard key.

There are two main ways of doing this, using a modulus approach or an algorithm known 
as consistent hashing.

### Value-Based

The partition is chosen based on the value of the shard key.

For example, you might want to partition your data on customers based on their country 
of residence.

### Range-Based

Partitions host data objects where the shard key resides within a specific range
of the shard key value.

For example, you might use zip code/post code ranges to allocate all customer objects 
who reside in the same geographical area to the same partition.

## Replica Consistency

Partitioning makes it possible to scale out a database by adding processing and disk
capacity and distributing data across these additional resources.

However, if one of the partitions is unavailable due to a network error or disk crash, 
then a chunk of the database cannot be accessed.

Solving this availability problem requires the introduction of replication.

Replication enhances both availability and scalability.

A problem with replication however is that when data updates occur, the replicas need to 
be updated as well to ensure that the replicas are consistent.

There are two basic architectures for managing distributed database replication:

### Leader-Follower

One replica is designated the leader and it always holds the latest value of any
data object.

All writes are directed to the leader, which is responsible for propagating updates 
to the replicas.

The followers are read-only replicas.

Application reads can be load balanced across the followers to scale out read 
performance.

### Leaderless

Any replica can handle both reads and updates.

When an update is sent to a replica, it becomes the request coordinator for that 
update and is responsible for ensuring the other replicas get correctly updated.

As writes can be handled by any replica, the leaderless approach tends to be more 
scalable for write-heavy applications.

# The CAP Theorem

The CAP (Consistency, Availability, Partitioning) Theorem is a statement that says a 
distributed system can only provide $2$ out of the $3$ guarantees ie.

1. Consistent and Available but not Partitioned.
2. Consistent and Partitioned but not Available.
3. Available and Partitioned but not Consistent
