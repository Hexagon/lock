import { lock } from "./mod.ts";
import { Secret } from "./deps.ts";
import { fatal } from "./src/result.ts";
import { checkArguments } from "./src/checks.ts";
import { parseArguments } from "./src/args.ts";

// Parse arguments, null from parseArguments indicate that the program is already done, like --help
try {
  const args = checkArguments(parseArguments(Deno.args));
  if (args !== null) {
    const fileName = args._[0].toString();

    // Get key
    let key = args.key;
    if (!args.key) {
      key = await Secret.prompt("Enter password: ");

      // Require confirmation if we're encrypting
      if (!args.unlock) {
        const keyConfirm = await Secret.prompt("Confirm password: ");
        if (key != keyConfirm) {
          fatal("Keys did not match");
        }
      }
    }

    // Go!
    await lock(fileName, args.unlock, args.quiet, args.yes, args.no, key);
  }
  Deno.exit(0);
} catch (e) {
  console.error(e);
  Deno.exit(1);
}
