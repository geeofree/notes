---
title: "Chapter 5: Advanced Statements"
description: "Complex queries in PostgreSQL"
---

# The `SELECT` statement
The `SELECT` statement can be used to query for datasets. Combined with the `WHERE` filter 
clause, it can be used to query for datasets with a particular property or condition.

```sql
SELECT * FROM categories WHERE pk > 2;
```

## Pattern Matching
The `LIKE` and `ILIKE` clause is used for pattern matching, where `ILIKE` is used for 
case-insensitive pattern matches.

```sql
SELECT * FROM categories WHERE title LIKE 'Prog%';
SELECT * FROM categories WHERE description ILIKE '%DISCUSS%';
```

> See [PostgreSQL: Pattern Matching](https://www.postgresql.org/docs/current/functions-matching.html) for more information.

## Using `LIMIT` and `OFFSET`
The `LIMIT` clause limits the number of rows returned by a query, whereas the `OFFSET` clause 
is used to skip a specific number of rows returned by the query.

> See [PostgreSQL: Limit and Offset](https://www.postgresql.org/docs/current/queries-limit.html) for more information.

## Using subqueries
Subqueries are nested queries that can be performed in a `SELECT` query. Subqueries can 
return a single value or a recordset.

> See [PostgreSQL: Subqueries](https://www.postgresql.org/docs/current/functions-subquery.html) for all possible subquery expressions.

## Joins
Joins make queries in multiple tables.

Take the ff. for example:

```sql
SELECT c.name as "C_NAME", p.name as "P_NAME"
  from posts as p, categories as c;
```

This will create a *cartesian product* between the category table and posts table where 
the total records are $M * N$.

The ff. join clause creates a similar output:

```sql
SELECT c.name as "C_NAME", p.name as "P_NAME"
  from categories as c CROSS JOIN posts as p;
```

> See [PostgreSQL: Joined Tables](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN) for more information.

## Aggregate functions
Aggregate functions perform a calculation on a set of rows and return a single row.

PostgreSQL provides all the standard SQL aggregate functions:

- `AVG()`
- `COUNT()`
- `MAX()`
- `MIN()`
- `SUM()`

Aggregate functions are used in conjunction with the `GROUP BY` clause which splits the 
resultset into groups of rows and aggregate functions perform calculations on them.

A recordset from a `GROUP BY` clause can be filtered with a condition using the 
`HAVING` clause.

# Common Table Expressions (CTEs)
A Common Table Expression (or CTE) provides a way to write auxiliary statements to be 
provided in much larger queries.

These statements are temporary tables that exist for just one query.

> See [PostgreSQL: Common Table Expressions](https://www.postgresql.org/docs/current/queries-with.html) for more information.
