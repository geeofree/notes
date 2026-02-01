---
title: 'Chapter 4: Python Modules'
description: "Python's module system"
---

## Modules

A module is a file that allows other modules to use definitions within 
that file.

To import definitions from other modules:

```py
# my_math.py

def add(a, b):
  return a + b
  
def sub(a, b):
  return a - b
  
def mul(a, b):
  return a * b
  
def div(a, b):
  return a / b
```

```py
import my_math

my_math.add(2, 3)
my_math.sub(5, 2)
my_math.mul(10, 2)
my_math.div(5, 3)
```

To import a definition directly in a module:

```py
from my_math add, sub, mul, div

add(2, 3)
sub(5, 2)
mul(10, 2)
div(5, 3)
```

Imports can also be *aliased* using the `as` keyword:

```py
import my_math as some_other_name
```

```py
from my_math import add as my_math_add
```

### Executing modules as scripts

The module's file name is provided through the `__name__` variable.

If a module is executed as a script; when it is provided as an 
argument to the python interpreter, the `__name__` global variable 
will be set to `'__main__'`.

This is useful when you want to execute certain things within the 
module only when it is executed as a script:

```py
# my_math.py

def add(a, b):
  return a + b
  
if __name__ == '__main__':
  # This will only execute if the module is 
  # ran as a script.
  print(add(10, 3))
```

When used as a module, the module will not execute the statements 
within the `if` statement.

```bash
>>> import my_math
>>> my_math.add(2, 3)
5
```

Ran as a script however, it will:

```bash
$ python my_math.py
13
```

### Module resolution

Python resolves modules through the following:

1. Check if there is a builtin with the given module's name.
2. If not found, python then looks for `<module_name>.py` within 
   a list of directories given by [sys.path](https://docs.python.org/3/library/sys.html#sys.path).

### Packages

A package is a collection of modules within a given directory:

```text
webapp/
    __init__.py
    routes/
          __init__.py
          foo_route.py
          bar_route.py
    controllers/
          __init__.py
          foo_controller.py
          bar_controller.py
    services/
          __init__.py
          foo_service.py
          bar_service.py
```

The `__init__.py` files are required and allows python to treat  
directories as a package that contains modules.

The file can be empty or have content that execute certain things 
ie. initialization of the modules.

To use modules within packages:

```py
import webapp.services

webapp.services.foo_service.thing_in_foo_service()
```
