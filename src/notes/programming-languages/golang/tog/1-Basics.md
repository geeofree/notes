---
title: "Chapter 1: Basics"
description: "Packages, modules, and declarations."
---

# Packages

Every Go program is made up of packages.

> More formally: Go programs are constructed by linking together _packages_.
> 
> A Package is constructed from one or more source files (files that end in `.go`) 
> that together, declare constants, types, variables, and functions belonging to 
> the package and which are accessible in all files of the same package.
> 
> Those elements may be exported and used in another package.
> 
> See: https://go.dev/ref/spec#Packages

Programs start in the package `main`

```go
package main

import (
  "fmt"
  "math/rand"
)

func main() {
  fmt.Println("My favorite number is: ", rand.Intn(10))
}
```

By convention, the package name is the same name as the last element of the import path.

For instance, the `math/rand` package comprises files that begin with the statement 
`package rand`.

## Imports

This code groups the imports into a parenthesized, "factored" import statement.

```go
package main

import (
  "fmt"
  "math"
)

func main() {
  fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
}
```

## Exported Names

In Go, names are exported if it starts with a capital letter.

```go
package mymath

func Add(a int, b int) int {
  return a + b
}

func Sub(a int, b int) int {
  return a - b
}

func Mul(a int, b int) int {
  return a * b
}

func Div(a int, b int) int {
  return a / b
}

// Will not be exported
var pi = 3.14
```

# Declarations

See: https://go.dev/blog/gos-declaration-syntax

## Functions

See: https://go.dev/ref/spec#Function_declarations

## Variables

The `var` statement declares a list of variables.

See: https://go.dev/ref/spec#Variable_declarations

### Short Variable Declarations

We can omit the use of the `var` keyword to declare variables inside of functions by 
using the `:=` variable shorthand.

See: https://go.dev/ref/spec#Short_variable_declarations

## Constants

Constants are declared the same as variables but using the `const` keyword instead of 
`var`.

## Types

See: https://go.dev/ref/spec#Types

## Zero Values

Variables declared without an explicit initial value are given their zero value.

The zero value is:

- `0` for numeric types
- `false` for boolean types
- `""` for strings

See: https://go.dev/ref/spec#The_zero_value
