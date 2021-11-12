# lock

Work in progress: Single binary application to encrypt or decrypt files, currently using AES-CBC.

Using Deno runtime.

Again, this is work in progress.

## Installation

First, make sure Deno is installed.

Then 

```deno install --allow-read --allow-write --unstable https://todo...```

## Usage

```lock file.txt```

Will prompt for key, encrypt the content and rename the file to ```file.txt.lock```

Then again

```lock file.txt```

Will prompt for key, decrypt the content, and rename the file back to ```file.txt```