import { Tar, Untar, ensureDir, ensureFile, exists } from "../deps.ts";
import { fatal } from "./result.ts";
import { getFilePaths } from "./files.ts";

async function archive(fileName : string) {
    const tar = new Tar();
    
    console.log("Adding files to archive...");
    // Get all files recursively
    let currentPath;
    for await (currentPath of await getFilePaths(fileName)) {
        // Or specifying a filePath
        console.log(' - ' + currentPath);
        await tar.append(currentPath, {
            filePath: currentPath,
        });
    }
    return tar.getReader();
}

async function unarchive(reader : Deno.Reader) {
    const untar =  new Untar(reader);
    console.log("Extracting files from archive ...");
    for await (const entry of untar) {
        console.log(" - [" + entry.type + "] " + entry.fileName);
        if (entry.type === "directory") {
            await ensureDir(entry.fileName);
        } else {
            if(!await exists(entry.fileName)) {
                try {
                    await ensureFile(entry.fileName);
                    const file = await Deno.open(entry.fileName, { write: true });
                    await Deno.copy(entry, file);
                    file.close();
                } catch (_e) {
                    fatal("Unexpected error while writing '" +  entry.fileName + "', aborting decryption and leaving files as is.");
                }
            } else {
                fatal("Output file '" +  entry.fileName + "' already exists, aborting decryption and leaving files as is.");
            }
        }
    }
};

export { archive, unarchive };