---
title: "Chapter 7: Partitioning"
description: "Table partitioning in PostgreSQL."
---

# Partitioning
A common constant in databases is that their size always grows. They can grow in the size 
of gigabytes, terabytes, or even petabytes.

Tables also grow at the same rate; some tables are bigger than others and some indexes are 
also bigger than other indexes.

`shared_buffers` is a part of PostgreSQL's server RAM that is shared among all the processes 
that is used to manage the data present in tables.

When a table grows excessively compared to the `shared_buffers` size, there is a possibility 
that performance will decrease.

In this case, partitioning data will help.

Partitioning data means splitting a very large table into smaller tables in a way that is 
transparent to the client program.

Partitioning also minimizes indexes which means it will have a higher chance of staying 
in memory which can improve data performance.

PostgreSQL supports **declarative partitioning** in order to partition tables.

There are three types of declarative partitioning:

- **Range partitioning**: Range partitioning is where the table is divided into intervals. 
  The intervals must not overlapped and the range is defined through the use of a field or 
  a set of fields.
- **List partitioning**: In list partitioning, the table will be partitioned using a list 
  of values.
- **Hash partitioning**: Using hash partitioning, the table will be partitioned using hash 
  values to split data into different tables.

> For more information see [PostgreSQL: Table Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html).

## Exploring Declarative Partitioning

### List Partitioning
List partitioning using declarative partitioning in PostgreSQL is as follows:

1. Create a table with the `PARTITION BY LIST` clause:
  ```sql
  CREATE TABLE <table_name> (<columns>) PARTITION BY LIST (<columns>);
  ```

2. Create the child table(s):
  ```sql
  CREATE TABLE <child_table_name> PARTITION OF <parent_table_name>
  FOR VALUES IN (<field_value>);
  ```

### Range Partitioning

1. Create a table with the `PARTITION BY RANGE` clause:
  ```sql
  CREATE TABLE <table_name> (<columns>) PARTITION BY RANGE (<columns>);
  ```

2. Create the child table(s):
  ```sql
  CREATE TABLE <child_table_name> PARTITION OF <parent_table_name>
  FOR VALUES FROM (<field_value>) TO (<field_value>);
  ```

## The Default Partition
To create a default child partition table where all other values that don't belong to any 
ranges will be put in, use the `default` keyword when defining the child partition table.

```sql
CREATE TABLE <default_child_table_name> PARTITION OF <parent_table_name> default;
```

## Partitioning with Tablespaces
Tablespaces are tables that are mounted on different directories or volumes.

Using tablespaces along with partitioning can help with horizontal scaling for the storage 
within PostgreSQL.
