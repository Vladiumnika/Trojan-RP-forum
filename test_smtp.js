import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly
const envPath = path.join(__dirname, ".env");
console.log(`Loading .env from ${envPath}`);
dotenv.config({ path: envPath });

async function test() {
  console.log("Testing SMTP Configuration...");
  
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "0", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  
  console.log("Config:", {
    host,
    port,
    user,
    pass: pass ? "****" : "MISSING"
  });

  if (!host || !user || !pass) {
    console.error("❌ Missing configuration!");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }, // For debugging self-signed certs
    debug: true // Enable nodemailer debug output
  });

  try {
    console.log("Verifying connection (timeout 10s)...");
    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Connection timed out")), 10000);
        transporter.verify((error, success) => {
            clearTimeout(timeout);
            if (error) reject(error);
            else resolve(success);
        });
    });
    console.log("✅ Connection verified!");
    
    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: `"Test" <${user}>`,
      to: user, // Send to self
      subject: "SMTP Test from Local Debug",
      text: "If you see this, SMTP is working correctly."
    });
    console.log("✅ Email sent!", info.messageId);
  } catch (err) {
    console.error("❌ SMTP Error:", err);
    if (err.code === 'EAUTH') {
      console.error("💡 Check your username and password. For ABV/Gmail, you might need an App Password.");
    } else if (err.code === 'ESOCKET') {
      console.error("💡 Connection failed. Check host and port. Firewalls might block port 25/465/587.");
    }
  }
}

test();
