import { Args, parse } from "../deps.ts";

function parseArguments(args: string[]): Args {
  return parse(args, {
    alias: {
      "version": "v",
      "help": "h",
      "unlock": "u",
      "quiet": "q",
      "yes": "y",
      "no": "n",
      "key": "k",
    },
    boolean: ["v", "h", "u", "q", "y", "n"],
    string: ["k"],
    stopEarly: true,
    unknown: (_arg: string, key?: string, value?: unknown) => {
      return key === undefined && value === undefined;
    },
  });
}

export { parseArguments };
