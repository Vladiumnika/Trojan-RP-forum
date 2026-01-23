import React from 'react';
import { Post } from '../db';
import { useAuthStore } from '../context/AuthContext';
import { socket } from '../socket';
import { Trash2, Shield, AlertTriangle, Activity } from 'lucide-react';

interface AdminPanelProps {
  posts: Post[];
  onlineUsers: number;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ posts, onlineUsers }) => {
  const { user } = useAuthStore();

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500 font-mono">
        <AlertTriangle size={48} className="mb-4" />
        <h2 className="text-2xl font-bold">ACCESS DENIED</h2>
        <p className="text-gray-400">You do not have clearance for this sector.</p>
      </div>
    );
  }

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to purge this data stream?')) {
      socket.emit('admin:delete-post', { postId, adminId: user.id });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel p-6 rounded-xl border border-red-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-red-400">
              <Shield className="text-red-500" /> ADMIN COMMAND
            </h2>
            <p className="text-gray-400 text-sm font-mono">
              System Control & Moderation Interface
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{posts.length}</div>
              <div className="text-xs text-gray-500 uppercase">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-primary">{onlineUsers}</div>
              <div className="text-xs text-gray-500 uppercase">Active Users</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl border border-white/5">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Activity size={18} /> Content Management
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs text-gray-500 uppercase font-mono">
                <th className="p-3">ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-3 font-mono text-xs text-gray-600">#{post.id.substr(0, 6)}</td>
                  <td className="p-3 font-medium text-white">{post.title}</td>
                  <td className="p-3 text-sm text-cyber-blue">{post.author}</td>
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
