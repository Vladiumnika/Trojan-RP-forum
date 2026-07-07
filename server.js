import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import mysql from "mysql2/promise";
import { authenticator } from "otplib";
import sharp from "sharp";
import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the script's directory
const envPath = path.join(__dirname, ".env");
console.log(`[Prestige RP] Attempting to load .env from ${envPath}`);
const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  // Only log error if it's NOT a missing file error (ENOENT is common in prod)
  if (envResult.error.code !== 'ENOENT') {
    console.error("[Prestige RP] Error loading .env:", envResult.error);
  } else {
    console.log("[Prestige RP] .env file not found, relying on system environment variables.");
  }
} else {
  console.log("[Prestige RP] .env loaded successfully.");
}

console.log("[Prestige RP] SMTP Config Check:", {
  host: process.env.SMTP_HOST ? "(set)" : "(missing)",
  user: process.env.SMTP_USER ? "(set)" : "(missing)",
  port: process.env.SMTP_PORT
});

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Render/Nginx)
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const DATA_DIR = process.env.DATA_DIR || __dirname;
const DATA_PATH = path.join(DATA_DIR, "data.json");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const DB_TYPE = "json";
console.log(`[Prestige RP] Storage: ${DB_TYPE}`);
let MYSQL_READY = false;

let pool = null;
async function ensureTables() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user','moderator','admin') NOT NULL,
    is_confirmed TINYINT(1) DEFAULT 0,
    banned TINYINT(1) DEFAULT 0,
    locale VARCHAR(5),
    avatar_url VARCHAR(255),
    notifications TINYINT(1) DEFAULT 1,
    created_at BIGINT NOT NULL,
    bio TEXT,
    totp_secret VARCHAR(255),
    twofa_enabled TINYINT(1) DEFAULT 0,
    twofa_prompt_required TINYINT(1) DEFAULT 1,
    refresh_token VARCHAR(255),
    refresh_expires BIGINT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  try { await pool.query(`ALTER TABLE users ADD COLUMN bio TEXT`); } catch (e) {}
  try { await pool.query(`ALTER TABLE users ADD COLUMN totp_secret VARCHAR(255)`); } catch (e) {}
  try { await pool.query(`ALTER TABLE users ADD COLUMN twofa_enabled TINYINT(1) DEFAULT 0`); } catch (e) {}
  try { await pool.query(`ALTER TABLE users ADD COLUMN twofa_prompt_required TINYINT(1) DEFAULT 1`); } catch (e) {}
  try { await pool.query(`ALTER TABLE users ADD COLUMN refresh_token VARCHAR(255)`); } catch (e) {}
  try { await pool.query(`ALTER TABLE users ADD COLUMN refresh_expires BIGINT`); } catch (e) {}
  await pool.query(`CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    parent_id VARCHAR(36) NULL,
    name VARCHAR(255) NOT NULL,
    locked TINYINT(1) DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  try { await pool.query(`ALTER TABLE categories ADD COLUMN parent_id VARCHAR(36) NULL`); } catch (e) {}
  await pool.query(`CREATE TABLE IF NOT EXISTS threads (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author_id VARCHAR(36) NOT NULL,
    views BIGINT NOT NULL DEFAULT 0,
    locked TINYINT(1) DEFAULT 0,
    pinned TINYINT(1) DEFAULT 0,
    created_at BIGINT NOT NULL,
    CONSTRAINT fk_threads_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    CONSTRAINT fk_threads_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS thread_tags (
    thread_id VARCHAR(36) NOT NULL,
    tag VARCHAR(64) NOT NULL,
    PRIMARY KEY (thread_id, tag),
    CONSTRAINT fk_tags_thread FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(36) PRIMARY KEY,
    thread_id VARCHAR(36) NOT NULL,
    author_id VARCHAR(36) NOT NULL,
    content MEDIUMTEXT NOT NULL,
    attachments MEDIUMTEXT,
    created_at BIGINT NOT NULL,
    CONSTRAINT fk_posts_thread FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS post_reactions (
    post_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(16) NOT NULL,
    PRIMARY KEY (post_id, user_id, type),
    CONSTRAINT fk_react_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_react_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS post_likes (
    post_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at BIGINT NOT NULL,
    PRIMARY KEY (post_id, user_id),
    CONSTRAINT fk_like_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_like_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS post_reports (
    id VARCHAR(36) PRIMARY KEY,
    post_id VARCHAR(36) NOT NULL,
    reporter_id VARCHAR(36) NOT NULL,
    reason VARCHAR(255),
    created_at BIGINT NOT NULL,
    CONSTRAINT fk_report_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_report_user FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  try { await pool.query(`ALTER TABLE threads ADD COLUMN views BIGINT NOT NULL DEFAULT 0`); } catch (e) {}
  await pool.query(`CREATE TABLE IF NOT EXISTS email_verifications (
    token VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    expires_at BIGINT NOT NULL,
    CONSTRAINT fk_ev_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS password_resets (
    token VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    expires_at BIGINT NOT NULL,
    CONSTRAINT fk_pr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    content TEXT,
    data TEXT,
    read_at BIGINT,
    created_at BIGINT NOT NULL,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS polls (
    id VARCHAR(36) PRIMARY KEY,
    thread_id VARCHAR(36) NOT NULL,
    question VARCHAR(255) NOT NULL,
    author_id VARCHAR(36) NOT NULL,
    created_at BIGINT NOT NULL,
    expires_at BIGINT,
    CONSTRAINT fk_poll_thread FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    CONSTRAINT fk_poll_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS poll_options (
    id VARCHAR(36) PRIMARY KEY,
    poll_id VARCHAR(36) NOT NULL,
    text VARCHAR(255) NOT NULL,
    CONSTRAINT fk_option_poll FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS poll_votes (
    poll_id VARCHAR(36) NOT NULL,
    option_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at BIGINT NOT NULL,
    PRIMARY KEY (poll_id, user_id),
    CONSTRAINT fk_vote_poll FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_option FOREIGN KEY (option_id) REFERENCES poll_options(id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS private_messages (
    id VARCHAR(36) PRIMARY KEY,
    sender_id VARCHAR(36) NOT NULL,
    receiver_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    read_at BIGINT,
    created_at BIGINT NOT NULL,
    CONSTRAINT fk_msg_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_msg_receiver FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
}
async function initMySQL() {
  const host = process.env.MYSQL_HOST || "localhost";
  const port = parseInt(process.env.MYSQL_PORT || "3306", 10);
  const user = process.env.MYSQL_USER || "root";
  const password = process.env.MYSQL_PASS || "";
  const database = process.env.MYSQL_DB || "prestige_forum";
  const useSsl = (process.env.MYSQL_SSL || "false").toLowerCase() === "true";
  const allowSelfSigned = (process.env.MYSQL_SSL_ALLOW_SELF_SIGNED || "false").toLowerCase() === "true";
  const ssl = useSsl ? (allowSelfSigned ? { rejectUnauthorized: false } : {}) : undefined;
  pool = mysql.createPool({ host, port, user, password, database, waitForConnections: true, connectionLimit: 10, queueLimit: 0, namedPlaceholders: true, ...(ssl ? { ssl } : {}) });
  console.log(`[Prestige RP] Connecting to MySQL at ${host}:${port}...`);
  try {
    await ensureTables();
    console.log("[Prestige RP] MySQL connected and tables verified.");
    MYSQL_READY = true;
  } catch (e) {
    console.error("[Prestige RP] MySQL Connection Error:", e.message);
    if (e?.code === "ER_BAD_DB_ERROR") {
      console.log("[Prestige RP] Database not found, attempting to create...");
      const conn = await mysql.createConnection({ host, port, user, password, ...(ssl ? { ssl } : {}) });
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await conn.end();
      console.log("[Prestige RP] Database created.");
      pool = mysql.createPool({ host, port, user, password, database, waitForConnections: true, connectionLimit: 10, queueLimit: 0, namedPlaceholders: true, ...(ssl ? { ssl } : {}) });
      await ensureTables();
      MYSQL_READY = true;
    } else {
      throw e;
    }
  }
}
if (DB_TYPE === "mysql") {
  try {
    await initMySQL();
    const [[uc]] = await pool.query("SELECT COUNT(*) as c FROM users");
    const [[cc]] = await pool.query("SELECT COUNT(*) as c FROM categories");
    const [[tc]] = await pool.query("SELECT COUNT(*) as c FROM threads");
    const [[pc]] = await pool.query("SELECT COUNT(*) as c FROM posts");
    if ((uc.c + cc.c + tc.c + pc.c) === 0) {
      const db = await readDB();
      for (const u of db.users) {
        await pool.query("INSERT INTO users (id,email,username,password_hash,role,is_confirmed,banned,locale,avatar_url,notifications,created_at) VALUES (:id,:email,:username,:password_hash,:role,:is_confirmed,:banned,:locale,:avatar_url,:notifications,:created_at)", {
          id: u.id, email: u.email, username: u.username, password_hash: u.password_hash, role: u.role, is_confirmed: u.is_confirmed ? 1 : 0, banned: u.banned ? 1 : 0, locale: u.locale || "ru", avatar_url: u.avatar_url || null, notifications: u.notifications ? 1 : 0, created_at: u.created_at || Date.now()
        });
      }
      for (const c of db.categories) {
        await pool.query("INSERT INTO categories (id,name,locked) VALUES (:id,:name,:locked)", { id: c.id, name: c.name, locked: c.locked ? 1 : 0 });
      }
      for (const t of db.threads) {
        await pool.query("INSERT INTO threads (id,category_id,title,author_id,locked,pinned,created_at) VALUES (:id,:category_id,:title,:author_id,:locked,:pinned,:created_at)", {
          id: t.id, category_id: t.category_id, title: t.title, author_id: t.author_id, locked: t.locked ? 1 : 0, pinned: t.pinned ? 1 : 0, created_at: t.created_at || Date.now()
        });
        const tags = Array.isArray(t.tags) ? t.tags : [];
        for (const tag of tags) {
          await pool.query("INSERT INTO thread_tags (thread_id,tag) VALUES (:id,:tag)", { id: t.id, tag });
        }
      }
      for (const p of db.posts) {
        await pool.query("INSERT INTO posts (id,thread_id,author_id,content,attachments,created_at) VALUES (:id,:thread_id,:author_id,:content,:attachments,:created_at)", {
          id: p.id, thread_id: p.thread_id, author_id: p.author_id, content: p.content, attachments: JSON.stringify(p.attachments || []), created_at: p.created_at || Date.now()
        });
        const reactions = Array.isArray(p.reactions) ? p.reactions : [];
        for (const r of reactions) {
          await pool.query("INSERT IGNORE INTO post_reactions (post_id,user_id,type) VALUES (:pid,:uid,:type)", { pid: p.id, uid: r.user_id, type: r.type || "like" });
        }
      }
      for (const ev of db.email_verifications) {
        await pool.query("INSERT INTO email_verifications (token,user_id,expires_at) VALUES (:token,:user_id,:expires_at)", { token: ev.token, user_id: ev.user_id, expires_at: ev.expires_at });
      }
      for (const pr of db.password_resets) {
        await pool.query("INSERT INTO password_resets (token,user_id,expires_at) VALUES (:token,:user_id,:expires_at)", { token: pr.token, user_id: pr.user_id, expires_at: pr.expires_at });
      }
      console.log("[Prestige RP] Migrated JSON data to MySQL");
    }
  } catch (err) {
    console.error("[Prestige RP] MySQL init failed, falling back to JSON storage:", err?.code || err?.message || err);
    MYSQL_READY = false;
  }
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));
app.use((req, res, next) => {
  if (/\.(js|css|html)$/.test(req.path)) {
    res.set("Cache-Control", "no-store");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }
  next();
});
app.get(["/", "/index.html"], async (req, res) => {
  try {
    const htmlPath = path.join(__dirname, "index.html");
    let html = await fs.readFile(htmlPath, "utf-8");
    const base = linkBaseFor(req);
    html = html.replace(/__RUNTIME_API_BASE__/g, base);
    if (html.includes("</head>")) {
      html = html.replace("</head>", `<script>window.API_BASE=${JSON.stringify(base)};</script>\n</head>`);
    }
    res.set("Content-Type", "text/html; charset=utf-8");
    res.set("Cache-Control", "no-store");
    res.send(html);
  } catch {
    res.sendFile(path.join(__dirname, "index.html"));
  }
});
app.get("/login", async (req, res) => {
  try {
    const htmlPath = path.join(__dirname, "index.html");
    let html = await fs.readFile(htmlPath, "utf-8");
    const base = linkBaseFor(req);
    html = html.replace(/__RUNTIME_API_BASE__/g, base);
    if (html.includes("</head>")) {
      html = html.replace("</head>", `<script>window.API_BASE=${JSON.stringify(base)};</script>\n</head>`);
    }
    res.set("Content-Type", "text/html; charset=utf-8");
    res.set("Cache-Control", "no-store");
    res.send(html);
  } catch {
    res.sendFile(path.join(__dirname, "index.html"));
  }
});
app.use(express.static(__dirname, { etag: false, lastModified: false, cacheControl: false, maxAge: 0 }));
app.use("/uploads", express.static(UPLOAD_DIR));

function computeBaseUrl(req) {
  const proto = (req.headers["x-forwarded-proto"] || req.protocol || "http");
  const host = (req.headers["x-forwarded-host"] || req.get("host") || `localhost:${PORT}`);
  return `${proto}://${host}`;
}
function linkBaseFor(req) {
  const envBase = (process.env.BASE_URL || "").trim();
  if (!envBase) return computeBaseUrl(req);
  if (/localhost|127\.0\.0\.1/.test(envBase)) return computeBaseUrl(req);
  return envBase;
}

async function readDB() {
  const remoteUrl = (process.env.JSON_REMOTE_URL || "").trim();
  if (remoteUrl) {
    try {
      const headers = buildRemoteHeaders();
      const r = await safeFetch(remoteUrl, { method: "GET", headers });
      if (r.ok) {
        let body = await r.json();
        if (body && typeof body === "object" && body.record && typeof body.record === "object") {
          body = body.record;
        }
        const norm = normalizeDb(body);
        try {
          const tmp = DATA_PATH + ".tmp";
          await fs.writeFile(tmp, JSON.stringify(norm, null, 2), "utf-8");
          await fs.rename(tmp, DATA_PATH);
        } catch {}
        return norm;
      }
    } catch (e) {
      console.warn("[Prestige RP] Remote JSON read failed:", e?.message || e);
    }
  }
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error("[Prestige RP] DB Read Error (backing up):", e.message);
      try { await fs.copyFile(DATA_PATH, DATA_PATH + ".bak"); } catch {}
    }
    const db = { users: [], categories: [], threads: [], posts: [], email_verifications: [], password_resets: [], post_reports: [] };
    await writeDB(db);
    return db;
  }
}
async function writeDB(db) {
  const json = JSON.stringify(db, null, 2);
  const tmp = DATA_PATH + ".tmp";
  await fs.writeFile(tmp, json, "utf-8");
  await fs.rename(tmp, DATA_PATH);
  const remoteUrl = (process.env.JSON_REMOTE_URL || "").trim();
  if (remoteUrl) {
    try {
      const method = (process.env.JSON_REMOTE_METHOD || "PUT").toUpperCase();
      const headers = { "Content-Type": "application/json", ...buildRemoteHeaders() };
      await safeFetch(remoteUrl, { method, headers, body: json });
    } catch (e) {
      console.warn("[Prestige RP] Remote JSON write failed:", e?.message || e);
    }
  }
}

function uid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function authMiddleware(req, res, next) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer (.+)$/);
  if (!m) return res.status(401).json({ error: "Unauthorized" });
  try {
    const payload = jwt.verify(m[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
function requireConfirmed(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}
function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  next();
}

function buildRemoteHeaders() {
  const h = {};
  const headerName = (process.env.JSON_REMOTE_HEADER || "").trim();
  const headerValue = (process.env.JSON_REMOTE_KEY || "").trim();
  const token = (process.env.JSON_REMOTE_TOKEN || "").trim();
  if (headerName && headerValue) h[headerName] = headerValue;
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}
function normalizeDb(db) {
  const empty = { users: [], categories: [], threads: [], posts: [], email_verifications: [], password_resets: [], post_reports: [], notifications: [], polls: [], poll_options: [], poll_votes: [], private_messages: [] };
  try {
    return {
      users: Array.isArray(db?.users) ? db.users : [],
      categories: Array.isArray(db?.categories) ? db.categories : [],
      threads: Array.isArray(db?.threads) ? db.threads : [],
      posts: Array.isArray(db?.posts) ? db.posts : [],
      email_verifications: Array.isArray(db?.email_verifications) ? db.email_verifications : [],
      password_resets: Array.isArray(db?.password_resets) ? db.password_resets : [],
      post_reports: Array.isArray(db?.post_reports) ? db.post_reports : [],
      notifications: Array.isArray(db?.notifications) ? db.notifications : [],
      polls: Array.isArray(db?.polls) ? db.polls : [],
      poll_options: Array.isArray(db?.poll_options) ? db.poll_options : [],
      poll_votes: Array.isArray(db?.poll_votes) ? db.poll_votes : [],
      private_messages: Array.isArray(db?.private_messages) ? db.private_messages : []
    };
  } catch { return empty }
}
async function sendViaBrevo(to, subject, html) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SMTP_USER;
  if (!apiKey || !senderEmail) throw new Error("BREVO_API_KEY or SMTP_USER missing");
  const payload = {
    sender: { email: senderEmail, name: "Prestige RP" },
    to: [{ email: to }],
    subject,
    htmlContent: html
  };
  const doFetch = () => safeFetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "api-key": apiKey },
    body: JSON.stringify(payload)
  });
  let res = await doFetch();
  if (!res.ok && res.status === 502) {
    await new Promise(r => setTimeout(r, 1000));
    res = await doFetch();
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function sendViaResend(to, subject, html) {
  const apiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SMTP_USER || "noreply@prestige.local";
  if (!apiKey) throw new Error("RESEND_API_KEY missing");
  const res = await safeFetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: `Prestige RP <${senderEmail}>`,
      to: [to],
      subject,
      html
    })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sendViaSendGrid(to, subject, html) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const senderEmail = process.env.SMTP_USER || "noreply@prestige.local";
  if (!apiKey) throw new Error("SENDGRID_API_KEY missing");
  const res = await safeFetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: senderEmail, name: "Prestige RP" },
      subject,
      content: [{ type: "text/html", value: html }]
    })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

