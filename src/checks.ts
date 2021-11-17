import { application } from "../application.ts";
import { fatal } from "./result.ts";
import { Args } from "../deps.ts";

function printHeader() {
  console.log(application.name + " " + application.version);
  console.log(application.repo);
}

function printUsage() {
  console.log("Usage: lock [OPTIONS...] [FILE]");
}

function printFlags() {
  console.log(" -u\t--unlock\tDecrypt [FILE]");
  console.log(" -q\t--quiet\t\tSuppress all output");
  console.log("");
  console.log(" -h\t--help\t\tDisplay this help and exit");
  console.log(" -v\t--version\tOutput version information and exit");
  console.log("");
}

function checkArguments(args: Args): Args | null {
  let exit = false;

  if (args.version) {
    exit = true;
    if (!args.quiet) {
      printHeader();
    }
  }

  if (args.help) {
    exit = true;
    if (!args.quiet) {
      printUsage();
      console.log("");
      printFlags();
    }
  }

  if (exit) {
    return null;
  } else {
    if (args._ && args._.length > 1) {
      fatal("Specify exactly one file or directory");
    }

    if (args._ && args._.length === 0) {
      fatal("You need to specify a file or directory");
    }

    if (!args._) {
      fatal("Missing argument");
    }

    return args;
  }
}

export { checkArguments, printFlags, printHeader, printUsage };
