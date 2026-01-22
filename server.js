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

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
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
    created_at BIGINT NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    locked TINYINT(1) DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS threads (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author_id VARCHAR(36) NOT NULL,
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
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    const db = { users: [], categories: [], threads: [], posts: [], email_verifications: [], password_resets: [] };
    await fs.writeFile(DATA_PATH, JSON.stringify(db, null, 2), "utf-8");
    return db;
  }
}
async function writeDB(db) {
  await fs.writeFile(DATA_PATH, JSON.stringify(db, null, 2), "utf-8");
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

async function sendMail(to, subject, html) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "0", 10) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const allowSelfSigned = (process.env.SMTP_ALLOW_SELF_SIGNED || "false").toLowerCase() === "true";
  if (!host || !user || !pass) {
    console.log("[MAIL DEV] to:", to, "subject:", subject, "link:", html.replace(/<[^>]+>/g, ""));
    return;
  }
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined
  });
  await transporter.verify().catch(() => {});
  await transporter.sendMail({ from: `"Prestige RP" <${user}>`, to, subject, html });
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
    if (!host || !user || !pass) return res.status(400).json({ error: "SMTP not configured" });
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: allowSelfSigned ? { rejectUnauthorized: false } : undefined
    });
    await transporter.verify();
    const to = (req.body && req.body.email) || user;
    await transporter.sendMail({
      from: `"Prestige RP" <${user}>`,
      to,
      subject: "SMTP Test Prestige RP",
      html: "<p>SMTP тест успешно.</p>"
    });
    return res.json({ ok: true, verified: true, sent_to: to });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "SMTP failed" });
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
  const user = { id: uid(), email, username, password_hash, role: db.users.length === 0 ? "admin" : "user", is_confirmed: false, banned: false, locale: locale || "ru", created_at: Date.now() };
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
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER(:email)", { email });
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });
    const u = rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    if (u.banned) return res.status(403).json({ error: "User banned" });
    if (!u.is_confirmed) return res.status(403).json({ error: "Email not confirmed" });
    const token = jwt.sign({ sub: u.id, role: u.role }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: u.id, email: u.email, username: u.username, role: u.role } });
  }
  const db = await readDB();
  const u = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!u) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, u.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  if (u.banned) return res.status(403).json({ error: "User banned" });
  if (!u.is_confirmed) return res.status(403).json({ error: "Email not confirmed" });
  const token = jwt.sign({ sub: u.id, role: u.role }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, user: { id: u.id, email: u.email, username: u.username, role: u.role } });
});

app.get("/api/me", authMiddleware, async (req, res) => {
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT id,email,username,role,is_confirmed FROM users WHERE id=:id", { id: req.user.sub });
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    return res.json(rows[0]);
  }
  const db = await readDB();
  const u = db.users.find(u => u.id === req.user.sub);
  if (!u) return res.status(404).json({ error: "User not found" });
  return res.json({ id: u.id, email: u.email, username: u.username, role: u.role, is_confirmed: u.is_confirmed });
});

app.get("/api/categories", async (req, res) => {
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY name");
    return res.json(rows);
  }
  const db = await readDB();
  return res.json(db.categories);
});
app.post("/api/categories", authMiddleware, requireAdmin, async (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (MYSQL_READY) {
    const id = uid();
    await pool.query("INSERT INTO categories (id,name,locked) VALUES (:id,:name,0)", { id, name });
    return res.json({ id, name, locked: 0 });
  }
  const db = await readDB();
  const c = { id: uid(), name };
  db.categories.push(c);
  await writeDB(db);
  return res.json(c);
});