async function sendMail(to, subject, html) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "0", 10) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const allowSelfSigned = (process.env.SMTP_ALLOW_SELF_SIGNED || "false").toLowerCase() === "true";
  if (!host || !user || !pass) {
    if (process.env.BREVO_API_KEY) {
      await sendViaBrevo(to, subject, html);
      return;
    }
    console.log("[MAIL DEV] to:", to, "subject:", subject, "link:", html.replace(/<[^>]+>/g, ""));
    return;
  }
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000
  });
  try {
    await transporter.verify();
    console.log("[SMTP] Connection verified");
  } catch (err) {
    console.error("[SMTP] Verify failed:", err.message);
  }
  try {
    await transporter.sendMail({ from: `"Prestige RP" <${user}>`, to, subject, html });
    console.log(`[SMTP] Email sent to ${to}`);
  } catch (err) {
    console.error("[SMTP] Send failed:", err);
    const isTimeout = (err && (err.code === "ETIMEDOUT" || err.code === "ESOCKET")) || /timed out/i.test(String(err && err.message));
    if (isTimeout || (port === 465 && err && err.code === "ECONNREFUSED")) {
      const fallbackPort = port === 465 ? 587 : 465;
      console.warn(`[SMTP] Retrying via fallback port ${fallbackPort}...`);
      const fallbackTransporter = nodemailer.createTransport({
        host,
        port: fallbackPort,
        secure: fallbackPort === 465,
        auth: { user, pass },
        tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
        connectionTimeout: 10000,
        greetingTimeout: 5000,
        socketTimeout: 10000
      });
      try {
        await fallbackTransporter.verify();
        console.log("[SMTP] Fallback connection verified");
        await fallbackTransporter.sendMail({ from: `"Prestige RP" <${user}>`, to, subject, html });
        console.log(`[SMTP] Email sent to ${to} via fallback port ${fallbackPort}`);
        return;
      } catch (e2) {
        console.error("[SMTP] Fallback send failed:", e2);
        const canResend = !!process.env.RESEND_API_KEY;
        const canSendGrid = !!process.env.SENDGRID_API_KEY;
        const canBrevo = !!process.env.BREVO_API_KEY;
        if (canResend) {
          try {
            await sendViaResend(to, subject, html);
            console.log(`[SMTP] Email sent to ${to} via Resend API`);
            return;
          } catch (eApi) {
            console.error("[SMTP] Resend API send failed:", eApi);
          }
        }
        if (canSendGrid) {
          try {
            await sendViaSendGrid(to, subject, html);
            console.log(`[SMTP] Email sent to ${to} via SendGrid API`);
            return;
          } catch (eApi) {
            console.error("[SMTP] SendGrid API send failed:", eApi);
          }
        }
        if (canBrevo) {
          try {
            await sendViaBrevo(to, subject, html);
            console.log(`[SMTP] Email sent to ${to} via Brevo API`);
            return;
          } catch (eApi) {
            console.error("[SMTP] Brevo API send failed:", eApi);
          }
        }
        throw e2;
      }
    }
    const canResend = !!process.env.RESEND_API_KEY;
    const canSendGrid = !!process.env.SENDGRID_API_KEY;
    const canBrevo = !!process.env.BREVO_API_KEY;
    if (canResend) {
      try {
        await sendViaResend(to, subject, html);
        console.log(`[SMTP] Email sent to ${to} via Resend API`);
        return;
      } catch (eApi) {
        console.error("[SMTP] Resend API send failed:", eApi);
      }
    }
    if (canSendGrid) {
      try {
        await sendViaSendGrid(to, subject, html);
        console.log(`[SMTP] Email sent to ${to} via SendGrid API`);
        return;
      } catch (eApi) {
        console.error("[SMTP] SendGrid API send failed:", eApi);
      }
    }
    if (canBrevo) {
      try {
        await sendViaBrevo(to, subject, html);
        console.log(`[SMTP] Email sent to ${to} via Brevo API`);
        return;
      } catch (eApi) {
        console.error("[SMTP] Brevo API send failed:", eApi);
      }
    }
    throw err;
  }
}

