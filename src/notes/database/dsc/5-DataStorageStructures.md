---
title: "Chapter 5: Data Storage Structures"
description: "Data structures on storage media."
---

## File Organization

A database is mapped into a number of different files managed by the underlying operating 
system. These files are organized logically as a sequence of records and are mapped onto 
disk blocks.

Each file is also logically partitioned into fixed-length storage units called _blocks_, 
which are file system units for both storage allocation and data transfer.

Records are also stored as either _fixed-length_ or _variable-length_ in size in any given 
file depending on the database implementation.

In most cases records are stored in variable-length sizes. The ff. are two ways to 
structure variable-length records in a block:

### Variable-Length Records

The ff. are ways (out of many available) to structure variable-length records:

#### Fixed-Length Prefix, Variable-Length Suffix

In this structure a block is divided into three sections: the beginning contains values 
for fixed-length data, the end contains values for variable-length data, and in-between 
is a section for the *null bitmap* which simply represents attributes that have `null` 
values in them.

Variable-length values are mapped from a record in the fixed-length section that contains 
information about its *offset* and *length*:

![fixed-prefix-variable-suffix](/images/figures/database/fixed-prefix-variable-suffix.png)

In this example the $ID$ attribute is represented in the fixed-length section as being 
at the offset position of $21$ and having a length of $5$.

#### Slotted-Page Structure

The most common layout for variable-length records.

This structure contains three sections: the header section, the *free* section, and 
the record list section.

The block header commonly contains the ff. information:

- Total record entries
- The end of free space in the block
- An array containing the offset and length of each record

![slotted-page-structure](/images/figures/database/slotted-page-structure.png)
