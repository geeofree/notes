---
title: 'Chapter 1: Python Basics'
description: 'How to use the Python interpreter and some basic concepts'
---

## Running the interpreter

Executing the interpreter without arguments runs the REPL or interactive command line:

```bash
$ python
>>>
```

To execute a command immediately use the `-c` flag:

```bash
$ python -c 'print("Hello world")'
Hello world
```

The interpreter can also take in a file to execute commands on:

```py
# sample.py
print("Hello from file!")
```

```bash
$ python sample.py
Hello from file!
```

To run a python file and then immediately go into REPL run with the `-i` flag:

```bash
$ python -i sample.py
Hello from file!
>>>
```

## Basic I/O

### Printing

The `print` function is used to print output to `stdout`.

```py
print("Hello world")
```

### Arguments

Arguments are provided through the `sys` standard module, specifically on the 
`argv` list within it.

To use a module the `import <module_name>` syntax must be used:

```py
# args.py
import sys
print(sys.argv)
```

```bash
$ python args.py hello there
['args.py', 'hello', 'there']
```

## Arithmetic

```py
# Variable declarations
x = 5
y = 2

# Basic Arithmetic
x + y
x - y
x * y
x / y
x % y

# Other Arithmetic Operations

# Floor division
x // y

# Exponents
x ** y
```

> **Note:** An operation between an integer and a float in Python will
> always result as a float and will always have the integer operand 
> get casted to a float.

## Strings

Zero or more characters in between `''` or `""` are denoted as strings.

### Concatenation & Repetition

Strings can be concatenated using the `+` operator:

```py
>>> Hello = "Hello"
>>> World = "World"
>>> print(Hello + " " + World)
'Hello World'
```

Python also automatically concatenates strings that are adjacent to each other:

```bash
>>> 'Pre' 'fix'
'Prefix'
```

This is useful if you want to break long strings:

```py
>>> my_string = ("The quick brown fox jumps over "
...              "the lazy dog")
>>> print(my_string)
'The quick brown fox jumps over the lazy dog'
```

A string can be repeated `n` times by using a `*` operator to it with an integer.

```bash
>>> 3 * 'super'
'supersupersuper'
```

### Indexing/Slicing

Strings can be indexed using a single integer as long as it is within range:

```bash
>>> str = 'Batman'
>>> str[0]
'B'
>>> str[1]
'a'
>>> str[2]
't'
>>> str[5]
'n'
>>> str[6]
Error!
```

Negative integers can also be used, in this case it will get subtracted to the 
length of the string:

```bash
>>> str[-1]
'n'
>>> str[-2]
'a'
>>> str[-3]
'm'
```

Python also provides a syntax to *slice* or retrieve a substring using the range syntax 
`a:b` where $a \leq b \leq S.length$ and $S$ is a string.

```bash
>>> str[0:3]
'Bat'
>>> str[3:6]
'man'
```

Omiting the end of the range implies an index equivalent to the length of the string:

```bash
>>> str[3:]
'man'
>>> 'C' + str[1:]
'Catman'
```

Conversely, omiting the start of the range implies an index of `0`:

```bash
>>> str[:3] + 'girl'
'Batgirl'
```

If any of the integers is beyond the bounds of the string when using range indices, 
python will handle it gracefully:

```bash
>>> str[3:69]
'man'
>>> str[69:420]
''
```

## Lists

A list is a data structure that contain elements in a contiguous manner:

```bash
>>> my_list = [1, 'apples', 23, 69, 'orange']
>>> print(my_list)
[1, 'apples', 23, 69, 'orange']
```
