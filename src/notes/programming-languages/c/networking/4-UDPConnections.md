---
title: "Chapter 4: Establishing UDP Connections"
description: "How to send and receive User Datagram Protocol packets."
---

# How UDP sockets differ
- It uses the `SOCK_DGRAM` socket type.
- Using `connect()` can be optional with the use of `sendto()` and `recvfrom()`.
- Sockets in TCP requires managing a socket for each peer connection while UDP needs only 
  $1$ socket to communicate with any number of peers.
- `listen()` and `accept()` are not required in UDP since it only needs to bind to a local 
  address which can then immediately send and receive data.

## UDP Client Flow

### With `connect()`
1. `getaddrinfo()`
2. `socket()`
3. `connect()`
4. `send()`
5. `recv()`
6. `close()`

### Without `connect()`
1. `getaddrinfo()`
2. `socket()`
3. `sendto()`
4. `recvfrom()`
5. `close()`

## UDP Server Flow
1. `getaddrinfo()`
2. `socket()`
3. `bind()`
4. `sendto()`
5. `recvfrom()`
6. `close()`
