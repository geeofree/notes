---
title: "Chapter 3: Pointers, Structs, and Data Structures"
description: "Pointers, structs, arrays, slices, and maps"
---

# Go Pointers

Go has pointers. A pointer holds the memory address of a variable.

The type `*T` is a pointer value to type `T`. Its zero value is `nil`.

```go
var p *int
```

The `&` is the address-of operator. This operator generates the memory address of 
its operand:

```go
n := 10
s = &n // s is an int pointer pointing to the address of n.
```

The `*` operator dereferences the value of the provided pointer:

```go
n := 10
s = &n

fmt.Println(*s) // Prints: 10

*s = 31

fmt.Println(*s) // Prints: 31

fmt.Println(n) // Prints: 31
```

> Unlike C, Go has no pointer arithmetic!

# Structs

A struct is a collection of fields.

Fields are accessed using the `.` operator.

```go
package main

import (
  "fmt"
)

type Player struct {
  name string
  health int
}

func main() {
  player := Player{"Lexie", 100}
  player.health -= 10
  fmt.Println(player.name, player.health)
}
```

## Struct Pointers

Struct fields can be accessed to struct pointers.

To access fields in a struct pointer, we may use `(*pPointer).field`.

However, this can be simplified by just invoking `pPointer.field`.

```go
package main

import (
  "fmt"
)

type Player struct {
  name string
  health int
}

func main() {
  player := Player{"Lexie", 100}
  
  pPlayer := &player
  
  pPlayer.health -= 10
  
  fmt.Println(pPlayer.name, pPlayer.health)
  fmt.Println(player.name, player.health)
}
```

## Struct Literals

A struct literal denotes a newly allocated struct value by listing the values of its fields.

We can list just a subset of fields by using the `Name:` syntax. (The order of named fields is irrelevant.) 

```go
package main

import "fmt"

type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)

func main() {
	fmt.Println(v1, p, v2, v3)
}
```

# Arrays

An array is a fixed size list of items denoted by the syntax:

```go
[n]T
```

Where `n` is the number of elements in the array while `T` is the type of 
elements in the array.

## Slices

Slices are dynamic arrays and have the same syntax as arrays but without the 
`n` or number of elements defined:

```go
[]T
```

To define a slice to an array we use the syntax:

```go
[low:high]
```

Where `low` is the starting index of the slice from the array and `high` is the 
excluded ending index point.

Slices are like references to arrays: they modify the underlying array that they 
reference from:

```go
package main

import "fmt"

func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}

```

### Slice length and capacity

A slice has both `length` and `capacity`:

The `length` of a slice is the number of elements it contains.

The `capacity` of a slice is the number of elements in the underlying 
array, counting from the first element in the slice. 

```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s)

	// Extend its length.
	s = s[:4]
	printSlice(s)

	// Drop its first two values.
	s = s[2:]
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

### `nil` slices

The zero value of a slice is `nil`.

### Appending to a slice using `append()`

To append new items to a slice we use the builtin `append()` function:

```go
package main

import "fmt"

func main() {
	var s []int
	printSlice(s)

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s)

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s)

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

## Range

The `range` form of the `for` loop iterates over a `slice` or `map`. 

When ranging over a slice, two values are returned for each iteration.
The first is the index, and the second is a copy of the element at that index.

```go
package main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}
}
```

# Maps

A map maps keys to values.

The zero value of a map is `nil`. A `nil` map has no keys, nor can keys be added.

The `make` function returns a map of the given type, initialized and ready for use. 

```go
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])
}
```

## Map Literals

Map literals are like struct literals, but the keys are required.

```go
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

func main() {
	fmt.Println(m)
}
```

If the top-level type is just a type name, we can omit it from 
the elements of the literal. 

```go
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": { 40.68433, -74.39967 },
	"Google": { 37.42202, -122.08408 },
}

func main() {
	fmt.Println(m)
}
```

## Mutating Maps

To insert or update an element in a map:

```go
m[key] = "some value"
```

To read a value in a map:

```go
s = m[key]
```

To delete an element:

```go
delete(m[key])
```

To test that a key exists, we use a tuple assignment where the first 
position is the value and the second position determines whether or not 
the value for a key exists:

```go
elem, ok := m[key]
```

If the key is not present in the map then `elem` will be the zero value of 
the type of the map's value.

# Function Values

Functions are values too. They can be passed around just like other values.

Function values may be used as function arguments and return values.

```go
package main

import (
	"fmt"
	"math"
)

func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
}
```

## Function Closures

A function closure is a function that holds references to variables outside of its 
scope/statement body.

```go
package main

import "fmt"

func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}
```
