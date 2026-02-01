---
title: 'Chapter 7: Input and Output'
description: Standard I/O functions in C
---

I/O allows interactions between a program and a user.

In C, the *standard input* or *stdin* is usually the keyboard 
and the *standard output* or *stdout* is usually the screen.

Standard input can also be provided to a program via the 
`<` and `|` redirection operators in the shell, similarly 
`>` redirects the output to some file.

```bash
$ prog1 < input.txt  # Use the contents of `input.txt` as the stdin for `prog1`
$ prog1 > output.txt # Redirect the output of `prog1` to `output.txt`
$ prog1 | prog2      # Pass the stdout of `prog1` as the stdin of `prog2`
```

## Standard I/O

The `getchar()` and `putchar()` functions are one of the most 
basic I/O libraries available in C.

`getchar()` simply reads a character at a time from 
*stdin* while `putchar()` puts the character to *stdout*.

```c
#include <stdio.h>

int main() {
  char c;
  while ((c = getchar()) != EOF) {
    putchar(c);
  }
}
```

If the above program were to be compiled and ran:

* By default the program uses the keyboard to read data 
  from if no input files were redirected to the program.

* If an input file was redirected to the program, then 
  that input file's contents will be read and outputed
  to the stdout.

## Formatted Output w/ `printf`

The function `printf` takes in a format string and 0 or 
more arguments to replace the placeholder objects in 
the format string.

There are two objects in the format string:

* Normal characters which printed as is.
* Conversion specification which is replaced by 
  the arguments after the format string.

Each conversion specification begins with a `%` and 
ends with a conversion character:

| Conversion Character | Printed As                                        |
|----------------------|---------------------------------------------------|
| `d`, `i`             | Integers                                          |
| `o`                  | Unsigned octal number (w/o leading zero)          |
| `x`, `X`             | Unsigned hex number (without leading `0x` or `0X` |
| `u`                  | Unsigned int                                      |
| `c`                  | Single chracter                                   |
| `s`                  | String                                            |
| `f`                  | double                                            |
| `p`                  | pointer                                           |

The conversion specification can also have optional infix characters:

* A minus sign that specifies the left adjustment of the converted argument.
* A number that specifices the minimum field width.
* A period that separates the field width from the precision.
* A number for the precision after the decimal point.
* An `h` if the integer is to be printed as `short`, or `l` if as a long.

## Variadic Functions

In C, *variadic* functions are functions that can have variable-length of 
arguments. One example is the `printf` function.

In order to define a variadic function we must:

1. Have at least 1 named argument.
2. At the end of the named argument list, the variadic-length arguments 
   keyword is used: `...`.
3. Declare a variable with the `va_list` type.
4. Initialize the variable-length argument list by using the `va_start` 
   macro which takes in a `va_list` value and the last named argument.
5. Iterate through the variable-length argument list by using `va_arg` 
   macro which takes in a `va_list` value and a type.
6. Cleanup using `va_end`.

```c
#include <stdarg.h>
#include <stdio.h>

void test(int, ...);

int main() {
  test(3, 5, 7, 1);
}

void test(int count, ...) {
  va_list args;

  va_start(args, count);
  while (count--) {
    printf("%d\n", va_arg(args, int));
  }
  va_end(args);
}
```

## File Access

In order to access files in C programs one can use the `fopen()` and
`fclose()` functions.

`fopen()` takes in the path to a file as well as the *mode* or the intent 
to be done on that given file and returns a `FILE` pointer.

There are three modes available when *opening* a file:

* Reading (`r`): Reads a file. If the given file is non-existent, then 
  `fopen()` returns a `NULL` pointer.
* Writing (`w`): Writes to a file. If the given file is non-existent, then 
  that file is created, otherwise the file is overwritten.
* Appending (`a`): Appends to a file. If the given file is non-existent, then 
  that file is created, otherwise contents are appended to the end of the file.

`fclose()` simply signals that a file needs to be closed and cleanup 
has to be done.

To read/print characters at a time from a `FILE` the `getc()` and `putc()` 
functions can be used where:

* `getc()` takes in a `FILE` pointer and returns a character one at a 
  time including `EOF`.
* `putc()` takes in a character as well as a `FILE` pointer to *print* to.

When C programs are ran, the OS typically *opens* or assigns three files 
to it that the program can use. These files are: `stdin`, `stdout`, and `stderr`.

With all these preliminaries, we can now write a program that prints 
its contents to `stdout`.

```c
#include <stdio.h>

int main(int argc, char **argv) {
  if (argc == 1) {
    printf("Usage: %s <filename>\n", argv[0]);
    return 1;
  }
  
  FILE *fp = fopen(argv[1], "r");
  
  if (fp == NULL) {
    printf("File does not exists: %s\n", argv[1]);
    return 1;
  }
  
  char c;
  while ((c = getc(fp)) != EOF) {
    putc(c, stdout);
  }
  
  fclose(fp);
  
  return 0;
}
```

## Error Handling

Instead of printing error outputs to `stdout`, we can print the 
error to `stderr` instead using `fprintf()` which takes in a 
file stream, the format string, and then the variable-length 
arguments:

```c
#include <stdio.h>

int main(int argc, char **argv) {
  if (argc == 1) {
    printf("Usage: %s <filename>\n", argv[0]);
    return 1;
  }
  
  FILE *fp = fopen(argv[1], "r");
  
  if (fp == NULL) {
    fprintf(stderr, "File does not exists: %s\n", argv[1]);
    return 1;
  }
  
  char c;
  while ((c = getc(fp)) != EOF) {
    putc(c, stdout);
  }
  
  fclose(fp);
  
  return 0;
}
```

The `errno` global variable can also be used to receive the latest 
error code from a given system call. This can also be used along 
with `strerror` to get the error message of a given error code:

```c
fprintf(stderr, "code: %d message: %s\n", errno, strerror(errno));
```

Another error handling function is the `ferror()` function which 
returns a non-zero integer if an error occured in some file 
stream.

```c
int ferror(FILE *fp);
```

This is useful for checking if, for example, the disk is full 
and can no longer take in additional data.

To learn more about error handling in C read [GNU: Checking for errors.](https://www.gnu.org/software/libc/manual/html_node/Checking-for-Errors.html)

## Line I/O

Another useful function for I/O is the `fgets()` and `fputs()` 
functions.

`fgets()` returns a `char` pointer and takes in a `char` pointer, 
the maximum number of characters in the line, and a file pointer.

```c
char *fgets(char *line, int max_line, FILE *fp);
```

`fputs()` on the other hand prints a `char` pointer to some file 
pointer and returns an `EOF` if an error occurs, non-negative 
otherwise.

```c
int fputs(char *line, FILE *fp);
```

## Storage Management

In C, there are two ways to dynmically allocate memory, namely 
these are: `malloc()` and `calloc()`.

`malloc()` takes in the number of *block* sizes and returns a 
pointer to the beginning of the allocated memory size or 
`NULL` if there isn't enough memory to allocate for the 
given block size.

```c
void *malloc(size_t block_size);
```

`calloc()` on the other hand takes in the byte size and a 
multiple of that byte size. Similar to `malloc()`, `NULL` is
returned if there isn't enough memory to allocate for the 
given block size

```c
void *calloc(size_t bytes, size_t block_size);
```

The difference between `malloc()` and `calloc()` is that 
`malloc()` initializes each block with a `NULL` while 
`calloc()` initializes each block with a `0`.

A given allocated memory can also be increased or decreased 
using the `realloc()` function which takes in the memory pointer 
and the new memory size.

```c
void *realloc(void *mp, size_t block_size);
```

It is also important to free up memory when it is no longer used. 
To do this, the function `free()` is available which just takes in 
a memory pointer.

```c
void free(void *mp);
```
