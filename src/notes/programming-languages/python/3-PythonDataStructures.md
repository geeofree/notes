---
title: 'Chapter 3: Data Structures'
description: 'Basic data structures in Python'
---

## List

A data structure that contains items in a contiguous manner:

```py
my_list = [1, 2, 3, 4, 5]
```

### List comprehension

Lists can also be generated using the [list comprehension](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) expression:

```py
squares = [x ** 2 for x in range(1, 10)]
```

## Tuples

An immutable list data structure:

```py
things = ('apple', 'orange', 'banana')

# Throws an error
things[0] = 'grapes'
```

Tuples can also be *unpacked*:

```py
a, b, c = ('apple', 'orange', 'banana')
print(a) # 'apple'
print(b) # 'orange'
print(c) # 'banana'
```

**NOTE:** Python will throw an error if there are more items to unpack in 
the tuple:

```py
# Raises an error
a, b, c = ('apple', 'orange', 'banana', 'grapes')
```

## Sets

A data structure that contains unique items:

```py
my_set = { 'f', 'o', 'o' }

# Prints { 'f', 'o' }
print(my_set)
```

**NOTE:** creating an empty set should be done by calling the `set()` function 
with no arguments; defining `{}` creates an empty dictionary.

## Dictionaries

A data structure of key/value pairs:

```py
person = {
  'name': 'Mohgwyn',
  'type': 'dog',
  'breed': 'Pit Bull'
}
```

## Looping Techniques

### Iterating over dictionaries

To iterate over dictionaries and retrieving the key/value pairs, use the dictionary's 
builtin `items()` method:

```py
for key, value in person.items():
  print(key, value)
```

### Iterating over sequences with their index:

The [enumerate()](https://docs.python.org/3/library/functions.html#enumerate) function returns a tuple with the index and the value of the item in 
the sequence:

```py
things = ['apple', 'orange', 'banana']

for index, value in enumerate(things):
  print(index, value)
```

### Iterating two or more sequences in parallel

The [zip()](https://docs.python.org/3/library/functions.html#zip) function provides a way to iterate over two or more sequences in parallel:

```py
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']

for q, a in zip(questions, answers):
    print('What is your {0}?  It is {1}.'.format(q, a))
```
