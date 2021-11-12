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

export { createHash, crypto, exists, parse, readAll, writeAll };
