//import { lock } from "../lock.ts";
import { parseArguments } from "../src/args.ts";
import { checkArguments } from "../src/checks.ts";

import { assertEqual, assertTruthy } from "./helpers/assert.ts";

Deno.test("-h should return null", () => {
  const args = checkArguments(parseArguments(["--quiet", "-h"]));
  assertEqual(args, null);
});

Deno.test("-v should return null", () => {
  const args = checkArguments(parseArguments(["--quiet", "-v"]));
  assertEqual(args, null);
});

Deno.test("more than one file should throw", () => {
  try {
    const _args = checkArguments(
      parseArguments(["--quiet", "file1.txt", "file2.txt"]),
    );
    throw new Error("Should throw");
  } catch (e) {
    assertTruthy(e.toString().includes("Specify exactly one file"));
  }
});

Deno.test("no files should throw", () => {
  try {
    const _args = checkArguments(parseArguments([]));
    throw new Error("Should throw");
  } catch (e) {
    assertTruthy(e.toString().includes("You need to specify"));
  }
});

Deno.test("one file should not throw", () => {
  const args = checkArguments(parseArguments(["file.txt"]));
  const fileName = args !== null ? args._[0].toString() : null;
  assertEqual(fileName, "file.txt");
});