function mailTemplate(locale, type, data) {
  const L = locale || "ru";
  const t = {
    ru: {
      confirm_subject: "Подтверждение регистрации Prestige RP",
      confirm_body: `Здравствуйте, ${data.username}!<br/>Перейдите по ссылке для подтверждения email: <a href="${data.link}">${data.link}</a>`,
      reset_subject: "Сброс пароля Prestige RP",
      reset_body: `Здравствуйте, ${data.username}!<br/>Для сброса пароля перейдите по ссылке: <a href="${data.link}">${data.link}</a>`
    },
    kk: {
      confirm_subject: "Prestige RP тіркеуді растау",
      confirm_body: `Сәлем, ${data.username}!<br/>Email растау үшін сілтеме: <a href="${data.link}">${data.link}</a>`,
      reset_subject: "Prestige RP құпиясөзді қалпына келтіру",
      reset_body: `Сәлем, ${data.username}!<br/>Құпиясөзді қалпына келтіру үшін сілтеме: <a href="${data.link}">${data.link}</a>`
    },
    uk: {
      confirm_subject: "Підтвердження реєстрації Prestige RP",
      confirm_body: `Вітаємо, ${data.username}!<br/>Підтвердьте email за посиланням: <a href="${data.link}">${data.link}</a>`,
      reset_subject: "Скидання пароля Prestige RP",
      reset_body: `Вітаємо, ${data.username}!<br/>Скиньте пароль за посиланням: <a href="${data.link}">${data.link}</a>`
    },
    bg: {
      confirm_subject: "Потвърждение на регистрация Prestige RP",
      confirm_body: `Здравей, ${data.username}!<br/>Потвърди имейла чрез линка: <a href="${data.link}">${data.link}</a>`,
      reset_subject: "Възстановяване на парола Prestige RP",
      reset_body: `Здравей, ${data.username}!<br/>За смяна на паролата отвори: <a href="${data.link}">${data.link}</a>`
    },
    en: {
      confirm_subject: "Prestige RP Registration Confirmation",
      confirm_body: `Hello, ${data.username}!<br/>Confirm your email via: <a href="${data.link}">${data.link}</a>`,
      reset_subject: "Prestige RP Password Reset",
      reset_body: `Hello, ${data.username}!<br/>Reset your password via: <a href="${data.link}">${data.link}</a>`
    }
  }[L];
  if (type === "confirm") return { subject: t.confirm_subject, html: `<p>${t.confirm_body}</p>` };
  if (type === "reset") return { subject: t.reset_subject, html: `<p>${t.reset_body}</p>` };
  if (type === "reply") return { subject: "Новий відгук / New reply", html: `<p>${data.username} ответил(а) в теме: ${data.threadTitle}</p>` };
  return { subject: "Prestige RP", html: "" };
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try { await fs.mkdir(UPLOAD_DIR, { recursive: true }) } catch {}
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const name = `${Date.now()}_${safeName}`;
    cb(null, name);
  }
});
async function safeFetch(url, options) {
  const f = globalThis.fetch;
  if (typeof f === "function") return f(url, options);
  const mod = await import("node-fetch");
  return mod.default(url, options);
}
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\//.test(file.mimetype);
    cb(ok ? null : new Error("Only images allowed"), ok);
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/api/meta", (req, res) => {
  const mode = MYSQL_READY ? "mysql" : (DB_TYPE === "mysql" ? "json_fallback" : "json");
  const smtp_ready = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  return res.json({
    ok: true,
    version: "v2-json-forced",
    mode,
    mysql_ready: MYSQL_READY,
    smtp_ready,
    mysql: MYSQL_READY ? {
      host: process.env.MYSQL_HOST || "localhost",
      port: parseInt(process.env.MYSQL_PORT || "3306", 10),
      db: process.env.MYSQL_DB || "prestige_forum"
    } : null
  });
});
app.post("/api/diag/mysql", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const host = process.env.MYSQL_HOST || "localhost";
    const port = parseInt(process.env.MYSQL_PORT || "3306", 10);
    const db = process.env.MYSQL_DB || "prestige_forum";
    if (!MYSQL_READY) return res.json({ ok: false, ready: false, error: "MySQL not ready" });
    await pool.query("SELECT 1");
    return res.json({ ok: true, ready: true, host, port, db });
  } catch (e) {
    return res.status(500).json({ ok: false, ready: true, error: e?.message || "MySQL failed" });
  }
});
app.post("/api/diag/smtp", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "0", 10) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const allowSelfSigned = (process.env.SMTP_ALLOW_SELF_SIGNED || "false").toLowerCase() === "true";
    if (!host || !user || !pass) {
      const missing = [];
      if (!host) missing.push("SMTP_HOST");
      if (!user) missing.push("SMTP_USER");
      if (!pass) missing.push("SMTP_PASS");
      console.error("[SMTP] Missing config:", missing.join(", "));
      return res.status(400).json({ error: "SMTP not configured: missing " + missing.join(", ") });
    }
    console.log(`[SMTP Diag] Testing with host=${host} user=${user} port=${port}`);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass },
      tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
      connectionTimeout: 10000, // 10s timeout
      greetingTimeout: 5000,
      socketTimeout: 10000
    });
    let usedPort = port;
    try {
      await transporter.verify();
    } catch (eVerify) {
      const isTimeout = (eVerify && (eVerify.code === "ETIMEDOUT" || eVerify.code === "ESOCKET")) || /timed out/i.test(String(eVerify && eVerify.message));
      if (isTimeout || (port === 465 && eVerify && eVerify.code === "ECONNREFUSED")) {
        const fallbackPort = port === 465 ? 587 : 465;
        console.warn(`[SMTP Diag] Verify failed on ${port}, retrying on ${fallbackPort}...`);
        const fallback = nodemailer.createTransport({
          host,
          port: fallbackPort,
          secure: fallbackPort === 465,
          auth: { user, pass },
          tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
          connectionTimeout: 10000,
          greetingTimeout: 5000,
          socketTimeout: 10000
        });
        try {
          await fallback.verify();
          usedPort = fallbackPort;
          const to = (req.body && req.body.email) || user;
          await fallback.sendMail({
            from: `"Prestige RP" <${user}>`,
            to,
            subject: "SMTP Test Prestige RP",
            html: "<p>SMTP тест успешно (fallback).</p>"
          });
          return res.json({ ok: true, verified: true, sent_to: to, port: usedPort, fallback: true });
        } catch (eFallback) {
          console.warn(`[SMTP Diag] Fallback verify failed on ${fallbackPort}: ${eFallback?.message || eFallback}`);
          const canResend = !!process.env.RESEND_API_KEY;
          const canSendGrid = !!process.env.SENDGRID_API_KEY;
          const canBrevo = !!process.env.BREVO_API_KEY;
          if (canResend) {
            const to = (req.body && req.body.email) || user;
            await sendViaResend(to, "SMTP Test Prestige RP", "<p>SMTP тест успешно (Resend).</p>");
            return res.json({ ok: true, verified: true, sent_to: to, provider: "resend" });
          }
          if (canSendGrid) {
            const to = (req.body && req.body.email) || user;
            await sendViaSendGrid(to, "SMTP Test Prestige RP", "<p>SMTP тест успешно (SendGrid).</p>");
            return res.json({ ok: true, verified: true, sent_to: to, provider: "sendgrid" });
          }
          if (canBrevo) {
            const to = (req.body && req.body.email) || user;
            await sendViaBrevo(to, "SMTP Test Prestige RP", "<p>SMTP тест успешно (Brevo).</p>");
            return res.json({ ok: true, verified: true, sent_to: to, provider: "brevo" });
          }
          throw eFallback;
        }
      }
      const canResend = !!process.env.RESEND_API_KEY;
      const canSendGrid = !!process.env.SENDGRID_API_KEY;
      const canBrevo = !!process.env.BREVO_API_KEY;
      if (canResend) {
        const to = (req.body && req.body.email) || user;
        await sendViaResend(to, "SMTP Test Prestige RP", "<p>SMTP тест успешно (Resend).</p>");
        return res.json({ ok: true, verified: true, sent_to: to, provider: "resend" });
      }
      if (canSendGrid) {
        const to = (req.body && req.body.email) || user;
        await sendViaSendGrid(to, "SMTP Test Prestige RP", "<p>SMTP тест успешно (SendGrid).</p>");
        return res.json({ ok: true, verified: true, sent_to: to, provider: "sendgrid" });
      }
      if (canBrevo) {
        const to = (req.body && req.body.email) || user;
        await sendViaBrevo(to, "SMTP Test Prestige RP", "<p>SMTP тест успешно (Brevo).</p>");
        return res.json({ ok: true, verified: true, sent_to: to, provider: "brevo" });
      }
      throw eVerify;
    }
    const to = (req.body && req.body.email) || user;
    await transporter.sendMail({
      from: `"Prestige RP" <${user}>`,
      to,
      subject: "SMTP Test Prestige RP",
      html: "<p>SMTP тест успешно.</p>"
    });
    return res.json({ ok: true, verified: true, sent_to: to, port: usedPort, fallback: false });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "SMTP failed" });
  }
});

// Admin JSON export/import (only for JSON storage mode)
app.get("/api/db/export", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const db = await readDB();
    res.set("Content-Type", "application/json");
    res.json(db);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Export failed" });
  }
});
app.post("/api/db/import", authMiddleware, requireAdmin, async (req, res) => {
  const { db } = req.body || {};
  if (!db || typeof db !== "object") return res.status(400).json({ error: "Invalid payload" });
  const norm = {
    users: Array.isArray(db.users) ? db.users : [],
    categories: Array.isArray(db.categories) ? db.categories : [],
    threads: Array.isArray(db.threads) ? db.threads : [],
    posts: Array.isArray(db.posts) ? db.posts : [],
    email_verifications: Array.isArray(db.email_verifications) ? db.email_verifications : [],
    password_resets: Array.isArray(db.password_resets) ? db.password_resets : [],
    post_reports: Array.isArray(db.post_reports) ? db.post_reports : []
  };
  try {
    await writeDB(norm);
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Import failed" });
  }
});

app.post("/api/bootstrap/admin", async (req, res) => {
  try {
    const { secret, email, password, username, locale } = req.body || {};
    const initSecret = process.env.ADMIN_INIT_SECRET;
    if (!initSecret || secret !== initSecret) return res.status(403).json({ error: "Forbidden" });
    if (!email) return res.status(400).json({ error: "Missing email" });
    const name = username || "Админ";
    const loc = locale || "bg";
    const pass = password || "Admin12345";
    const password_hash = await bcrypt.hash(pass, 10);
    let id = null;
    if (MYSQL_READY) {
      const [rows] = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER(:email)", { email });
      if (!rows.length) {
        id = uid();
        await pool.query("INSERT INTO users (id,email,username,password_hash,role,is_confirmed,banned,locale,created_at) VALUES (:id,:email,:username,:password_hash,'admin',1,0,:locale,:created_at)", {
          id, email, username: name, password_hash, locale: loc, created_at: Date.now()
        });
      } else {
        id = rows[0].id;
        await pool.query("UPDATE users SET role='admin', is_confirmed=1, password_hash=:password_hash, username=:username, locale=:locale WHERE id=:id", {
          password_hash, username: name, locale: loc, id
        });
      }
    } else {
      const db = await readDB();
      db.users = Array.isArray(db.users) ? db.users : [];
      const u = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!u) {
        id = uid();
        db.users.push({ id, email, username: name, password_hash, role: "admin", is_confirmed: true, banned: false, locale: loc, created_at: Date.now() });
      } else {
        id = u.id;
        u.role = "admin";
        u.is_confirmed = true;
        u.password_hash = password_hash;
        u.username = name;
        u.locale = loc;
      }
      await writeDB(db);
    }
    const token = jwt.sign({ sub: id, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ ok: true, admin_email: email, temp_password: pass, token });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Bootstrap failed" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { email, username, password, locale } = req.body || {};
  if (!email || !password || !username) return res.status(400).json({ error: "Missing fields" });
  const smtp_ready = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT id FROM users WHERE LOWER(email)=LOWER(:email)", { email });
    if (rows.length) return res.status(409).json({ error: "Email exists" });
    const password_hash = await bcrypt.hash(password, 10);
    const [countRows] = await pool.query("SELECT COUNT(*) as c FROM users");
    const role = countRows[0].c === 0 ? "admin" : "user";
    const id = uid();
    await pool.query("INSERT INTO users (id,email,username,password_hash,role,is_confirmed,banned,locale,created_at) VALUES (:id,:email,:username,:password_hash,:role,0,0,:locale,:created_at)",
      { id, email, username, password_hash, role, locale: locale || "ru", created_at: Date.now() });
    const token = uid();
    const expires_at = Date.now() + 1000 * 60 * 60 * 24;
    await pool.query("INSERT INTO email_verifications (token,user_id,expires_at) VALUES (:token,:user_id,:expires_at)", { token, user_id: id, expires_at });
    const linkBase = linkBaseFor(req);
    const link = `${linkBase}/api/auth/confirm?token=${encodeURIComponent(token)}`;
    const { subject, html } = mailTemplate(locale || "ru", "confirm", { username, link });
    await sendMail(email, subject, html);
    return res.json({ message: "Registered. Check email to confirm.", smtp_ready });
  }
  const db = await readDB();
  const exists = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(409).json({ error: "Email exists" });
  const password_hash = await bcrypt.hash(password, 10);
  const user = { id: uid(), email, username, password_hash, role: db.users.length === 0 ? "admin" : "user", is_confirmed: false, banned: false, locale: locale || "ru", created_at: Date.now(), twofa_enabled: false, twofa_prompt_required: true };
  db.users.push(user);
  const token = uid();
  const expires_at = Date.now() + 1000 * 60 * 60 * 24;
  db.email_verifications.push({ token, user_id: user.id, expires_at });
  await writeDB(db);
  const linkBase = linkBaseFor(req);
  const link = `${linkBase}/api/auth/confirm?token=${encodeURIComponent(token)}`;
  const { subject, html } = mailTemplate(user.locale, "confirm", { username, link });
  await sendMail(email, subject, html);
  return res.json({ message: "Registered. Check email to confirm.", smtp_ready });
});

app.get("/api/auth/confirm", async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "Missing token" });
  if (MYSQL_READY) {
    const [vRows] = await pool.query("SELECT * FROM email_verifications WHERE token=:token", { token });
    if (!vRows.length) return res.status(404).json({ error: "Invalid token" });
    const v = vRows[0];
    if (v.expires_at < Date.now()) return res.status(410).json({ error: "Token expired" });
    await pool.query("UPDATE users SET is_confirmed=1 WHERE id=:user_id", { user_id: v.user_id });
    await pool.query("DELETE FROM email_verifications WHERE token=:token", { token });
    return res.json({ message: "Email confirmed" });
  }
  const db = await readDB();
  const v = db.email_verifications.find(ev => ev.token === token);
  if (!v) return res.status(404).json({ error: "Invalid token" });
  if (v.expires_at < Date.now()) return res.status(410).json({ error: "Token expired" });
  const u = db.users.find(u => u.id === v.user_id);
  if (!u) return res.status(404).json({ error: "User not found" });
  u.is_confirmed = true;
  db.email_verifications = db.email_verifications.filter(ev => ev.token !== token);
  await writeDB(db);
  return res.json({ message: "Email confirmed" });
});

app.post("/api/auth/resend-confirm", async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: "Missing email" });
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER(:email)", { email });
    if (!rows.length) return res.json({ ok: true });
    const u = rows[0];
    if (u.is_confirmed) return res.status(400).json({ error: "Already confirmed" });
    const token = uid();
    const expires_at = Date.now() + 1000 * 60 * 60 * 24;
    await pool.query("INSERT INTO email_verifications (token,user_id,expires_at) VALUES (:token,:user_id,:expires_at)", { token, user_id: u.id, expires_at });
    const linkBase = linkBaseFor(req);
    const link = `${linkBase}/api/auth/confirm?token=${encodeURIComponent(token)}`;
    const { subject, html } = mailTemplate(u.locale || "ru", "confirm", { username: u.username, link });
    await sendMail(email, subject, html);
    return res.json({ ok: true });
  }
  const db = await readDB();
  const u = db.users.find(x => x.email.toLowerCase() === email.toLowerCase());
  if (!u) return res.json({ ok: true });
  if (u.is_confirmed) return res.status(400).json({ error: "Already confirmed" });
  const token = uid();
  const expires_at = Date.now() + 1000 * 60 * 60 * 24;
  db.email_verifications.push({ token, user_id: u.id, expires_at });
  await writeDB(db);
  const linkBase = linkBaseFor(req);
  const link = `${linkBase}/api/auth/confirm?token=${encodeURIComponent(token)}`;
  const { subject, html } = mailTemplate(u.locale || "ru", "confirm", { username: u.username, link });
  await sendMail(email, subject, html);
  return res.json({ ok: true });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  const totp = (req.body && req.body.totp) || null;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER(:email)", { email });
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });
    const u = rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    if (u.banned) return res.status(403).json({ error: "User banned" });
    if (!u.is_confirmed) return res.status(403).json({ error: "Email not confirmed" });
    if (u.twofa_enabled) {
      if (!totp) return res.status(401).json({ error: "2FA required" });
      const okTotp = authenticator.verify({ token: totp, secret: u.totp_secret });
      if (!okTotp) return res.status(401).json({ error: "Invalid 2FA code" });
    }
    const token = jwt.sign({ sub: u.id, role: u.role }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ 
      token, 
      user: { 
        id: u.id, 
        email: u.email, 
        username: u.username, 
        role: u.role,
        avatar_url: u.avatar_url,
        bio: u.bio,
        notifications: !!u.notifications
      } 
    });
  }
  const db = await readDB();
  const u = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!u) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, u.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  if (u.banned) return res.status(403).json({ error: "User banned" });
  if (!u.is_confirmed) return res.status(403).json({ error: "Email not confirmed" });
  if (u.twofa_enabled) {
    if (!totp) return res.status(401).json({ error: "2FA required" });
    const okTotp = authenticator.verify({ token: totp, secret: u.totp_secret });
    if (!okTotp) return res.status(401).json({ error: "Invalid 2FA code" });
  }
  const token = jwt.sign({ sub: u.id, role: u.role }, JWT_SECRET, { expiresIn: "7d" });
  const refresh_token = uid();
  u.refresh_token = refresh_token;
  u.refresh_expires = Date.now() + 1000 * 60 * 60 * 24 * 30;
  await writeDB(db);
  return res.json({ 
    token, 
    refresh_token, 
    require_twofa_prompt: !u.twofa_enabled && !!u.twofa_prompt_required, 
    user: { 
      id: u.id, 
      email: u.email, 
      username: u.username, 
      role: u.role,
      avatar_url: u.avatar_url,
      bio: u.bio,
      notifications: !!u.notifications
    } 
  });
});



