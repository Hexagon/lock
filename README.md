# lock

Easy to install, easy to use, cross platform cli application to encrypt/decrypt
files or folders.

Using AES-CBC encryption. Using Deno runtime.

**Encryption**

`lock file.txt`

Will prompt for key, encrypt the content and rename the file or directory to
`file.txt.lock`

**Decryption**

`lock --unlock file.txt.lock`

Will prompt for key, decrypt the content, and rename the file or directory back
to `file.txt`

**Help**

`lock --help`

Disclaimer: Use at your own risk, or for fun. This application works, and fully
encrypt your files. However the original files are deleted, but _not wiped_
physically from disk after encryption, and could possibly be recovered using
forensic tools.

## Installation

Pre compiled binaries are not included as the installation consist of two simple
one liners, whether you are on Windows, Linux och OSX.

### Step 1 - Install Deno runtime

First, make sure Deno is installed. Use one of the one-liners at
[deno.land/#installation](https://deno.land/#installation).

_Note that deno install require administrator shell to properly install on
windows._

### Step 2 - Install Lock

`deno install --allow-read --allow-write --unstable https://cdn.jsdelivr.net/gh/hexagon/lock@0.9.2/lock.ts`

This will automatically pull the latest version from this repository.

## Upgrading from a previous version

Passing `-f -r` to the installation command will clear cache and upgrade lock to
the latest version.

`deno install -f -r --allow-read --allow-write --unstable https://cdn.jsdelivr.net/gh/hexagon/lock@0.9.2/lock.ts`

## Development

### Development run

`deno run --unstable --allow-write --allow-read lock.ts`

### Pre commit checks

**Format check**

`deno fmt --check`

**Lint**

`deno lint`

**Test & Coverage profile generation**

`deno test --reload --unstable --allow-write --allow-read --coverage=cov_profile`

**Read coverage report**

`deno coverage --exclude=test cov_profile`
