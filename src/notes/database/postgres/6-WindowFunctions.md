---
title: "Chapter 6: Window Functions"
description: "Aggregating data using Window Functions."
---

# Window Functions
A window function performs a calculation across a set of table rows that are somehow 
related to the current row.

This is comparable to the type of calculation that can be done with an aggregate function 
except it does not collapse the group of records into a single record.

Window functions create aggregates without flattening the data into a single row.

To define a window function:

```sql
select <aggregate_function> over (
  [ partition by <column_name> [ order by <column_name> ] ]
)
```

The `partition by` clause groups the records similar to the `GROUP BY` clause.
The `order by` sorts the resulting window function records.
