import { application } from "../application.ts";
import { parseArguments } from "./args.ts";
import { fatal } from "./result.ts";

function printHeader() {
  console.log(application.name + " " + application.version);
  console.log(application.repo);
}

function printUsage() {
  console.log("Usage: lock [OPTIONS...] [FILE]");
}

function printFlags() {
  console.log("\t-u\t--unlock\t\tDecrypt [FILE]");
  console.log("\t-o\t--out [filename]\tSpecify output file/directory name");
  console.log("");
  console.log("\t-h\t--help\t\t\tDisplay this help and exit");
  console.log("\t-h\t--help\t\t\tOutput version information and exit");
  console.log("");
}

function checkArguments() {
  let exit = false;

  // Parse arguments, exit if a unknown argument is identified
  const args = parseArguments();

  if (args.version) {
    exit = true;
    printHeader();
  }

  if (args.help) {
    exit = true;
    printUsage();
    console.log("");
    printFlags();
  }

  if (exit) {
    Deno.exit(0);
  }

  if (args._ && args._.length > 1) {
    fatal("Specify exactly one file or directory");
  }

  if (args._ && args._.length === 0) {
    fatal("You need to specify a file or directory");
  }

  return args;
}

export { checkArguments, printFlags, printHeader, printUsage };
