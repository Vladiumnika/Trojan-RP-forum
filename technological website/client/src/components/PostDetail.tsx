import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Eye, ArrowLeft, Send, Copy } from 'lucide-react';
import { Post } from '../db';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onAddComment: (postId: string, content: string) => void;
  onVote: (postId: string, type: 'up' | 'down') => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onAddComment, onVote }) => {
  const [comment, setComment] = useState('');

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(post.id, comment);
      setComment('');
    }
  };

  const handleVote = (type: 'up' | 'down') => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onVote(post.id, type);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${post.title}\n\n${post.content}`);
    if (navigator.vibrate) navigator.vibrate([50, 50]);
    // Could add toast here
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Feed
      </button>

      <div className="glass-panel p-6 sm:p-8 rounded-xl border border-cyber-primary/20 relative overflow-hidden">
        {/* Voting Side (Desktop) / Top (Mobile) */}
        <div className="flex flex-col sm:flex-row gap-6">
           <div className="flex sm:flex-col items-center gap-2 sm:gap-4 bg-black/20 p-2 rounded-lg self-start">
             <button 
                onClick={() => handleVote('up')}
                className="p-2 hover:bg-cyber-primary/20 rounded-lg text-gray-400 hover:text-cyber-primary transition-colors"
              >
                <ThumbsUp size={20} />
              </button>
              <span className="font-mono font-bold text-lg text-white">{post.likes}</span>
              <button 
                onClick={() => handleVote('down')}
                className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
              >
                <ThumbsDown size={20} />
              </button>
           </div>

           <div className="flex-1">
              <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                <div className="flex gap-2">
                  <span className="text-xs font-mono text-cyber-black bg-cyber-primary px-3 py-1 rounded font-bold uppercase">{post.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyToClipboard} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" title="Copy Content">
                    <Copy size={16} />
                  </button>
                  <span className="text-sm text-gray-500 font-mono">{new Date(post.timestamp).toLocaleString()}</span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white break-words">{post.title}</h1>
              
              <div className="prose prose-invert max-w-none mb-8 text-gray-300 break-words">
                <p className="whitespace-pre-wrap">{post.content}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 border-t border-white/5 pt-6 gap-4">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2"><Eye size={16} /> {post.views} Views</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-primary to-cyber-secondary flex items-center justify-center text-black font-bold text-xs">
                     {post.author ? post.author.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-xs">{post.author || 'Anonymous'}</span>
                    <span className="text-[10px] text-cyber-primary">OP</span>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl border border-white/5">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <MessageSquare size={20} className="text-cyber-secondary" /> 
          Comments ({post.comments?.length || 0})
        </h3>

        <div className="space-y-6 mb-8">
          {post.comments?.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {comment.author ? comment.author.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-bold text-white">{comment.author || 'Anonymous'}</span>
                  <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-300 text-sm break-words">{comment.content}</p>
              </div>
            </div>
          ))}
          {(post.comments?.length || 0) === 0 && (
            <p className="text-gray-500 text-center italic py-4">No comments yet. Be the first to discuss!</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add to the discussion..."
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-primary/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!comment.trim()}
            className="bg-cyber-primary/10 hover:bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50 px-6 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send size={18} /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
