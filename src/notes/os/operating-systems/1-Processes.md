---
title: "Chapter 1: Processes"
description: "Processes and Threads"
---

# Processes
A process is an instance of a program in runtime.

## Multiprogramming
Multiprogramming is a technique that Operating Systems provide that makes the CPU switch 
between different processes to simulate concurrency.

## Process Creation
General-purpose systems need some form of process creation and termination during its 
operation.

The ff. are $4$ important events that causes processes to be created:
1. During system initialization.
2. Execution of a process-create system call by a running process.
3. A user request to create a new process.
4. Initiation of a batch job.

In UNIX, the `fork` system call creates a clone of the calling process.

The _forked_ process is called the **child process** while the process that called `fork` 
is the **parent process**.

The parent and child processes shares the state of the parent process.

## Process Termination
As processes get started they also must be terminated. Usually termination occurs in 
the ff. conditions:

1. Normal exit (voluntary)
2. Error exit (voluntary)
3. Fata error (involuntary)
4. Killed by another process (involuntary)

In UNIX, the `exit` system call is used to tell the Operating System that the process is 
going to be terminated.

There is also the `kill` system call in UNIX that terminates another process.

## Process Hierarchies
In UNIX, when the computer is booted, a special process called **init** is present in the 
boot image.

When it starts running, it reads a file telling it how many terminals there. Then it forks 
off a new process per terminal.

These processes wait for someone to login, and, if successful, the login process executes 
a shell to accept commands.

These commands may start up more processes and so forth.

Thus, all processes in the whole system belong to a single tree, with **init** at the root.

## Process States
A process can be in three states:

1. Running - actually using the CPU at that instance.
2. Ready - runnable; temporarily stopped to let another process run.
3. Blocked - unable to run until some external event happens.

![Figure 1: Process States](/images/figures/os/process-states.png)

There are $4$ transitions for each process state:
1. Transition $1$ occurs when the OS discovers that a process cannot continue right now.
2. Transition $2$ when the scheduler picks another process to run.
3. Transition $3$ occurs when the scheduler picks this process to run.
4. Transition $4$ occurs when the event that a process was waiting for has become available.

## Process Tables
The **process table** (sometimes called the **process control blocks**) is an array of 
structures that contains important information about the process' state.

## Interrupt Vector
The **interrupt vector** contains the address of the interrupt service procedure which the 
CPU switches to when an interrupt occurs.

# Threads

A **thread** is a unit of work within a process. Processes can have $1$ or more threads 
that can help it do its job.

Threads share the same address space as its controlling process and are independent from 
one another (ie. they each have their separate state such as registers and stack).

Each thread in a process gets run the same way processes gets ran by the CPU: switching 
between each of them, albeit in a much slower manner.

| Per-process items           | Per-thread items |
|-----------------------------|------------------|
| Address space               | Program counter  |
| Global variables            | Registers        |
| Open files                  | Stack            |
| Child processes             | State            |
| Pending alarms              |                  |
| Signals and signal handlers |                  |
| Accounting information      |                  |

> The difference between a child process and a thread is that a child process **inherits**
> (or gets a copy) of the process' state but **they do not share**, whilst a thread **shares** 
> some of the state of the process.

## POSIX Threads
POSIX threads or **pthreads** is a portable, standard definition for threads.

The ff. are calls that can be done for basic thread handling:

| Thread Call            | Description                                          |
|------------------------|------------------------------------------------------|
| `pthread_create`       | Create a new thread                                  |
| `pthread_exit`         | Terminate the calling thread                         |
| `pthread_join`         | Wait for a specific thread to exit                   |
| `pthread_yield`        | Release the CPU to let another thread run            |
| `pthread_attr_init`    | Create and initialize a thread's attribute structure |
| `pthread_attr_destroy` | Remove a thread's attribute structure                |

## User, Kernel, and Hybrid Threads
Threads are implemented either on the user-space, on the kernel-space, or in both.

### User-Space Threads (Green Threads)
User-space threads (or sometimes called **green threads**) are implemented with a 
run-time which is a collection of procedures that manages threads.

When threads are managed in user-space, each process needs its own **thread table** which 
is similar to the process table, except that it keeps track of only the per-thread 
properties (ie. registers, stacks, program counter, etc.).

