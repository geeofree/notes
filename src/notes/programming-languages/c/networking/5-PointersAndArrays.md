---
title: 'Chapter 5: Pointers and Arrays'
description: Managing data using pointers and arrays in C.
---

## Pointers

In C, a pointer is a variable that _points_ to an object in memory.

The `*` prefix operator can be used in a variable name to _referrence_ 
an object in memory

```c
int *p;
```

Here, `p` is defined as a _pointer variable_ that can reference some 
integer object in memory.

To get the address of some object in memory the `&` prefix operator 
on a variable name is used:

```c
int n = 1;
int *p = &n;
```

Here, the address of the variable `n` is retrieved when defined as `&n` 
which is then set to the pointer variable `p`.

The `*` prefix operator on a variable name can also be used to _dereferrence_ 
the address that the pointer refers to which allows the value on that address 
to be set or retrieved:

```c
#include <stdio.h>

int main() {
  int n = 1;
  int *p = &n;

  printf("n: %d, *p: %d\n", n, *p); // n: 1, *p: 1

  *p = 123; // Set the value of the address to the integer 123

  printf("n: %d, *p: %d\n", n, *p); // n: 123, *p: 123
}
```

Pointers can also be defined on arguments of a function, for example:

```c
#include <stdio.h>

/**
  * Swap the values of a and b
  **/
void swap(int *a, int *b);

int main() {
  int a = 7;
  int b = 11;
  
  printf("a: %d, b: %d\n", a, b); // a: 7, b: 11
  
  swap(&a, &b);
  
  printf("a: %d, b: %d\n", a, b); // a: 11, b: 7
}

void swap(int *pa, int *pb) {
  int temp = *pa;
  *pa = *pb;
  *pb = temp;
}
```

## Pointers and Arrays

Pointers and arrays have the same semantics such that both of these 
concepts refer to objects in memory where:

* Arrays refer to addresses of consecutive objects in memory with some size $n$.
* Pointers refer to an address of an object in memory.

![Arrays vs. Pointers](/images/figures/c/arrays-vs-pointers.png)

> Think of arrays as collections of pointers.

Since arrays are also variables, a pointer can be used to refer to an array's 
item in some index $i$:

```c
#include <stdio.h>

int main() {
  int numbers[] = { 3, 5, 7, 11 };
  int *n;
  
  n = &numbers[0];
  
  printf("*n: %d, numbers[0]: %d\n", *n, numbers[0]); // *n: 3, numbers[0]: 3
  
  *n = 23;
  
  printf("*n: %d, numbers[0]: %d\n", *n, numbers[0]); // *n: 23, numbers[0]: 23
}
```

A simpler syntax to provide the array's address on the first element is to just 
assign the pointer variable to the array:

```c
#include <stdio.h>

int main() {
  int numbers[] = { 3, 5, 7, 11 };
  int *n;
  
  n = numbers; // This is the same as `n = &numbers[0]`
}
```

## Pointer Operations

### Pointer Arithmetic

The arithmetic operators $+$ and $-$ can be used between a pointer (that points to item 
in an array) and an integer which will move the pointer's address:

```c
#include <stdio.h>

int main() {
  int n[] = { 5, 4, 3, 2, 1 };
  
  int *p;
  
  p = n;     // p = n[0]
  
  printf("*p: %d\n", *p); // %p: 5
  
  p = p + 1; // p = n[1]
  
  printf("*p: %d\n", *p); // %p: 4
  
  p = p + 1; // p = n[2]
  
  printf("*p: %d\n", *p); // %p: 3
  
  p = p + 2; // p = n[4]
  
  printf("*p: %d\n", *p); // %p: 1
}
```

A pointer may also be subtracted to another pointer granted that they refer to 
some item in the same array, resulting in an integer of the difference between 
these two pointers:

```c
#include <stdio.h>

int main() {
  int n[] = { 5, 4, 3, 2, 1 };
  int *pa = n;
  int *pb = n;

  pa += 2; // pa = n[1]
  pb += 3; // pb = n[3]

  printf("%zu\n", pb - pa); // 2
}
```

### Pointer Comparison

For two pointers that point to some item on the same array, then the comparison 
operators such as $==$, $!=$, $>$, $<$, $>=$, $<=$ will work accordingly:

```c
#include <stdio.h>

int main() {
  int n[] = { 5, 4, 3, 2, 1 };
  int *pa = n;
  int *pb = n;

  pa += 2; // pa = n[1]
  pb += 3; // pb = n[3]
  
  if (pb > pa) {
    printf("pb is greater than pa!"); // 2
  }
}
```

## Character Pointers

When it comes to character pointers, there are key differences between a 
*pointer to a string constant* vs. *an array to a string constant*, namely:

* A *pointer to a string constant* simply contains the address of the (first 
  item) in string constant, meaning that the code:
  
  ```c
  int main() {
    int *s = "hello";
    *s = 'x'; // This will segfault
  }
  ```
  
  Will cause a _segfault_ error since string constants in C are put in read-only
  memory.

* An *array to a string constant* however is simply a *character array* where 
  enough memory is allocated to hold each individual characters in the string
  constant which can then be individually manipulated:
  
  ```c
  int main() {
    int s[] = "hello";
    *s = 'y';
    printf("%s\n", s); // prints: 'yello'
  }
  ```
  
![String Pointer VS. Character Array](/images/figures/c/string-pointer-vs-character-array.png)

## Pointer Arrays; Pointer to Pointers; Multi-dimensional Arrays

Since pointers are variables these can also be set to a another pointer or 
even as an item to an array:

```c
int main() {
  int **pp;   // Pointer of a pointer
  int *pa[];  // Array of pointers
  int ma[][]; // Multi-dimensional arrays
}
```


## Command Line Arguments

The `main` function in C can take in two arguments:

* The number of arguments to the program: `argc`
* An array of strings provided as arguments to the program: `argv`

```c
int main(int argc, char *argv[]) {
  for (int i = 0; i < argc; i++) {
    printf("%s\n", argv[i]);
  }
}
```

Note that `argc` contains at least a value of `1` because C programs 
always contain the name of the program as the first argument, therefore 
`argv[0] == <name of the program>`.

## Pointers to Functions

Functions can be defined as arguments to other functions using function 
pointers which has the syntax:

```c
#include <stdio.h>

#define ARRAY_LENGTH(array) (sizeof(array)) / (sizeof(array[0]))

void map(int[], int (*callback)(int));
int square(int);

int main() {
  int numbers[] = { 1, 2, 3, 4, 5 };
  
  map(numbers, ARRAY_LENGTH(numbers), square);
  
  for (int i = 0; i < LEN(numbers); i++) {
    printf("%d\n", numbers[i]);
  }
}

int square(int item) {
  return item * item;
}

void map(int *nums, int size, int (*callback)(int)) {
  for (int i = 0; i < size; i++) {
    nums[i] = func(nums[i]);
  }
}
```

The `int (*callback)(int)` argument in the `map` function is a function pointer 
that has an `int` return type, can take in a single `int` argument, and can 
be executed by invoking its identifier `callback`.

## Void Pointers

A void pointer in C is a generic pointer type that is mostly used for pointer 
arguments in a function where the data type of the argument is not known.

Any pointer can be casted to a void pointer and back again without loss of information 
or an effect on the data representation.

```c
#include <stdio.h>

void print_things(void *data, char type) {
  switch (type) {
    case 's': {
      char *s = (char *)data;
      printf("%s\n", s);
      break;
    }

    case 'i': {
      int *i = (int *)data;
      printf("%d\n", i);
      break;
    }
  }
}

int main() {
  print_things("Hello world!", 's');
  int i = 1234;
  print_things(&i, 'i');
}
```

It should be noted that is illegal to derefence void pointers as they don't have any 
meaningful way to represent the data that they hold.

Consequently, indexing void pointers like so:

```c
void for_each(void *array) {
  int i = 0;
  // Error!
  array[i];
}
```

Is also illegal since semantically, `array[i]` here means the same as:

```c
*(array + i)
```

### Pointer arithmetic on void pointers

It should also be noted that doing pointer arithmetic to void pointers requires the size 
of a known type since `sizeof(void)` is undefined.

For example, the ff. is incorrect:

```c
#include <stdio.h>
#include <stddef.h>

#define SIZE(array) (sizeof(array))/(sizeof(array[0]))

void for_each(void *array, size_t array_length, void (*callback)(void *item));

void print_int(void *item);

int main() {
  int numbers[] = { 1, 2, 3, 4, 5 };
  for_each(numbers, SIZE(numbers), print_int);
  printf("\n");
  return 0;
}

void for_each(void *array, size_t array_length, void (*callback)(void *item)) {
  size_t i;
  for (i = 0; i < array_length; i++) {
    // Illegal.
    callback(array + i);
  }
}

void print_int(void *item) {
  // This will produce errors.
  printf("%d ", *(int *)item);
}
```

The issue on the previous example is because the `array` void pointer variable is being 
incremented with `i`. However, since `void` doesn't really have a size then the program 
won't really know how much size (bytes) to move the pointer.

To fix this, the `for_each` function needs to know about some size of a known type.

This way the program can move the void pointer to a valid location in memory when it is 
being used.

In this case:

```c
void for_each(void *array, size_t array_length, size_t item_size, void (*callback)(void *item)) {
  size_t i;
  for (i = 0; i < array_length; i++) {
    // Multiply the index to the size of the item.
    callback(array + (i * item_size));
  }
}
```

```c
// Give it the size of `int` in this case.
for_each(numbers, SIZE(numbers), sizeof(numbers[0]), print_int);
```
