/**
 * Ezeoke Encryption -- permutation-channel substitution cipher.
 * TypeScript port of obfuscrypt.py.
 *
 * This is an obfuscator, not cryptography for a real adversary.  Its goals are:
 *   * one secret 128-bit seed shared out of band, no per-message key exchange;
 *   * a fresh dictionary per 30-symbol block, driven by a single signed running
 *     counter, so message ordering does not matter and frequency analysis is
 *     starved;
 *   * the message counter is carried inside the ordering of the ciphertext
 *     triples (a base-6 side channel), so no separate nonce is transmitted;
 *   * short messages are padded with random filler triples after a delimiter,
 *     and the decoder discards everything after that delimiter.
 *
 * Each valid triple has three distinct characters and therefore six orderings.
 * A permutation is ranked 0..5; the sequence of ranks across a message is one
 * base-6 digit per triple and encodes N = H(V) * q, where q carries the starting
 * counter and the true length, and H(V) is a length-sized hash of the seed used
 * as a (weak, forgeable) checksum.  A triple with a repeated character is an
 * invalid delimiter: a fresh random one marks each 30-symbol block boundary and
 * the end of the real content when padding follows (the message then ends with
 * another delimiter).  The decoder never expects a particular delimiter, only
 * the invalid shape; it splits the stream wherever one appears and throws away
 * the filler segment.
 */

import { sha256 } from "@noble/hashes/sha2";
import { hmac } from "@noble/hashes/hmac";

export const NAME = "Ezeoke Encryption";
export const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  " 0123456789" +
  "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // 95 plaintext symbols
export const POOL =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // ciphertext characters
export const BLOCK = 30;
export const SEED_BITS = 128n;
export const METADATA_BITS = 64n;
export const MAX_H_BITS = 155; // ~60 base-6 digits
export const MIN_H_BITS = 8;
export const LENGTH_BITS = 16;
const PERMS: readonly [number, number, number][] = [
  [0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0],
];

const U64_MOD = 1n << 64n;

export type EncodeResult = { ciphertext: string; nextCounter: number };
export type CounterResult = { text: string; counter: number };

/** Parse a hex seed string (whitespace and optional 0x prefix tolerated). */
export function parseSeed(seed: string): bigint {
  const hex = seed.replace(/\s+/g, "").replace(/^0[xX]/, "");
  if (!hex || /[^0-9a-fA-F]/.test(hex)) {
    throw new Error("seed must be a hex number");
  }
  return BigInt("0x" + hex) % (1n << SEED_BITS);
}

function seedBytes(seed: bigint): Uint8Array {
  const out = new Uint8Array(Number(SEED_BITS / 8n));
  let value = seed;
  for (let i = out.length - 1; i >= 0; i--) {
    out[i] = Number(value & 0xffn);
    value >>= 8n;
  }
  return out;
}

