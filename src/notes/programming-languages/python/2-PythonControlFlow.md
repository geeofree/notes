---
title: 'Chapter 2: Control Flow'
description: 'Branch, loops, function statements in Python'
---

## Branching

### `if` statements

```py
if S1:
  # body of if statement
elif S2:
  # body of else-if statement
else:
  # body of else statement
```

## Loops

### `while` statement

```py
while S:
  # body of while-loop
```

### `for` statement

`for` loops in python work by iterating over [sequence types](https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range) or any [iterable](https://docs.python.org/3/glossary.html#term-iterable) object 
and using the `in` membership operator:

```py
list = ['foo', 'bar', 'baz']

for item in list:
  print(item)
```

To iterate over a sequence of numbers, the [range()](https://docs.python.org/3/library/stdtypes.html#range) function can be used:

```py
# Prints 0 to 5 (exclusive)
for i in range(5):
  print(i)
  
# Prints 5 to 10 (exclusive)
for j in range(5, 10):
  print(i)
  
# Prints 0, 2, 4, 6, 8
for n in range(0, 10, 2):
  print(n)
```

## Function

The syntax to define a function in python is as follows:

```py
def func_name(args):
  pass
```

Functions in python are [first-class functions](https://en.wikipedia.org/wiki/First-class_function).

### Default arguments

```py
def func(a, b, c=1, d="foo", e=None):
  pass
```

### Keyword arguments

Function arguments can also be called by their name:

```py
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.")
    print("-- Lovely plumage, the", type)
    print("-- It's", state, "!")
```

```py
parrot(1000)                                          # 1 positional argument
parrot(voltage=1000)                                  # 1 keyword argument
parrot(voltage=1000000, action='VOOOOOM')             # 2 keyword arguments
parrot(action='VOOOOOM', voltage=1000000)             # 2 keyword arguments
parrot('a million', 'bereft of life', 'jump')         # 3 positional arguments
parrot('a thousand', state='pushing up the daisies')  # 1 positional, 1 keyword
```

The ff. are invalid calls:

```py
parrot()                     # required argument missing
parrot(voltage=5.0, 'dead')  # non-keyword argument after a keyword argument
parrot(110, voltage=220)     # duplicate value for the same argument
parrot(actor='John Cleese')  # unknown keyword argument
```

### Variable-length arguments

```py
def func(a, b, *args, **kwargs):
  pass
```

### Lambda expressions

Are anonymous functions that have the form:

```py
lambda <args>: <expression>
```

For example:

```py
def map(list, callback):
    new_list = []
    for item in list:
        new_list.append(callback(item))
    return new_list

numbers = [1,2,3,4]
squares = map(numbers, lambda x: x ** 2)

# [1,2,3,4]
print(numbers)

# [1,4,9,16]
print(squares)
```
