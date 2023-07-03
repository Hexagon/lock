/**
 * deps.ts
 *
 * This module re-exports the required methods from remote modules
 */

export { crypto } from "https://deno.land/std@0.114.0/crypto/mod.ts";
export { createHash } from "https://deno.land/std@0.114.0/hash/mod.ts";
export { exists } from "https://deno.land/std@0.114.0/fs/mod.ts";
export {
  readAll,
  writeAll,
} from "https://deno.land/std@0.114.0/streams/conversion.ts";
export { Tar } from "https://deno.land/std@0.114.0/archive/tar.ts";
export { Untar } from "https://deno.land/std@0.114.0/archive/tar.ts";
export { ensureFile } from "https://deno.land/std@0.114.0/fs/ensure_file.ts";
export { ensureDir } from "https://deno.land/std@0.114.0/fs/ensure_dir.ts";
export { Secret } from "https://deno.land/x/cliffy@v1.0.0-rc.1/prompt/secret.ts";
export { copy } from "https://deno.land/std@0.114.0/streams/conversion.ts";
export { Buffer } from "https://deno.land/std@0.114.0/io/buffer.ts";
import { Args, parse } from "https://deno.land/std@0.114.0/flags/mod.ts";
export type { Args };
export { parse };
