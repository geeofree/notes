---
title: "Chapter 1: Basics of Computer"
description: "Understanding the basics of computers"
---

# Computer Programs
A **Computer Program** is simply just a laundry list of things to check and do.

A computer program will perform each step in sequence until it reaches the 
end of the list.

## Instructions
A computer only understands a finite number of operations or **instructions**.

A computer performs operations like arithmetic, logic, and data movement.

## Registers & Memory
A computer contains storage spaces that it can use to store values and _context_.

**Registers** are storage spaces located within a CPU which it uses to rapidly store 
values and context for a computation.

**Memory** on the other hand is an auxiliary storage space that is _a lot_ less slower 
than registers but is fast enough for storing large runtime data capacity.

## Addresses
Addresses are unique locations that a computer instruction or storage space uses to be 
identified with.

## Program Counter
A **Program Counter** is a unit within a CPU that keeps the address of the next instruction 
to be performed.

## Stack
A stack is a data structure and a unit within a CPU that stores values and are stored 
and accessed using push and pop respectively at the end of the list.

# Number Systems used in Computing

## Binary
Binary is the number system that is used in computing and contains a value with a 
sequence of $0$'s or $1$'s which is called a **bit**.

Computers often uses groups of $8$-bit values or a **byte** which can represent at most 
$2^{8}$ unique values.

## Hexadecimal
Hexadecimal or **hex** is a numbering system that uses a base of $16$. This number 
system is often used to simply represent half a byte (or $4$-bits) of data.

This system goes from $0$ to $9$ then $A$ to $F$, totalling of $16$ unique values.

Since this can represent $4$-bits of data, in order to represent a $byte$, two hex 
values are needed to represent it.

**For example**:

| Decimal | Hex  | Binary    |
|---------|------|-----------|
| 1       | 0x01 | 0000 0001 |
| 3       | 0x03 | 0000 0011 |
| 7       | 0x07 | 0000 0111 |
| 10      | 0x0A | 0000 1010 |
| 17      | 0x11 | 0001 0001 |
| 64      | 0x40 | 0100 0000 |
| 128     | 0x80 | 1000 0000 |
| 255     | 0xFF | 1111 1111 |

# Switches and Transistors

## Switches
A **switch** in general is a mechanism that can store a bit $1$ (on) or $0$ (off).

There are **mechanical switches** which requires mechanical motion (ie. requires human 
intervention) to turn on or off and also **electrical switches** which requires electricity
to turn on or off.

## Transistors
A **transistor** is an *electrical switch* which can be aggregated into a **circuit** or a closed 
network of electrical components to build a memory unit.

# Reading or Writing from Memory
The CPU and Memory communicate via the Memory's address line and both of their data lines 
connected to each other.

## Reading
When a CPU wants to read data from Memory, it sends it an address to the Memory's address 
line. The Memory, upon retrieving the data from the requested address space, puts the data 
into the interconnected data line of the CPU and Memory. Afterwards, reads the data content 
from its data line.

## Writing
In order for the CPU to write to Memory, it first populates its data line with the data it 
needs to write into Memory, then makes a request to Memory which address space it should 
be put into in the Memory's address line. Upon successfully retrieving the address space, 
The Memory writes (or overwites) the address space by reading from the data line.

# The Data Bus
The **data bus**  is a communication system within a computer that transfers data between 
several computer components.

There are two types of data buses:
1. Memory Bus
2. I/O Bus

## Memory Bus
The **memory bus** allows CPU and Main Memory to transfer data between each other.

## I/O Bus
The **I/O bus** allows peripheral devices to transfer data between them and the CPU and 
Main Memory.

# Computer Architecture
A **computer architecture** defines the set of machine instructions, registers, 
data type and format, and how they will work together in order to process 
information.
