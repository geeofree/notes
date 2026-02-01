---
title: "Chapter 3: Managing Users and Connections"
description: "PostgreSQL roles, users, and connections"
---

# Users and Groups
A *user* represents someone or *something* (an application) that can connect and interact with
the cluster.

A *group* is a collection of users that share some common properties, most commonly 
permissions on cluster objects.

In order to connect to a PostgreSQL database, a login credential is required. In 
particular, a user who is allowed to connect to a specific must exist.

# Managing Roles
Roles can be managed by means of three main SQL statements:

- `CREATE ROLE` creates a role
- `ALTER ROLE` changes some role properties
- `DROP ROLE` removes an existing role

## Creating new roles
To create a new role:

```sql
CREATE ROLE name [ [ WITH ] option [ ... ] ]
```

Where option could be:

```sql
SUPERUSER | NOSUPERUSER
  | CREATEDB | NOCREATEDB
  | CREATEROLE | NOCREATEROLE
  | INHERIT | NOINHERIT
  | LOGIN | NOLOGIN
  | REPLICATION | NOREPLICATION
  | BYPASSRLS | NOBYPASSRLS
  | CONNECTION LIMIT connlimit
  | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
  | VALID UNTIL 'timestamp'
  | IN ROLE role_name [, ...]
  | ROLE role_name [, ...]
  | ADMIN role_name [, ...]
  | SYSID uid
```

> See [PostgreSQL: Create Role](https://www.postgresql.org/docs/current/sql-createrole.html) for more information on these options.

### Creating a user role
To create a user role we need to have the `LOGIN` option to it:

```sql
CREATE ROLE daisy WITH LOGIN PASSWORD 'mypassword';
```

This creates a user role named `daisy` with a password `'mypassword'`;

> `CREATE USER` can also be used as an alias to create a user role.
> See [PostgreSQL: CREATE USER](https://www.postgresql.org/docs/current/sql-createuser.html)

### Using a role as a group
To create a role as a group, it has to have the `NOLOGIN` option which can then be used as 
a containing role that all other roles can be put into.

For example:

```sql
CREATE ROLE book_authors WITH NOLOGIN;

CREATE ROLE lexie
  WITH LOGIN PASSWORD 'somepassword'
  IN ROLE book_authors;
```

The `book_authors` is a group role while `lexie` is a user role that gets added to the 
`book_authors` role by using the `IN ROLE` option.

It is also possible to add members to a group using the special `GRANT` statement.

```sql
GRANT book_authors TO lexie;
```

Every group can have one or more **admin** members which are allowed to add new members to 
the group. The `ADMIN` option can be used to specify this.

```sql
CREATE ROLE book_reviewers
  WITH NOLOGIN
  ADMIN daisy;
```

## Removing an existing role
To remove an existing role:

```sql
DROP ROLE [ IF EXIST ] name [, ...]
```

# Inspecting existing roles
In order to get information about what role a current user is using, make a query with the 
special keyword `CURRENT_ROLE`.

```sql
SELECT CURRENT_ROLE;
```

To know about information of all roles and their properties, `psql` provides the special `\du`
(describe users) command to list all available roles within the system.

> `psql` also has a command to show all the groups a role is a member of through `\drg`.
