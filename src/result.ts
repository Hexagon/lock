function fatal(e: string) {
  throw new Error("Fatal error: " + e);
}

function output(s: string, quiet?: boolean) {
  if (!quiet) console.log(s);
}

export { fatal, output };
