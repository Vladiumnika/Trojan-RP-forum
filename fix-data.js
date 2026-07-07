
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "data.json");

function normalizeDb(db) {
  // Fallback to empty object
  const fallback = {
    users: [],
    categories: [],
    threads: [],
    posts: [],
    email_verifications: [],
    password_resets: [],
    post_reports: [],
    notifications: [],
    polls: [],
    poll_options: [],
    poll_votes: [],
    private_messages: []
  };
  
  if (!db || typeof db !== "object") return fallback;
  
  return {
    users: Array.isArray(db.users) ? db.users : [],
    categories: Array.isArray(db.categories) ? db.categories : [],
    threads: Array.isArray(db.threads) ? db.threads : [],
    posts: Array.isArray(db.posts) ? db.posts : [],
    email_verifications: Array.isArray(db.email_verifications) ? db.email_verifications : [],
    password_resets: Array.isArray(db.password_resets) ? db.password_resets : [],
    post_reports: Array.isArray(db.post_reports) ? db.post_reports : [],
    notifications: Array.isArray(db.notifications) ? db.notifications : [],
    polls: Array.isArray(db.polls) ? db.polls : [],
    poll_options: Array.isArray(db.poll_options) ? db.poll_options : [],
    poll_votes: Array.isArray(db.poll_votes) ? db.poll_votes : [],
    private_messages: Array.isArray(db.private_messages) ? db.private_messages : []
  };
}

async function main() {
  console.log("Reading data from", DATA_PATH);
  const raw = await fs.readFile(DATA_PATH, "utf8");
  console.log("Raw data length:", raw.length);
  const data = JSON.parse(raw);
  console.log("Parsed data keys:", Object.keys(data));
  
  const normalized = normalizeDb(data);
  console.log("Normalized data keys:", Object.keys(normalized));
  
  // Ensure all users have the new fields (bio, etc.)
  normalized.users = normalized.users.map(u => ({
    ...u,
    bio: u.bio || null,
    totp_secret: u.totp_secret || null,
    twofa_enabled: u.twofa_enabled || false,
    twofa_prompt_required: u.twofa_prompt_required ?? true,
    refresh_token: u.refresh_token || null,
    refresh_expires: u.refresh_expires || null,
    notifications: u.notifications ?? true,
    avatar_url: u.avatar_url || null
  }));
  
  await fs.writeFile(DATA_PATH, JSON.stringify(normalized, null, 2));
  console.log("Data fixed successfully!");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
