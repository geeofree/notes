---
title: 'Chapter 4: Functions and Program Structure'
description: Breaking up tasks using functions.
---

## Functions

Functions are constructs that can be executed by other functions. It contains 
a set of statement(s), expression(s), and a `return` value.

```c
some_type my_function(/** parameters go here */) {
  /** body of function goes here */
}

int main() {
  my_function();
}
```

A function's _prototype_ can be defined at the very top of the file and are used 
to _declare_ function ie. the symbol of the function, what parameters it accepts, 
and its return type.

```c
int add(int, int);

int main() {
  int result = add(1, 2);
  printf("The result is: %d\n", result);
}

int add(int a, int b) {
  return a + b;
}
```

## Header Files

Header files provide a set of _declarations_ that other C files can use to refer 
to different objects in a program.

```c
// main.c
#include <stdio.h>
#include "my_math.h"

int main() {
  printf("1 + 1 = %d\n", add(1, 1));
  printf("2 - 3 = %d\n", sub(2, 3));
  printf("3 * 4 = %d\n", mul(3, 4));
  printf("4 / 2 = %d\n", div(3, 4));
  printf("PI = %.3f", PI);
}
```

```c
// my_math.h
#ifndef MY_MATH_H
#define MY_MATH_H

#define PI 3.14

/** Add two integers */
int add(int, int);

/** Subtract two integers */
int sub(int, int);

/** Multiply two integers */
int mul(int, int);

/** Divide two integers */
int div(int, int);
#endif
```

```c
// my_math.c

int add(int a, int b) {
  return a + b;
}

int sub(int a, int b) {
  return a - b;
}

int mul(int a, int b) {
  return a * b;
}

int div(int a, int b) {
  return a / b;
}
```

In order for `main.c` to work it must be compiled with all the necessary 
dependencies that is uses. In this case it includes a local header file 
`my_math.h` which is defined/implemented in the `my_math.c` file:

```bash
$ # Compile the program
$ cc main.c my_math.c -o main
$ # Run it
$ ./main
```

> NOTE: That using `#include "some_header_file.h"` denotes that the header file
> is found locally in the project while `#include <some_header_file.h>` denotes 
> that the header file is from a library.

## Static Variables

Functions or variables that are prefixed with the `static` keyword make it 
so that these objects become available only to the file they are defined it;
`static` variables make these objects private/unusable/hidden to other files.

```c
static int my_number = 3;

static void my_function() {
  printf("hello my_function!\n");
}

int do_something() {
  my_function();
  printf("my_number is: %d", my_number);
}
```

In the previous code block, only `do_something` can be referenced by other 
files, `my_function` and `my_number` will not be however as they are declared 
as `static` variables.

The `static` keyword can also be used in _internal_ variables within a 
function making them available/exist even after the function finishes 
execution.

## Recursion

Functions in C may call themselves in their very own definition.

```c
#include <stdio.h>

int fib(int);

int main() {
  int result = fib(10);
  printf("%d\n", result);
}

int fib(int n) {
  if (n < 0) {
    return 1;
  }

  if (n == 0 || n == 1) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}
```

## Macro Substitution

A macro substition (or _macro(s)_) has the form:

```c
#define <name> <replacement text>
```

Where `name` is the symbol to be replaced by the `replacement text` during 
preprocessing.

Macros can also be defined with arguments:

```c
#define MAX(A, B) ((A) > (B) ? (A) : (B))
```
