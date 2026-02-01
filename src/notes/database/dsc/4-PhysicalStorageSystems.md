---
title: "Chapter 4: Physical Storage Systems"
description: "Physicaly storage devices, interfaces, and block storage access."
---

## Physical Storage Devices

There are several types of data storage that exists in most modern computer systems. 
These storage media are classified by their speed of access, cost per unit of data, 
and reliability.

The ff. are some storage media that are typically available in most computer systems:

- **Caches/Registers**: The cache/register  is the fastest and most expensive form 
  of storage media. It is used by CPUs to store temporary data during its processing.

- **Main Memory**: The main memory (or RAM) is a volatile storage device used for larger 
  storage space for temporary data.

- **Flash Memory**: A non-volatile form of storage media used for storing persistent 
  data. Examples of flash memory devices are USB Flash Drives and Solid-State 
  drives (SSDs).

- **Magnetic-Disk Storage**: Magnetic-disks [or hard disk drives (HDD)] are non-volatile 
  storage media used for storing persistent data and contains an electro-mechanical 
  spinning disk with a _head_ that reads or writes to it.

- **Optical Storage**: The _digital video disk_ (DVD) is an optical storage medium with 
  data written and read using a laser light source.
  
  Some DVDs are read-only, with data written at the factory where it is produced while 
  others may be *write-once, read-many (WORM)*.

- **Tape Storage**: Tape storage is mainly used for archiving and backup data and have 
  _sequential-access_ where data must be read from the beginning (in contrast to HDDs 
  and SSDs which are _direct-access_ where data can be accessed at any location on 
  the device).

### Storage Hierarchy

The various storage media can be organized in a hierarchy where devices with faster 
access and costlier prices are at the top and the devices with slower access but 
cheaper cost is at the bottom:

![Storage Hierarchy](/images/figures/database/storage-hierarchy.png)

## Storage Interfaces

HDDs and SSDs are typically connected to a computer using a high-speed interconnection 
medium.

Disks for example uses the **Serial ATA (SATA)** or the **Serial Attached SCSI (SAS)** 
interfaces.

> **NOTE**: The SAS interface is typically used in servers or commercial devices.

The **Non-Volatile Memory Express (NVMe)** interface is a logical interface standard 
developed to better support SSDs and is typically used with the PCIe interface (an 
interface that supersedes SATA).

### Networked Storage Systems

Some storage systems can also be accessed remotely or through the internet.

#### Storage Area Network (SAN)

A networked storage system where a large number of disks are connected together to form 
a single disk unit that can be accessed remotely.

Typically these storage devices are organized using [RAID (Redundant Array of Independent Disks)](https://en.wikipedia.org/wiki/RAID).

#### Network Attached Storage (NAS)

NAS is a remote file system that is interfaced using network file system protocols such 
as NFS or CIFS.

## Magnetic Disks

![Magnetic Drive Schema, Database System Concepts (2019), A. Silberschatz, Ch. 12, p. 564](/images/figures/database/magnetic-drive-schema.png)

A magnetic disk contains flat circular _disk platters_ that each contain a magnetic 
material on both sides and where a read-write head positioned just above the surface 
of each disk reads from or writes to the platter.

The disk motor spins these platters at a constant high speed, typically $5,400$ to 
$10,000$ revolutions per minute (RPM) depending on the model.

Each platter surface is logically divided into _tracks_ and each track are subdivided 
into _sectors_.

A sector is the smallest unit of information that can be read from or written to the 
disk and typically have a size of $512$ bytes. Most modern disks have between $2$ billion 
to $24$ billion sectors.

The read-write head (or just head) of the magnetic disk move together in tandem so when 
a head moves to the $j$th sector at the $i$th track then all of the heads are also at the 
$j$th sector at the $i$th track.

A **disk controller** interfaces between the computer system and the hardware of the 
disk drive, allowing the computer system to direct the operations of the drive.

The disk controller also attaches a _checksum_ to data written to a sector. When 
the checksum fails during a read it will retry severals times before the controller 
will signal a read failure.

Disk controllers also perform _remapping of bad sectors_ where it logically maps a write 
on a bad sector to a different working sector on the disk.

### Disk Performance Measures & Units

A disk is measured based on the ff. criteria:

- **Seek Time**: The time it takes for the disk arm to move so that it is positioned over 
  the correct track and sector.

- **Access Time**: The time from when a read or write request is issued to when the data 
  transfer begins.

- **Capacity**: The amount of data that can be stored in the disk.

- **Data-Transfer Rate**: The amount of data that can be transferred to or from the disk
  at a given time. Most modern disks support transfer rates of $50$ to $200$ MB/s and 
  are significantly lower on inner tracks.

A **disk block** is a logical unit of storage allocation and retrieval specified by the 
Operating System and must be a multiple of the sector size.

#### Access Patterns

A disk access may either be classified as a **sequential** or **random** access pattern.

Sequential access means that blocks are accessed sequentially on the same track while 
random access means that blocks are accessed at different tracks.

The number of **I/O operations per second** (IOPS) is the number of random block accesses 
that can be done by a disk in a second.
