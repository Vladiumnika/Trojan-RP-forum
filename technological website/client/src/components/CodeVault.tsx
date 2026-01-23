import React from 'react';
import { Post } from '../db';
import { Code, Copy, Database } from 'lucide-react';

interface CodeVaultProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export const CodeVault: React.FC<CodeVaultProps> = ({ posts, onPostClick }) => {
  // Filter posts that contain code blocks
  const codePosts = posts.filter(post => post.content.includes('```'));

  const extractSnippet = (content: string) => {
    const match = content.match(/```(\w+)?\n([\s\S]*?)```/);
    if (match) {
      return { lang: match[1] || 'text', code: match[2].trim() };
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-xl border border-cyber-primary/20 relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Database className="text-cyber-primary" /> CODE VAULT
            </h2>
            <p className="text-gray-400 text-sm">
              Archived snippets and algorithms from the network.
            </p>
          </div>
          <div className="text-4xl font-mono font-bold text-white/10">
            {codePosts.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {codePosts.map(post => {
          const snippet = extractSnippet(post.content);
          if (!snippet) return null;

          return (
            <div 
              key={post.id} 
              onClick={() => onPostClick(post)}
              className="glass-panel p-4 rounded-lg border border-white/5 hover:border-cyber-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-cyber-primary/10 text-cyber-primary px-2 py-0.5 rounded uppercase">
                    {snippet.lang}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <Code size={16} className="text-gray-600 group-hover:text-cyber-primary transition-colors" />
              </div>
              
              <h3 className="text-white font-bold mb-2 truncate group-hover:text-cyber-primary transition-colors">
                {post.title}
              </h3>
              
              <div className="bg-black/30 rounded p-3 font-mono text-xs text-gray-400 overflow-hidden h-24 relative">
                <pre>{snippet.code}</pre>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 pointer-events-none" />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>By {post.author}</span>
                <span className="flex items-center gap-1 hover:text-white transition-colors">
                  <Copy size={12} /> Copy
                </span>
              </div>
            </div>
          );
        })}
        {codePosts.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No code snippets found in the network.
          </div>
        )}
      </div>
    </div>
  );
};
