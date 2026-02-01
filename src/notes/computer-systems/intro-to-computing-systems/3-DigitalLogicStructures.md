---
title: 'Chapter 3: Digital Logic Structures'
description: Transistors, Circuits, and Logic Gates.
---

## The Transistor

Transistors are *semiconductor* devices that can amplify or toggle (switch) electrical 
signals and are the basic units in any modern Computing System.

There are two types of transistors that are commonly in used:

1. Bipolar Junction Transistor (**BJT**)
2. Field-Effect Transistor (**FET**)

Some of their main differences are:

| BJT                                                | FET                                                |
|----------------------------------------------------|----------------------------------------------------|
| Electrical current is controlled with **current**. | Electrical current is controlled with **voltage**. |
| Affected by temperature quickly.                   | Affected by temperature less.                      |
| Breaks quickly.                                    | Durable.                                           |
| Suitable for hobby electronic devices.             | Suitable for commercial products.                  |
| Low switching speed.                               | High switching speed.                              |

In both cases these transistors have three [terminals](https://en.wikipedia.org/wiki/Terminal_(electronics)) that have the same characteristics:

| BJT       | FET    | Terminal Description                                                 |
|-----------|--------|----------------------------------------------------------------------|
| Base      | Gate   | Control terminal; controls the current of electrical signal.         |
| Emitter   | Source | Input terminal; supplies the transistor with electrical current.     |
| Collector | Drain  | Output terminal; the electrical current going out of the transistor. |

Both transistors also contain *N-Type* or *P-Type* semiconductors that changes the behaviour of 
the current flowing to the transistor based on the configuration:

| BJT | FET       | Current Flow Description                                         |
|-----|-----------|------------------------------------------------------------------|
| NPN | N-Channel | Current flows from the *output* terminal to the *input* terminal |
| PNP | P-Channel | Current flows from the *input* terminal to the *output* terminal |

![Terminal differences between BJT and FET](/images/figures/computer-systems/bjt-vs-fet-terminals.png)

In general, N-Type and P-Type transistors are *complimentary* of each other:

* N-Type transistors **allows** the flow of electrical current if voltage is given.
* P-Type transistors **stops** the flow of electrical current if voltage is given.

A common circuit design that takes advantage of these properties of transistors 
is called the **CMOS (Complimentary Metal-Oxide Semiconductor)** circuit and 
is the basis for most *Logic Gates*.

## Logic Gates

Logical operators built from transistors; digital logic circuits.

The ff. are schematic symbols of digital logical operators:

![Logic Gates](/images/figures/computer-systems/logic-gates.png)

## Combinational Logic Circuits

A *combinational* (or *combinatorial*) logic circuit is a type of [digital logic](https://en.wikipedia.org/wiki/Digital_logic) 
whose operations are [pure](https://en.wikipedia.org/wiki/Pure_function) ie. it doesn't have state or use memory and only 
generates outputs based from its inputs.

### Decoder

A decoder is a combinational logic circuit that contains $2^n$ outputs where 
$n$ is the number of inputs.

Each output terminal in a decoder corresponds to the bit permutation of the 
input terminals.

![Decoder Schematic](/images/figures/computer-systems/decoder.png)

Decoder truth table:

| a   | b   | s0  | s1  | s2  | s3  |
|-----|-----|-----|-----|-----|-----|
| $0$ | $0$ | $1$ | $0$ | $0$ | $0$ |
| $0$ | $1$ | $0$ | $1$ | $0$ | $0$ |
| $1$ | $0$ | $0$ | $0$ | $1$ | $0$ |
| $1$ | $1$ | $0$ | $0$ | $0$ | $1$ |

### Multiplexer (Mux)

A multiplexer (or *mux*) is a combinational logic circuit that contains $2^n$ inputs, 
$n$ select terminals, and $1$ output terminal.

A multiplexer's output is determined by the permutation of the select signals 
from given input signals.

![Multiplexer Schematic](/images/figures/computer-systems/multiplexer.png)

Multiplexer truth table:

| s0  | C   |
|-----|-----|
| $0$ | $a$ |
| $1$ | $b$ |

Here, whenever $s0$ is $0$ the output of the multiplexer is whatever value $a$ has, 
and whenever $s0$ is $1$ the output of the multiplexer is whatever value $b$ has.

Conversely there is also the [demultiplexer](https://en.wikipedia.org/wiki/Multiplexer#Digital_demultiplexers) which contains a single input, 
$2^n$ outputs, and $n$ select terminals.

### Full-Adder

A full-adder (or *1-bit adder*) is a combinational logic circuit that contains:

1. Three (3) input terminals: two (2) of which are the operands for the sum 
   operation and the other is the *carry* bit.
2. Two (2) output terminals: one (1) for the *carry-over* bit and the other the 
   sum bit.

![Full-Adder Schematic](/images/figures/computer-systems/full-adder.png)

Full-adder truth table:

| $a$ | $b$ | $C$ | $S$ | $Cr$ |
|-----|-----|-----|-----|------|
| $0$ | $0$ | $0$ | $0$ | $0$  |
| $0$ | $0$ | $1$ | $1$ | $0$  |
| $0$ | $1$ | $0$ | $1$ | $0$  |
| $0$ | $1$ | $1$ | $0$ | $1$  |
| $1$ | $0$ | $0$ | $1$ | $0$  |
| $1$ | $0$ | $1$ | $0$ | $1$  |
| $1$ | $1$ | $0$ | $0$ | $1$  |
| $1$ | $1$ | $1$ | $1$ | $1$  |

There is also the notion of a [half-adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder) which is essentially a 
full-adder but without a *carry* input terminal.

## Basic Storage Elements

The ff. are digital logic structures that can store/persist values which are 
building blocks for memory devices.

### SR Latch

The SR (set/reset) Latch is a digital logic structure that *persists* a
single bit of information.

One of the most common way to implement SR Latches in a digital circuit 
is to use two (2) NAND gates whose output of each is one of the inputs 
of the other.

![SR Latch Schematic](/images/figures/computer-systems/sr-latch.png)

In an SR Latch, the $S$ or *set* input sets the state of the latch (in this 
case the output $a$) to a $1$, whereas the $R$ or *reset* input resets or 
clears the state of the latch to a $0$.

Assuming that the initial state of a circuit like this is the ff.:

- $S = 0$
- $R = 0$
- $a = 1$
- $b = 0$

In this case:

- $a$ will remain with a value of $1$ regardless of what the value of $S$ is 
  iff. $R$ is $0$.
- $a$ will remain with a value of $0$ regardless of what the value of $R$ is 
  iff. $S$ is $0$.

To build a basic intuition about how this works we can imagine an OR gate 
whose output feeds into one of its input:

![OR Gate Persistence](/images/figures/computer-systems/or-gate-persistance.png)

Recall that the truth table of the OR logical operator is as follows:

| $a$ | $b$ | $C$ |
|-----|-----|-----|
| $0$ | $0$ | $0$ |
| $0$ | $1$ | $1$ |
| $1$ | $0$ | $1$ |
| $1$ | $1$ | $1$ |

For the OR gate in this case: if the input terminal $a$ is given a high input 
signal (a value of 1), then the output $C$ will equal to $1$ as $a \lor b = 1 \lor 0 = 1$ 
which consequently will set $b = 1$.

Once at this state, $C$ will always be $1$ regardless of the value of $a$.

> **NOTE**: Please see [Ben Eater: SR Latch](https://www.youtube.com/watch?v=KM0DdEaY5sY0) for a video demonstration of this and a 
> more indepth discussion on the SR Latch.

### D-Latch

The D-Latch (or *Data Latch*) is a digital logic structure that is an 
extension of the SR Latch.

The D-Latch uses a single input to toggle the state of the SR latch with an 
auxiliary input called the *write-enable (WE)* input.

The D-Latch can only change the state of the latch if the WE input is on.

![D-Latch Schematic](/images/figures/computer-systems/d-latch.png)

> **NOTE**: Please see [Ben Eater: D-Latch](https://www.youtube.com/watch?v=KM0DdEaY5sY0) on youtube for more information 
> about the D-Latch digital logic circuit.

## The Concept of Memory

Computer memory is made up of (a large) number of locations that are 
each uniquely identifiable and can store a number of bits of information.

### Address Cell, Address, and Addressability

An *address cell* is a single unit or item within a memory device.

A *memory address* or just *address* is a location of an address cell in 
the memory.

The *address size* or *addressability* of a memory is the number of bits 
of information that can be stored in an address cell.

So for example, a computer that is advertised to have 2 GB of memory 
may mean that it has 2 billion addresses to uniquely identify each cell 
where each can store a byte of information.

### Address Space

The *address space* refers to the total number of addresses that can uniquely 
identify an address cell in a memory device.

Given $n$ bits, we can uniquely identify $2^n$ address cells ie. $10$ bits 
can be used to uniquely identify $2^{10} = 1024$ address cells.

### Addressability

As mentioned earlier, addressability refers to the number of bits that 
can be stored in each memory address.

A *byte-addressable* memory is a device that contains 8-bits or a byte in 
each *address cell*.

A *word-addressable* memory is a device that contains the same *word*-length 
as the CPU in each address cell.

> A *word* is a size that is dependent on each CPU design/implementation.

### A Memory Diagram

The ff. is a memory diagram depicting the different parts of an abstract 
memory device.

The diagram contains sections for the address cell, an $n$-length address 
space, and the address size or addressability of each address cell.

![Memory Diagram](/images/figures/computer-systems/memory-diagram.png)
