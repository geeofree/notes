---
title: 'Chapter 1: C Basics'
description: History and basic syntax of C.
---

C is a general purpose programming language designed and developed by 
[Dennis M. Ritchie](https://en.wikipedia.org/wiki/Dennis_Ritchie) et al. in the early 1970's at Bell Labs and is a 
successor to the B language (also developed by Dennis Ritchie).

C is a widely used language in a lot of systems or embedded programming 
areas and can compile to machine code that can run in a lot of different 
computer architectures.

## Hello World

Given the file `hello-world.c` with the ff. contents:

```c
#include <stdio.h>

int main() {
  printf("Hello world!\n");
}
```

All programs in C must contain at most one `main()` function which will 
serve as the entry point of all execution.

The very first line: `#include <stdio.h>` describes that the standard I/O 
library is to be included in the program in which case provides `printf()` 
among other things.

To run the C program it needs to be compiled, for example using [gcc](https://gcc.gnu.org/) which 
should generate an executable:

```bash
# Compile the program
gcc ./hello-world.c
# Run the executable
./a.out
```

> By default `gcc` will compile the program as `a.out`, if one wants to use a different 
> name for the executable use the `-o` flag followed by the desired name:
> ```bash
> gcc <your-c-file> -o <executable-name>
> ```

If no errors come up the program should output `Hello world!`.

#### About `printf()`

As stated `printf()` is a function provided from the standard I/O library: `stdio.h` 
which _prints_ output to some terminal device.

The first argument is a _string_ of characters that may contain special symbols that 
can be _replaced_ or provide special meaning such as `\n` (new line) and `\t` (tab).

Placeholder symbols start with the character `%` and denotes to `printf()` that it
should substitute it to whatever value is put in the second or so places of 
arguments in the function call, for example:

```c
#include <stdio.h>

int main() {
  printf("The number %d", 5);
}
```

Here, the `%d` is a placeholder symbol that will print an integer (in this case `5`).

The number of placeholder symbols in the first argument of `printf()` should have 
the same corresponding number of values to be replaced with and must also have the 
same type ie a `%d` should receive an integer value.

Other placeholder symbols are as follows:

| Symbol | Description          |
|--------|----------------------|
| `%d`   | Integer              |
| `%f`   | Floats/double        |
| `%c`   | Character            |
| `%s`   | String of characters |

## Declarations

#### Variables

Variables are defined by providing a _type_ and then the identifier for that variable,
for example:

```c
int main() {
  int my_number = 0;
}
```

Defines a variable `my_number` with a type `int` and assigns it with a value `0`.

#### Symbolic Constants

Symbolic Constants define symbols that are replaced when the program is compiled:

```c
#include <stdio.h>

#define PI 3.14

int main() {
  printf("π equal %d", PI);
}
```

## Control Flow

C provides common control flow statements such as `if/else if/else`, `while/do while`, 
`for`, and `switch case`.

## Functions

A function in C is defined by first declaring the return type then the identifier of 
the function, and then parameters, and lastly the function body:

```c
#include <stdio.h>

int square(int n) {
  return n * n;
}

int main() {
  printf("2^2 = %d", square(2));
}
```

## Basic I/O

The standard I/O library also provides a way to read inputs such as getting a character 
from the user and printing that character, these are `getchar()` and `putchar()` respectively.

```c
#include <stdio.h>

int main() {
  int c = getchar();
  putchar(c);
}
```

In this example:

1. `int c = getchar()` will wait for an character input from the user and once this is fulfilled
   will assign the value to the variable `c`. Note that `getchar()` returns the integer value of
   the character.
2. `putchar(c)` will just print the character of whatever value `c` is.

## Arrays

Arrays are notations that provide a sequence of data:

```c
int main() {
  char s[5];
}
```

In this example, `s` is a `char array` that can contain at most `5` items in it.

## Sharing definitions using `extern`

To share definitions to other C files or to just provide a globally accessible definition use 
the `extern` keyword to that definition.
