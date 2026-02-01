---
title: "Chapter 1: Introduction to PostgreSQL"
description: "Quick facts and terminologies of PostgreSQL."
---

# Quick Facts

- A single instance can contain more than $4$ billion individual
  databases, each with unlimited total size and capacity for more 
  than $1$ billion tables, each containing $32$ TB of data.

- A single table can have $1,600$ columns, each $1$ GB in size, with 
  an unlimited number of multi-column indexes (up to $32$ columns).

# PostgreSQL terminology

- PostgreSQL is a background service (daemon).
- A PostgreSQL instance is called a **cluster** because a single 
  instance can serve and handle multiple databases.
- Every database is an isolated place where users and applications 
  can store data.
- A database can be organized into namespaces, called **schemas**. 
  A schema is a mnemonic name that the user can assign to organize 
  database objects, such as tables, into a more structured collection. 
  Schemas cannot be nested, so they represent a flat namespace.
- Database objects are represented by everything the user can create 
  and manage within the database — for instance: tables, functions, 
  triggers, and data types.
- Users are defined at a cluster-wide level, which means they are not 
  tied to a particular database.
- PostgreSQL splits users into two main categories:
  - **Normal users**: These users are the ones who can connect to and handle 
    databases and objects depending on their privilege set.
  - **Superusers**: These users can do anything with any database object.
- PostgreSQL allows the configuration of as many superusers as needed, 
  and every superuser has the same permissions:
  - they can do anything with every database and object and can also 
    control the lifecycle of the cluster.
- **Catalogs** are special tables and views that present information in a 
  SQL-interactive way.
- PostgreSQL stores the user data (ie. tables) and its internal status on 
  the local file system.
  - PostgreSQL stores all of its content (user data and internal status) 
    in a single filesystem directory known as `PGDATA`.
  - The `PGDATA` directory represents what the cluster is serving as databases.
  - The `PGDATA` directory is where PostgreSQL expects to find data and configuration 
    files.
- **WALs** (Write-Ahead Logs) are a technology that applies any change to a chunk of 
  data where an intent log will be made persistent.
  - If the cluster crashes, it will rely on the already-written intent log to 
    understand what operations have been completed and what must be recovered.
- Internally, PostgreSQL keeps tracks of a tables' structures, indexes, functions, 
  and any part needed to manage the cluster in the catalog.
- When the cluster is started, a single process called the **postmaster** is launched. 
  The aim of the postmaster is to bootstrap the instance, spawning needed processes 
  to manage the database activity, and then wait for incoming connections.
  - A user connection requires the postmaster to fork another process named the 
    **backend process**, which in turn is in charge of serving one and only one 
    connection.
