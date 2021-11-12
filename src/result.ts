function fatal(e: string) {
    console.log("Fatal error: " + e );
    Deno.exit(1);
}

function success(e: string) {
    console.log("Success: " + e);
    Deno.exit(0);
}

export { fatal, success };