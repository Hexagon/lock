/**
 * deps.ts
 *
 * This module re-exports the required methods from remote modules
 */
import { parse } from "https://deno.land/std@0.114.0/flags/mod.ts";
import { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";
import { createHash } from "https://deno.land/std@0.114.0/hash/mod.ts";
import { exists } from "https://deno.land/std@0.114.0/fs/mod.ts";
import { readAll, writeAll } from "https://deno.land/std@0.114.0/streams/conversion.ts";
import { Tar } from "https://deno.land/std@0.114.0/archive/tar.ts";
import { Untar } from "https://deno.land/std@0.114.0/archive/tar.ts";
import { ensureFile } from "https://deno.land/std@0.114.0/fs/ensure_file.ts";
import { ensureDir } from "https://deno.land/std@0.114.0/fs/ensure_dir.ts";
import { Secret } from "https://deno.land/x/cliffy@v0.19.5/prompt/secret.ts";
 
export { createHash, crypto, exists, parse, readAll, writeAll, Tar, Untar, ensureFile, ensureDir, Secret };
