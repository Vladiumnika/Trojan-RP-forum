import React from 'react';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { Post } from '../db';

interface ForumFeedProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export const ForumFeed: React.FC<ForumFeedProps> = ({ posts, onPostClick }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div 
          key={post.id} 
          onClick={() => onPostClick(post)}
          className="glass-panel p-5 rounded-lg border border-transparent hover:border-cyber-primary/30 transition-all cursor-pointer group animate-fade-in"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-cyber-black bg-cyber-primary px-2 py-0.5 rounded font-bold uppercase">{post.category}</span>
            </div>
            <span className="text-xs text-gray-500 font-mono">{new Date(post.timestamp).toLocaleString()}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-cyber-primary transition-colors">{post.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:text-white transition-colors"><MessageSquare size={14} /> {post.comments.length} comments</span>
              <span className="flex items-center gap-1 hover:text-white transition-colors"><ThumbsUp size={14} /> {post.likes}</span>
              <span className="flex items-center gap-1 hover:text-white transition-colors"><Eye size={14} /> {post.views}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600"></div>
              <span>by <span className="text-white">{post.author}</span></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
