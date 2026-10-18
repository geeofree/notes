---
title: "Chapter 4: Methods and Interfaces"
description: "Methods and interfaces"
---

# Methods

Go does not have classes. However, we can define methods on types.

A method is a function with a special _receiver_ argument.

The receiver appears in its own argument list between the `func` keyword and the method name. 

```go
package main

import (
  "fmt"
  "math"
)

type Vertex struct {
  X, Y float64
}

func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X * v.X + v.Y * v.Y)
}

func main() {
  v := Vertex{ X: 3, Y: 4 }
  fmt.Println(v.Abs())
}
```

## Methods are just functions

A method is just a function with a receiver argument.

Here's `Abs` written as a regular function with the same functionality:

```go
package main

import (
  "fmt"
  "math"
)

type Vertex struct {
  X, Y float64
}

func Abs(v Vertex) float64 {
  return math.Sqrt(v.X * v.X + v.Y * v.Y)
}

func main() {
  v := Vertex{ X: 3, Y: 4 }
  fmt.Println(Abs(v))
}
```

## Non-Struct Method Types

We can declare methods on non-struct types as well.

```go
package main

type MyFloat float64

func (mf MyFloat) Abs() float64 {
  if mf < 0 {
    return float64(-mf)
  }
  return float64(mf)
}
```

We can only declare a method with a receiver whose type is defined in the same package 
as the method.

We cannot declare a method with a receiver whose type is defined in another package 
(which includes the built-in types such as `int`).

```go
// This throws a compiler error
func (i int) MyMethod() { ... }

// The correct way: create a local type of the int
// built-in type.
type MyInt int
func (i MyInt) MyMethod() { ... }
```

> What is strictly forbidden?
> 
> We cannot add methods to:
> 1. Built-in primitives directly (e.g., `int`, `string`, `float64`, `map[string]int`).
> 2. Types imported from standard library packages (e.g., `time.Time`, `net.URL`, `os.File`).
> 3. Types imported from third-party packages (e.g., a struct from a GitHub library).
> 4. Unnamed/Anonymous types directly (e.g., you cannot write a receiver like `func (r struct{Name string}) MyMethod()`).

## Pointer Receivers

We can declare pointers to receivers which allows us to reference the receiver instead of 
making a copy of it:

```go
package main

import (
  "fmt"
  "math"
)

type Vertex struct {
  X, Y float64
}

func (v *Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
  v := Vertex{ X: 1, Y: 2 }
  v.Scale(10)
  fmt.Println(v.Abs())
}
```

# Interfaces

An interface in go is a set of method signatures.

An interface can be set to a value if that value implements the methods 
defined in the given interface.

```go
package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat implements Abser
	a = &v // a *Vertex implements Abser

	// In the following line, v is a Vertex (not *Vertex)
	// and does NOT implement Abser.
	a = v

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```

## Interface with `nil` values

If the concrete value inside the interface itself is nil, the 
method will be called with a nil receiver. 

```go
package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}

func main() {
	var i I

	var t *T
	i = t
	describe(i)
	i.M()

	i = &T{"hello"}
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

Calling a method on a `nil` interface is a run-time error (SEGFAULT).

## Empty Interfaces (`any`)

The interface type that specifies zero methods is known as the empty interface:

```go
interface{}
```

The empty interface can be defined to any type as any type implements at least zero 
methods.

`any` is an alias for `interface{}`.

# Type Assertions

A _type assertion_ provides access to an interface's underlying concrete value:

```go
t := i.(T)
```

This statement asserts that for the given `i` interface value, it holds the concrete type `T` 
and assigns the underlying `T` value to the variable `t`.

If `T` does not exist in `i`, this will trigger a panic.

To _test_ whether an interface value has a concrete type, the type assertion can return two values: 
the underlying value and a boolean value that reports whether the concrete type exists in the 
given interface:

```go
t, ok := i.(T)
```

If `i` holds `T`, then `ok` will be true, `false` otherwise and `t` will be the zero value of type 
`T`, and no panic occurs.

```go
package main

import "fmt"

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)

	s, ok := i.(string)
	fmt.Println(s, ok)

	f, ok := i.(float64)
	fmt.Println(f, ok)

	f = i.(float64) // panic
	fmt.Println(f)
}
```

## Type Switches

A type switch is a construct that permits several type assertions in series.

A type switch is like a regular switch statement, but the cases in a type switch 
specify types (not values), and those values are compared against the type of the 
value held by the given interface value. 

```go
switch v := i.(type) {
  case T:
      // here v has type T
  case S:
      // here v has type S
  default:
      // no match; here v has the same type as i
}
```

The declaration in a type switch has the same syntax as a type assertion `i.(T)`, 
but the specific type `T` is replaced with the keyword `type`.

```go
package main

import "fmt"

func do(i interface{}) {
	switch v := i.(type) {
    case int:
      fmt.Printf("Twice %v is %v\n", v, v*2)
    case string:
      fmt.Printf("%q is %v bytes long\n", v, len(v))
    default:
      fmt.Printf("I don't know about type %T!\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}
```

# Stringers: `string` representation of a type

A `Stringer` is a type that can describe itself as a string.

In order to define a type as a string we implement the `Stringer` interface:

```go
type Stringer interface {
  String() string
}
```

For example:

```go
package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a, z)
}
```

# Errors

Go programs express error state with `error` values.

The `error` type is a built-in interface similar to `fmt.Stringer`:

```go
type error interface {
  Error() string
}
```

```go
package main

import (
	"fmt"
	"time"
)

type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s",
		e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func main() {
	if err := run(); err != nil {
		fmt.Println(err)
	}
}
```
