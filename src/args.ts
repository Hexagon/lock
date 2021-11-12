import { parse } from "../deps.ts";

function parseArguments() {
  return parse(Deno.args, {
    alias: {
      "version": "v",
      "help": "h"
    },
    boolean: ["v", "h"],
    stopEarly: true,
    unknown: (_arg : string, key? : string, value?: unknown) => {
        return key === undefined && value === undefined;
    }
  });
}

export { parseArguments };
