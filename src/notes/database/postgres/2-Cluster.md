---
title: "Chapter 2: The Cluster"
description: "The Cluster!"
---

# Managing your cluster
A PostgreSQL cluster is a collection of several databases that all run under the 
very same PostgreSQL service or instance.

Managing a cluster means being able to start, stop, take control, and get information 
about the status of a PostgreSQL instance.

## pg_ctl
The `pg_ctl` command-line utility allows you to perform different actions on a cluster, 
mainly initialize, start, restart, stop, etc.

`pg_ctl` accepts the command to execute as the first argument, followed by other specific 
arguments — the main commands are as follows:

* `start`, `stop`, `restart` execute the corresponding actions on the cluster.
* `status` reports the current status (running or not) of the cluster.
* `initdb` (or `init` for short) executes the initialization of the cluster, possibly 
  removing any previously existing data.
* `reload` causes the PostgreSQL server to reload the configuration, which is useful when 
  you want to apply configuration changes.
* `promote` is used when the cluster is running as a replica server (namely a standby 
  node) and, from now on, must be detached from the original primary becoming independent.

Generally speaking, `pg_ctl` interacts mainly with the postmaster, which in turn redirects 
commands to other existing processes.

For instance, when `pg_ctl` starts a server instance, it makes the postmaster process run, 
which in turn completes all the startup activities, including launching other utility 
processes.

On the other hand, when `pg_ctl` stops a cluster, it issues a halt command to the 
postmaster, which in turn requires other active processes to exit, waiting for them to 
finish.

`pg_ctl` needs to know where `PGDATA` is located.

Interacting with a cluster status is an action that not every user must be able to 
perform; usually, only an operating system administrator must be able to interact with 
services including PostgreSQL.

PostgreSQL, in order to mitigate the side effects of privilege escalation, does not allow 
a cluster to be run by privileged users, such as root. Therefore, PostgreSQL is run by a 
**normal** user, usually named `postgres` on all operating systems.

This unprivileged user owns the `PGDATA` directory and runs the postmaster process, and, 
therefore, also the processes launched by the postmaster itself.

`pg_ctl` must be run by the same unprivileged operating system user that is going to run 
the cluster.

### pg_ctl Commands

#### status
The `status` command just queries the cluster to get information.

```bash
$ pg_ctl status
pg_ctl: server is running (PID: 1)
/usr/lib/postgresql/16/bin/postgres
```

Here, the command reported that the server is running and has a PID of $1$ and provided 
the executable file used to launch the server (`/usr/lib/postgresql/16/bin/postgres`).

It can also report that the server is not running:

```bash
$ pg_ctl status
pg_ctl: no server running
```

In order to report the status of the cluster, `pg_ctl` needs to know where `PGDATA` is 
on disk.

#### start
The `start` command can be used to start a cluster.

```bash
$ pg_ctl start
waiting for server to start....
[27765] LOG:
starting PostgreSQL 16.0 on x
86_64-pc-linux-gnu, compiled by gcc (GCC) 12.1.0, 64-bit
[27765] LOG:
listening on IPv6 address "::1", port 5432
[27765] LOG: listening on IPv4 address "127.0.0.1", port 5432 [27765]
LOG: listening on Unix socket "/tmp/.s.PGSQL.5432"
[27768] LOG:database system was shut down at 2023-07-19 07:20:24 EST
[27765] LOG:database system is ready to accept connections
done
server started
```

The `pg_ctl` command launches the postmaster process, which prints out a few log lines 
before redirecting the logs to the appropriate log file.

#### stop
The `stop` command can be used to stop a running cluster.

```bash
$ pg_ctl stop
waiting for server to shut down....
[27765] LOG:received fast shutdown request
[27765] LOG:aborting any active transactions
[27765] LOG: background worker "logical replication launcher" (PID 27771)
exited with exit code 1
[27766] LOG:shutting down
[27766] LOG:checkpoint starting: shutdown immediate
[27766] LOG: checkpoint complete: wrote 0 buffers (0.0%); 0 WAL file(s)
added, 0 removed, 0 recycled; write=0.001 s, sync=0.001 s, total=0.035
s; sync files=0, longest=0.000 s, average=0.000 s; distance=0 kB,
estimate=237 kB; lsn=0/1529DC8, redo lsn=0/1529DC8
[27765] LOG:
database system is shut down
done
server stopped
```

