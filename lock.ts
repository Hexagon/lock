import { exists, Secret } from "./deps.ts";
import { checkArguments } from "./src/checks.ts";
import { decrypt, encrypt } from "./src/encryption.ts";
import { deleteFile, writeFile, readFile } from "./src/files.ts";
import { fatal, success } from "./src/result.ts";
import { archive, unarchive } from "./src/archive.ts";

// Check arguments and get filename
const fileName = checkArguments();
const fileNameLocked = fileName + ".lock";

// Check for target file
const fileExists = await exists(fileName);
const fileExistsLocked = await exists(fileNameLocked);

// Handle missing file
if (!fileExists && !fileExistsLocked) {
  // Both encrypted and decrypted seem to exist, bail out
  fatal(
    "Target file '" + fileName + "' or '" + fileNameLocked + "' does not exist.",
  );
}

// Handle if locked and unlocked file coexist
if (fileExists && fileExistsLocked) {
  fatal(
    "Both '" + fileName + "' and '" + fileNameLocked + "' already exist. Refusing to do anything.",
  );
}

// Should we encrypt or decrypt?
const enc = (fileExists && !fileExistsLocked);

// Get key
const key = await Secret.prompt('Enter password: ');

// Require confirmation if we're encrypting
if (enc) {
  const keyConfirm = await Secret.prompt('Confirm password: ');
  if (key != keyConfirm) {
    fatal("Keys did not match");
  }
}

// Require a key
if (key !== null) {
  try { 

    if (enc) {
      const 
        reader = await archive(fileName),
        contentEncrypted = await encrypt(reader, key);
      await writeFile(fileNameLocked, contentEncrypted);
      await deleteFile(fileName);
    } else {
      const 
        content = await readFile(fileNameLocked),
        contentDecrypted = await decrypt(content, key),
        reader = new Deno.Buffer(contentDecrypted.buffer as ArrayBuffer);
      await unarchive(reader); 
      await deleteFile(fileNameLocked);
    }
  } catch (e) { 
    fatal(e.toString()); 
  }
  success("File " + (enc ? "encrypted" : "decrypted"));
} else {
  fatal("No encryption key provided");
}

