import crypto from "crypto";

export default function (password: crypto.BinaryLike): string {
  // hash password in md5 using crypto
  return crypto.createHash("md5").update(password).digest("hex");
}
