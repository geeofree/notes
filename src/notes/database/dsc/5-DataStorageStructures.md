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

## Organization of Records in Files

### Heap File Organization

A basic type of file organization where records are stored in no particular order and 
where data is inserted at the end of the file (append only).

Deleting a file causes a fragmentation in this type of file organization which is why a 
data structure called a _free space map_ is used to improve insertion and delete 
operations.

### Sequential File Organization

A type of file organization where records are stored in sorted order based on some 
search-key.

This type of file organization is suited for efficient access of sorted records.

> A _search-key_ is some attributed or a set of attributes.

The read operation works by chaining together records by pointers (linked list), where 
each record points to the next record in search0key order.

The records are also stored search-key order physically in order to minimize the number 
of block access.

### Multitable Clustering File Organization

A type of file organization that stores related records of two or more relations in each 
block.

The _cluster key_ is the attribute that defines which records are stored together.

## Data-Dictionary Storage

Relational schemas and other metadata are stored in a structure called a _data dictionary_ 
or _system catalog_.

The ff. are some of the types of information that gets stored in a data dictionary:

- Names of relations
- Names of the attributes of each relation
- Domains and lengths of attributes
- Names of views defined on the database, and definitions of those views
- Integrity constraints

In addition, many systems keep the ff. data on users of the system:

- Name of users, the default schemas of the users, and passwords or other information to 
  authenticate users.
- Information about authorizations for each user.

Further, the database may store statistical and descriptive data about the relations and 
attributes, such as the number of tuples in each relation, or the number of distinct values 
for each attribute.

The data dictionary or system catalog may also note the storage organization (heap, sequential, 
hash, etc.) of relations, and the location of where each relation is stored:

- If relations are stored in OS files, the dictionary would note the names of the file/s 
  containing each relation.
- If the databases stores all relations in a single file, the dictionary may note the 
  blocks containing records of each relation in a data structure such as a linked list.

Some databases store metadata by using special-purpose data structures.

In general however, it is preferable to store the data about the database as relations in 
the database itself.
