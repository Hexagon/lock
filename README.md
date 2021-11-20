<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/hexagon/lock@master/lock.png" alt="Lock" width="200" height="200"><br>
  CLI tool to encrypt/decrypt files and folders. Easy to use, easy to install.<br>
  Also usable as a Deno module for encrypting/decrypting files or folders.<br>
</p>

![Deno CI](https://github.com/Hexagon/lock/workflows/CI%20Build/badge.svg?branch=master)
![GitHub Issues](https://img.shields.io/github/issues/Hexagon/lock)
![GitHub Release](https://img.shields.io/github/v/release/hexagon/lock?display_name=tag&include_prereleases)
![Deno](https://img.shields.io/badge/Deno-%3E%3D1.16-blue)
![Platform support](https://img.shields.io/badge/platform-win%7Clinux%7CmacOS-blue)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/lock/blob/master/LICENSE.md)

# lock

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

`deno install --allow-read --allow-write --unstable https://cdn.jsdelivr.net/gh/hexagon/lock@0.9.6/lock.ts`

This will automatically pull the latest version from this repository.

## Upgrading from a previous version

Passing `-f -r` to the installation command will clear cache and upgrade lock to
the latest version.

`deno install -f -r --allow-read --allow-write --unstable https://cdn.jsdelivr.net/gh/hexagon/lock@0.9.6/lock.ts`

## Development

### Contribution guide

Development run

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

### Using as a module

In addition to being a cli tool, lock is also usable as a module, through mod.ts

TypeScript example

```typescript
import { lock } from "https://cdn.jsdelivr.net/gh/hexagon/lock@0.9.6/mod.ts";

async function example() {
  const fileName = "output.png",
    unlock = false, // false = encrypt, true = decrypt
    quiet = true, // no console output, setting this to false will output progress, line by line
    deleteInputFile = true, // delete input file without confirmation
    keepInputFile = false, // keep input file without confirmation
    // setting both these to false will trigger a prompt asking how to do
    plainKey = "SuperSecretPassword!";

  // This will
  //  * encrypt fileName or the entire folder tree, in case fileName is a directory
  //  * output fileName + .lock (test.txt.lock) in this case
  //  * delete fileName (recursively if a directory)
  await lock(fileName, unlock, quiet, deleteInputFile, keepInputFile, plainKey);

  // This will
  //  * decrypt fileName + ".lock" (test.txt.lock in this case)
  //  * output all files that were encrypted previously (recursively if a directory)
  //  * delete fileName + ".lock"
  await lock(
    fileName + ".lock",
    !unlock,
    quiet,
    deleteInputFile,
    keepInputFile,
    plainKey,
  );
}

await example();
```
