import crypto from "crypto";

const SECRET_KEY = crypto.createHash("sha256").update(process.env.OBFUSCATION_KEY).digest();
const iv = crypto.randomBytes(16);

export const encrypt = (routeId) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);
  let encrypted = cipher.update(routeId, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

export const decrypt = (cipherText) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
  let decryptedRoute = decipher.update(cipherText, "base64", "utf8");
  decryptedRoute += decipher.final("utf8");
  return decryptedRoute;
}