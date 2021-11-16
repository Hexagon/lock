import { parse } from "../deps.ts";

function parseArguments() {
  return parse(Deno.args, {
    alias: {
      "version": "v",
      "help": "h",
      "unlock": "u"
    },
    boolean: ["v", "h", "u"],
    stopEarly: true,
    unknown: (_arg : string, key? : string, value?: unknown) => {
        return key === undefined && value === undefined;
    }
  });
}

export { parseArguments };
