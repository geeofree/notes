---
title: "Chapter 1: Introduction to the Relational Model"
description: "Relational database basics."
---

**Table of Contents**

- [Relational Databases](#relational-databases)
- [Keys](#keys)
  - [Foreign Keys](#foreign-keys)
- [Relational Query Languages](#relational-query-languages)
  - [Relational Algebra](#relational-algebra)
    - [Select Operator](#select-operator)
    - [Projection Operator](#projection-operator)
    - [Cross-Product Operator](#cross-product-operator)
    - [Join Operator](#join-operator)

## Relational Databases

Relational databases are based on the [relational model](https://en.wikipedia.org/wiki/Relational_model) and consists 
of **tables** that are identified by a name and where each table contains 
a set of **columns** and a set of **rows** (also called instances or records).

Take the ff. `users` table for example:

| id | first_name | last_name | date_of_birth |
|----|------------|-----------|---------------|
| 1  | Jane       | Doe       | 1990-02-20    |
| 2  | John       | Smith     | 1990-01-01    |
| 3  | Kim        | Chi       | 2003-11-03    |
| 4  | Prybhat    | Privtr    | 2005-06-15    |
| 5  | Adams      | Lernar    | 2010-12-15    |
| 6  | Karen      | Freeman   | 2001-09-11    |

Here, the table contains $4$ columns: `id`, `first_name`, `last_name`, 
`date_of_birth` and $6$ rows (or instances).

## Relational Model

The relational model is a model that contains **relations** which then 
contains a set of **tuples** of values.

For example, the `users` relation:

$$
\begin{align}
users = \{
  (1, Jane, Doe, 1990-02-20),\newline
  (2, John, Smith, 1990-01-01),\newline
  (3, Kim, Chi, 2003-11-03),\newline
  (4, Prybhat, Privtr, 2005-06-15),\newline
  (5, Adams, Lernar, 2010-12-15),\newline
  (6, Karen, Freeman, 2001-09-11)
\}
\end{align}
$$

Each tuple also contains **attributes** which describes an item or value in 
it.

The **domain** of an attribute defines the set of permitted values for a 
tuple item.

For example, the `first_name` attribute in the `users` relation should 
contain all possible values of a `first_name`.

It is also required that the domain of an attribute be **atomic**, meaning 
that the values contain indivisible units only.

An example of a non-atomic attribute would be a `phone_numbers` attribute 
that contains a set of phone numbers.

## Keys

**Keys** are a set of attributes that uniquely identify instances of a relation.

Formally, for a set of attributes $R$ in a relation $r$ and a set of keys 
$K$ where $K \subset R$, for values $t_{1}, t_{2} \in r$ if $t_{1} \neq t_{2}$ then $t_{1}.K \neq t_{2}.K$.

A [superkey](https://en.wikipedia.org/wiki/Superkey) is a set of attributes that can uniquely identify relation instances
while a [candidate key](https://en.wikipedia.org/wiki/Candidate_key) is a proper subset of a superkey where if any attributes 
within it are removed then it will fail to uniquely identify relation instances.

[Primary keys](https://en.wikipedia.org/wiki/Primary_key) are specific candidate keys that are chosen to uniquely identify 
instances in a relation.

### Foreign Keys

A [foreign key](https://en.wikipedia.org/wiki/Foreign_key) is set of attributes in a relation that is used to reference an 
instance in another relation using the referenced relation's attributes that it 
corresponds to.

For example, an `addresses` relation that contains an attribute `user_id` that 
corresponds to an instance in the `users` relation using the `id` attribute 
in that relation:

$$
addresses(user\_id, city, state\_or\_province, country)
$$

## Relational Query Languages

A [query language](https://en.wikipedia.org/wiki/Query_language) is a language that describes what information to get in a 
database.

In relational databases the [Structured Query Language(SQL)](https://en.wikipedia.org/wiki/SQL) is widely used as the 
query language.

### Relational Algebra

[Relational algebra](https://en.wikipedia.org/wiki/Relational_algebra) is a mathematical formalism and the basis for relational query 
languages such as SQL.

It consists of a set of operators which takes in one or two relations as inputs 
and produces a new relation as their result.

The ff. are operators in relational algebra:

#### Select Operator

Selects tuples that satisfy a given predicate.

For example to select for addresses that has a `"USA"` entry in the `country` attribute:

$$
\sigma_{country = \text{"USA"}}(addresses)
$$

We may also use relational operators such as $\geq$, $\leq$, $\gt$, $\lt$, $\neq$ as well as connectives 
*and* $\land$, *or* $\lor$, and *not* $\lnot$:

$$
\sigma_{date\_of\_birth \geq \text{2000-01-01}}(users)
$$

$$
\sigma_{last\_name \neq \text{"Smith"}}(users)
$$

$$
\sigma_{first\_name \neq \text{"John"} \land last\_name \neq \text{"Smith"}}(users)
$$

#### Projection Operator

Retrieves attributes of a relation.

For example to get only the `first_name` and `last_name` of the `users` relation:

$$
\Pi_{first\_name, last\_name}(users)
$$

#### Cross-Product Operator

Retrieves the product of two relations where each instances are concatenated to 
one another.

$$
R \bigtimes S
$$

#### Join Operator

An operator that combines the cross product with a select statement to retrieve 
instances between two relations that contain referenced keys:

Let $\theta$ denote some predicate:

$$
R \bowtie_{\theta} S = \sigma_{\theta}(R \bigtimes S)
$$