// Helper function to get all child category ids recursively
function getAllChildCategoryIds(categories, parentId) {
  const children = categories.filter(c => c.parent_id === parentId);
  let ids = children.map(c => c.id);
  children.forEach(c => {
    ids = ids.concat(getAllChildCategoryIds(categories, c.id));
  });
  return ids;
}

app.get("/api/categories", async (req, res) => {
  if (MYSQL_READY) {
    // For MySQL, let's get categories with threads_count and posts_count including subcategories
    const [categories] = await pool.query("SELECT * FROM categories ORDER BY name");
    const [threads] = await pool.query("SELECT id, category_id FROM threads");
    const [posts] = await pool.query("SELECT id, thread_id FROM posts");
    
    // Build category tree
    const catMap = {};
    categories.forEach(c => { catMap[c.id] = { ...c, children: [] }; });
    categories.forEach(c => {
      if (c.parent_id && catMap[c.parent_id]) {
        catMap[c.parent_id].children.push(catMap[c.id]);
      }
    });

    // Helper to calculate counts recursively (returns new object)
    const calculateCounts = (cat) => {
      let threadCount = threads.filter(t => t.category_id === cat.id).length;
      let postCount = 0;
      threads.filter(t => t.category_id === cat.id).forEach(t => {
        postCount += posts.filter(p => p.thread_id === t.id).length;
      });
      const processedChildren = cat.children.map(child => calculateCounts(child));
      processedChildren.forEach(child => {
        threadCount += child.threads_count;
        postCount += child.posts_count;
      });
      return { ...cat, threads_count: threadCount, posts_count: postCount, children: processedChildren };
    };

    // Pre-calculate all processed nodes in a map
    const processedMap = {};
    const processTree = (nodes) => {
      nodes.forEach(node => {
        const processed = calculateCounts(node);
        processedMap[processed.id] = processed;
        processTree(processed.children);
      });
    };
    const rootNodes = categories.filter(c => !c.parent_id).map(c => catMap[c.id]);
    processTree(rootNodes);

    // Process all categories
    const processedCategories = categories.map(c => {
      const processed = processedMap[c.id];
      if (processed) {
        return { ...c, threads_count: processed.threads_count, posts_count: processed.posts_count };
      }
      // Fallback if not found in map
      let threadCount = threads.filter(t => t.category_id === c.id).length;
      let postCount = 0;
      threads.filter(t => t.category_id === c.id).forEach(t => {
        postCount += posts.filter(p => p.thread_id === t.id).length;
      });
      return { ...c, threads_count: threadCount, posts_count: postCount };
    });

    return res.json(processedCategories);
  }
  const db = await readDB();
  
  // For JSON mode, calculate threads_count and posts_count including subcategories
  const processedCategories = db.categories.map(cat => {
    // Get all child category ids recursively
    const childIds = getAllChildCategoryIds(db.categories, cat.id);
    const allCategoryIds = [cat.id, ...childIds];
    
    // Count threads in all these categories
    const threadsCount = db.threads.filter(t => allCategoryIds.includes(t.category_id)).length;
    
    // Count posts in all those threads
    let postsCount = 0;
    db.threads.filter(t => allCategoryIds.includes(t.category_id)).forEach(t => {
      postsCount += db.posts.filter(p => p.thread_id === t.id).length;
    });
    
    return { ...cat, threads_count: threadsCount, posts_count: postsCount };
  });
  
  return res.json(processedCategories);
});
app.get("/api/stats", async (req, res) => {
  if (MYSQL_READY) {
    const [[{ c: categories }]] = await pool.query("SELECT COUNT(*) as c FROM categories");
    const [[{ c: threads }]] = await pool.query("SELECT COUNT(*) as c FROM threads");
    const [[{ c: posts }]] = await pool.query("SELECT COUNT(*) as c FROM posts");
    const [[{ c: users }]] = await pool.query("SELECT COUNT(*) as c FROM users");
    const [catRows] = await pool.query("SELECT c.id,c.parent_id,c.name,c.locked,(SELECT COUNT(*) FROM threads t WHERE t.category_id=c.id) AS threads_count FROM categories c ORDER BY name");
    return res.json({ totals: { categories, threads, posts, users }, categories: catRows });
  }
  const db = await readDB();
  const totals = { categories: db.categories.length, threads: db.threads.length, posts: db.posts.length, users: db.users.length };
  const categories = db.categories.map(c => ({ id: c.id, parent_id: c.parent_id || null, name: c.name, locked: !!c.locked, threads_count: db.threads.filter(t => t.category_id === c.id).length }));
  return res.json({ totals, categories });
});
app.get("/api/latest_posts", async (req, res) => {
  const size = Math.min(parseInt(req.query.size || "10", 10), 50);
  if (MYSQL_READY) {
    const [rows] = await pool.query(`
      SELECT p.id, p.thread_id, p.author_id, p.content, p.created_at,
             COALESCE(u.username,'unknown') AS author_username,
             t.title AS thread_title, t.category_id AS category_id
      FROM posts p
      LEFT JOIN users u ON u.id=p.author_id
      LEFT JOIN threads t ON t.id=p.thread_id
      ORDER BY p.created_at DESC
      LIMIT :size
    `, { size });
    return res.json(rows);
  }
  const db = await readDB();
  const posts = [...db.posts].sort((a,b)=>b.created_at - a.created_at).slice(0, size).map(p => {
    const author = db.users.find(u => u.id === p.author_id);
    const thread = db.threads.find(t => t.id === p.thread_id);
    return { ...p, author_username: author?.username || "unknown", thread_title: thread?.title || "", category_id: thread?.category_id || null };
  });
  return res.json(posts);
});
app.get("/api/users/:id/stats", async (req, res) => {
  if (MYSQL_READY) {
    const [[{ c: threads }]] = await pool.query("SELECT COUNT(*) as c FROM threads WHERE author_id=:id", { id: req.params.id });
    const [[{ c: posts }]] = await pool.query("SELECT COUNT(*) as c FROM posts WHERE author_id=:id", { id: req.params.id });
    return res.json({ threads, posts });
  }
  const db = await readDB();
  const threads = db.threads.filter(t => t.author_id === req.params.id).length;
  const posts = db.posts.filter(p => p.author_id === req.params.id).length;
  return res.json({ threads, posts });
});
app.post("/api/categories", authMiddleware, requireAdmin, async (req, res) => {
  const { name, parent_id } = req.body || {};
  if (!name) return res.status(400).json({ error: "Missing name" });
  const pid = (typeof parent_id === "string" && parent_id) ? parent_id : null;
  if (MYSQL_READY) {
    const id = uid();
    await pool.query("INSERT INTO categories (id,parent_id,name,locked) VALUES (:id,:pid,:name,0)", { id, pid, name });
    return res.json({ id, parent_id: pid, name, locked: 0 });
  }
  const db = await readDB();
  const c = { id: uid(), parent_id: pid, name };
  db.categories.push(c);
  await writeDB(db);
  return res.json(c);
});

app.post("/api/categories/:id/edit", authMiddleware, requireAdmin, async (req, res) => {
  const { name, parent_id } = req.body || {};
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Category not found" });
    const pid = parent_id !== undefined ? (parent_id || null) : rows[0].parent_id;
    await pool.query("UPDATE categories SET name=:name, parent_id=:pid WHERE id=:id", { id: req.params.id, name: name || rows[0].name, pid });
    const [rows2] = await pool.query("SELECT * FROM categories WHERE id=:id", { id: req.params.id });
    return res.json(rows2[0]);
  }
  const db = await readDB();
  const c = db.categories.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: "Category not found" });
  if (name) c.name = name;
  if (parent_id !== undefined) c.parent_id = parent_id || null;
  await writeDB(db);
  return res.json(c);
});
app.post("/api/categories/:id/delete", authMiddleware, requireAdmin, async (req, res) => {
  if (MYSQL_READY) {
    await pool.query("DELETE FROM categories WHERE id=:id", { id: req.params.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const c = db.categories.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: "Category not found" });
  db.categories = db.categories.filter(x => x.id !== c.id);
  db.threads = db.threads.filter(t => t.category_id !== c.id);
  db.posts = db.posts.filter(p => db.threads.find(t => t.id === p.thread_id));
  await writeDB(db);
  return res.json({ ok: true });
});
app.post("/api/categories/:id/lock", authMiddleware, requireAdmin, async (req, res) => {
  const { locked } = req.body || {};
  if (MYSQL_READY) {
    await pool.query("UPDATE categories SET locked=:locked WHERE id=:id", { locked: locked ? 1 : 0, id: req.params.id });
    return res.json({ ok: true, locked: !!locked });
  }
  const db = await readDB();
  const c = db.categories.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: "Category not found" });
  c.locked = !!locked;
  await writeDB(db);
  return res.json({ ok: true, locked: c.locked });
});
app.get("/api/categories/:id/threads", async (req, res) => {
  const categoryId = req.params.id;
  let categoryIdsToInclude = [];
  
  if (MYSQL_READY) {
    const [allCats] = await pool.query("SELECT id, parent_id FROM categories");
    categoryIdsToInclude = [categoryId, ...getAllChildCategoryIds(allCats, categoryId)];
    
    const placeholders = categoryIdsToInclude.map((_, i) => `:cid${i}`).join(",");
    const params = {};
    categoryIdsToInclude.forEach((cid, i) => params[`cid${i}`] = cid);
    
    const [rows] = await pool.query(`
      SELECT t.id, t.category_id, t.title, t.author_id, t.locked, t.pinned, t.created_at,
             (SELECT COUNT(*) FROM posts p WHERE p.thread_id=t.id) AS posts_count
      FROM threads t
      WHERE t.category_id IN (${placeholders})
      ORDER BY t.pinned DESC, t.created_at DESC
    `, params);
    return res.json(rows);
  }
  
  const db = await readDB();
  categoryIdsToInclude = [categoryId, ...getAllChildCategoryIds(db.categories, categoryId)];
  const list = db.threads.filter(t => categoryIdsToInclude.includes(t.category_id));
  const withCounts = list.map(t => ({ ...t, posts_count: db.posts.filter(p => p.thread_id === t.id).length }));
  return res.json(withCounts);
});
app.post("/api/threads", authMiddleware, requireConfirmed, rateLimit({ windowMs: 60_000, max: 5 }), async (req, res) => {
  const { categoryId, title, content } = req.body || {};
  if (!categoryId || !title || !content) return res.status(400).json({ error: "Missing fields" });
  if (MYSQL_READY) {
    const [uRows] = await pool.query("SELECT banned FROM users WHERE id=:id", { id: req.user.sub });
    if (!uRows.length || uRows[0].banned) return res.status(403).json({ error: "User banned" });
    const [cRows] = await pool.query("SELECT locked FROM categories WHERE id=:id", { id: categoryId });
    if (!cRows.length) return res.status(404).json({ error: "Category not found" });
    if (cRows[0].locked) return res.status(423).json({ error: "Category locked" });
    const tid = uid();
    const now = Date.now();
    await pool.query("INSERT INTO threads (id,category_id,title,author_id,created_at) VALUES (:id,:category_id,:title,:author_id,:created_at)", { id: tid, category_id: categoryId, title, author_id: req.user.sub, created_at: now });
    const pid = uid();
    await pool.query("INSERT INTO posts (id,thread_id,author_id,content,created_at) VALUES (:id,:thread_id,:author_id,:content,:created_at)", { id: pid, thread_id: tid, author_id: req.user.sub, content, created_at: now });
    return res.json({ id: tid, category_id: categoryId, title, author_id: req.user.sub, created_at: now });
  }
  const db = await readDB();
  const user = db.users.find(u => u.id === req.user.sub);
  if (user?.banned) return res.status(403).json({ error: "User banned" });
  const category = db.categories.find(c => c.id === categoryId);
  if (!category) return res.status(404).json({ error: "Category not found" });
  if (category.locked) return res.status(423).json({ error: "Category locked" });
  const t = { id: uid(), category_id: categoryId, title, author_id: req.user.sub, created_at: Date.now() };
  db.threads.push(t);
  const p = { id: uid(), thread_id: t.id, author_id: req.user.sub, content, created_at: Date.now() };
  db.posts.push(p);
  await writeDB(db);
  return res.json(t);
});

