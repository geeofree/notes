---
title: "Chapter 2: Structured Query Language"
description: "A look into the SQL query language."
---

## Query Language Components

Most query languages have the ff. language features:

- **Data-definition Language (DDL)** - Commands for defining, modifying, and deleting 
  relation schemas.
- **Data-manipulation Language (DML)** - Commands for querying, inserting, updating, 
  and deleting records or instances in a database.

### Data-definition Language (DDL)

The DDL are a set of commands for defining, modifying, and deleting relation schemas. 

Schemas are attributes and constraints that a given relation contains.

#### Data Types

The SQL standard supports a variety of built-in types, including:

- **char(n)** - A fixed-length character string with user-specified length $n$.
- **varchar(n)** - A variable-length character string with user-specified maximum 
  length $n$.
- **int** - An integer.
- **smallint** - A small integer.
- **numeric(p, d)** - A fixed-point number with a user-specified precision. The number 
  consists of $p$ digits (plus a sign), and $d$ of the $p$ digits to the right of the 
  decimal point. For example **numeric(3, 1)** can represent and store $44.1$ but not 
  $444.1$ or $0.12$.
- **real, double precision** - Floating-point and double-precision floating-point numbers.
- **float(n)** - A floating-point number with precision of at least $n$ digits.
- **datetime** - Represents date and time values.

Each type may include a special value called **null** which represents an unknown/missing 
value.

#### Basic Schema Definition

##### Creating Tables

To define a SQL relation the `create table` command is used:

```sql
CREATE TABLE users (
  id            int,
  first_name    varchar(30),
  last_name     varchar(30),
  date_of_birth datetime
);
```

In general, the syntax for the `create table` command is:

```sql
--- CREATE TABLE r (
---   a1 d1 <constraints>,
---   a2 d2 <constraints>,
---   a3 d3 <constraints>,
---   ...,
---   an dn[,]
---   <integrity-constraint-1>,
---   <integrity-constraint-2>,
---   <integrity-constraint-3>,
---   ...
---   <integrity-constraint-n>
--- );
```

The ff. are some integrity constraints available in SQL:

- **primary key ($A_{1}, A_{2}, A_{3}, ..., A_{n}$)** - Defines a primary-key constraint which requires
  tuples or instances to be **nonnull** and **unique**; no tuple can have an empty value and 
  must be unique between each instance.
- **foreign key ($A_{1}, A_{2}, A_{3}, ..., A_{n}$) references $S(B_{1}, B_{2}, B_{3}, ..., B_{n})$** - Defines a 
  foreign-key constraint that requires values in the relation's attributes $A_{1}...A_{n}$ 
  to correspond to values in primary-key attributes $B_{1}...B_{n}$ of the referenced 
  relation $S$.
- **not null** - Defines an attribute in the relation to disallow the entry of the **null** 
  value in it.

##### Removing Tables

To remove tables use the `drop table S` or `delete from S` command:

```sql
DROP TABLE users;
```

or

```sql
DELETE FROM users;
```

The latter deletes all records in it but retains the relation, the former deletes 
all records as well as the relation.

##### Modifying Tables

To modify tables such as adding or removing attributes or constraints, use the 
`alter table S` command:

```sql
--- Add a `username` attribute to the `users` table with 
--- a varchar(30) data type and the constraint of not having 
--- `null` values.
ALTER TABLE users ADD username varchar(30) not null;
```

### Data-manipulation Language (DML) 

The DML are a set of commands for querying, inserting, modifying, and deleting records 
or instances in a database. 

#### Basic Querying

The basic structure of querying in SQL consists of three clauses:

- **select** - Describes the list of columns or attributes to retrieve in the relation.
- **from** - Describes the relation to be queried on.
- **where** - Describes the predicate to filter the results.

For example:

```sql
--- Retrieve all user records that do not have the last_name "Smith" and show 
--- only their first_name, last_name, and date_of_birth attributes.
SELECT
  first_name,
  last_name,
  date_of_birth
FROM users
WHERE last_name != "Smith";
```

The **from** clause can also contain two (2) or more relations to it, creating a 
cross-product:

```sql
--- Retrieve all the users and their address.
SELECT
  first_name,
  last_name,
  date_of_birth,
  city,
  state_or_province,
  country
FROM users, addresses
WHERE users.id = addresses.user_id;
```

##### Functions and Operators

Functions and operators can also be used on the **select** clause, for example:

