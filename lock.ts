import { exists } from "./deps.ts";
import { checkArguments } from "./src/checks.ts";
import { decrypt, encrypt } from "./src/encryption.ts";
import { deleteFile, writeFile, readFile } from "./src/files.ts";
import { fatal, success } from "./src/result.ts";

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
    "Target file (" + fileName + " or " + fileNameLocked + ") does not exist.",
  );
}

// Handle if locked and unlocked file coexist
if (fileExists && fileExistsLocked) {
  fatal(
    "Both " + fileName + " and " + fileNameLocked + " already exist. Refusing to do anything.",
  );
}

// Should we encrypt or decrypt?
const enc = (fileExists && !fileExistsLocked),
    method = enc ? encrypt : decrypt,
    file = enc ? fileName : fileNameLocked,
    fileAlt = enc ? fileNameLocked : fileName;

// Get key
const key = prompt('Enter password: ');

// Require confirmation if we're encrypting
if (enc) {
  const keyConfirm = prompt('Confirm password: ');
  if (key != keyConfirm) {
    fatal("Keys did not match");
  }
}

// Require a key
if (key !== null) {
  try { 
    await writeFile(fileAlt, await method(await readFile(file), key));
    await deleteFile(file);
  } catch (e) { 
    fatal(e.toString()); 
  }
  success("File " + (enc ? "encrypted" : "decrypted"));
} else {
  fatal("No encryption key provided");
}