app.get("/api/threads/:id/posts", async (req, res) => {
  if (MYSQL_READY) {
    await pool.query("UPDATE threads SET views=views+1 WHERE id=:tid", { tid: req.params.id });
    const [rows] = await pool.query(`
      SELECT p.id, p.thread_id, p.author_id, p.content, p.created_at,
             COALESCE(u.username,'unknown') AS author_username
      FROM posts p
      LEFT JOIN users u ON u.id=p.author_id
      WHERE p.thread_id=:tid
      ORDER BY p.created_at ASC
    `, { tid: req.params.id });
    return res.json(rows.map(r => ({ ...r, attachments: JSON.parse(r.attachments || "[]") })));
  }
  const db = await readDB();
  const t = db.threads.find(x => x.id === req.params.id);
  if (t) t.views = (t.views || 0) + 1;
  const posts = db.posts.filter(p => p.thread_id === req.params.id).map(p => {
    const author = db.users.find(u => u.id === p.author_id);
    return { ...p, author_username: author?.username || "unknown" };
  });
  await writeDB(db);
  return res.json(posts);
});
app.post("/api/posts", authMiddleware, requireConfirmed, rateLimit({ windowMs: 60_000, max: 20 }), async (req, res) => {
  const { threadId, content, attachments } = req.body || {};
  if (!threadId || !content) return res.status(400).json({ error: "Missing fields" });
  if (MYSQL_READY) {
    const [uRows] = await pool.query("SELECT * FROM users WHERE id=:id", { id: req.user.sub });
    const user = uRows[0];
    if (!user || user.banned) return res.status(403).json({ error: "User banned" });
    const [tRows] = await pool.query("SELECT * FROM threads WHERE id=:id", { id: threadId });
    const thread = tRows[0];
    if (!thread) return res.status(404).json({ error: "Thread not found" });
    if (thread.locked) return res.status(423).json({ error: "Thread locked" });
    const id = uid();
    const now = Date.now();
    await pool.query("INSERT INTO posts (id,thread_id,author_id,content,attachments,created_at) VALUES (:id,:thread_id,:author_id,:content,:attachments,:created_at)",
      { id, thread_id: threadId, author_id: req.user.sub, content, attachments: JSON.stringify(Array.isArray(attachments) ? attachments : []), created_at: now });
    const [authorRows] = await pool.query("SELECT * FROM users WHERE id=:id", { id: thread.author_id });
    const author = authorRows[0];
    if (author && author.email && author.is_confirmed && !author.banned && author.id !== req.user.sub) {
      const { subject, html } = mailTemplate(author.locale, "reply", { username: user.username, threadTitle: thread.title });
      await sendMail(author.email, subject, html);
    }
    const result = { id, thread_id: threadId, author_id: req.user.sub, content, created_at: now, attachments: Array.isArray(attachments) ? attachments : [] };
    try { if (globalThis.wss) broadcast({ type: "new_post", post: result, thread: { id: thread.id, title: thread.title } }); } catch {}
    return res.json(result);
  }
  const db = await readDB();
  const user = db.users.find(u => u.id === req.user.sub);
  if (user?.banned) return res.status(403).json({ error: "User banned" });
  const thread = db.threads.find(t => t.id === threadId);
  if (!thread) return res.status(404).json({ error: "Thread not found" });
  if (thread.locked) return res.status(423).json({ error: "Thread locked" });
  const p = { id: uid(), thread_id: threadId, author_id: req.user.sub, content, created_at: Date.now(), attachments: Array.isArray(attachments) ? attachments : [], reactions: [] };
  db.posts.push(p);
  await writeDB(db);
  const author = db.users.find(u => u.id === thread.author_id);
  if (author && author.email && author.is_confirmed && !author.banned && author.id !== req.user.sub) {
    const { subject, html } = mailTemplate(author.locale, "reply", { username: user.username, threadTitle: thread.title });
    await sendMail(author.email, subject, html);
  }
  try { if (globalThis.wss) broadcast({ type: "new_post", post: p, thread: { id: thread.id, title: thread.title } }); } catch {}
  return res.json(p);
});

