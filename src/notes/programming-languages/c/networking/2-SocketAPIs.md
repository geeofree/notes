---
title: "Chapter 2: Getting Started with Socket APIs"
description: "Getting to Grips with Socket APIs."
---

# Sockets
A socket is one endpoint of a communication link between systems.

An application sends and receives all of its network data through a socket.

Historically, sockets were used for **inter-process communication (IPC)** as well as various 
network protocols.

## Types of Sockets
There are two types of sockets: **connection-oriented** and **connectionless**.

TCP is a connection-oriented protocol while UDP is a connectionless protocol.

In a connectionless protocol, such as UDP, each datagram is addressed individually. From 
the protocol's perspective, each datagram is completely independent and unrelated to any 
packets coming before or after it.

UDP makes no guarantee that a packet will arrive nor will it guarantee the order that they 
were sent in.

A reliable connection such as TCP guarantees that packets will arrive and are in order.

## Socket Functions
The ff. are common socket functions:

- `socket()` - creates and initializes a new socket.
- `bind()` - associates a socket with a particular local IP address and port number.
- `listen()` - is used on the server to cause a TCP socket to listen for new connections.
- `connect()` - is used on the client to set the remote address and port. In the case of 
  TCP, it also establishes a connection.
- `accept()` - is used on the server to create a new socket for an incoming TCP connection.
- `send` and `recv()` - are used to send and receive data with a socket.
- `sendto()` and `recvfrom()` - are used to send and receve data from sockets without a bound 
  remote address.
- `close()` - are used to close a socket. In the case of TCP, this also terminates the 
  connection.
- `shutdown()` - is used to close one side of a TCP connection. It is useful to ensure an 
  orderly connection teardown.
- `select()` - is used to wait for an event on one or more sockets.
- `getnameinfo()` and `getaddrinfo()` - provide a protocol-independent manner of working with 
  hostnames and addresses.
- `fcntl()` - are used to get and set some socket options.

## TCP Program Flow

### TCP Client
1. A client must first know the TCP server's address.
2. The client then takes this address and uses `getaddrinfo()` to resolve it into a 
   `struct addrinfo` structure.
3. The client then creates a socket using a call to `socket()`.
4. The client then establishes a new TCP connection by calling `connect()`.
5. Finally, the client can now exchange data using `send()` and `recv()`.

### TCP Server
1. A server listens for connections at a particular port number on a particular interface.
2. The server must first initialize a `struct addrinfo` structure with the proper listening 
   IP address and port number. The `getaddrinfo()` function is useful so that this can be 
   done in an IPv4/IPv6 independent way.
3. The server then creates the socket with a call to `socket()`.
4. The socket must be bound to the listening IP address and port. This is accomplished 
   using a call to `bind()`.
5. The server program must then call `listen()`, which puts the socket in a state where it 
   listens for new connections.
6. The server can then call `accept()`, which will wait until a client establishes a 
   connection to the server. When a new connection has been established, `accept()` returns 
   a new socket.
7. This new socket can be used to exchange data with the client using `send()` and `recv()`.
8. Meanwhile, the first socket remains listening for new connections, and repeated calls 
   to `accept()` allow the server to handle multiple clients.

## UDP Program Flow

### UDP Client
1. The client must first know the address of the remote UDP peer in order to send the 
   first packet.
2. The UDP client uses `getaddrinfo()` to resolve the address into a `struct addrinfo` 
   structure.
3. Once this is done, the client creates a socket of the appropriate type.
4. The client can then call `sendto()` on the socket to send the first packet.
5. The client can keep using `sendto()` and `recvfrom()` on the socket to send and receive 
   additional packets.

### UDP Server
1. The server listens for connections from a UDP client.
2. This server must first initialize a `struct addrinfo` structure with the proper listening 
   IP address and port number. This is done using the `getaddrinfo()` function.
3. The server then creates a new socket with `socket()` and binds it to the listening IP 
   address and port number using `bind()`.
4. At this point, the server can call `recvfrom()` which causes it to block until it 
   receives data from a UDP client.
5. After the first dat ais received, the server can reply with `sendto()` or listen for 
   more data (from the first client or any new client) with `recvfrom()`.
