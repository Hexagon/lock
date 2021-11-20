import { Buffer, exists } from "./deps.ts";
import { decrypt, encrypt } from "./src/encryption.ts";
import { deleteFile, readFile, writeFile } from "./src/files.ts";
import { fatal, output } from "./src/result.ts";
import { archive, unarchive } from "./src/archive.ts";

async function lock(
  fileName: string,
  unlock: boolean,
  quiet: boolean,
  yes: boolean,
  no: boolean,
  key: string,
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

        let cnfDelete = false;
        if (!yes && !no) {
          cnfDelete = confirm(
            "Encryption complete, do you want to delete source files (unencrypted)?",
          );
        }
        if (cnfDelete || yes) {
          output("Deleting source files", quiet);
          await deleteFile(fileName);
        } else {
          output("Leaving source files", quiet);
        }

        output("Done", quiet);
      } else {
        const content = await readFile(fileName),
          contentDecrypted = await decrypt(content, key, quiet);
        if (contentDecrypted) {
          const reader = new Buffer(contentDecrypted.buffer as ArrayBuffer);
          await unarchive(reader, quiet);

          output("Decryption complete", quiet);
          // Ask for confirmation before deleting
          let cnfDelete = false;
          if (!yes && !no) {
            cnfDelete = confirm("Do you want to delete locked file?");
          }
          if (cnfDelete || yes) {
            output("Deleting locked file", quiet);
            await deleteFile(fileName);
          } else {
            output("Leaving locked file", quiet);
          }
        } else {
          fatal("Unexpected error");
        }

        output("Done", quiet);
      }
    } catch (e) {
      fatal(e.toString());
    }
  } else {
    fatal("No encryption key provided");
  }
}

export { lock };
