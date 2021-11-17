import { Args, parse } from "../deps.ts";

function parseArguments(args: string[]): Args {
  return parse(args, {
    alias: {
      "version": "v",
      "help": "h",
      "unlock": "u",
      "quiet": "q",
    },
    boolean: ["v", "h", "u", "q"],
    stopEarly: true,
    unknown: (_arg: string, key?: string, value?: unknown) => {
      return key === undefined && value === undefined;
    },
  });
}

export { parseArguments };
