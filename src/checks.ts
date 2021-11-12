import { application } from "../application.ts";
import { parseArguments } from "./args.ts";
import { fatal } from "./result.ts";

function printHeader() {
  console.log(application.name + " " + application.version);
  console.log(application.repo);
}

function printUsage() {
  console.log("Usage: lock.exe [OPTIONS]... [FILE]");
}

function printFlags() {
  console.log("\t-h\t--help\t\tDisplay this help and exit");
  console.log("\t-h\t--help\t\tOutput version information and exit");
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
    fatal("Specify exactly one file");
  }

  if (args._ && args._.length === 0) {
    fatal("You need to specify a file to encrypt");
  }

  return args._[0].toString();
}

export { checkArguments, printFlags, printHeader, printUsage };
