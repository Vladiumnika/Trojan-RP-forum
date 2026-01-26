import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Current directory:", process.cwd());
console.log("__dirname:", __dirname);

const result = dotenv.config();

if (result.error) {
  console.error("dotenv error:", result.error);
} else {
  console.log("dotenv parsed:", Object.keys(result.parsed));
}

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "****" : "missing");
