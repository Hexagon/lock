import { exists, Secret } from "./deps.ts";
import { checkArguments } from "./src/checks.ts";
import { decrypt, encrypt } from "./src/encryption.ts";
import { deleteFile, writeFile, readFile } from "./src/files.ts";
import { fatal } from "./src/result.ts";
import { archive, unarchive } from "./src/archive.ts";

// Check arguments and get filename
const args = checkArguments();

// Filename always is in arrs._[0] if we got this far, don't worry
const fileName = args._[0].toString();

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
const key = await Secret.prompt('Enter password: ');

// Require confirmation if we're encrypting
if (!args.unlock) {
  const keyConfirm = await Secret.prompt('Confirm password: ');
  if (key != keyConfirm) {
    fatal("Keys did not match");
  }
}

// Require a key
if (key !== null) {
  try { 

    if (!args.unlock) {

      let fileNameOut = fileName + ".lock";
      if (args.out) {
        fileNameOut = args.out;
      }

      // Handle if output file already exist
      const fileExistsLocked = await exists(fileNameOut);
      if (fileExists && fileExistsLocked) {
        fatal(
          "Output file '" + fileNameOut + "' already exist. Refusing to do anything.",
        );
      }

      const 
        reader = await archive(fileName),
        contentEncrypted = await encrypt(reader, key);
      await writeFile(fileNameOut, contentEncrypted);
      await deleteFile(fileName);

      console.log("Encryption complete.");

    } else {

      const 
        content = await readFile(fileName),
        contentDecrypted = await decrypt(content, key),
        reader = new Deno.Buffer(contentDecrypted.buffer as ArrayBuffer);
      await unarchive(reader); 
      await deleteFile(fileName);

      console.log("Decryption complete.");
    }
  } catch (e) { 
    fatal(e.toString()); 
  }
} else {
  fatal("No encryption key provided");
}

