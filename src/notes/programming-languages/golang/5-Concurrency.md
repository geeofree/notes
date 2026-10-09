---
title: "Chapter 5: Concurrency"
description: "Concurrency primitives: goroutines, channels, selections, and mutex"
---

# Goroutines

A `go` routine is a green thread managed by the Go runtime.

```go
// Run the `f` function in a Goroutine
go f(x, y, z)
```

Goroutines run in the same address space, so access to shared memory must be 
synchronized. The `sync` package provides useful primitives.

```go
package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

## Channels

Channels are a typed conduit to which we can send and receive values with the channel 
operator `<-`.

```go
c <- v   // Send a value to the channel `c`
v := <-c // Receive a value from the channel `c` and assign it to `v`
```

Like maps and slices, channels must be created before use:

```go
make(chan T) // Create a channel that can send and receive a value with type `T`
```

```go
package main

import "fmt"

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
```

## Buffered Channels

A channel can be _buffered_ by providing the buffer length during channel creation:

```go
make(chan T, int)
```

A buffered channel will block if:

- The buffered channel is full when sending
- The buffered channel is empty when receiving

```go
package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
```

## `range` and `close()`

A sender can close a channel by invoking `close(chan)`.

A closed channel indicates that there are no more values to be received.

A receiver can check if the channel was closed by assigning a second parameter 
to the return value of `close()`:

```go
v, ok := <-c
```

If `ok` is `false`, there are no more values to receive and the channel is closed.

The loop `for v := range c` iterates over a channel `c` until it is closed.

> **NOTE** Sending on a closed channel will cause a panic.

```go
package main

import (
	"fmt"
)

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```

## The `select` statement

The `select` statement lets a goroutine wait on multiple communication operations.

A `select` blocks until one of its cases can run, then it executes that case.
It chooses one at random if multiple are ready. 

```go
package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
```

### Default Selection

The `default` case in the `select` statement is ran if no other case is ready.

Use a `default` case to try a send or receive without blocking:

```go
select {
case i := <-c:
  // use ei
default:
  // receiving from c would block
}
```

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	elapsed := func() time.Duration {
		return time.Since(start).Round(time.Millisecond)
	}
	for {
		select {
		case <-tick:
			fmt.Printf("[%6s] tick.\n", elapsed())
		case <-boom:
			fmt.Printf("[%6s] BOOM!\n", elapsed())
			return
		default:
			fmt.Printf("[%6s]     .\n", elapsed())
			time.Sleep(50 * time.Millisecond)
		}
	}
}
```

# `sync.Mutex`

Mutual exclusion in Go can be achieved by using the `sync.Mutex` interface and its methods:

```go
Lock
Unlock
```

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mu.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mu.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
```
