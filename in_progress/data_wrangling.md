---
title: "Data Wrangling"
excerpt: "Notes from the Data Wrangling of MIT's missing semester class"
date: "2025-01-22T05:35:07.322Z"

tags: ["shell", "data"]
---

Data Wrangling

Consider we have a `server.log` file with the following contents

```
2024-01-22 10:15:23 ERROR user=john action=login status=failed
2024-01-22 10:15:25 INFO user=alice action=view status=success
2024-01-22 10:15:30 ERROR user=john action=login status=failed
```

Generating the log file ? ⇒ we use `journalctl`

`journalctl` is used to view and manage systemd's system journal logs on Linux systems.

### Basic `journalctl` usage

```bash
journalctl                    # Show all logs
journalctl -n 50             # Show last 50 log entries
journalctl -f                # Follow new logs in real-time (like tail -f)
```

### Filtering:

```bash
# Filtering by time
journalctl --since "2024-01-20"
journalctl --since "1 hour ago"
journalctl --until "2024-01-21"

# Filtering by service
journalctl -u nginx.service   # Show logs for nginx service
journalctl -u ssh.service    # Show SSH service logs

# Filtering by Priority
journalctl -p err            # Show error messages
journalctl -p warning        # Show warnings and above
```

### Outputting Format :

```bash
journalctl --output=json    # Output in JSON format
journalctl --no-pager      # Don't use a pager for output
```

### An example :

```bash
# Find all errors from nginx in the last hour
journalctl -u nginx.service --since "1 hour ago" -p err
```

! macos doesn’t have `journalctl`, its equivalent is `log` !

```bash
# View recent logs
log show

# Stream logs in real-time (like journalctl -f)
log stream

# Show logs from the last hour
log show --last 1h

# Filter by subsystem
log show --predicate 'subsystem == "com.apple.networking"'
```
