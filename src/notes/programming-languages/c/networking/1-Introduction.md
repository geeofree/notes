---
title: "Introducing Networks and Protocols"
description: "Networks and Protocols"
---

# Protocols
Protocols are agreed upon standards the define how devices communicate with each other.

# OSI Layer Model
The **Open Systems Interconnection (OSI)** model is a layered model standard that has $7$ 
layers:

- **Application**: The applications that the user interfaces with ie. HTTP, Telnet
- **Presentation**: Handles data encoding, serialization, and encryption
- **Session**: Adds methods to establish, checkpoint, suspend, resume, and terminate 
  dialogs.
- **Transport**: Deals with splitting up data, recombining it, and ensuring that data 
  arrives in order, etc. The **Transmission Control Protocol (TCP)** and 
  **User Datagram Protocol (UDP)** exists on this layer.
- **Network**: Provides methods to transmit data sequences (called packets) between nodes.
- **Data Link**: Builds on the Physical Layer. It deals with protocols for directly 
  communicating between two nodes. It defines how a direct message between nodes starts 
  and ends (framing), provides error detection and correction, and flow control.
- **Physical**: The lowest level and is defined as the physical medium with which nodes 
  connect with ie. ethernet cable, radio, Wi-Fi, etc.

It should be noted that chunks of data are often referred to by different names depending 
on the OSI layer they're on:

- A data unit on Layer $2$ is called a **frame**, since this layer is responsible for framing 
  messages.
- A data unit on Layer $3$ is referred to as a **packet**.
- A data unit on Layer $4$ is a **segment** if it is part of a TCP message, or a 
  **datagram** if it is part of a UDP message.

# TCP/IP Layer Model
The **TCP/IP protocol suite** is the most common network communication model in use and is 
the predecessor to the OSI model.

Similar to the OSI model, the TCP/IP is a layered model, albeit only having $4$ layers:

- **Process/Application Layer**: Implements application protocols such as HTTP, SMTP, 
  and FTP.
- **Host-to-Host Layer**: Provides TCP and UDP protocols. This layer addresses concerns 
  such as data order, data segmentation, network congestion, and error correction.
- **Internet Layer**: This layer deals with addressing packets and routing them over 
  multiple interconnection networks. It's at this layer that an IP address is defined.
- **Network Access Layer**: Physical connections and data framing happen. Sending an 
  Ethernet or Wi-Fi packet are examples of this layer's concern.

# Internet Protocol (IP)
The **Internet Protocol (IP)** is concerned with delivering messages from host-to-host.

Each host has an IP address that is either **public** or **private**:

- A **public** IP address is an address that every device in the Internet can send 
  messages to.
- A **private** IP address is an address that only devices in a local network can make 
  contact with.

There are two addressing formats available:

- **IPv4** which has $32$-bit addresses and provides $2^{32}$ unique addresses across the 
  globe.
- **IPv6** which has $128$-bit addresses and provides $2^{128}$  unique addresses across 
  the globe.

Today, every major desktop and smartphone OS supports the usage of both IPv4 and IPv6 
in what is called a **dual-stack configuration**.

## What is an Address?
All Internet Protocol traffic routes to an address. This is similar to how phone calls 
must be dialed to phone numbers.

### IPv4

IPv4 addresses are $32$-bits long and are divided into $4$ sections, each containing $8$-bits.

Each section is represented as a decimal number between $0$ and $255$ (inclusive) and is 
separated by a period.

For example:

- `0.0.0.0`
- `127.0.0.1`
- `10.0.0.0`
- `172.16.0.5`
- `192.168.0.1`
- `255.255.255.255`

A special address called the **loopback address** is reserved at `127.0.0.1`. This address 
represents a connection of a device into itself. Operating Systems short-circuit this 
address so that packets to it never enter the network but instead stay local on the 
originating system.

IPv4 reserves some address ranges for private use:

- `10.0.0.0` to `10.255.255.255`
- `172.16.0.0` to `172.31.255.255`
- `192.168.0.0` to `192.168.255.255`

The **Classless Inter-Domain Routing (CIDR)** notation is a shorthand notation for writing 
ranges of a network.

The previous addresses for example can be written in CIDR notation as follows:

- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

CIDR notation specifies which leading bits a reserved for the network and which are 
available for the hosts within that network.

For example: `/8` means that the first $8$-bits are fixed while the remaining bits 
($32 - 8 = 24$) are for the hosts.

The network bits and host bits are also identified by **Subnet Masks**.

| CIDR  | Subnet Mask   | Total Available Addresses |
|-------|---------------|---------------------------|
| `/8`  | `255.0.0.0`   | $2^{24}$                  |
| `/12` | `255.240.0.0` | $2^{20}$                  |
| `/16` | `255.255.0.0` | $2^{16}$                  |

### IPv6
IPv6 addresses are $128$-bits long and are divided into $8$ groups of $4$ hexadecimal 
characters separated by colons.

Here are some examples of IPv6 addresses:

- `0000:0000:0000:0000:0000:0000:0000:0001`
- `2001:0db8:0000:0000:0000:ff00:0042:8329`
- `fe80:0000:0000:0000:75f4:ac69:5fa7:67f9`
- `ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff`

There are a couple of rules for shortening IPv6 addresses to make them easier to read:

1. Leading zeroes in each section can be omitted.
2. A section filled with zeroes can be omitted using `::`.
3. Rule $2$ may only be used once in each address; otherwise, the address would be 
   ambiguous.

Here are some IPv6 address examples with shortened notation rules applied:

- `::1`
- `2001:db8::ff00:42:8329`
- `fe80::75f4:ac69:5fa7:67f9`
- `ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff`

The loopback address for IPv6 is `::1`.

The **link-local addresses** are usable only on the local link; routers never forward packets 
from these addresses and are useful for a system to access auto-configuration functions 
before having an assigned IP address.

Link-local addresses are in the IPv4 `169.254.0.0/16` address block or the IPv6 `fe80::/10`
address block.

It should be noted that IPv6 introduces many additional features over IPv4 besides just a 
greatly expanded address range. IPv6 have new attributres, such as scope and lifetime, 
and it is normal for IPv6 network interfaces to have multiple IPv6 addresses. IPv6 
addresses are used and managed differently than IPv4 addresses.

# Domain Names
Domain Names are aliases provided for an Internet Protocol. These are used for convenience 
as it is a lot more easier to remember names rather than a collection of numbers.

The **Domain Name System (DNS)** is a hierarchical system that identifies a given name to some 
address.

There are different DNS records that specifies which translation is done:

- An **A DNS Record** identifies a given domain name to an IPv4 address.
- A **AAAA DNS Record** identifies a given domain to an IPv6 address.

> For a list of DNS record types, see [Wikipedia: List of DNS Record Types](https://en.wikipedia.org/wiki/List_of_DNS_record_types).
