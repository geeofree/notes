---
title: "Chapter 4: Basic Statements"
description: "Basic SQL commands for PostgreSQL."
---

# Creating and managing databases
To create a database:

```sql
CREATE DATABASE <database_name>;
```

When this gets ran, the default template (`template1`) gets copied with the given database 
name.

## Dropping databases
To drop or remove an existing database:

```sql
DROP DATABASE <database_name>;
```

## Making a database copy
To create a copy of a database, clone it from a given database template. For example:

```sql
CREATE DATABASE <db_copy_name> template <db_name>;
```

# Schemas
Schemas are mnemonic namespaces within databases that the user can assign to organize 
database objects.

## PostgreSQL and the public schema
Starting from PostgreSQL 15, global privileges from the [public schema](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PUBLIC) have been removed.
Therefore:

- A normal user will not be able to execute DDL on the public schema.
- A normal user will not be ablt to perform DML on the public schema unless they receive 
  permission from a superuser.

## The `search_path` variable
The `search_path` variable contains the list of schemas the PostgreSQL uses to find tables.
The default value is `$user, public`. This means that it will first search all the tables 
within the schema that has the same name as the current user, then it will search the 
public schema.

# Managing tables
PostgreSQL has three types of tables:

- **Temporary tables**: very fast tables, visible only to the user who created them.
- **Unlogged tables**: very fast tables, used as support tables common to all users.
- **Logged tables**: regular tables.

## Listing all tables
To list all tables in the connected database, `psql` has the command `\dt`.

## Creating tables
See [PostgreSQL: CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html) for complete documentation on creating tables.
