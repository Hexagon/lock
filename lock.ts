import { lock } from "./mod.ts";
import { checkArguments } from "./src/checks.ts";
import { parseArguments } from "./src/args.ts";

// Parse arguments, null from parseArguments indicate that the program is already done, like --help
try {
  const args = checkArguments(parseArguments(Deno.args));
  if (args !== null) {
    const fileName = args._[0].toString();
    await lock(fileName, args.unlock, args.quiet);
  }
  Deno.exit(0);
} catch (e) {
  console.error(e);
  Deno.exit(1);
}
