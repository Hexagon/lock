import { copy, ensureDir, ensureFile, exists, Tar, Untar } from "../deps.ts";
import { fatal, output } from "./result.ts";
import { getFilePaths } from "./files.ts";

async function archive(fileName: string, quiet?: boolean) {
  const tar = new Tar();

  output("Adding files to archive...", quiet);
  // Get all files recursively
  let currentPath;
  for await (currentPath of await getFilePaths(fileName)) {
    // Or specifying a filePath
    output(" - " + currentPath, quiet);
    await tar.append(currentPath, {
      filePath: currentPath,
    });
  }
  return tar.getReader();
}

async function unarchive(reader: Deno.Reader, quiet?: boolean) {
  const untar = new Untar(reader);
  output("Extracting files from archive ...", quiet);
  for await (const entry of untar) {
    output(" - [" + entry.type + "] " + entry.fileName, quiet);
    if (entry.type === "directory") {
      await ensureDir(entry.fileName);
    } else {
      if (!await exists(entry.fileName)) {
        try {
          await ensureFile(entry.fileName);
          const file = await Deno.open(entry.fileName, { write: true });
          await copy(entry, file);
          file.close();
        } catch (_e) {
          fatal(
            "Unexpected error while writing '" + entry.fileName +
              "', aborting decryption and leaving files as is.",
          );
        }
      } else {
        fatal(
          "Output file '" + entry.fileName +
            "' already exists, aborting decryption and leaving files as is.",
        );
      }
    }
  }
}

export { archive, unarchive };