app.post("/api/threads/:id/edit", authMiddleware, async (req, res) => {
  const { title, tags } = req.body || {};
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM threads WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Thread not found" });
    const t = rows[0];
    if (!(req.user.role === "admin" || req.user.role === "moderator" || req.user.sub === t.author_id)) return res.status(403).json({ error: "Forbidden" });
    if (title) await pool.query("UPDATE threads SET title=:title WHERE id=:id", { title, id: req.params.id });
    if (Array.isArray(tags)) {
      const clean = tags.filter(s => typeof s === "string").slice(0, 10);
      await pool.query("DELETE FROM thread_tags WHERE thread_id=:id", { id: req.params.id });
      for (const tag of clean) {
        await pool.query("INSERT INTO thread_tags (thread_id,tag) VALUES (:id,:tag)", { id: req.params.id, tag });
      }
    }
    const [rows2] = await pool.query("SELECT * FROM threads WHERE id=:id", { id: req.params.id });
    return res.json(rows2[0]);
  }
  const db = await readDB();
  const t = db.threads.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Thread not found" });
  if (!(req.user.role === "admin" || req.user.role === "moderator" || req.user.sub === t.author_id)) return res.status(403).json({ error: "Forbidden" });
  if (title) t.title = title;
  if (Array.isArray(tags)) t.tags = tags.filter(s => typeof s === "string").slice(0, 10);
  await writeDB(db);
  return res.json(t);
});
app.post("/api/threads/:id/delete", authMiddleware, async (req, res) => {
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM threads WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Thread not found" });
    if (!(req.user.role === "admin" || req.user.role === "moderator")) return res.status(403).json({ error: "Forbidden" });
    await pool.query("DELETE FROM threads WHERE id=:id", { id: req.params.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const t = db.threads.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Thread not found" });
  if (!(req.user.role === "admin" || req.user.role === "moderator")) return res.status(403).json({ error: "Forbidden" });
  db.threads = db.threads.filter(x => x.id !== t.id);
  db.posts = db.posts.filter(p => p.thread_id !== t.id);
  await writeDB(db);
  return res.json({ ok: true });
});
app.post("/api/posts/:id/edit", authMiddleware, async (req, res) => {
  const { content } = req.body || {};
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM posts WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Post not found" });
    const p = rows[0];
    if (!(req.user.role === "admin" || req.user.role === "moderator" || req.user.sub === p.author_id)) return res.status(403).json({ error: "Forbidden" });
    await pool.query("UPDATE posts SET content=:content WHERE id=:id", { content, id: req.params.id });
    const [rows2] = await pool.query("SELECT * FROM posts WHERE id=:id", { id: req.params.id });
    return res.json(rows2[0]);
  }
  const db = await readDB();
  const p = db.posts.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Post not found" });
  if (!(req.user.role === "admin" || req.user.role === "moderator" || req.user.sub === p.author_id)) return res.status(403).json({ error: "Forbidden" });
  if (content) p.content = content;
  await writeDB(db);
  return res.json(p);
});
app.post("/api/posts/:id/delete", authMiddleware, async (req, res) => {
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM posts WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Post not found" });
    const p = rows[0];
    if (!(req.user.role === "admin" || req.user.role === "moderator" || req.user.sub === p.author_id)) return res.status(403).json({ error: "Forbidden" });
    await pool.query("DELETE FROM posts WHERE id=:id", { id: req.params.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const p = db.posts.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Post not found" });
  if (!(req.user.role === "admin" || req.user.role === "moderator" || req.user.sub === p.author_id)) return res.status(403).json({ error: "Forbidden" });
  db.posts = db.posts.filter(x => x.id !== p.id);
  await writeDB(db);
  return res.json({ ok: true });
});

app.post("/api/posts/:id/react", authMiddleware, async (req, res) => {
  const { type } = req.body || {};
  if (MYSQL_READY) {
    const t = type || "like";
    const [rows] = await pool.query("SELECT * FROM post_reactions WHERE post_id=:pid AND user_id=:uid AND type=:type", { pid: req.params.id, uid: req.user.sub, type: t });
    if (rows.length) {
      await pool.query("DELETE FROM post_reactions WHERE post_id=:pid AND user_id=:uid AND type=:type", { pid: req.params.id, uid: req.user.sub, type: t });
    } else {
      await pool.query("INSERT INTO post_reactions (post_id,user_id,type) VALUES (:pid,:uid,:type)", { pid: req.params.id, uid: req.user.sub, type: t });
    }
    const [countRows] = await pool.query("SELECT COUNT(*) as c FROM post_reactions WHERE post_id=:pid AND type=:type", { pid: req.params.id, type: t });
    return res.json({ count: countRows[0].c });
  }
  const db = await readDB();
  const p = db.posts.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Post not found" });
  p.reactions = p.reactions || [];
  const existing = p.reactions.find(r => r.user_id === req.user.sub && r.type === (type || "like"));
  if (existing) p.reactions = p.reactions.filter(r => !(r.user_id === req.user.sub && r.type === (type || "like")));
  else p.reactions.push({ user_id: req.user.sub, type: type || "like" });
  await writeDB(db);
  return res.json({ count: p.reactions.filter(r => r.type === (type || "like")).length });
});

app.post("/api/posts/:id/report", authMiddleware, async (req, res) => {
  const { reason } = req.body || {};
  if (MYSQL_READY) {
    const id = uid();
    await pool.query("INSERT INTO post_reports (id,post_id,reporter_id,reason,created_at) VALUES (:id,:pid,:rid,:reason,:ts)", { id, pid: req.params.id, rid: req.user.sub, reason: (reason || "").slice(0,255), ts: Date.now() });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const p = db.posts.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Post not found" });
  const r = { id: uid(), post_id: p.id, reporter_id: req.user.sub, reason: (reason || ""), created_at: Date.now() };
  db.post_reports = db.post_reports || [];
  db.post_reports.push(r);
  await writeDB(db);
  return res.json({ ok: true });
});
app.post("/api/upload", authMiddleware, rateLimit({ windowMs: 60_000, max: 5 }), upload.array("files", 4), async (req, res) => {
  const files = [];
  for (const f of (req.files || [])) {
    const url = `/uploads/${f.filename}`;
    let thumb = null;
    try {
      const thumbName = `thumb_${f.filename}`;
      const thumbPath = path.join(UPLOAD_DIR, thumbName);
      await sharp(path.join(UPLOAD_DIR, f.filename)).resize(256, 256, { fit: "inside" }).toFile(thumbPath);
      thumb = `/uploads/${thumbName}`;
    } catch {}
    files.push({ url, name: f.originalname, thumb });
  }
  return res.json({ files });
});

app.post("/api/threads/:id/lock", authMiddleware, async (req, res) => {
  const { locked } = req.body || {};
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT author_id FROM threads WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Thread not found" });
    if (!(req.user.role === "admin" || req.user.role === "moderator")) return res.status(403).json({ error: "Forbidden" });
    await pool.query("UPDATE threads SET locked=:locked WHERE id=:id", { locked: locked ? 1 : 0, id: req.params.id });
    return res.json({ ok: true, locked: !!locked });
  }
  const db = await readDB();
  const t = db.threads.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Thread not found" });
  if (!(req.user.role === "admin" || req.user.role === "moderator")) return res.status(403).json({ error: "Forbidden" });
  t.locked = !!locked;
  await writeDB(db);
  return res.json({ ok: true, locked: t.locked });
});
app.post("/api/threads/:id/pin", authMiddleware, async (req, res) => {
  const { pinned } = req.body || {};
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT author_id FROM threads WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Thread not found" });
    if (!(req.user.role === "admin" || req.user.role === "moderator")) return res.status(403).json({ error: "Forbidden" });
    await pool.query("UPDATE threads SET pinned=:pinned WHERE id=:id", { pinned: pinned ? 1 : 0, id: req.params.id });
    return res.json({ ok: true, pinned: !!pinned });
  }
  const db = await readDB();
  const t = db.threads.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Thread not found" });
  if (!(req.user.role === "admin" || req.user.role === "moderator")) return res.status(403).json({ error: "Forbidden" });
  t.pinned = !!pinned;
  await writeDB(db);
  return res.json({ ok: true, pinned: t.pinned });
});
app.get("/api/users", authMiddleware, requireAdmin, async (req, res) => {
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT id,email,username,role,is_confirmed,banned FROM users ORDER BY created_at DESC");
    return res.json(rows);
  }
  const db = await readDB();
  return res.json(db.users.map(u => ({ id: u.id, email: u.email, username: u.username, role: u.role, is_confirmed: u.is_confirmed, banned: u.banned })));
});
app.post("/api/users/:id/role", authMiddleware, requireAdmin, async (req, res) => {
  const { role } = req.body || {};
  if (!["user", "moderator", "admin"].includes(role)) return res.status(400).json({ error: "Invalid role" });
  if (MYSQL_READY) {
    await pool.query("UPDATE users SET role=:role WHERE id=:id", { role, id: req.params.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const u = db.users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  u.role = role;
  await writeDB(db);
  return res.json({ ok: true });
});
app.post("/api/users/:id/ban", authMiddleware, requireAdmin, async (req, res) => {
  const { banned } = req.body || {};
  if (MYSQL_READY) {
    await pool.query("UPDATE users SET banned=:banned WHERE id=:id", { banned: banned ? 1 : 0, id: req.params.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const u = db.users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  u.banned = !!banned;
  await writeDB(db);
  return res.json({ ok: true });
});
app.post("/api/users/:id/confirm", authMiddleware, requireAdmin, async (req, res) => {
  if (MYSQL_READY) {
    await pool.query("UPDATE users SET is_confirmed=1 WHERE id=:id", { id: req.params.id });
    await pool.query("DELETE FROM email_verifications WHERE user_id=:id", { id: req.params.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const u = db.users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  u.is_confirmed = true;
  db.email_verifications = (db.email_verifications || []).filter(ev => ev.user_id !== u.id);
  await writeDB(db);
  return res.json({ ok: true });
});
app.post("/api/admin/confirm-email", authMiddleware, requireAdmin, async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: "Missing email" });
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT id,username,locale,is_confirmed FROM users WHERE LOWER(email)=LOWER(:email)", { email });
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    const u = rows[0];
    if (u.is_confirmed) return res.json({ ok: true, already: true });
    await pool.query("UPDATE users SET is_confirmed=1 WHERE id=:id", { id: u.id });
    await pool.query("DELETE FROM email_verifications WHERE user_id=:id", { id: u.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const u = db.users.find(x => x.email.toLowerCase() === email.toLowerCase());
  if (!u) return res.status(404).json({ error: "User not found" });
  if (u.is_confirmed) return res.json({ ok: true, already: true });
  u.is_confirmed = true;
  db.email_verifications = (db.email_verifications || []).filter(ev => ev.user_id !== u.id);
  await writeDB(db);
  return res.json({ ok: true });
});
app.post("/api/users/:id/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
  if (req.user.sub !== req.params.id && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  const f = req.file;
  if (!f) return res.status(400).json({ error: "Missing file" });
  const url = `/uploads/${f.filename}`;
  if (MYSQL_READY) {
    await pool.query("UPDATE users SET avatar_url=:url WHERE id=:id", { url, id: req.params.id });
    return res.json({ ok: true, avatar_url: url });
  }
  const db = await readDB();
  const u = db.users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  u.avatar_url = url;
  await writeDB(db);
  return res.json({ ok: true, avatar_url: u.avatar_url });
});
app.post("/api/users/:id/profile", authMiddleware, async (req, res) => {
  const { username, notifications, bio } = req.body || {};
  if (req.user.sub !== req.params.id && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  if (MYSQL_READY) {
    const name = typeof username === "string" && username.trim() ? username.trim() : undefined;
    const notif = typeof notifications === "boolean" ? (notifications ? 1 : 0) : undefined;
    const userBio = typeof bio === "string" ? bio : undefined;
    if (name !== undefined) await pool.query("UPDATE users SET username=:name WHERE id=:id", { name, id: req.params.id });
    if (notif !== undefined) await pool.query("UPDATE users SET notifications=:notif WHERE id=:id", { notif, id: req.params.id });
    if (userBio !== undefined) await pool.query("UPDATE users SET bio=:bio WHERE id=:id", { bio: userBio, id: req.params.id });
    const [rows] = await pool.query("SELECT id, email, username, role, avatar_url, bio, notifications, created_at FROM users WHERE id=:id", { id: req.params.id });
    return res.json(rows[0]);
  }
  const db = await readDB();
  const u = db.users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  if (typeof username === "string" && username.trim()) u.username = username.trim();
  if (typeof notifications === "boolean") u.notifications = notifications;
  if (typeof bio === "string") u.bio = bio;
  await writeDB(db);
  return res.json(u);
});



app.get("/api/search/threads", async (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  const categoryId = req.query.categoryId;
  const tag = (req.query.tag || "").toString().toLowerCase();
  const page = parseInt(req.query.page || "1", 10);
  const size = Math.min(parseInt(req.query.size || "10", 10), 50);
  
  // Get all category IDs to include (current category + all subcategories)
  let categoryIdsToInclude = [];
  if (categoryId) {
    if (MYSQL_READY) {
      // MySQL: Recursively get all subcategory IDs
      const [allCats] = await pool.query("SELECT id, parent_id FROM categories");
      categoryIdsToInclude = [categoryId, ...getAllChildCategoryIds(allCats, categoryId)];
    } else {
      // JSON: Use our helper function
      const db = await readDB();
      categoryIdsToInclude = [categoryId, ...getAllChildCategoryIds(db.categories, categoryId)];
    }
  }

  if (MYSQL_READY) {
    const where = [];
    const params = {};
    if (categoryId && categoryIdsToInclude.length > 0) { 
      const placeholders = categoryIdsToInclude.map((_, i) => `:cid${i}`).join(",");
      where.push(`t.category_id IN (${placeholders})`);
      categoryIdsToInclude.forEach((cid, i) => params[`cid${i}`] = cid);
    }
    if (q) { where.push("LOWER(t.title) LIKE :q"); params.q = `%${q}%`; }
    if (tag) { where.push("EXISTS (SELECT 1 FROM thread_tags tt WHERE tt.thread_id=t.id AND LOWER(tt.tag)=:tag)"); params.tag = tag; }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const [[{ cnt }]] = await pool.query(`SELECT COUNT(*) as cnt FROM threads t ${whereSql}`, params);
    const total = cnt;
    const offset = (page - 1) * size;
    const [items] = await pool.query(`
      SELECT t.id, t.category_id, t.title, t.author_id, t.locked, t.pinned, t.created_at,
             (SELECT COUNT(*) FROM posts p WHERE p.thread_id=t.id) AS posts_count,
             u.username AS author_username, u.avatar_url AS author_avatar, u.role AS author_role
      FROM threads t
      LEFT JOIN users u ON u.id=t.author_id
      ${whereSql}
      ORDER BY t.pinned DESC, t.created_at DESC
      LIMIT :limit OFFSET :offset
    `, { ...params, limit: size, offset });
    return res.json({ items, page, size, total, pages: Math.ceil(total / size) });
  }
  
  const db = await readDB();
  let list = db.threads;
  if (categoryId && categoryIdsToInclude.length > 0) {
    list = list.filter(t => categoryIdsToInclude.includes(t.category_id));
  }
  if (q) list = list.filter(t => t.title.toLowerCase().includes(q));
  if (tag) list = list.filter(t => (t.tags || []).map(x => x.toLowerCase()).includes(tag));
  const total = list.length;
  const start = (page - 1) * size;
  const items = list.slice(start, start + size).map(t => {
    const u = db.users.find(u => u.id === t.author_id);
    return {
      ...t,
      posts_count: db.posts.filter(p => p.thread_id === t.id).length,
      author_username: u?.username || "unknown",
      author_avatar: u?.avatar_url || null,
      author_role: u?.role || "user"
    };
  });
  return res.json({ items, page, size, total, pages: Math.ceil(total / size) });
});

app.get("/api/threads/:id/posts_paginated", async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);
  const size = Math.min(parseInt(req.query.size || "10", 10), 50);
  if (MYSQL_READY) {
    await pool.query("UPDATE threads SET views=views+1 WHERE id=:tid", { tid: req.params.id });
    const [[{ cnt }]] = await pool.query("SELECT COUNT(*) as cnt FROM posts WHERE thread_id=:tid", { tid: req.params.id });
    const total = cnt;
    const offset = (page - 1) * size;
    const [rows] = await pool.query(`
      SELECT p.id, p.thread_id, p.author_id, p.content, p.attachments, p.reactions, p.created_at,
             COALESCE(u.username,'unknown') AS author_username,
             u.avatar_url AS author_avatar, u.role AS author_role
      FROM posts p
      LEFT JOIN users u ON u.id=p.author_id
      WHERE p.thread_id=:tid
      ORDER BY p.created_at ASC
      LIMIT :limit OFFSET :offset
    `, { tid: req.params.id, limit: size, offset });
    const items = rows.map(r => ({ ...r, attachments: JSON.parse(r.attachments || "[]"), reactions: JSON.parse(r.reactions || "[]") }));
    return res.json({ items, page, size, total, pages: Math.ceil(total / size) });
  }
  const db = await readDB();
  const th = db.threads.find(x => x.id === req.params.id);
  if (th) th.views = (th.views || 0) + 1;
  const all = db.posts.filter(p => p.thread_id === req.params.id);
  const total = all.length;
  const start = (page - 1) * size;
  const posts = all.slice(start, start + size).map(p => {
    const author = db.users.find(u => u.id === p.author_id);
    return {
      ...p,
      author_username: author?.username || "unknown",
      author_avatar: author?.avatar_url || null,
      author_role: author?.role || "user"
    };
  });
  await writeDB(db);
  return res.json({ items: posts, page, size, total, pages: Math.ceil(total / size) });
});

app.get("/api/threads/:id/meta", async (req, res) => {
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT t.id,t.title,t.category_id,t.views,c.name AS category_name FROM threads t LEFT JOIN categories c ON c.id=t.category_id WHERE t.id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Thread not found" });
    return res.json(rows[0]);
  }
  const db = await readDB();
  const t = db.threads.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: "Thread not found" });
  const c = db.categories.find(x => x.id === t.category_id);
  return res.json({ id: t.id, title: t.title, category_id: t.category_id, views: t.views || 0, category_name: c?.name || "" });
});
app.post("/api/auth/reset/request", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "Missing email" });
    if (MYSQL_READY) {
      const [rows] = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER(:email)", { email });
      if (!rows.length) return res.json({ ok: true });
      const u = rows[0];
      const token = uid();
      const expires_at = Date.now() + 1000 * 60 * 60;
      await pool.query("INSERT INTO password_resets (token,user_id,expires_at) VALUES (:token,:user_id,:expires_at)", { token, user_id: u.id, expires_at });
      const linkBase = linkBaseFor(req);
      const link = `${linkBase}/api/auth/reset/confirm?token=${encodeURIComponent(token)}`;
      const { subject, html } = mailTemplate(u.locale, "reset", { username: u.username, link });
      await sendMail(email, subject, html);
      return res.json({ ok: true });
    }
    const db = await readDB();
    db.password_resets = Array.isArray(db.password_resets) ? db.password_resets : [];
    const u = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!u) return res.status(200).json({ ok: true });
    const token = uid();
    const expires_at = Date.now() + 1000 * 60 * 60;
    db.password_resets.push({ token, user_id: u.id, expires_at });
    await writeDB(db);
    const linkBase = linkBaseFor(req);
    const link = `${linkBase}/api/auth/reset/confirm?token=${encodeURIComponent(token)}`;
    const { subject, html } = mailTemplate(u.locale, "reset", { username: u.username, link });
    await sendMail(email, subject, html);
    return res.json({ ok: true });
  } catch (e) {
    return res.json({ ok: true });
  }
});
app.get("/api/auth/reset/confirm", async (req, res) => {
  const { token } = req.query;
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM password_resets WHERE token=:token", { token });
    if (!rows.length) return res.status(404).json({ error: "Invalid token" });
    if (rows[0].expires_at < Date.now()) return res.status(410).json({ error: "Token expired" });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const r = db.password_resets.find(x => x.token === token);
  if (!r) return res.status(404).json({ error: "Invalid token" });
  if (r.expires_at < Date.now()) return res.status(410).json({ error: "Token expired" });
  return res.json({ ok: true });
});
app.post("/api/auth/reset/perform", async (req, res) => {
  const { token, password } = req.body || {};
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM password_resets WHERE token=:token", { token });
    if (!rows.length) return res.status(404).json({ error: "Invalid token" });
    const r = rows[0];
    if (r.expires_at < Date.now()) return res.status(410).json({ error: "Token expired" });
    const password_hash = await bcrypt.hash(password, 10);
    await pool.query("UPDATE users SET password_hash=:password_hash WHERE id=:user_id", { password_hash, user_id: r.user_id });
    await pool.query("DELETE FROM password_resets WHERE token=:token", { token });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const r = db.password_resets.find(x => x.token === token);
  if (!r) return res.status(404).json({ error: "Invalid token" });
  if (r.expires_at < Date.now()) return res.status(410).json({ error: "Token expired" });
  const u = db.users.find(u => u.id === r.user_id);
  if (!u) return res.status(404).json({ error: "User not found" });
  u.password_hash = await bcrypt.hash(password, 10);
  db.password_resets = db.password_resets.filter(x => x.token !== token);
  await writeDB(db);
  return res.json({ ok: true });
});

// Post Likes Endpoints
app.post("/api/posts/:id/like", authMiddleware, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.sub;
  if (MYSQL_READY) {
    const [exists] = await pool.query("SELECT 1 FROM post_likes WHERE post_id=:postId AND user_id=:userId", { postId, userId });
    if (!exists.length) {
      await pool.query("INSERT INTO post_likes (post_id, user_id, created_at) VALUES (:postId, :userId, :now)", { postId, userId, now: Date.now() });
    }
    const [[{ count }]] = await pool.query("SELECT COUNT(*) as count FROM post_likes WHERE post_id=:postId", { postId });
    return res.json({ count });
  }
  const db = await readDB();
  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (!Array.isArray(post.likes)) post.likes = [];
  if (!post.likes.find(l => l.user_id === userId)) {
    post.likes.push({ user_id: userId, created_at: Date.now() });
  }
  await writeDB(db);
  return res.json({ count: post.likes.length });
});

