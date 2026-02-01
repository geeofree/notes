---
title: 'Chapter 1: Computer Architecture'
description: The Computer Architecture.
---

## Computer Architecture

Is a set of definitions for building a computer which contains:

* The Instruction Set Architecture (ISA)
* The Microarchitecture
* The Logic Design

### Instruction Set Architecture (ISA)

Defines the set of instructions and data that a computer 
can work with.

* **Opcodes** are symbols that can operate on data *ie.* `add`, `sub`, `move`.
* **Operands** are data that can be processed.
* **Data Type** the representation of a data *ie.* *integer*, *float*, *char*
* **Addressing Mode** identifies operands in a computer.

ISAs can also be classified into two categories, namely:

#### Complex Instruction Set Computer (RISC)

An instruction set that performs multiple operations on a single 
instruction; can take several clock cycles to execute a single 
instruction.

Hardware-centric and provides lesser number of opcodes.

#### Reduce Instruction Set Computer (RISC)

An instruction set that performs a single operation for a single 
instruction; a single instruction executes on a single clock cycle.

Software-centric and provides more opcodes.

### Microarchitecture

Defines the different high-level components that the ISA needs in order 
to be implemented.

### Logic Design

Defines the logic circuits that the Microarchitecture needs in order to 
be implemented.

### Microprocessor

The physical implementation of a computer.
