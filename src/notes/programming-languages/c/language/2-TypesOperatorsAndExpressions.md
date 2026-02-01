---
title: 'Chapter 2: Types, Operators, and Expressions'
description: Type definitions, operators, and expressions.
---

## Declarations

### Variables

Variables in C are defined by providing a _type_ then the variable's name:

```c
int my_variable;
```

### Define

A `#define` declaration indicates a value that will be replaced during _preprocessing_.

```c
#define PI 3.14
```

### Constants

Variables can also be prefixed with a `const` keyword to indicate that the object 
will not change/be re-assigned to something else.

```c
const float PI = 3.14;
```

### Enums

Enums provide a list of constant integer values (unless specified otherwise).

```c
enum boolean { NO, YES };
enum months { JAN = 1, FEB = 2, MAR = 3, APR = 4, /** etc. */ };
enum likes { FRUIT = "apple", HOBBY = "reading" };
```

## Data Types and Sizes

| Data Type | Description                                                 |
|-----------|-------------------------------------------------------------|
| `char`    | 1-byte that can contain one character.                      |
| `int`     | 4-bytes or 8-byte long integers (depending on the machine). |
| `float`   | Single-precision floating point.                            |
| `double`  | Double-precision floating point.                            |

These primitive data types may also be prefixed with `short` (at least 2-bytes) or 
`long` (at least 4-bytes) where `short` must never be greater than or equal to `long`.

`int` and `char` can also be prefixed with `signed` or `unsigned`.

## Constants

Constants are raw values that can be assigned to variables and/or operated on to 
produce new values.

```c
/**
 * Integer constants
 **/
1234
1234L  // Long
1234UL // Unsigned Long

/**
 * Floating-point constants.
 * NOTE: That floating-point constants use `double` unless suffixed with `f/F`.
 */
123.4
123.4f // Float
123.4L // Long Double
1e-2
01234  // Octal
0x1F   // Hexadecimal

/**
 * Character/string constants
 **/
'x'
'\n'            // Escape character
"Hello, world!" // String
'\o12'          // Byte-character
'\x1F'          // Hex-character
'\0'            // Null-character
```

## Operators

### Arithmetic

| Operator | Description |
|----------|-------------|
| `+`      | Add         |
| `-`      | Subtract    |
| `*`      | Multiply    |
| `/`      | Divide      |
| `%`      | Modulo      |

### Logical

| Operator | Description              |
|----------|--------------------------|
| `>`      | Greater than             |
| `<`      | Less than                |
| `>=`     | Greater than or equal to |
| `<=`     | Less than or equal to    |
| `==`     | Equal to                 |
| `!=`     | Not equal to             |
| `!`      | Not                      |

### Bitwise

| Operator | Description      |
|----------|------------------|
| `&`      | Bitwise AND      |
| `|`      | Bitwise OR       |
| `^`      | Bitwise XOR      |
| `<<`     | Left Shift       |
| `>>`     | Right Shift      |
| `~`      | One's complement |