There are three modes for the `stop` command:
1. The `smart` mode means that the cluster will wait for all the connected clients to 
   disconnect and only then will it shut the cluster down.
2. The `fast` mode means that it will immediately disconnect every client and will shut 
   down the server without having to wait.
3. The `immediate` mode will abort every PostgreSQL process, including client connections, 
   and shut down the cluster in a dirty way.

In order to provide the mode for the `stop` command the `-m` flag can be provided:

```bash
$ pg_ctl stop -m smart
waiting for server to shut down........................ done
server stopped
```

The default mode is `fast` which forces an immediate disconnection of the clients but 
ensures data integrity.

## PostgreSQL processes
The Postmaster is the process that spawns all other processes of the cluster.

The ff. are some processes that the postmaster will launch on startup:

- **checkpointer** is the process responsible for executing checkpoints, which are points in 
  time where the database ensures that all the data is actually stored persistently on 
  the disk.
- **background writer** is responsible for helping to push the data out of the memory to the 
  permanent storage
- **walwriter** is responsible for writing out the **Write-Ahead Logs (WALs)**, the logs that are 
  needed to ensure data reliability even in the case of a database crash.
- **logical replication launcher** is the process responsible for handling logical 
  replication.

Depending on the configuration of the cluster, there could be other processes active:

- **Background workers**: Are processes that can be customized by the user to perform 
  background tasks.
- **WAL receiver and/or WAL sender**: Are processes involved in receiving data from or sending 
  data to another cluster in replication scenarios.

When a client connects to the cluster, a new process is spawned: the **backend process**, 
which is responsible for serving the client requests (ie. executing queries and returning 
the results).

## Connecting to the cluster
Once PostgreSQL is running, it awaits incoming database connections to serve; as soon as a 
connection comes in, PostgreSQL serves it by connecting the client to the right database.

In order to interact with a cluster, a connection must first be established to a specific 
database. This means that the cluster must have at least one database from the very 
beginning of its life.

When the cluster is initialized with the `initdb` command, PostgreSQL builds the filesystem 
layout of the `PGDATA` directory and builds two template databases, named `template0` and 
`template1`.

The template databases are used as a starting point to clone other new databases, which 
can then be used by normal users to connect to.

In a freshly installed PostgreSQL cluster, the `postgres` database is usually available and 
is used to allow the database administrator user `postgres` to connect and interact with 
the cluster.

To connect to one of the databases (either a template or a user-defined one), a *client* is 
needed to connect with the cluster. PostgreSQL ships with the `psql` command-line client 
that allows users to connect, interact with, and administer databases and the cluster 
itself.

### Template Databases
The `template1` database is the first database created when the system is initialized, and 
then it is cloned into `template0`. This means that `template0` acts as a safe copy for 
rebuilding in case it is accidentally damaged or removed.

To inspect available databases use the `psql -l` command.

Whatever objects that are put into `template1` get to be added to newly created databases 
when it gets cloned.

It should be also noted that connecting to `template0` is prohibited since this is the 
safety copy.

# Exploring the disk layout of `PGDATA`
All PostgreSQL-related stuff is contained in the `PGDATA` directory.

The `PGDATA` directory acts as the disk container that stores all the data of the cluster, 
including the users' data and cluster configuration.

The `PGDATA` directory is structured in several files and subdirectories.

The main files are as follows:

- `postgresql.conf` is the main configuration file, used by default when the service is 
  started.
- `postgresql.auto.conf` is the automatically included configuration file used to store 
  dynamically changed settings via SQL instructions.
- `pg_hba.conf` is the HBA (Host-Based Access) file that provides the config for available 
  database connections.
- `PG_VERSION` is a text file that contains the major version number.
- `postmaster.pid` is the PID of the postmaster process.

The main directories available in `PGDATA` are as follows:

- `base` is a directory that contains all the users' data, including databases, tables, and 
  other objects.
- `global` is a directory containing cluster-wide objects.
- `pg_wal` is the directory containing the WAL files.
- `pg_stat` and `pg_stat_tmp` are the storage of permanent and temporary statistical info 
  about the status and health of the cluster.
