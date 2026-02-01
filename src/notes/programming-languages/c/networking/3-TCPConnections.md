---
title: "Chapter 3: In-Depth Overview of TCP Connections"
description: "All about TCP Connections."
---

# Multiplexing TCP Connections
Socket APIs are blocking by default. This means we need to add some facilities to make 
them work with multiple concurrent connections to have a smooth user experience.

## Polling Non-Blocking Sockets
It is possible to configure sockets to use a non-blocking operation. One way to do this is 
by using the `fcntl()` system call with the `O_NONBLOCK` flag, although other ways also exists.

Once in non-blocking mode, a call to `recv()` with no data will return immediately.

**Polling** is the act of continuously running a function over a set of time. This usually 
wastes resources as most of the time there is no data to be read or write.

## Forking and Multithreading
Forking creates a new thread or process that handles a block of execution. This can be 
used to service multiple clients in a socket connection as they only block the thread or 
process that they're servicing.

This is useful but has some downsides:
- Threading is hard, especially if connections share any state between them.
- It is not portable as Operating Systems provide different APIs for this feature.

## The `select()` function
The `select()` function receives a set of sockets and tells which ones are ready to be 
read.

It can also tell which sockets are ready to write to and which sockets have 
exceptions.

This is also portable.

### Synchronous multiplexing with `select()`
The `select()` function has several useful features.

Given a set of sockets, it can be used to block until any of the sockets in that set is 
ready to be read from.

It can also be configured to return if a socket is ready to be written to or if a socket 
has an error.

Additionally, `select()` can be configured to return after a specified time if none of these 
events take place.

| For more info, open the man page: `man select`
