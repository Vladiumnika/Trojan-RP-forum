import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Allow all origins for CORS
app.use(cors({
  origin: true, // Reflects the request origin
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(express.json());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'technological-secret-key-core-v1';

interface User {
  id: string;
  username: string;
  passwordHash: string;
  reputation: number;
  role: 'user' | 'admin';
  createdAt: number;
}

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
  likes: number; // This will act as votes score
  views: number;
  votedBy: string[]; // User IDs who voted
}

let onlineUsers = 0;
const users: User[] = [];
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
  }
];

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      passwordHash,
      reputation: 10, // Start with 10 rep
      role: username === 'Vladimir_Dev_Newbie' ? 'admin' : 'user',
      createdAt: Date.now()
    };
    
    users.push(newUser);
    
    const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, JWT_SECRET);
    res.json({ token, user: { id: newUser.id, username: newUser.username, reputation: newUser.reputation, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, reputation: user.reputation, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

io.on('connection', (socket) => {
  onlineUsers++;
  io.emit('stats:update', { onlineUsers });
  
  // Send initial posts
  socket.emit('posts:list', posts);
  socket.emit('chat:history', chatMessages.slice(-50)); // Send last 50 messages

  socket.on('chat:send', (data: { content: string, author: string, authorId: string }) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      author: data.author,
      authorId: data.authorId,
      content: data.content,
      timestamp: Date.now(),
      type: 'text'
    };
    chatMessages.push(newMessage);
    if (chatMessages.length > 100) chatMessages.shift(); // Keep history manageable
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

  socket.on('post:vote', ({ postId, userId, type }: { postId: string, userId: string, type: 'up' | 'down' }) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      // Simple voting logic: +/- 1
      const voteValue = type === 'up' ? 1 : -1;
      
      // Check if already voted (simplified logic for now)
      // Ideally we should track user votes in a map
      
      post.likes += voteValue;
      
      // Update author reputation
      const author = users.find(u => u.id === post.authorId);
      if (author) {
        author.reputation += voteValue;
      }

      io.emit('post:updated', post);
    }
  });

  socket.on('comment:create', ({ postId, content, author, authorId }: { postId: string, content: string, author: string, authorId: string }) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
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
  });

  socket.on('admin:delete-post', ({ postId, adminId }: { postId: string, adminId: string }) => {
    // Verify admin
    const admin = users.find(u => u.id === adminId);
    if (admin && admin.role === 'admin') {
      const index = posts.findIndex(p => p.id === postId);
      if (index !== -1) {
        posts.splice(index, 1);
        io.emit('posts:list', posts); // Refresh everyone's list
      }
    }
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
