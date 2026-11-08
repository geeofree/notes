---
title: "Chapter 6: Indexing"
description: "All about database indices and how they work."
---

# Database Index

A database index is a specialized data structure that improves read performance and are 
used to locate tuples without having to scan every row.

There are two basic kinds of indices:

- **Ordered Indices**
- **Hash Indices**

The ff. are some of the factors when considering techniques for ordered indexing:

1. Access Types
2. Access Time
3. Insertion Time
4. Deletion Time
5. Space Overhead

# Ordered Indices

An **ordered index** stores the values of the search keys in sorted order and associates 
with each search key the records that contain it.

A **clustering index** is an index whose search key also defines the sequential order 
of the file ie. the file records are also in sorted order defined by the search key 
sorting.

A **nonclustering index** is an index whose files are not sorted based on the index search 
key.

## Dense and Sparse Indices

An **index entry** (or **index record**) consists of a search-key value and pointers to one 
or more records with that value as their search-key value.

The pointer to a record consists of the identifier of a disk block and an offset within 
the disk block to identify the record within the block.

There are two types of ordered indices we can use:

- **Dense Index**: In this index, an index entry appears for every search-key value in the 
  file.

- **Sparse Index**: In this index, an index entry appears for only some (or a subset) of
  the search-key values. This index type can be used only on a clustering index.
  
  To locate a record in this ordered index type we find the index entry with the largest 
  search-key value that is less than or equal to the search-key value for which we are 
  looking for.
  
  Afterwards, we start at the record pointed to by that index entry and follow the pointers 
  in the file until we find the desired record.

## Multilevel Indices

Indices with two or more levels are called multilevel indices and are used to reduce 
space-overhead with index files.

## Secondary Indices

Secondary indices are an auxiliary data structure created on a non-primary key and is used 
to improve read performance.