app.delete("/api/posts/:id/like", authMiddleware, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.sub;
  if (MYSQL_READY) {
    await pool.query("DELETE FROM post_likes WHERE post_id=:postId AND user_id=:userId", { postId, userId });
    const [[{ count }]] = await pool.query("SELECT COUNT(*) as count FROM post_likes WHERE post_id=:postId", { postId });
    return res.json({ count });
  }
  const db = await readDB();
  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (Array.isArray(post.likes)) {
    post.likes = post.likes.filter(l => l.user_id !== userId);
  }
  await writeDB(db);
  return res.json({ count: post.likes?.length || 0 });
});

app.get("/api/posts/:id/likes", async (req, res) => {
  const postId = req.params.id;
  if (MYSQL_READY) {
    const [rows] = await pool.query(`
      SELECT pl.user_id, pl.created_at, u.username, u.avatar_url 
      FROM post_likes pl 
      LEFT JOIN users u ON u.id = pl.user_id 
      WHERE pl.post_id = :postId 
      ORDER BY pl.created_at DESC
    `, { postId });
    const [[{ count }]] = await pool.query("SELECT COUNT(*) as count FROM post_likes WHERE post_id=:postId", { postId });
    return res.json({ likes: rows, count });
  }
  const db = await readDB();
  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const likes = (post.likes || []).map(l => {
    const user = db.users.find(u => u.id === l.user_id);
    return { ...l, username: user?.username, avatar_url: user?.avatar_url };
  });
  return res.json({ likes, count: likes.length });
});

// Post Reactions Endpoints
app.get("/api/posts/:id/reactions", async (req, res) => {
  const postId = req.params.id;
  if (MYSQL_READY) {
    const [reactions] = await pool.query(`
      SELECT pr.post_id, pr.user_id, pr.type, u.username, u.avatar_url 
      FROM post_reactions pr 
      LEFT JOIN users u ON u.id = pr.user_id 
      WHERE pr.post_id = :postId
    `, { postId });
    const [counts] = await pool.query(`
      SELECT type, COUNT(*) as count 
      FROM post_reactions 
      WHERE post_id = :postId 
      GROUP BY type
    `, { postId });
    const grouped = {};
    counts.forEach(c => { grouped[c.type] = c.count; });
    return res.json({ reactions, counts: grouped });
  }
  const db = await readDB();
  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const reactions = (post.reactions || []).map(r => {
    const user = db.users.find(u => u.id === r.user_id);
    return { ...r, username: user?.username, avatar_url: user?.avatar_url };
  });
  const counts = {};
  (post.reactions || []).forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1; });
  return res.json({ reactions, counts });
});

app.post("/api/posts/:id/reactions", authMiddleware, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.sub;
  const { type } = req.body || {};
  if (!type) return res.status(400).json({ error: "Missing reaction type" });
  if (MYSQL_READY) {
    await pool.query("INSERT IGNORE INTO post_reactions (post_id, user_id, type) VALUES (:postId, :userId, :type)", { postId, userId, type });
    const [counts] = await pool.query(`
      SELECT type, COUNT(*) as count 
      FROM post_reactions 
      WHERE post_id = :postId 
      GROUP BY type
    `, { postId });
    const grouped = {};
    counts.forEach(c => { grouped[c.type] = c.count; });
    return res.json({ counts: grouped });
  }
  const db = await readDB();
  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (!Array.isArray(post.reactions)) post.reactions = [];
  if (!post.reactions.find(r => r.user_id === userId && r.type === type)) {
    post.reactions.push({ user_id: userId, type });
  }
  await writeDB(db);
  const counts = {};
  (post.reactions || []).forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1; });
  return res.json({ counts });
});

app.delete("/api/posts/:id/reactions", authMiddleware, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.sub;
  const { type } = req.body || {};
  if (MYSQL_READY) {
    if (type) {
      await pool.query("DELETE FROM post_reactions WHERE post_id=:postId AND user_id=:userId AND type=:type", { postId, userId, type });
    } else {
      await pool.query("DELETE FROM post_reactions WHERE post_id=:postId AND user_id=:userId", { postId, userId });
    }
    const [counts] = await pool.query(`
      SELECT type, COUNT(*) as count 
      FROM post_reactions 
      WHERE post_id = :postId 
      GROUP BY type
    `, { postId });
    const grouped = {};
    counts.forEach(c => { grouped[c.type] = c.count; });
    return res.json({ counts: grouped });
  }
  const db = await readDB();
  const post = db.posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (Array.isArray(post.reactions)) {
    if (type) {
      post.reactions = post.reactions.filter(r => !(r.user_id === userId && r.type === type));
    } else {
      post.reactions = post.reactions.filter(r => r.user_id !== userId);
    }
  }
  await writeDB(db);
  const counts = {};
  (post.reactions || []).forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1; });
  return res.json({ counts });
});

// Notifications Endpoints
app.get("/api/notifications", authMiddleware, async (req, res) => {
  const userId = req.user.sub;
  if (MYSQL_READY) {
    const [rows] = await pool.query(`
      SELECT * FROM notifications 
      WHERE user_id = :userId 
      ORDER BY created_at DESC
    `, { userId });
    return res.json(rows.map(n => ({ ...n, data: n.data ? JSON.parse(n.data) : null })));
  }
  const db = await readDB();
  const notifications = db.notifications.filter(n => n.user_id === userId).sort((a, b) => b.created_at - a.created_at);
  return res.json(notifications);
});

app.post("/api/notifications/:id/read", authMiddleware, async (req, res) => {
  const notifId = req.params.id;
  const userId = req.user.sub;
  if (MYSQL_READY) {
    await pool.query("UPDATE notifications SET read_at=:now WHERE id=:notifId AND user_id=:userId", { now: Date.now(), notifId, userId });
    const [rows] = await pool.query("SELECT * FROM notifications WHERE id=:notifId AND user_id=:userId", { notifId, userId });
    if (!rows.length) return res.status(404).json({ error: "Notification not found" });
    return res.json({ ...rows[0], data: rows[0].data ? JSON.parse(rows[0].data) : null });
  }
  const db = await readDB();
  const notif = db.notifications.find(n => n.id === notifId && n.user_id === userId);
  if (!notif) return res.status(404).json({ error: "Notification not found" });
  notif.read_at = Date.now();
  await writeDB(db);
  return res.json(notif);
});

// User Profile Endpoints
app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT id, email, username, role, avatar_url, bio, created_at FROM users WHERE id=:userId", { userId });
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    const [[{ postCount }]] = await pool.query("SELECT COUNT(*) as postCount FROM posts WHERE author_id=:userId", { userId });
    const [[{ threadCount }]] = await pool.query("SELECT COUNT(*) as threadCount FROM threads WHERE author_id=:userId", { userId });
    return res.json({ ...rows[0], postCount, threadCount });
  }
  const db = await readDB();
  const user = db.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  const postCount = db.posts.filter(p => p.author_id === userId).length;
  const threadCount = db.threads.filter(t => t.author_id === userId).length;
  return res.json({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    avatar_url: user.avatar_url,
    bio: user.bio,
    created_at: user.created_at,
    postCount,
    threadCount
  });
});

