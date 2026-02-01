---
title: 'Chapter 6: Structures'
description: Defining data structures in C with structs and unions.
---

## Structures

A _structure_ is a collection of variables in C where each variable is a 
_member_ or _property_ grouped together under a single name.

A structure is defined using a `struct` keyword followed by an (optional) 
tag or name and the members of the structure are enclosed within braces:

```c
struct point {
  int x;
  int y;
};
```

Here, the `point` is a structure containing members `x` and `y` where 
both members are of type `int`.

### Declaring Variables with Structure Types

To declare a variable with a structure type the syntax 
`struct <struct_name> <variable_name>` is used:

```c
struct point my_point;
```

Structure variables can also be defined during the definition of 
the structure:

```c
struct point {
  int x;
  int y;
} my_point, another_point /* ...etc */;
```

Here, `my_point` and `another_point` are variables assigned with the 
`point` structure type.

### Initializing Values to Members of a Structure

To initialize a structure's members to some value during declaration 
enclose the values in braces:

```c
struct point my_point = { 1, 2 };
```

Here, the `x` and `y` members of the `my_point` variable is assigned the 
values `1` and `2` respectively.

### Accessing Members of a Structure

The `.` operator is used to access members of a structure:

```c
// Declare and initialize a variable with the point structure
struct point my_point = { 1, 2 };

// Access the values of the variable
printf("%d\n", my_point.x) // 1
printf("%d\n", my_point.y) // 2

// Set values of the members to something else
my_point.x = 3
my_point.y = 4

// Access the values of the variable
printf("%d\n", my_point.x) // 3
printf("%d\n", my_point.y) // 4
```

### Size of a Structure

The size of a structure uses a multiple of the member's type with 
the largest size in the structure, for example:

```c
struct {
  char s;
  int i;
};
```

Here, the anonymous struct will have a size of `8` bytes since `int` 
has a size of `4` bytes while `char` only has a size of `1` byte meaning 
there will be a _gap_ of `3` bytes of unused memory.

Note that the _gaps_ within the sizes can be _filled_:

```c
// sizeof(foo) = 8 bytes
struct foo {
  char q;
  char r;
  char s;
  char t;
  int i;
};
```

Here, the `foo` struct has a size of `8` bytes since all of the members 
_fill_ the _gaps_ of the extra bytes of the multiple of the largest 
member's type.

If `foo` is added with another member that exceeds the _gap_ of 
remaining bytes however, C will accomodate an extra byte multiple 
of the member with the largest type size:

```c
// sizeof(foo) = 12 bytes
struct foo {
  char q;
  char r;
  char s;
  char t;
  char u;
  int i;
};
```

Here, `foo` now has a size of `12` bytes since the `char` members exceed 
the smallest multiple of the member with the largest type size.

### Structures and Functions

Structures are passed by value as arguments to a function:

```c
#include <stdio.h>

struct point {
  int x;
  int y;
};

void set_point(struct point);

int main() {
  struct point my_point = { 1, 2 };
  
  printf("x: %d y: %d\n", my_point.x, my_point.y); // x: 1 y: 2
  set_point(my_point);
  printf("x: %d y: %d\n", my_point.x, my_point.y); // x: 1 y: 2
}

void set_point(struct point p) {
  p.x = 4;
  p.y = 5;
}
```

Structures can also be returned to a function:

```c
#include <stdio.h>

struct point {
  int x;
  int y;
};

struct point create_point(int x, int y);

int main() {
  struct point p1 = create_point(1, 2);
  struct point p2 = create_point(4, 5);
  
  printf("x: %d y: %d\n", p1.x, p1.y); // x: 1 y: 2
  printf("x: %d y: %d\n", p2.x, p2.y); // x: 4 y: 5
}

struct point create_point(int x, int y) {
  struct point p = { x, y };
  return p;
}
```

### Structure Pointers

```c
#include <stdio.h>

struct point {
  int x;
  int y;
};

int main() {
  // Declare a point structure variable
  struct point p;
  
  // Declare a pointer variable to a point structure object
  struct point *pp;

  // Assign the pointer variable to a point structure object
  pp = &p;
  
  // Set the point structure object's values
  (*pp).x = 1;
  (*pp).y = 2;
  
  // Print
  printf("pp.x: %d pp.y: %d\n", (*pp).x, (*pp).y); // (*pp).x: 1 (*pp).y: 2
  printf("p.x: %d p.y: %d\n", p.x, p.y); // p.x: 1 p.y: 2
}
```

The `->` operator can also be used as a shorthand for accessing a 
member of a structure from a pointer:

```c
// This:
(*pp).x = 1;

// Is the same as this:
pp->x = 1;
```

### Array of Structures

```c
#include <stdio.h>

#define LENGTH(array) (sizeof(array)) / (sizeof(array[0]))

struct point {
  int x;
  int y;
} points[] = {
  { 1, 2 },
  { 2, 3 },
  { 4, 5 },
  /* etc */
};

int main() {
  for(int i = 0; i < LENGTH(points); i++) {
    struct point p = points[i];
    printf("x: %d y: %d\n", p.x, p.y);
  }
}
```

### Self-Referential Structures

Since structures are also valid objects they can be set 
as members to a structure.

```c
struct point {
  int x;
  int y;
};

struct rect {
  struct point p1;
  struct point p2;
};
```

It is also valid for a structure to reference itself in its 
own definition via pointers:

```c
struct tnode {
  int count;
  char *value;
  struct tnode *left;
  struct tnode *right;
}
```

## Type Definitions

Type definitions are _aliases_ to existing types and are defined 
using the `typedef` keyword:

```c
#include <stdio.h>

typedef char *String;

int main() {
  String my_string = "Hello world!";
  printf("%s\n", my_string);
}
```

## Unions

A union is a collection of distinct types where the size of the 
union is only large enough to accomodate the size of the member 
with the largest type size:

```c
#include <stdio.h>

union my_union {
  char s;
  unsigned int i;
  unsigned long int li;
};

int main() {
  union my_union u;
  u.s = 1;
  u.i = 123;
  u.li = 1234;
}
```

Here, the union definition `my_union` can store values for `char`, `unsigned int` and 
`unsigned long int` where the union is large enough to accomodate values to a size 
of `unsigned long int`.