```sql
SELECT
  --- Get a string concatenated from first_name and last_name with a space between.
  CONCAT(first_name, " ", last_name),
  department,
  --- Multiply the salary value to 1.1
  salary * 1.1
FROM employees;
```

##### Renaming

To rename a relation or an attribute use the **as** keyword:

```sql
SELECT
  CONCAT(first_name, " ", last_name) as full_name,
  date_of_birth
FROM users;
```

##### String Operations

- **=** - Equality operator.
- **||** - Concatenate operator.
- **upper($s$)** - Function to convert all characters in a string to uppercase.
- **lower($s$)** - Function to convert all characters in a string to lowercase.
- **trim($s$)** - Function to remove spaces at the end of the string.

```sql
SELECT 'Foo' = 'foo';              --- Returns false
SELECT 'Hello' || ' ' || 'world.'; --- Returns 'Hello world.'
SELECT UPPER('foo');               --- Returns 'FOO'
SELECT LOWER('BAR');               --- Returns 'bar'
SELECT TRIM('Sample text    ');    --- Returns 'Sample text'
```

There is also the pattern matching keyword **like $s$** where $s$ is some string to 
match against.

There are two (2) special characters when pattern matching:

- **Percent** - The percent (%) character matches any substring.
- **Underscore** - The underscore character matches any character.

```sql
--- Pattern: 'Intro%'
--- Matches any string that starts with 'Intro' ie. 'Introduction' or 
--- 'Introducing'.

--- Pattern: '%Comp%'
--- Matches any string that contains with 'Comp' as a substring ie. 
--- 'Introduction to Computer Science' or 'Computational Complexity'.

--- Pattern: '___'
--- Matches any three character string.

--- Pattern: '___%'
--- Matches any string that starts with at least three characters.
```

##### Ordering

To control the ordering of the results in a query use the **order by** clause:

```sql
SELECT
  first_name,
  last_name,
  date_of_birth
FROM users
ORDER BY first_name;
```

By default the **order by** clause sorts in ascending order. To specify the sorting 
order add either **desc** (descending) or **asc** (ascending) after the attribute:

```sql
SELECT
  first_name,
  last_name,
  date_of_birth
FROM users
ORDER BY first_name ASC, last_name DESC;
```

##### Aggregate Functions

[Aggregate functions](https://en.wikipedia.org/wiki/Aggregate_function) are functions that collect values and return a single value.

Some of the standard aggregate functions available built-in in SQL are:

- Average: **avg**
- Minimum: **min**
- Maximum: **max**
- Total: **sum**
- Count: **count**

For example to count the total number of instances in a relation:

```sql
SELECT count(id) FROM users;
```

##### Grouping

Records can be grouped using the **group by** clause:

```sql
--- Group users by date_of_birth.
SELECT
  first_name,
  last_name,
  date_of_birth
FROM users
GROUP BY date_of_birth;
```

If the **group by** clause is not present, then the whole result is treated as a 
single group.

##### Having

The **having** clause filters the groups using a predicate:

```sql
--- Only return a group of users who have a birthyear of 2000 and above.
SELECT
  first_name,
  last_name,
  date_of_birth
FROM users
GROUP BY date_of_birth
HAVING YEAR(date_of_birth) >= 2000;
```

##### Query Sequence

The meaning of a query containing aggregation, **group by**, or **having** clauses is 
defined by the ff. sequence of operations:

1. The **from** clause is calculated first.
2. If the **where** clause is present, apply it to the result of the **from** clause.
3. If the **group by** clause is present, apply it to the current result of either 
   **from** or **where** (if it's present) clauses.
4. If the **having** clause is present, apply it on the group(s).
5. The **select** statement is then executed, applying aggregates if it is present.

##### Subqueries

Since queries return relations, the result of one query may be used as an input to a 
clause of another query, for example:

```sql
SELECT
  first_name,
  last_name,
  date_of_birth
FROM (
  SELECT
    first_name
    last_name,
    date_of_birth
  FROM users
  WHERE last_name != 'Smith'
)
WHERE YEAR(date_of_birth) >= 2000;
```

When using subqueries on the `select` clause of a SQL statement it's required that the 
subquery contain a single column and a single row:

```sql
SELECT
  first_name,
  last_name,
  date_of_birth,
  (SELECT COUNT(*)
   FROM employees
   WHERE employees.manager_id = users.id) as total_employees
FROM users;
```
