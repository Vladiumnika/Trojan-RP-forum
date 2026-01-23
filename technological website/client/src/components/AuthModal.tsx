import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, User, Terminal } from 'lucide-react';
import { useAuthStore } from '../context/AuthContext';
import { API_URL } from '../config';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.user, data.token);
      onClose();
    } catch (err: any) {
      console.error('Auth Error:', err);
      if (err.message === 'Failed to fetch') {
        setError(`Cannot connect to server at ${API_URL}. Check your connection.`);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md overflow-hidden rounded-lg border border-cyan-500/30 bg-black/90 shadow-2xl shadow-cyan-500/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 bg-cyan-950/20 p-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="h-5 w-5" />
            <span className="font-mono font-bold tracking-wider">
              {isLogin ? 'SYSTEM_ACCESS' : 'NEW_USER_REGISTRATION'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-cyan-400 hover:bg-cyan-500/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded border border-red-500/50 bg-red-950/30 p-3 text-sm text-red-400">
                &gt; ERROR: {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-cyan-600">USERNAME</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-cyan-600" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded border border-cyan-500/30 bg-cyan-950/10 py-2 pl-9 pr-4 text-cyan-100 placeholder-cyan-800 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="Enter username..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-cyan-600">PASSWORD_HASH</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-cyan-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-cyan-500/30 bg-cyan-950/10 py-2 pl-9 pr-4 text-cyan-100 placeholder-cyan-800 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="Enter password..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded border border-cyan-500 bg-cyan-500/10 py-2 font-mono font-bold text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black disabled:opacity-50"
            >
              {loading ? 'PROCESSING...' : isLogin ? 'EXECUTE_LOGIN' : 'INITIALIZE_USER'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-cyan-600 hover:text-cyan-400 hover:underline"
            >
              {isLogin
                ? 'No access token? Request registration'
                : 'Already registered? Login here'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
