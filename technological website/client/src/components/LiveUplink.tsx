import React, { useEffect, useState, useRef } from 'react';
import { Send, Terminal } from 'lucide-react';
import { socket } from '../socket';
import { useAuthStore } from '../context/AuthContext';

interface ChatMessage {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'system';
}

export const LiveUplink: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    // Listen for history and new messages
    socket.on('chat:history', (history: ChatMessage[]) => {
      setMessages(history);
      scrollToBottom();
    });

    socket.on('chat:new', (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg]);
      scrollToBottom();
    });

    return () => {
      socket.off('chat:history');
      socket.off('chat:new');
    };
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    socket.emit('chat:send', {
      content: input,
      author: user.username,
      authorId: user.id
    });
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] glass-panel rounded-xl overflow-hidden border border-cyber-primary/20">
      <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-lg font-mono font-bold flex items-center gap-2 text-cyber-primary">
          <Terminal size={18} /> LIVE UPLINK // GLOBAL_CHAT
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          ENCRYPTED
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyber-primary/20">
        {messages.map((msg) => {
          const isMe = user?.id === msg.authorId;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className="flex items-center gap-2 mb-1">
                  {!isMe && (
                    <div className="w-4 h-4 rounded-full bg-cyber-secondary flex items-center justify-center text-[10px] text-black font-bold">
                      {msg.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className={`text-xs font-mono ${isMe ? 'text-cyber-primary' : 'text-cyber-secondary'}`}>
                    {msg.author}
                  </span>
                  <span className="text-[10px] text-gray-600">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm ${
                  isMe 
                    ? 'bg-cyber-primary/10 text-white border border-cyber-primary/20 rounded-tr-none' 
                    : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/5 flex gap-3">
        {user ? (
          <>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Transmit message..."
              className="flex-1 bg-black/20 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-cyber-primary transition-colors font-mono text-sm"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-cyber-primary text-black rounded hover:bg-cyber-primary/80 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </>
        ) : (
          <div className="flex-1 text-center py-2 text-gray-500 font-mono text-sm bg-white/5 rounded">
            [ACCESS DENIED] Login to establish uplink
          </div>
        )}
      </form>
    </div>
  );
};
