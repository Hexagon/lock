# lock

Easy to use cli application to encrypt or decrypt files or complete folder tress. Using AES-CBC encryption. Using Deno runtime.

Disclaimer: Use at your own risk, or for fun. The application works, and fully encrypt your files. However the original files are deleted, but _not wiped_ physically from disk after encryption, and could possibly be recovered using forensic tools.

## Installation

Pre compiled binaries are not included, as the installation is two one liners whichever os you use.

First, make sure Deno is installed. Use one of the one-liners at [https://deno.land/#installation](deno.land/#installation).

Note that deno install require administrator shell to properly install on windows.

Then run

```deno install --allow-read --allow-write --unstable https://cdn.jsdelivr.net/gh/hexagon/lock/lock.ts```

This will automatically pull the latest version from this repository.

## Usage

```lock file.txt```

Will prompt for key, encrypt the content and rename the file to ```file.txt.lock```

Then again

```lock file.txt```

Will prompt for key, decrypt the content, and rename the file back to ```file.txt```