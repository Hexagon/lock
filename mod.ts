import { Buffer, exists, Secret } from "./deps.ts";
import { decrypt, encrypt } from "./src/encryption.ts";
import { deleteFile, readFile, writeFile } from "./src/files.ts";
import { fatal, output } from "./src/result.ts";
import { archive, unarchive } from "./src/archive.ts";

async function lock(
  fileName: string,
  unlock: boolean,
  quiet: boolean,
  key?: string,
) {
  // Check for target file
  const fileExists = await exists(fileName);

  // Handle missing file
  if (!fileExists) {
    // Both encrypted and decrypted seem to exist, bail out
    fatal(
      "Target file or directory '" + fileName + "' does not exist.",
    );
  }

  // Get key
  if (!key) {
    key = await Secret.prompt("Enter password: ");

    // Require confirmation if we're encrypting
    if (!unlock) {
      const keyConfirm = await Secret.prompt("Confirm password: ");
      if (key != keyConfirm) {
        fatal("Keys did not match");
      }
    }
  }

  // Require a key
  if (key !== null) {
    try {
      if (!unlock) {
        const fileNameOut = fileName + ".lock";

        // Handle if output file already exist
        const fileExistsLocked = await exists(fileNameOut);
        if (fileExists && fileExistsLocked) {
          fatal(
            "Output file '" + fileNameOut +
              "' already exist. Refusing to do anything.",
          );
        }

        const reader = await archive(fileName, quiet),
          contentEncrypted = await encrypt(reader, key);
        if (contentEncrypted) {
          await writeFile(fileNameOut, contentEncrypted);
        } else {
          fatal("Unexpected error");
        }
        await deleteFile(fileName, quiet);

        output("Encryption complete.", quiet);
      } else {
        const content = await readFile(fileName),
          contentDecrypted = await decrypt(content, key, quiet);
        if (contentDecrypted) {
          const reader = new Buffer(contentDecrypted.buffer as ArrayBuffer);
          await unarchive(reader, quiet);
          await deleteFile(fileName, quiet);
        } else {
          fatal("Unexpected error");
        }
        output("Decryption complete.", quiet);
      }
    } catch (e) {
      fatal(e.toString());
    }
  } else {
    fatal("No encryption key provided");
  }
}

export { lock };
