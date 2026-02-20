// ═══════════════════════════════════════════════════════════
// PASSWORD HASHING — Cloudflare Workers compatible
// ═══════════════════════════════════════════════════════════
//
// WHY NOT bcryptjs?
// bcryptjs uses Node.js APIs that don't work in Cloudflare Workers.
// Instead, we use the Web Crypto API (PBKDF2) which is natively
// available in all edge runtimes (Cloudflare Workers, Deno, etc.)
//
// PBKDF2 = Password-Based Key Derivation Function 2
// It's a standard way to hash passwords, similar to bcrypt.
// We use 100,000 iterations with SHA-256, which is considered secure.
//
// FORMAT:
//   The stored hash looks like: "salt:hash"
//   Both salt and hash are hex-encoded strings.
//

/**
 * Hash a plain-text password using PBKDF2.
 * Returns a string in the format "salt:hash" (hex-encoded).
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate a random 16-byte salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Import the password as a CryptoKey
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  // Derive 32 bytes (256 bits) using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256 // 32 bytes
  );

  // Convert to hex strings for storage
  const saltHex = bufferToHex(salt);
  const hashHex = bufferToHex(new Uint8Array(derivedBits));

  return `${saltHex}:${hashHex}`;
}

/**
 * Verify a plain-text password against a stored hash.
 * Returns true if the password matches.
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const [saltHex, hashHex] = storedHash.split(":");
  if (!saltHex || !hashHex) return false;

  const salt = hexToBuffer(saltHex);

  // Import the password as a CryptoKey
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  // Derive bits with the same salt
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const newHashHex = bufferToHex(new Uint8Array(derivedBits));

  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(hashHex, newHashHex);
}

// ─── Helper functions ───

function bufferToHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