app.post("/api/categories/:id/edit", authMiddleware, requireAdmin, async (req, res) => {
  const { name } = req.body || {};
  if (MYSQL_READY) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id=:id", { id: req.params.id });
    if (!rows.length) return res.status(404).json({ error: "Category not found" });
    await pool.query("UPDATE categories SET name=:name WHERE id=:id", { id: req.params.id, name: name || rows[0].name });
    const [rows2] = await pool.query("SELECT * FROM categories WHERE id=:id", { id: req.params.id });
    return res.json(rows2[0]);
  }
  const db = await readDB();
  const c = db.categories.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: "Category not found" });
  if (name) c.name = name;
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
  if (MYSQL_READY) {
    const [rows] = await pool.query(`
      SELECT t.id, t.category_id, t.title, t.author_id, t.locked, t.pinned, t.created_at,
             (SELECT COUNT(*) FROM posts p WHERE p.thread_id=t.id) AS posts_count
      FROM threads t
      WHERE t.category_id=:cid
      ORDER BY t.pinned DESC, t.created_at DESC
    `, { cid: req.params.id });
    return res.json(rows);
  }
  const db = await readDB();
  const list = db.threads.filter(t => t.category_id === req.params.id);
  const withCounts = list.map(t => ({ ...t, posts_count: db.posts.filter(p => p.thread_id === t.id).length }));
  return res.json(withCounts);
});
app.post("/api/threads", authMiddleware, requireConfirmed, async (req, res) => {
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
  const posts = db.posts.filter(p => p.thread_id === req.params.id).map(p => {
    const author = db.users.find(u => u.id === p.author_id);
    return { ...p, author_username: author?.username || "unknown" };
  });
  return res.json(posts);
});
app.post("/api/posts", authMiddleware, requireConfirmed, async (req, res) => {
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
    return res.json({ id, thread_id: threadId, author_id: req.user.sub, content, created_at: now, attachments: Array.isArray(attachments) ? attachments : [] });
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

app.post("/api/upload", authMiddleware, upload.array("files", 4), async (req, res) => {
  const files = (req.files || []).map(f => ({ url: `/uploads/${f.filename}`, name: f.originalname }));
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
  const { username, notifications } = req.body || {};
  if (req.user.sub !== req.params.id && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  if (MYSQL_READY) {
    const name = typeof username === "string" && username.trim() ? username.trim() : undefined;
    const notif = typeof notifications === "boolean" ? (notifications ? 1 : 0) : undefined;
    if (name !== undefined) await pool.query("UPDATE users SET username=:name WHERE id=:id", { name, id: req.params.id });
    if (notif !== undefined) await pool.query("UPDATE users SET notifications=:notif WHERE id=:id", { notif, id: req.params.id });
    return res.json({ ok: true });
  }
  const db = await readDB();
  const u = db.users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  if (typeof username === "string" && username.trim()) u.username = username.trim();
  if (typeof notifications === "boolean") u.notifications = notifications;
  await writeDB(db);
  return res.json({ ok: true });
});

app.get("/api/search/threads", async (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  const categoryId = req.query.categoryId;
  const tag = (req.query.tag || "").toString().toLowerCase();
  const page = parseInt(req.query.page || "1", 10);
  const size = Math.min(parseInt(req.query.size || "10", 10), 50);
  if (MYSQL_READY) {
    const where = [];
    const params = {};
    if (categoryId) { where.push("t.category_id=:categoryId"); params.categoryId = categoryId; }
    if (q) { where.push("LOWER(t.title) LIKE :q"); params.q = `%${q}%`; }
    if (tag) { where.push("EXISTS (SELECT 1 FROM thread_tags tt WHERE tt.thread_id=t.id AND LOWER(tt.tag)=:tag)"); params.tag = tag; }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const [[{ cnt }]] = await pool.query(`SELECT COUNT(*) as cnt FROM threads t ${whereSql}`, params);
    const total = cnt;
    const offset = (page - 1) * size;
    const [items] = await pool.query(`
      SELECT t.id, t.category_id, t.title, t.author_id, t.locked, t.pinned, t.created_at,
             (SELECT COUNT(*) FROM posts p WHERE p.thread_id=t.id) AS posts_count
      FROM threads t
      ${whereSql}
      ORDER BY t.pinned DESC, t.created_at DESC
      LIMIT :limit OFFSET :offset
    `, { ...params, limit: size, offset });
    return res.json({ items, page, size, total, pages: Math.ceil(total / size) });
  }
  const db = await readDB();
  let list = db.threads;
  if (categoryId) list = list.filter(t => t.category_id === categoryId);
  if (q) list = list.filter(t => t.title.toLowerCase().includes(q));
  if (tag) list = list.filter(t => (t.tags || []).map(x => x.toLowerCase()).includes(tag));
  const total = list.length;
  const start = (page - 1) * size;
  const items = list.slice(start, start + size).map(t => ({ ...t, posts_count: db.posts.filter(p => p.thread_id === t.id).length }));
  return res.json({ items, page, size, total, pages: Math.ceil(total / size) });
});

app.get("/api/threads/:id/posts_paginated", async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);
  const size = Math.min(parseInt(req.query.size || "10", 10), 50);
  if (MYSQL_READY) {
    const [[{ cnt }]] = await pool.query("SELECT COUNT(*) as cnt FROM posts WHERE thread_id=:tid", { tid: req.params.id });
    const total = cnt;
    const offset = (page - 1) * size;
    const [rows] = await pool.query(`
      SELECT p.id, p.thread_id, p.author_id, p.content, p.attachments, p.created_at,
             COALESCE(u.username,'unknown') AS author_username
      FROM posts p
      LEFT JOIN users u ON u.id=p.author_id
      WHERE p.thread_id=:tid
      ORDER BY p.created_at ASC
      LIMIT :limit OFFSET :offset
    `, { tid: req.params.id, limit: size, offset });
    const items = rows.map(r => ({ ...r, attachments: JSON.parse(r.attachments || "[]") }));
    return res.json({ items, page, size, total, pages: Math.ceil(total / size) });
  }
  const db = await readDB();
  const all = db.posts.filter(p => p.thread_id === req.params.id);
  const total = all.length;
  const start = (page - 1) * size;
  const posts = all.slice(start, start + size).map(p => {
    const author = db.users.find(u => u.id === p.author_id);
    return { ...p, author_username: author?.username || "unknown" };
  });
  return res.json({ items: posts, page, size, total, pages: Math.ceil(total / size) });
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
