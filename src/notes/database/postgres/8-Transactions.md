---
title: "Chapter 8: Transactions, MVCC, WALs, and Checkpoints"
description: "Managing multiple operations using transactions in PostgreSQL."
---

# Transactions
A **transaction** is an atomic unit of work that either succeeds or fails.

Transactions are a key feature of any database system and are what allows a database to 
implement ACID properties:

- **Atomicity** - Transactions are composed of multiple statements. Atomicity guarantees 
  that each transaction is treated as a single unit.
- **Consistency** - Ensures that the database is in a consistent state from one to another. 
- **Isolation** - Ensures concurrent actions leave the database in the same state as if they 
  were executed sequentially.
- **Durability** - Guarantees that once a transaction has been committed, it will remain 
  committed, even if a case of system failure.

In PostgreSQL, a transaction is implicitly provided in each statement.

All transactions in PostgreSQL are assigned a unique number, called the 
**transaction identifier**, or `xid` for short.

PostgreSQL stores the `xid` in a certain tuple within the tuple itself.

To inspect the current transaction `xid`, query the `txid_current()` function.

```sql
SELECT txid_current();
```

There is also the special `xmin` hidden column available in all tables that can be used 
to determine which transaction created the tuples:

```sql
SELECT xmin, * FROM my_table;
```

## Implicit Transactions
By default, each statements are wrapped within a transaction implicitly.

$5$ `INSERT` statements for example will have their own unique transaction block.

```sql
INSERT INTO tags(tag) VALUES ('JavaScript');
INSERT INTO tags(tag) VALUES ('C');
INSERT INTO tags(tag) VALUES ('Python');
INSERT INTO tags(tag) VALUES ('Go');
INSERT INTO tags(tag) VALUES ('PHP');
```

Querying the `tags` table with the `xmin` column should derive a unique `xid` per row.

```sql
SELECT xmin, tag from tags;
```

## Explicit Transactions
To explicitly define a transaction block for the next following statements, use the 
`BEGIN` and `COMMIT` block to start and store the statements respectively.

```sql
BEGIN; -- Starts the transaction
INSERT INTO tags(tag) VALUES ('C#');
INSERT INTO tags(tag) VALUES ('C++');
COMMIT; -- Ends the transaction and commits the changes in storage.
```

Querying the `tags` table now should provide the same `xid` for the `C#` and `C++` rows.

```sql
SELECT xmin, tag from tags;
```

Another keyword that can be used within a transaction block is the `ROLLBACK` keyword, 
which ends the transaction block without committing the statements to storage.

```sql
BEGIN; -- Starts the transaction
INSERT INTO tags(tag) VALUES ('C#');
INSERT INTO tags(tag) VALUES ('C++');
ROLLBACK; -- Ends the transaction and throws away the changes.
```

> **Note**: Errors that occur within any transactions will cause it to rollback the changes.

## `xid` Wrap Around Problem
Since each transaction is identified with a transaction identifier `xid` which is 
incremented per transaction.

The `xid` is used with a _modulo_ $2^{31}$ operation, so that for any current `xid` value there are 
only $2^{31}$ transactions available.

Once this limit is reached, the `xid` value wraps around, which then introduces a problem 
within PostgreSQL where some tuple (or tuples) has another matching `xid` value, which 
PostgreSQL does not like.

A warning will be provided along with the action to take if the `xid` value is nearing its 
wraparound state.

```txt
WARNING: database "somedb" must be vacuumed within 177009986
transactions
HINT: To avoid a database shutdown, execute a database-wide VACUUM in
"somedb".
```

The PostgreSQL tool named `VACUUM` will _freeze_ old tuples so as to prevent the side effects 
of the `xid` wraparound.

# Multi-Version Concurrency Control (MVCC)
MVCC in PostgreSQL is a _multiversion model_ where each SQL statement sees a snapshot of 
data as it was some time ago, regardless of the current state of the underlying data.

This prevents statements from viewing inconsistent data produced by concurrent 
transactions performing updates on the same data, providing _transaction isolation_ for each 
database session.

MVCC minimizes lock contention in order to allow for reasonable performance in multiuser 
environments.

The main advantage of using the MVCC model of concurrency control rather than locking is 
that in MVCC locks acquired for querying (reading) data do not conflict with locks 
acquired for writing data, and so reading never blocks writing and writing never blocks 
reading.

> Learn more in [PostgreSQL: Introduction to MVCC](https://www.postgresql.org/docs/current/mvcc-intro.html).
