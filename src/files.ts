import { readAll, writeAll } from "../deps.ts";

async function deleteFile(fn: string) {
    await Deno.remove(fn);
    return undefined;
}

async function writeFile(fn: string, content: Uint8Array) {
    const fileOut = await Deno.open(fn, {
        write: true,
        create: true,
    });
    await writeAll(fileOut, content);
    Deno.close(fileOut.rid);
}

async function readFile(fn: string) : Promise<Uint8Array> {
    const file = await Deno.open(fn, { read: true });
    const content = await readAll(file);
    Deno.close(file.rid);
    return content;
}

export { deleteFile, writeFile, readFile };