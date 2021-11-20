import { deleteFile, readFile, writeFile } from "../src/files.ts";
import { ensureDir, exists } from "../deps.ts";
import { lock } from "../mod.ts";

import {
  decode as utf8decode,
  encode as utf8encode,
} from "https://deno.land/std@0.82.0/encoding/utf8.ts";

import { assertEqual } from "./helpers/assert.ts";

const testDir = "./testdir",
  testDirLocked = "./testdir.lock",
  testFile = "./testdir/test.txt",
  testText = "Hello Lock!",
  testFileLocked = "./testdir/test.txt.lock",
  testPassword = "HelloLock";

Deno.test("testFile and testFileLocked do not exist", async () => {
  assertEqual(await exists(testFile), false);
  assertEqual(await exists(testFileLocked), false);
});

Deno.test("Helper - create directory", async () => {
  await ensureDir(testDir);
  await exists(testDir);
});

Deno.test("writeFile", async () => {
  await writeFile(testFile, utf8encode("Hello Lock!"));
  assertEqual(await exists(testFile), true);
});

Deno.test("non existing input file throws", async () => {
  let caught = false;
  try {
    await lock("__nonexisting.txt", false, true, true, false, testPassword);
    throw new Error("Nope");
  } catch (_e) {
    caught = true;
  }
  assertEqual(caught, true);
});

Deno.test("lock works, readFile works (file mode)", async () => {
  await lock(testFile, false, true, true, false, testPassword);
  assertEqual(await exists(testFileLocked), true);
  assertEqual(await exists(testFile), false);
});

Deno.test("lock --unlock throws with wrong password, and leaves files untouched (file mode)", async () => {
  try {
    await lock(testFileLocked, true, true, true, false, "wrongpassword");
    assertEqual(true, false);
  } catch (e: unknown) {
    const eError = e as Error;
    if (eError && eError.toString) {
      eError.toString().includes("BlockModeError");
    } else {
      assertEqual(true, false);
    }
  }
  assertEqual(await exists(testFileLocked), true);
  assertEqual(await exists(testFile), false);
});

Deno.test("lock --unlock works (file mode)", async () => {
  await lock(testFileLocked, true, true, true, false, testPassword);
  const fileContent = await readFile(testFile);
  assertEqual(utf8decode(fileContent), testText);
  assertEqual(await exists(testFileLocked), false);
});

Deno.test("lock works, readFile works (dir mode)", async () => {
  await lock(testDir, false, true, true, false, testPassword);
  assertEqual(await exists(testDirLocked), true);
  assertEqual(await exists(testDir), false);
});

Deno.test("lock --unlock works (dir mode)", async () => {
  await lock(testDirLocked, true, true, true, false, testPassword);
  const fileContent = await readFile(testFile);
  assertEqual(utf8decode(fileContent), testText);
  assertEqual(await exists(testDirLocked), false);
});

Deno.test("deleteFile works (recursive)", async () => {
  await deleteFile(testDir);
  assertEqual(await exists(testFile), false);
  assertEqual(await exists(testDir), false);
});