function bigintToBytes(value: bigint, length: number): Uint8Array {
  const out = new Uint8Array(length);
  let v = value;
  for (let i = length - 1; i >= 0; i--) {
    out[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return out;
}

function bytesToBigint(bytes: Uint8Array): bigint {
  let value = 0n;
  for (const byte of bytes) {
    value = (value << 8n) | BigInt(byte);
  }
  return value;
}

/** Deterministic dictionary key for a signed block counter value. */
function blockKey(seed: bigint, counter: bigint): Uint8Array {
  const value = ((seed + counter) % (1n << SEED_BITS) + (1n << SEED_BITS)) % (1n << SEED_BITS);
  return sha256(bigintToBytes(value, Number(SEED_BITS / 8n)));
}

function byteStream(key: Uint8Array, label: Uint8Array, length: number): Uint8Array {
  const out = new Uint8Array(length);
  let filled = 0;
  let step = 0;
  while (filled < length) {
    const input = new Uint8Array(label.length + 4);
    input.set(label);
    input.set(bigintToBytes(BigInt(step), 4), label.length);
    const digest = hmac(sha256, key, input);
    const take = Math.min(digest.length, length - filled);
    out.set(digest.subarray(0, take), filled);
    filled += take;
    step += 1;
  }
  return out;
}

/** Map every plaintext symbol to a set of three distinct pool characters. */
export function blockDictionary(seed: bigint, counter: bigint): Map<string, string> {
  const key = blockKey(seed, counter);
  let stream = byteStream(key, new TextEncoder().encode("dict"), 8192);
  let pos = 0;
  const used = new Set<string>();
  const table = new Map<string, string>();

  const take = (): number => {
    if (pos >= stream.length) {
      const bigger = byteStream(key, new TextEncoder().encode("dict"), stream.length + 8192);
      stream = bigger;
    }
    const byte = stream[pos];
    pos += 1;
    return byte;
  };

  for (const symbol of ALPHABET) {
    for (;;) {
      const chars: string[] = [];
      while (chars.length < 3) {
        const char = POOL[take() % POOL.length];
        if (!chars.includes(char)) chars.push(char);
      }
      const keySet = chars.slice().sort().join("");
      if (!used.has(keySet)) {
        used.add(keySet);
        table.set(symbol, keySet);
        break;
      }
    }
  }
  return table;
}

function rank(triple: string): number {
  const sorted = triple.split("").sort();
  const indexes = triple.split("").map((char) => sorted.indexOf(char));
  for (let i = 0; i < PERMS.length; i++) {
    if (PERMS[i][0] === indexes[0] && PERMS[i][1] === indexes[1] && PERMS[i][2] === indexes[2]) {
      return i;
    }
  }
  throw new Error("corrupt: not a permutation");
}

function makeTriple(sortedSet: string, digit: number): string {
  const perm = PERMS[digit];
  return perm.map((i) => sortedSet[i]).join("");
}

function randomByte(): number {
  return crypto.getRandomValues(new Uint8Array(1))[0];
}

function randbelow(n: number): number {
  const limit = Math.floor((4294967296 / n)) * n;
  const buf = new Uint32Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % n;
  }
}

function randbelowBig(n: bigint): bigint {
  const bits = n <= 1n ? 1n : BigInt(n.toString(2).length);
  const bytes = new Uint8Array(Number((bits + 7n) / 8n));
  const mask = (1n << bits) - 1n;
  for (;;) {
    crypto.getRandomValues(bytes);
    let value = 0n;
    for (const byte of bytes) value = (value << 8n) | BigInt(byte);
    value &= mask;
    if (value < n) return value;
  }
}

/** Any triple with a repeated character; shape is the only signal. */
function randomDelimiter(): string {
  const first = POOL[randbelow(POOL.length)];
  let second = POOL[randbelow(POOL.length)];
  while (second === first) second = POOL[randbelow(POOL.length)];
  const pattern = randbelow(3);
  if (pattern === 0) return first + first + second;
  if (pattern === 1) return first + second + first;
  return second + first + first;
}

/** A random valid triple (three distinct chars) ordered to encode `digit`. */
function randomValidTriple(digit: number): string {
  const chars: string[] = [];
  while (chars.length < 3) {
    const char = POOL[randbelow(POOL.length)];
    if (!chars.includes(char)) chars.push(char);
  }
  return makeTriple(chars.sort().join(""), digit);
}

function capacityBits(count: number): number {
  return (6n ** BigInt(count) - 1n).toString(2).length;
}

function metaH(count: number): number {
  return Math.min(capacityBits(count) - Number(METADATA_BITS), MAX_H_BITS);
}

function metaHash(seed: bigint, count: number, bits: number): bigint {
  const input = new Uint8Array(16 + 4 + 4);
  input.set(seedBytes(seed));
  input.set(bigintToBytes(BigInt(count), 4), 16);
  input.set(new TextEncoder().encode("meta"), 20);
  const value = bytesToBigint(sha256(input));
  return (value >> BigInt(256 - bits)) | (1n << BigInt(bits - 1));
}

function base6Digits(value: bigint, count: number): number[] {
  const digits: number[] = [];
  let v = value;
  for (let i = 0; i < count; i++) {
    digits.push(Number(v % 6n));
    v /= 6n;
  }
  if (v !== 0n) throw new Error("metadata does not fit the ciphertext");
  return digits;
}

function digitsToInt(digits: number[]): bigint {
  let value = 0n;
  for (let i = digits.length - 1; i >= 0; i--) {
    value = value * 6n + BigInt(digits[i]);
  }
  return value;
}

function encodeMetadata(counter: number, length: number): bigint {
  if (length >= 1 << LENGTH_BITS) throw new Error("message too long");
  const signBit = counter < 0 ? 1n : 0n;
  const abs = BigInt(Math.abs(counter));
  return (abs << (BigInt(LENGTH_BITS) + 1n)) | (signBit << BigInt(LENGTH_BITS)) | BigInt(length);
}

function decodeMetadata(payload: bigint): { counter: number; length: number } {
  const length = Number(payload & ((1n << BigInt(LENGTH_BITS)) - 1n));
  const signBit = Number((payload >> BigInt(LENGTH_BITS)) & 1n);
  const counter = Number(payload >> (BigInt(LENGTH_BITS) + 1n));
  return { counter: signBit ? -counter : counter, length };
}

/**
 * Return the encoded triple string and the next counter to use.
 * Throws on unsupported characters or oversized counters/messages.
 */
export function encode(seed: string | bigint, counter: number, text: string): EncodeResult {
  const seedValue = typeof seed === "bigint" ? seed % (1n << SEED_BITS) : parseSeed(seed);
  for (const char of text) {
    if (!ALPHABET.includes(char)) throw new Error(`unsupported character: ${JSON.stringify(char)}`);
  }
  const length = text.length;
  const payload = encodeMetadata(counter, length);
  if (payload >= U64_MOD) throw new Error("counter too large");

  let count = Math.max(1, length);
  let checksum = 0n;
  let total = 0n;
  for (;;) {
    const bits = metaH(count);
    if (bits >= MIN_H_BITS) {
      checksum = metaHash(seedValue, count, bits);
      const denom = 6n ** BigInt(count) - 1n;
      const maxFull = denom / checksum;
      if (payload <= maxFull) {
        const choices = (maxFull - payload) / U64_MOD;
        const full = payload + U64_MOD * randbelowBig(choices + 1n);
        const candidate = checksum * full;
        if (candidate < 6n ** BigInt(count)) {
          total = candidate;
          break;
        }
      }
    }
    count += 1;
  }

  const digits = base6Digits(total, count);
  const direction = counter < 0 ? -1 : 1;
  const contentBlocks = Math.max(1, Math.ceil(length / BLOCK));
  const pieces: string[] = [];
  let index = 0;
  for (let block = 0; block < contentBlocks; block++) {
    const table = blockDictionary(seedValue, BigInt(counter) + BigInt(direction * block));
    for (let i = 0; i < BLOCK; i++) {
      if (index >= length) break;
      pieces.push(makeTriple(table.get(text[index])!, digits[index]));
      index += 1;
    }
    if (block < contentBlocks - 1) pieces.push(randomDelimiter());
  }

  if (count > length) {
    pieces.push(randomDelimiter());
    for (let position = length; position < count; position++) {
      pieces.push(randomValidTriple(digits[position]));
    }
    pieces.push(randomDelimiter());
  }

  return { ciphertext: pieces.join(""), nextCounter: counter + direction * contentBlocks };
}

function isInvalidTriple(token: string): boolean {
  return new Set(token).size < 3;
}

function decodeInternal(seed: string | bigint, ciphertext: string): CounterResult {
  const seedValue = typeof seed === "bigint" ? seed % (1n << SEED_BITS) : parseSeed(seed);
  const text = ciphertext.replace(/\s+/g, "");
  if (!text || text.length % 3) throw new Error("corrupt: ciphertext length not a multiple of 3");
  const tokens: string[] = [];
  for (let i = 0; i < text.length; i += 3) tokens.push(text.slice(i, i + 3));

  const segments: string[][] = [];
  let current: string[] = [];
  for (const token of tokens) {
    if (isInvalidTriple(token)) {
      segments.push(current);
      current = [];
    } else {
      current.push(token);
    }
  }
  segments.push(current);
  const valid = segments.flat();
  if (!valid.length) throw new Error("corrupt: no valid triples");
  const count = valid.length;
  const trailingDelimiter = isInvalidTriple(tokens[tokens.length - 1]);

  const bits = metaH(count);
  if (bits < MIN_H_BITS) throw new Error("corrupt: not enough triples");
  const checksum = metaHash(seedValue, count, bits);
  const total = digitsToInt(valid.map(rank));
  if (total % checksum !== 0n) throw new Error("corrupt: checksum failed");
  const payload = (total / checksum) & (U64_MOD - 1n);
  const { counter, length } = decodeMetadata(payload);
  if (length > count) throw new Error("corrupt: length exceeds data");
  if (trailingDelimiter !== count > length) throw new Error("corrupt: padding marker mismatch");
  if (length === 0) return { text: "", counter };

  const nonempty = segments.filter((segment) => segment.length > 0);
  let contentSegments: string[][];
  if (count > length) {
    if (!nonempty.length) throw new Error("corrupt: missing content");
    contentSegments = [nonempty[0]];
  } else {
    contentSegments = nonempty;
  }
  if (contentSegments.reduce((sum, segment) => sum + segment.length, 0) !== length) {
    throw new Error("corrupt: content length mismatch");
  }

  const direction = counter < 0 ? -1 : 1;
  const cache = new Map<bigint, Map<string, string>>();
  const inverse = (blockCounter: bigint): Map<string, string> => {
    let inv = cache.get(blockCounter);
    if (!inv) {
      const table = blockDictionary(seedValue, blockCounter);
      inv = new Map();
      for (const [sym, set] of table) inv.set(set, sym);
      cache.set(blockCounter, inv);
    }
    return inv;
  };

  const out: string[] = [];
  let blockNumber = 0;
  for (const segment of contentSegments) {
    const table = inverse(BigInt(counter) + BigInt(direction * blockNumber));
    for (const token of segment) {
      const symbol = table.get(token.split("").sort().join(""));
      if (symbol === undefined) throw new Error("corrupt: unknown triple");
      out.push(symbol);
    }
    blockNumber += 1;
  }
  return { text: out.join(""), counter };
}

/** Recover the plaintext from a ciphertext produced by encode(). */
export function decode(seed: string | bigint, ciphertext: string): string {
  return decodeInternal(seed, ciphertext).text;
}

/** Recover the plaintext and the sending counter from a ciphertext. */
export function decodeWithCounter(seed: string | bigint, ciphertext: string): CounterResult {
  const { text, counter } = decodeInternal(seed, ciphertext);
  return { text, counter };
}

/**
 * Sign and next counter for replying to a just-received message.
 *
 * The reply always uses the opposite sign, one magnitude beyond the
 * counter the other author just used, so the two streams never overlap.
 */
export function replyState(receivedCounter: number): { sign: number; nextCounter: number } {
  const sign = receivedCounter >= 0 ? -1 : 1;
  return { sign, nextCounter: sign * (Math.abs(receivedCounter) + 1) };
}
