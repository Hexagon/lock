import { crypto, readAll } from "../deps.ts";
import { fatal, output } from "./result.ts";

function appendBuffer(buffer1: Uint8Array, buffer2: Uint8Array): Uint8Array {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
}

async function encrypt(
  plaintextReader: Deno.Reader,
  password: string,
): Promise<Uint8Array | undefined> {
  if (!crypto.subtle.importKey || !crypto.subtle.encrypt) {
    fatal("Unexpected error");
  } else {
    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

    const iv = crypto.getRandomValues(new Uint8Array(16));

    const alg = { name: "AES-CBC", iv: iv };

    const key: unknown = await crypto.subtle.importKey(
      "raw",
      pwHash,
      alg,
      false,
      ["encrypt"],
    );

    const output = await readAll(plaintextReader);
    const ctBuffer: unknown = await crypto.subtle.encrypt(alg, key, output);
    return appendBuffer(iv, ctBuffer as Uint8Array);
  }
}

async function decrypt(
  ciphertext: Uint8Array,
  password: string,
  quiet: boolean,
): Promise<Uint8Array | undefined> {
  if (!crypto.subtle.importKey || !crypto.subtle.decrypt) {
    fatal("Unexpected error");
  } else {
    output("Deriving key from passphrase", quiet);
    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);
    output("Extracting IV", quiet);
    const iv: Uint8Array = ciphertext.slice(0, 16);

    const alg = { name: "AES-CBC", iv: iv };

    const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
      "decrypt",
    ]);

    const ct = ciphertext.slice(16);
    output("Decrypting archive", quiet);
    const buffer = await crypto.subtle.decrypt(alg, key, ct);
    return new Uint8Array(buffer as Uint8Array);
  }
}

export { decrypt, encrypt };
