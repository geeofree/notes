---
title: "Chapter 2: Control Flow"
description: "Control flow statements."
---

# The `for` Loop

Go has only one looping construct: the `for` loop.

The basic `for` loop has three (3) components separated by a semicolon:

```go
package main

import (
  "fmt"
)

func main() {
  sum := 0
  for i := 0; i < 10; i++ {
    sum += i
  }
  fmt.Println(sum)
}
```

The init and post statements are optional:

```go
package main

import (
  "fmt"
)

func main() {
  sum := 1
  for ; sum < 1000 ; {
    sum += sum
  }
  fmt.Println(sum)
}
```

Dropping all the semicolons makes it look like a `while` loop:

```go
package main

import (
  "fmt"
)

func main() {
  sum := 1
  for sum < 1000 {
    sum += sum
  }
  fmt.Println(sum)
}
```

Dropping all the components makes it an infinite loop:

```go
package main

func main() {
  // This...
	for {
	}
  
  // ...is similar to this:
  for true {
  }
}
```

# The `if` statement

See: https://go.dev/ref/spec#If_statements

# The `switch` statement

See: https://go.dev/ref/spec#Switch_statements

# The `defer` statement

A defer statement defers the execution of a function until the surrounding 
function returns. 

```go
package main

import (
  "fmt"
)

func main() {
  defer fmt.Println("world")
  fmt.Println("hello")
}
```

Deferred functions are put onto a LIFO stack.

See: https://go.dev/ref/spec#Defer_statements
