import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string; category: string }) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('GENERAL');

  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('text/') || file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js'))) {
      const text = await file.text();
      setContent(prev => prev + (prev ? '\n\n' : '') + '```\n' + text + '\n```');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onSubmit({ title, content, category });
      setTitle('');
      setContent('');
      setCategory('GENERAL');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111] w-full max-w-2xl rounded-xl border border-white/10 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            <Plus className="text-cyber-primary" /> Create New Thread
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`transition-colors rounded-lg p-2 ${isDragging ? 'bg-cyber-primary/20 border-2 border-dashed border-cyber-primary' : ''}`}
            >
              <div className="mb-4">
                <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Topic Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-primary/50 transition-colors"
                placeholder="What's on your mind?"
                autoFocus
              />
            </div>

              <div className="mb-4">
                <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-primary/50 transition-colors appearance-none"
                >
                  <option value="GENERAL">General</option>
                  <option value="REACT">React</option>
                  <option value="RUST">Rust</option>
                  <option value="PERFORMANCE">Performance</option>
                  <option value="AI">AI/ML</option>
                  <option value="WEB3">Web3</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2 uppercase flex justify-between">
                  <span>Content</span>
                  <span className="text-[10px] text-cyber-primary opacity-70">{isDragging ? 'DROP FILE TO UPLOAD' : 'DRAG & DROP TEXT FILES SUPPORTED'}</span>
                </label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-primary/50 transition-colors h-40 resize-none font-mono text-sm"
                  placeholder="Share your knowledge..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!title || !content}
                className="bg-cyber-primary text-cyber-black font-bold px-8 py-2 rounded-lg hover:bg-cyber-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publish Thread
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
