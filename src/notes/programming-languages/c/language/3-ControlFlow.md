---
title: 'Chapter 3: Control Flow'
description: Control flow constructs in C.
---

## If Statements

C provides the `if`, `if-else`, `if-elseif`, and `if-elseif-else` basic control flow expressions.

```c
if (/** condition */) {
  /** statement(s) */
} else if (/** condition */) {
  /** statement(s) */
} else {
  /** statement(s) */
}
```

## Switch Statements

```c
switch (/** expression */) {
  case /** const-expression */:
    /** statement(s) */;
    break;
  case /** const-expression */:
    /** statement(s) */;
    break;
  default:
    /** statement(s) */;
    break;
}
```

## Loops

```c
for (/** initializer */; /** condition */; /** accumulator */) {
  /** statement(s) */
}
```

```c
while (/** condition */) {
  /** statement(s) */
}
```

```c
do {
  /** statement(s) */
} while (/** condition */);
```