app.patch("/api/users/:id/profile", authMiddleware, async (req, res) => {
  const userId = req.params.id;
  if (req.user.sub !== userId && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  const { bio, username } = req.body || {};
  if (MYSQL_READY) {
    if (username !== undefined) await pool.query("UPDATE users SET username=:username WHERE id=:userId", { username, userId });
    if (bio !== undefined) await pool.query("UPDATE users SET bio=:bio WHERE id=:userId", { bio, userId });
    const [rows] = await pool.query("SELECT id, email, username, role, avatar_url, bio, created_at FROM users WHERE id=:userId", { userId });
    return res.json(rows[0]);
  }
  const db = await readDB();
  const user = db.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (username !== undefined) user.username = username;
  if (bio !== undefined) user.bio = bio;
  await writeDB(db);
  return res.json(user);
});

// Polls Endpoints
app.get("/api/threads/:id/polls", async (req, res) => {
  const threadId = req.params.id;
  if (MYSQL_READY) {
    const [polls] = await pool.query("SELECT * FROM polls WHERE thread_id=:threadId", { threadId });
    const allPollIds = polls.map(p => p.id);
    const [options] = allPollIds.length > 0 ? await pool.query("SELECT * FROM poll_options WHERE poll_id IN (?)", [allPollIds]) : [[]];
    const [votes] = allPollIds.length > 0 ? await pool.query("SELECT poll_id, option_id, COUNT(*) as count FROM poll_votes WHERE poll_id IN (?) GROUP BY poll_id, option_id", [allPollIds]) : [[]];
    const pollsWithOptions = polls.map(p => {
      const pollOptions = options.filter(o => o.poll_id === p.id);
      const pollVotes = votes.filter(v => v.poll_id === p.id);
      const optionsWithVotes = pollOptions.map(o => ({ ...o, votes: pollVotes.find(v => v.option_id === o.id)?.count || 0 }));
      return { ...p, options: optionsWithVotes };
    });
    return res.json(pollsWithOptions);
  }
  const db = await readDB();
  const polls = db.polls.filter(p => p.thread_id === threadId);
  const pollsWithOptions = polls.map(p => {
    const options = db.poll_options.filter(o => o.poll_id === p.id);
    const optionsWithVotes = options.map(o => ({ ...o, votes: db.poll_votes.filter(v => v.poll_id === p.id && v.option_id === o.id).length }));
    return { ...p, options: optionsWithVotes };
  });
  return res.json(pollsWithOptions);
});

app.post("/api/threads/:id/polls", authMiddleware, async (req, res) => {
  const threadId = req.params.id;
  const userId = req.user.sub;
  const { question, options, expires_at } = req.body || {};
  if (!question || !Array.isArray(options) || options.length < 2) return res.status(400).json({ error: "Missing question or options" });
  const pollId = uid();
  if (MYSQL_READY) {
    await pool.query("INSERT INTO polls (id, thread_id, question, author_id, created_at, expires_at) VALUES (:id, :threadId, :question, :authorId, :now, :expiresAt)", {
      id: pollId,
      threadId,
      question,
      authorId: userId,
      now: Date.now(),
      expiresAt: expires_at || null
    });
    for (const optionText of options) {
      const optionId = uid();
      await pool.query("INSERT INTO poll_options (id, poll_id, text) VALUES (:optionId, :pollId, :text)", { optionId, pollId, text: optionText });
    }
    const [poll] = await pool.query("SELECT * FROM polls WHERE id=:pollId", { pollId });
    const [pollOptions] = await pool.query("SELECT * FROM poll_options WHERE poll_id=:pollId", { pollId });
    return res.json({ ...poll[0], options: pollOptions.map(o => ({ ...o, votes: 0 })) });
  }
  const db = await readDB();
  const poll = { id: pollId, thread_id: threadId, question, author_id: userId, created_at: Date.now(), expires_at: expires_at || null };
  db.polls.push(poll);
  const pollOptions = [];
  for (const optionText of options) {
    const optionId = uid();
    const option = { id: optionId, poll_id: pollId, text: optionText };
    db.poll_options.push(option);
    pollOptions.push(option);
  }
  await writeDB(db);
  return res.json({ ...poll, options: pollOptions.map(o => ({ ...o, votes: 0 })) });
});

app.post("/api/polls/:id/vote", authMiddleware, async (req, res) => {
  const pollId = req.params.id;
  const userId = req.user.sub;
  const { option_id } = req.body || {};
  if (!option_id) return res.status(400).json({ error: "Missing option_id" });
  if (MYSQL_READY) {
    await pool.query("DELETE FROM poll_votes WHERE poll_id=:pollId AND user_id=:userId", { pollId, userId });
    await pool.query("INSERT INTO poll_votes (poll_id, option_id, user_id, created_at) VALUES (:pollId, :optionId, :userId, :now)", { pollId, optionId, userId, now: Date.now() });
    const [poll] = await pool.query("SELECT * FROM polls WHERE id=:pollId", { pollId });
    const [options] = await pool.query("SELECT * FROM poll_options WHERE poll_id=:pollId", { pollId });
    const [votes] = await pool.query("SELECT option_id, COUNT(*) as count FROM poll_votes WHERE poll_id=:pollId GROUP BY option_id", { pollId });
    const optionsWithVotes = options.map(o => ({ ...o, votes: votes.find(v => v.option_id === o.id)?.count || 0 }));
    return res.json({ ...poll[0], options: optionsWithVotes });
  }
  const db = await readDB();
  db.poll_votes = db.poll_votes.filter(v => !(v.poll_id === pollId && v.user_id === userId));
  db.poll_votes.push({ poll_id: pollId, option_id, user_id: userId, created_at: Date.now() });
  await writeDB(db);
  const poll = db.polls.find(p => p.id === pollId);
  const options = db.poll_options.filter(o => o.poll_id === pollId);
  const optionsWithVotes = options.map(o => ({ ...o, votes: db.poll_votes.filter(v => v.poll_id === pollId && v.option_id === o.id).length }));
  return res.json({ ...poll, options: optionsWithVotes });
});

// Private Messages Endpoints
app.get("/api/messages", authMiddleware, async (req, res) => {
  const userId = req.user.sub;
  const withUserId = req.query.with;
  if (MYSQL_READY) {
    let query, params;
    if (withUserId) {
      query = `
        SELECT pm.*, 
          s.username as sender_username, s.avatar_url as sender_avatar_url,
          r.username as receiver_username, r.avatar_url as receiver_avatar_url
        FROM private_messages pm
        LEFT JOIN users s ON s.id = pm.sender_id
        LEFT JOIN users r ON r.id = pm.receiver_id
        WHERE (pm.sender_id=:userId AND pm.receiver_id=:withUserId) OR (pm.sender_id=:withUserId AND pm.receiver_id=:userId)
        ORDER BY pm.created_at ASC
      `;
      params = { userId, withUserId };
    } else {
      // Get conversations list (latest message with each user)
      query = `
        SELECT DISTINCT
          CASE WHEN pm.sender_id = :userId THEN pm.receiver_id ELSE pm.sender_id END as other_user_id,
          MAX(pm.created_at) as last_message_at,
          u.username as other_username,
          u.avatar_url as other_avatar_url
        FROM private_messages pm
        LEFT JOIN users u ON u.id = CASE WHEN pm.sender_id = :userId THEN pm.receiver_id ELSE pm.sender_id END
        WHERE pm.sender_id=:userId OR pm.receiver_id=:userId
        GROUP BY other_user_id
        ORDER BY last_message_at DESC
      `;
      params = { userId };
    }
    const [rows] = await pool.query(query, params);
    return res.json(rows);
  }
  const db = await readDB();
  if (withUserId) {
    const messages = db.private_messages.filter(m => 
      (m.sender_id === userId && m.receiver_id === withUserId) || (m.sender_id === withUserId && m.receiver_id === userId)
    ).sort((a, b) => a.created_at - b.created_at).map(m => {
      const sender = db.users.find(u => u.id === m.sender_id);
      const receiver = db.users.find(u => u.id === m.receiver_id);
      return { ...m, sender_username: sender?.username, sender_avatar_url: sender?.avatar_url, receiver_username: receiver?.username, receiver_avatar_url: receiver?.avatar_url };
    });
    return res.json(messages);
  } else {
    const conversations = {};
    db.private_messages.forEach(m => {
      const otherId = m.sender_id === userId ? m.receiver_id : m.sender_id;
      if (!conversations[otherId] || conversations[otherId].last_message_at < m.created_at) {
        const other = db.users.find(u => u.id === otherId);
        conversations[otherId] = {
          other_user_id: otherId,
          other_username: other?.username,
          other_avatar_url: other?.avatar_url,
          last_message_at: m.created_at
        };
      }
    });
    return res.json(Object.values(conversations).sort((a, b) => b.last_message_at - a.last_message_at));
  }
});

app.post("/api/messages", authMiddleware, async (req, res) => {
  const userId = req.user.sub;
  const { receiver_id, content } = req.body || {};
  if (!receiver_id || !content) return res.status(400).json({ error: "Missing receiver_id or content" });
  if (MYSQL_READY) {
    const msgId = uid();
    await pool.query("INSERT INTO private_messages (id, sender_id, receiver_id, content, created_at) VALUES (:id, :senderId, :receiverId, :content, :now)", {
      id: msgId,
      senderId: userId,
      receiverId: receiver_id,
      content,
      now: Date.now()
    });
    const [rows] = await pool.query(`
      SELECT pm.*, 
        s.username as sender_username, s.avatar_url as sender_avatar_url,
        r.username as receiver_username, r.avatar_url as receiver_avatar_url
      FROM private_messages pm
      LEFT JOIN users s ON s.id = pm.sender_id
      LEFT JOIN users r ON r.id = pm.receiver_id
      WHERE pm.id = :msgId
    `, { msgId });
    // Create notification for receiver
    const notifId = uid();
    await pool.query("INSERT INTO notifications (id, user_id, type, title, content, data, created_at) VALUES (:id, :userId, 'message', 'Нове повідомлення', :msg, :data, :now)", {
      id: notifId,
      userId: receiver_id,
      msg: content.substring(0, 100),
      data: JSON.stringify({ sender_id: userId }),
      now: Date.now()
    });
    return res.json(rows[0]);
  }
  const db = await readDB();
  const msgId = uid();
  const message = { id: msgId, sender_id: userId, receiver_id, content, created_at: Date.now() };
  db.private_messages.push(message);
  // Create notification for receiver
  const notifId = uid();
  db.notifications.push({
    id: notifId,
    user_id: receiver_id,
    type: 'message',
    title: 'Нове повідомлення',
    content: content.substring(0, 100),
    data: { sender_id: userId },
    created_at: Date.now()
  });
  await writeDB(db);
  const sender = db.users.find(u => u.id === userId);
  const receiver = db.users.find(u => u.id === receiver_id);
  return res.json({ ...message, sender_username: sender?.username, sender_avatar_url: sender?.avatar_url, receiver_username: receiver?.username, receiver_avatar_url: receiver?.avatar_url });
});

app.get("/api/messages/:id", authMiddleware, async (req, res) => {
  const userId = req.user.sub;
  const msgId = req.params.id;
  if (MYSQL_READY) {
    const [rows] = await pool.query(`
      SELECT pm.*, 
        s.username as sender_username, s.avatar_url as sender_avatar_url,
        r.username as receiver_username, r.avatar_url as receiver_avatar_url
      FROM private_messages pm
      LEFT JOIN users s ON s.id = pm.sender_id
      LEFT JOIN users r ON r.id = pm.receiver_id
      WHERE pm.id = :msgId AND (pm.sender_id=:userId OR pm.receiver_id=:userId)
    `, { msgId, userId });
    if (!rows.length) return res.status(404).json({ error: "Message not found" });
    // Mark as read if receiver
    if (rows[0].receiver_id === userId && !rows[0].read_at) {
      await pool.query("UPDATE private_messages SET read_at=:now WHERE id=:msgId", { now: Date.now(), msgId });
      rows[0].read_at = Date.now();
    }
    return res.json(rows[0]);
  }
  const db = await readDB();
  const message = db.private_messages.find(m => m.id === msgId && (m.sender_id === userId || m.receiver_id === userId));
  if (!message) return res.status(404).json({ error: "Message not found" });
  // Mark as read if receiver
  if (message.receiver_id === userId && !message.read_at) {
    message.read_at = Date.now();
    await writeDB(db);
  }
  const sender = db.users.find(u => u.id === message.sender_id);
  const receiver = db.users.find(u => u.id === message.receiver_id);
  return res.json({ ...message, sender_username: sender?.username, sender_avatar_url: sender?.avatar_url, receiver_username: receiver?.username, receiver_avatar_url: receiver?.avatar_url });
});

// Update 2FA endpoints to work with MySQL
app.post("/api/auth/2fa/setup", authMiddleware, async (req, res) => {
  const userId = req.user.sub;
  const secret = authenticator.generateSecret();
  if (MYSQL_READY) {
    await pool.query("UPDATE users SET totp_secret=:secret, twofa_enabled=0 WHERE id=:userId", { secret, userId });
    const uri = authenticator.keyuri((await pool.query("SELECT email FROM users WHERE id=:userId", { userId }))[0][0].email, "Prestige RP", secret);
    return res.json({ secret, uri });
  }
  const db = await readDB();
  const user = db.users.find(x => x.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.totp_secret = secret;
  user.twofa_enabled = false;
  await writeDB(db);
  const uri = authenticator.keyuri(user.email, "Prestige RP", secret);
  return res.json({ secret, uri });
});

app.post("/api/auth/2fa/activate", authMiddleware, async (req, res) => {
  const { code } = req.body || {};
  if (!code) return res.status(400).json({ error: "Missing code" });
  const userId = req.user.sub;
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id=:userId", { userId });
    if (!rows.length || !rows[0].totp_secret) return res.status(400).json({ error: "2FA not initialized" });
    const ok = authenticator.verify({ token: code, secret: rows[0].totp_secret });
    if (!ok) return res.status(401).json({ error: "Invalid 2FA code" });
    await pool.query("UPDATE users SET twofa_enabled=1 WHERE id=:userId", { userId });
    return res.json({ ok: true, twofa_enabled: true });
  }
  const db = await readDB();
  const user = db.users.find(x => x.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!user.totp_secret) return res.status(400).json({ error: "2FA not initialized" });
  const ok = authenticator.verify({ token: code, secret: user.totp_secret });
  if (!ok) return res.status(401).json({ error: "Invalid 2FA code" });
  user.twofa_enabled = true;
  await writeDB(db);
  return res.json({ ok: true, twofa_enabled: true });
});

app.post("/api/auth/2fa/disable", authMiddleware, async (req, res) => {
  const { code } = req.body || {};
  const userId = req.user.sub;
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id=:userId", { userId });
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    if (rows[0].twofa_enabled) {
      if (!code) return res.status(400).json({ error: "Missing code" });
      const ok = authenticator.verify({ token: code, secret: rows[0].totp_secret });
      if (!ok) return res.status(401).json({ error: "Invalid 2FA code" });
    }
    await pool.query("UPDATE users SET twofa_enabled=0 WHERE id=:userId", { userId });
    return res.json({ ok: true, twofa_enabled: false });
  }
  const db = await readDB();
  const user = db.users.find(x => x.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.twofa_enabled) {
    if (!code) return res.status(400).json({ error: "Missing code" });
    const ok = authenticator.verify({ token: code, secret: user.totp_secret });
    if (!ok) return res.status(401).json({ error: "Invalid 2FA code" });
  }
  user.twofa_enabled = false;
  await writeDB(db);
  return res.json({ ok: true, twofa_enabled: false });
});

// Update refresh token endpoint to work with MySQL
app.post("/api/auth/refresh", async (req, res) => {
  const { refresh_token } = req.body || {};
  if (!refresh_token) return res.status(400).json({ error: "Missing refresh token" });
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM users WHERE refresh_token=:refreshToken", { refreshToken: refresh_token });
    if (!rows.length) return res.status(401).json({ error: "Invalid refresh token" });
    const user = rows[0];
    if (!user.refresh_expires || user.refresh_expires < Date.now()) return res.status(401).json({ error: "Refresh token expired" });
    const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    const newRefresh = uid();
    await pool.query("UPDATE users SET refresh_token=:newRefresh, refresh_expires=:expires WHERE id=:userId", {
      newRefresh,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
      userId: user.id
    });
    return res.json({ 
      token, 
      refresh_token: newRefresh, 
      user: { 
        id: user.id, 
        email: user.email, 
        username: user.username, 
        role: user.role,
        avatar_url: user.avatar_url,
        bio: user.bio,
        notifications: !!user.notifications
      } 
    });
  }
  const db = await readDB();
  const user = db.users.find(x => x.refresh_token === refresh_token);
  if (!user) return res.status(401).json({ error: "Invalid refresh token" });
  if (!user.refresh_expires || user.refresh_expires < Date.now()) return res.status(401).json({ error: "Refresh token expired" });
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  const newRefresh = uid();
  user.refresh_token = newRefresh;
  user.refresh_expires = Date.now() + 1000 * 60 * 60 * 24 * 30;
  await writeDB(db);
  return res.json({ 
    token, 
    refresh_token: newRefresh, 
    user: { 
      id: user.id, 
      email: user.email, 
      username: user.username, 
      role: user.role,
      avatar_url: user.avatar_url,
      bio: user.bio,
      notifications: !!user.notifications
    } 
  });
});

app.post("/api/auth/logout_all", authMiddleware, async (req, res) => {
  const userId = req.user.sub;
  if (MYSQL_READY) {
    await pool.query("UPDATE users SET refresh_token=NULL, refresh_expires=NULL WHERE id=:userId", { userId });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const user = db.users.find(x => x.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.refresh_token = null;
  user.refresh_expires = null;
  await writeDB(db);
  return res.json({ ok: true });
});

app.post("/api/auth/2fa/skip", authMiddleware, async (req, res) => {
  const userId = req.user.sub;
  if (MYSQL_READY) {
    await pool.query("UPDATE users SET twofa_prompt_required=0 WHERE id=:userId", { userId });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const user = db.users.find(x => x.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.twofa_prompt_required = false;
  await writeDB(db);
  return res.json({ ok: true });
});

app.get("/api/me", authMiddleware, async (req, res) => {
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT id, email, username, role, is_confirmed, avatar_url, bio, twofa_enabled, totp_secret, twofa_prompt_required FROM users WHERE id=:id", { id: req.user.sub });
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    return res.json(rows[0]);
  }
  const db = await readDB();
  const u = db.users.find(u => u.id === req.user.sub);
  if (!u) return res.status(404).json({ error: "User not found" });
  return res.json({ id: u.id, email: u.email, username: u.username, role: u.role, is_confirmed: u.is_confirmed, twofa_enabled: !!u.twofa_enabled, avatar_url: u.avatar_url, bio: u.bio });
});

const server = app.listen(PORT, () => {
  console.log(`Prestige RP backend listening on port ${PORT}`);
  console.log("Press Ctrl+C to stop");
});
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`[Error] Port ${PORT} is already in use!`);
    console.error(`Please close the application using port ${PORT} or change PORT in .env`);
  } else {
    console.error("[Error] Server failed to start:", e);
  }
});

// WebSocket notifications
let wss = null;
try {
  wss = new WebSocketServer({ server });
  globalThis.wss = wss;
} catch {}
function broadcast(msg) {
  if (!wss) return;
  const payload = JSON.stringify(msg);
  for (const client of wss.clients || []) {
    try { client.send(payload); } catch {}
  }
}
