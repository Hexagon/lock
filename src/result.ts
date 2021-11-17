function fatal(e: string) {
  throw new Error("Fatal error: " + e);
}

function success(e: string) {
  console.log("Success: " + e);
  Deno.exit(0);
}

function output(s: string, quiet?: boolean) {
  if (!quiet) console.log(s);
}

export { fatal, output, success };
