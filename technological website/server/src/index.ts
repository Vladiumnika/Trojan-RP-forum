import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './database';

dotenv.config();

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: true, credentials: true }));
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true }
});
app.use(express.json());

const PORT = Number(process.env.PORT) || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'technological-secret-key-core-v1';

type DbUserRow = {
  id: number;
  username: string;
  passwordHash: string;
  role: 'user' | 'admin';
  reputation: number;
};

interface Comment {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: number;
  votes: number;
}

interface ChatMessage {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'system';
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  timestamp: number;
  comments: Comment[];
  likes: number;
  views: number;
  votedBy: string[];
}

let onlineUsers = 0;
const chatMessages: ChatMessage[] = [];
const posts: Post[] = [
  {
    id: '1',
    title: 'Optimizing large-scale WebGL renders with Web Workers',
    content: "I've been experimenting with offloading geometry generation to a worker thread to keep the main thread free for UI interactions. Here are my findings...",
    author: 'SarahDev',
    authorId: 'system-1',
    category: 'PERFORMANCE',
    timestamp: Date.now() - 1000 * 60 * 2,
    comments: [],
    likes: 42,
    views: 1200,
    votedBy: []
  },
  {
    id: '2',
    title: 'The state of Rust in Web Development 2024',
    content: "Is it finally time to rewrite everything in Rust? Let's discuss the ecosystem maturity.",
    author: 'RustEvangelist',
    authorId: 'system-2',
    category: 'RUST',
    timestamp: Date.now() - 1000 * 60 * 60,
    comments: [],
    likes: 128,
    views: 3400,
    votedBy: []
  },
  {
    id: '3',
    title: 'My React app is slow, help!',
    content: "I've tried everything. Memo, useCallback, lazy loading. What am I missing?",
    author: 'ConfusedDev',
    authorId: 'system-3',
    category: 'REACT',
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
    comments: [],
    likes: 89,
    views: 2100,
    votedBy: []
  }
];

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string };
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const role = username === 'Vladimir_Dev_Newbie' ? 'admin' : 'user';
    const reputation = 10;

    const result = db
      .prepare('INSERT INTO users (username, password_hash, role, reputation) VALUES (?, ?, ?, ?)')
      .run(username, passwordHash, role, reputation);

    const userId = String(result.lastInsertRowid);
    const token = jwt.sign({ id: userId, username, role }, JWT_SECRET);
    res.json({ token, user: { id: userId, username, reputation, role } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string };
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const user = db
      .prepare('SELECT id, username, password_hash as passwordHash, role, reputation FROM users WHERE username = ?')
      .get(username) as DbUserRow | undefined;

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userId = String(user.id);
    const token = jwt.sign({ id: userId, username: user.username, role: user.role }, JWT_SECRET);
    res.json({
      token,
      user: { id: userId, username: user.username, reputation: user.reputation, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
io.on('connection', (socket) => {
  onlineUsers++;
  io.emit('stats:update', { onlineUsers });

  socket.emit('posts:list', posts);
  socket.emit('chat:history', chatMessages.slice(-50));

  socket.on('chat:send', (data: { content: string; author: string; authorId: string }) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      author: data.author,
      authorId: data.authorId,
      content: data.content,
      timestamp: Date.now(),
      type: 'text'
    };
    chatMessages.push(newMessage);
    if (chatMessages.length > 100) chatMessages.shift();
    io.emit('chat:new', newMessage);
  });

  socket.on('post:create', (data: Omit<Post, 'id' | 'timestamp' | 'comments' | 'likes' | 'views' | 'votedBy'>) => {
    const newPost: Post = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      comments: [],
      likes: 0,
      views: 0,
      votedBy: []
    };
    posts.unshift(newPost);
    io.emit('posts:new', newPost);
  });

  socket.on('post:vote', ({ postId, userId, type }: { postId: string; userId: string; type: 'up' | 'down' }) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const voteValue = type === 'up' ? 1 : -1;
    post.likes += voteValue;

    const authorIdNumber = Number(post.authorId);
    if (Number.isFinite(authorIdNumber)) {
      db.prepare('UPDATE users SET reputation = reputation + ? WHERE id = ?').run(voteValue, authorIdNumber);
    }

    io.emit('post:updated', post);
  });

  socket.on(
    'comment:create',
    ({ postId, content, author, authorId }: { postId: string; content: string; author: string; authorId: string }) => {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        author,
        authorId,
        content,
        timestamp: Date.now(),
        votes: 0
      };

      post.comments.push(newComment);
      io.emit('post:updated', post);
    }
  );

  socket.on('admin:delete-post', ({ postId, adminId }: { postId: string; adminId: string }) => {
    const adminIdNumber = Number(adminId);
    if (!Number.isFinite(adminIdNumber)) return;

    const admin = db.prepare('SELECT role FROM users WHERE id = ?').get(adminIdNumber) as { role?: string } | undefined;
    if (!admin || admin.role !== 'admin') return;

    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) return;

    posts.splice(index, 1);
    io.emit('posts:list', posts);
  });

  socket.on('disconnect', () => {
    onlineUsers--;
    io.emit('stats:update', { onlineUsers });
  });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', system: 'DevCore Server v1.0' });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