The scheduling, thread table, thread states are managed by the run-time system.

The ff. are advantages and disadvantages of user-space threads:

#### Advantages
- User level threads can be used on operating systems that do not support them
- User level threads can be implemented with a custom scheduling algorithm
- No system calls needed as only user-level procedures are required to manage the 
  threads.

#### Disadvantages
- A thread making a blocking system call will halt all the threads in the thread table.
- Cannot be used in multi-processor systems.
- No clock-interrupts that hand over the processing to the run-time system.

### Kernel-Space Threads (Native Threads)
Kernel-space threads (or **native threads**) are implemented within the operating system. 

In this type of thread, the kernel maintains the thread table.

When a thread creates or destroys a thread it makes a system call.

#### Advantages
- Scheduling is managed by the kernel
- Can be used in multi-processor systems.
- A blocking system call will not halt all the threads in the thread table.

#### Disadvantages
- Slower

# Interprocess Communication (IPC)
Interprocess Communication is the mechanism that allows two or more processes to 
communicate with one another.

## Race Conditions
Race conditions are situations in which two or more processes are reading or writing to 
some shared data and the final result depends on who runs precisely when.

## Critical Regions
A part of the program where shared memory is accessed.

## Mutual Exclusion
A concurrency control mechanism that only allows processes to access shared data one at 
a time.

### Techniques for achieving Mutual Exclusion

#### Disabling Interrupts
Disabling interrupts in guarantees that the process never gets descheduled and be 
abruptly stopped before it reads/writes to its critical region.

**Problems**
- Dangerous as giving the process control over interrupts can lead to processes being 
  programmed to never give up CPU time.

- Only works on single CPU environments. Multiprocessor machines will still be able to 
  interact with some process' critical region.

#### Lock Variables
**Locks variables** are shared variables between two or more processes that checks if a 
critical region is being accessed by looking at a value of variable: `0` means the 
no processes are using the critical region, `1` that a process is using the critical 
region.

**Problems**
- Processes getting descheduled will still have the original problem of race conditions 
  as it is still possible for a process to be descheduled before it writes to the lock 
  variable.

#### Spin Locks (Busy Waiting)
A **spin lock** is a variable that gets checked and, if true, continuously loops rendering 
other processes to be unable to access the critical region.

```c
void process_a() {
  while (1) {
    while (turn != 0); // Continuously loop when something is still accessing the critical region.
    critical_region();
    turn = 1;
  }
}

void process_b() {
  while (1) {
    while (turn != 1); // another spin lock.
    critical_region();
    turn = 0;
  }
}
```

**Problems**
- CPU intensive.
- Can block other processes despite them not being in their critical region.

#### Peterson's Solution
[Watch this video.](https://www.youtube.com/watch?v=QAzuAn3nFGo)

#### Semaphores
A semaphore is a non-negative variable shared between processes (or threads) and is only 
accessible through its atomic operations: `down()` and `up()` which decrements and 
increments the semaphore variable respectively.

> In order for the semaphore operations to be atomic, they have to be implemented as a 
> syscall that disables interrupts momentarily while they are executing.

#### Mutexes
A **mutex** is a shared variable that can be in one of two states: unlocked or locked.

When a thread or process needs access to a critical region, it calls `mutex_lock`.

If the mutex is already locked, the calling thread or process is blocked until the thread 
or process in the critical region is finished and calls `mutex_unlock`.

If multiple threads or processes are blocked on the mutex, one of them is chosen at random 
and allowed to acquire the lock.

> A mutex can be easily implemented in user space provided that machine-level instructions 
> for locks (ie. `TSL` or `XCHG`) are available.

#### Monitors
A **monitor** is a collection of procedures, variables, and data structures that are all 
grouped together in a special kind of module or package.

> Monitors are a **programming language** concept.

#### Avoiding Locks (Read-Copy-Update)
**Read-Copy-Update** (RCU) is a lock-free synchronization mechanism.

This works by ensuring that threads or processes read or write either an old or new 
version of the data, but not both.

> Read more of this in [Wikipedia](https://en.wikipedia.org/wiki/Read-copy-update).
