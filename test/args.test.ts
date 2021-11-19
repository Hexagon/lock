import { parseArguments } from "../src/args.ts";
import { assertTruthy, assertEqual } from "./helpers/assert.ts";

Deno.test("-h should set args.help", () => {
  const input = ["-h"];
  const input2 = ["--help"];

  const args = parseArguments(input);
  const args2 = parseArguments(input2);

  assertTruthy(args.help);
  assertTruthy(args2.help);
});

Deno.test("-v and --version should set args.version", () => {
  const input1 = ["-v"];
  const input2 = ["--version"];

  const args1 = parseArguments(input1);
  const args2 = parseArguments(input2);

  assertTruthy(args1.version);
  assertTruthy(args2.version);
});

Deno.test("-q and --quiet should set args.quiet", () => {
  const input1 = ["-q"];
  const input2 = ["--quiet"];

  const args1 = parseArguments(input1);
  const args2 = parseArguments(input2);

  assertTruthy(args1.quiet);
  assertTruthy(args2.quiet);
});

Deno.test("-u and --unlock should set args.unlock", () => {
  const input1 = ["-u"];
  const input2 = ["--unlock"];

  const args1 = parseArguments(input1);
  const args2 = parseArguments(input2);

  assertTruthy(args1.unlock);
  assertTruthy(args2.unlock);
});

Deno.test("-y and --yes should set args.yes", () => {
  const input1 = ["-y"];
  const input2 = ["--yes"];

  const args1 = parseArguments(input1);
  const args2 = parseArguments(input2);

  assertTruthy(args1.yes);
  assertTruthy(args2.yes);
});


Deno.test("-n and --no should set args.no", () => {
  const input1 = ["-n"];
  const input2 = ["--no"];

  const args1 = parseArguments(input1);
  const args2 = parseArguments(input2);

  assertTruthy(args1.no);
  assertTruthy(args2.no);
});


Deno.test("-k and --key should set args.key", () => {
  const input1 = ["-k", "hello"];
  const input2 = ["--key", "hello"];

  const args1 = parseArguments(input1);
  const args2 = parseArguments(input2);

  assertEqual(args1.key, "hello");
  assertEqual(args2.key, "hello");
});