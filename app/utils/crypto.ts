import crypto from "crypto";

const algorithm = "aes-256-cbc";
const IV_LENGTH = 16;

const key = Buffer.from(process.env.ENCRYPTION_KEY || "", "utf8");

if (key.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be exactly 32 bytes (32 characters)");
}

// Encrypt
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

// Decrypt
export function decrypt(encryptedText: string): string {
  const [ivHex, encryptedHex] = encryptedText.split(":");

  if (!ivHex || !encryptedHex) {
    throw new Error("Invalid encrypted text format");
  }

  const iv = Buffer.from(ivHex, "hex");
  const encryptedBuffer = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}