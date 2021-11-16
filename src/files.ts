import { readAll, writeAll } from "../deps.ts";

async function deleteFile(fn: string) {
    console.log("Cleaning up")
    await Deno.remove(fn,{ recursive: true });
    return undefined;
}

async function getFilePaths(currentPath: string) : Promise<string[]> {
    const names: string[] = [];

    let fileInfo;

    try {
        fileInfo = await Deno.stat(currentPath);
    } catch (e) {
        return names;
    }

    if (fileInfo.isFile) {
        names.push(currentPath);
        return names;
    }

    for await (const dirEntry of Deno.readDir(currentPath)) {
        const entryPath = `${currentPath}/${dirEntry.name}`;
        names.push(entryPath);
        if (dirEntry.isDirectory) {
            const newNames = await getFilePaths(entryPath);
            for await (const name of newNames) {
                console.log(name);
                names.push(name);
            }
        }
    }

    return names;
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

export {  writeFile, readFile, deleteFile, getFilePaths };