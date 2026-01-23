import { useState, useEffect, useRef } from 'react'
import { Terminal, Cpu, Activity, Wifi, Battery, Zap, Plus, Menu, LogOut, User, Lock, Shield } from 'lucide-react'
import { socket } from './socket'
import { useBattery } from './hooks/useBattery'
import { useNetwork } from './hooks/useNetwork'
import PrimeWorker from './workers/prime.worker?worker'
import { db, Post } from './db'
import { ForumFeed } from './components/ForumFeed'
import { PostDetail } from './components/PostDetail'
import { CreatePostModal } from './components/CreatePostModal'
import { AuthModal } from './components/AuthModal'
import { LiveUplink } from './components/LiveUplink'
import { CodeVault } from './components/CodeVault'
import { NetGraph } from './components/NetGraph'
import { AdminPanel } from './components/AdminPanel'
import { useAuthStore } from './context/AuthContext'


function App() {
  const [systemStats, setSystemStats] = useState({ cpu: 12, mem: 45, net: 1.2 })
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [activeTab, setActiveTab] = useState('Dashboard')
  
  // Forum State
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Auth State
  const { user, logout } = useAuthStore()

  // Browser APIs
  const battery = useBattery()
  const network = useNetwork()
  const [workerStatus, setWorkerStatus] = useState('IDLE')
  const [workerResult, setWorkerResult] = useState<any>(null)
  const [serverStatus, setServerStatus] = useState<'connected' | 'disconnected'>('disconnected')
  
  const workerRef = useRef<Worker>()

  useEffect(() => {
    socket.connect()
    
    socket.on('connect', () => setServerStatus('connected'))
    socket.on('disconnect', () => setServerStatus('disconnected'))
    socket.on('connect_error', () => setServerStatus('disconnected'))
    
    // Page Visibility API
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'DevCore [PAUSED]';
      } else {
        document.title = `DevCore | ${onlineUsers} Online`;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial load from IndexedDB (for offline/cache)
    db.getAllPosts().then(localPosts => {
      if (localPosts.length > 0) {
        setPosts(localPosts.sort((a, b) => b.timestamp - a.timestamp))
      }
    })

    socket.on('stats:update', (data: any) => {
      setOnlineUsers(data.onlineUsers)
      if (!document.hidden) {
        document.title = `DevCore | ${data.onlineUsers} Online`
      }
    })

    socket.on('posts:list', (serverPosts: Post[]) => {
      setPosts(serverPosts)
      db.savePosts(serverPosts) // Cache latest
    })

    socket.on('posts:new', (newPost: Post) => {
      setPosts(prev => [newPost, ...prev])
      db.addPost(newPost)
      if (Notification.permission === 'granted') {
        new Notification('New Thread', { body: newPost.title })
      }
    })

    socket.on('post:updated', (updatedPost: Post) => {
      setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p))
      db.savePosts([updatedPost]) // Update specific post in DB
      
      // Update selected post if it's the one currently open
      if (selectedPost?.id === updatedPost.id) {
        setSelectedPost(updatedPost)
      }
    })
    
    // Initialize Worker
    workerRef.current = new PrimeWorker()
    workerRef.current.onmessage = (e) => {
      setWorkerStatus('IDLE')
      setWorkerResult(e.data)
      
      // Notify user
      if (Notification.permission === 'granted') {
        new Notification('Task Complete', { body: `Calculated ${e.data.primesFound} primes in ${e.data.timeTaken}ms` })
      }
    }

    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 30) + 10,
        mem: Math.floor(Math.random() * 20) + 40,
        net: parseFloat((Math.random() * 5).toFixed(1))
      })
    }, 2000)

    // Speech Synthesis Welcome
    if ('speechSynthesis' in window) {
      // Small delay to ensure interaction or just preload
      const utterance = new SpeechSynthesisUtterance('Welcome to DevCore. System Online.')
      utterance.volume = 0.5
      utterance.pitch = 0.8
      utterance.rate = 1.1
      // window.speechSynthesis.speak(utterance) // Auto-play might be blocked
    }

    return () => {
      clearInterval(interval)
      socket.disconnect()
      workerRef.current?.terminate()
    }
  }, [selectedPost])

  const runDiagnostics = () => {
    setWorkerStatus('PROCESSING')
    setWorkerResult(null)
    workerRef.current?.postMessage({ action: 'CALCULATE_PRIMES', limit: 500000 })
  }



  const handleCreatePost = (data: { title: string; content: string; category: string }) => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }
    socket.emit('post:create', {
      ...data,
      author: user.username,
      authorId: user.id,
      category: data.category
    })
  }

  const handleAddComment = (postId: string, content: string) => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }
    socket.emit('comment:create', {
      postId,
      content,
      author: user.username,
      authorId: user.id
    })
  }

  const handleVote = (postId: string, type: 'up' | 'down') => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }
    socket.emit('post:vote', { postId, userId: user.id, type })
  }

  return (
    <div className="flex h-screen bg-cyber-black text-white font-sans overflow-hidden">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={handleCreatePost} 
      />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 glass-panel flex flex-col border-r border-white/5 z-40
        transform transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 rounded bg-cyber-primary/20 flex items-center justify-center neon-border">
            <Terminal className="text-cyber-primary" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-wider font-mono">DEV<span className="text-cyber-primary">CORE</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            'Dashboard', 
            'Neural Threads', 
            'Live Uplink', 
            'Code Vault', 
            'Net Graph',
            ...(user?.role === 'admin' ? ['Admin Command'] : [])
          ].map((item) => (
            <button 
              key={item} 
              onClick={() => {
                setActiveTab(item);
                setSelectedPost(null);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${activeTab === item ? 'bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              {item === 'Admin Command' ? (
                <Shield size={18} className={activeTab === item ? "text-red-500" : "group-hover:text-red-500 transition-colors"} />
              ) : (
                <Activity size={18} className={activeTab === item ? "text-cyber-primary" : "group-hover:text-cyber-primary transition-colors"} />
              )}
              <span className={`font-mono text-sm ${item === 'Admin Command' ? 'text-red-400 font-bold' : ''}`}>{item}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="bg-cyber-dark p-3 rounded border border-white/5 space-y-3">
            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1"><Cpu size={10} /> CPU</span>
              <span className="text-cyber-primary">{systemStats.cpu}%</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-primary transition-all duration-500" style={{ width: `${systemStats.cpu}%` }}></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1"><Battery size={10} /> PWR</span>
              <span className={battery?.charging ? "text-green-400" : "text-cyber-secondary"}>
                {battery ? `${Math.round(battery.level * 100)}%` : 'N/A'}
              </span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-secondary transition-all duration-500" style={{ width: `${battery ? battery.level * 100 : 0}%` }}></div>
            </div>

            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1"><Wifi size={10} /> NET</span>
              <span className="text-cyber-accent">{network?.downlink || systemStats.net} Mb/s</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Header */}
        <header className="h-16 glass-panel border-b border-white/5 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <span className="hidden sm:flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> SYSTEM ONLINE</span>
            <span className="hidden sm:block text-gray-600">|</span>
            <span className="hidden sm:block text-cyber-primary">USERS: {onlineUsers}</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => {
                if (!user) {
                  setIsAuthModalOpen(true);
                } else {
                  setIsCreateModalOpen(true);
                }
              }}
              className="bg-cyber-primary/10 hover:bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2"
            >
              {user ? <Plus size={14} /> : <Lock size={14} />} 
              <span className="hidden sm:inline">{user ? 'NEW THREAD' : 'LOGIN TO POST'}</span>
              <span className="sm:hidden">{user ? 'NEW' : 'LOGIN'}</span>
            </button>
            
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-white/10">
              <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${serverStatus === 'connected' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                <div className={`w-2 h-2 rounded-full ${serverStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                {serverStatus === 'connected' ? 'SERVER ONLINE' : 'SERVER OFFLINE'}
              </div>
              {user ? (
                <>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-white">{user.username}</div>
                    <div className="text-[10px] text-cyber-primary font-mono">REP: {user.reputation}</div>
                  </div>
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-cyber-primary to-cyber-secondary border border-white/20 flex items-center justify-center text-black font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={logout} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-red-400" title="Logout">
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">GUEST ACCESS</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-cyber-primary/20 scrollbar-track-transparent">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {activeTab === 'Dashboard' && !selectedPost && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-xl border border-cyber-primary/20 relative overflow-hidden group md:col-span-2">
                    <div className="absolute -right-10 -top-10 w-64 h-64 bg-cyber-primary/10 rounded-full blur-3xl group-hover:bg-cyber-primary/20 transition-all duration-1000"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-primary/10 text-cyber-primary text-xs font-mono mb-4 border border-cyber-primary/20">
                        <span className="animate-pulse">●</span> SYSTEM V3.2 MOBILE READY
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to DevCore</h2>
                        <p className="text-gray-400 max-w-xl text-sm sm:text-base">
                        Secure Auth. Mobile Responsive. Vote on Algorithms.
                        </p>
                    </div>
                    </div>

                    {/* Diagnostics Panel */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-mono font-bold text-gray-400 mb-4 flex items-center gap-2">
                                <Zap size={16} className="text-yellow-400" /> SYSTEM DIAGNOSTICS
                            </h3>
                            <div className="space-y-2 text-sm font-mono">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">WORKER STATUS</span>
                                    <span className={workerStatus === 'PROCESSING' ? "text-yellow-400 animate-pulse" : "text-green-400"}>{workerStatus}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">LAST RESULT</span>
                                    <span className="text-white">{workerResult ? `${workerResult.timeTaken}ms` : '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">DB ENTRIES</span>
                                    <span className="text-white">{posts.length}</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={runDiagnostics}
                            disabled={workerStatus === 'PROCESSING'}
                            className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs py-2 rounded transition-all flex items-center justify-center gap-2"
                        >
                            {workerStatus === 'PROCESSING' ? <Activity className="animate-spin" size={14} /> : <Zap size={14} />}
                            RUN BENCHMARK
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Feed */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-mono font-bold text-white flex items-center gap-2">
                        <Activity size={16} className="text-cyber-secondary" /> RECENT ACTIVITY
                      </h3>
                      <div className="flex gap-2 text-xs font-mono">
                        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-white">ALL</button>
                        <button className="px-3 py-1 rounded hover:bg-white/10 text-gray-500">POPULAR</button>
                      </div>
                    </div>

                    <ForumFeed posts={posts} onPostClick={setSelectedPost} />
                  </div>

                  {/* Side Widgets */}
                  <div className="space-y-6 hidden lg:block">
                    <div className="glass-panel p-5 rounded-lg border border-white/5">
                      <h3 className="text-sm font-mono font-bold text-gray-400 mb-4">TRENDING TOPICS</h3>
                      <div className="space-y-3">
                        {['#RustLang', '#AI_Models', '#WebAssembly', '#SystemDesign'].map((tag, i) => (
                          <div key={tag} className="flex items-center justify-between group cursor-pointer">
                            <span className="text-sm text-gray-300 group-hover:text-cyber-secondary transition-colors">{tag}</span>
                            <span className="text-xs text-gray-600 font-mono">+{120 - i * 10}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-panel p-5 rounded-lg border border-white/5">
                      <h3 className="text-sm font-mono font-bold text-gray-400 mb-4">ONLINE MEMBERS</h3>
                      <div className="flex flex-wrap gap-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded bg-white/5 border border-white/10 relative" title={`User ${i}`}>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111] rounded-full"></div>
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-white/10">
                          +{onlineUsers > 8 ? onlineUsers - 8 : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedPost && (
              <PostDetail 
                post={selectedPost} 
                onBack={() => setSelectedPost(null)}
                onAddComment={handleAddComment}
                onVote={handleVote}
              />
            )}
            
            {activeTab === 'Neural Threads' && !selectedPost && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-2xl font-bold flex items-center gap-2 text-cyber-secondary">
                     <Activity /> NEURAL THREADS // TOP RATED
                   </h2>
                </div>
                <ForumFeed posts={[...posts].sort((a, b) => b.likes - a.likes)} onPostClick={setSelectedPost} />
              </div>
            )}

            {activeTab === 'Live Uplink' && !selectedPost && <LiveUplink />}
            
            {activeTab === 'Code Vault' && !selectedPost && <CodeVault posts={posts} onPostClick={setSelectedPost} />}
            
            {activeTab === 'Net Graph' && !selectedPost && <NetGraph />}

            {activeTab === 'Admin Command' && !selectedPost && <AdminPanel posts={posts} onlineUsers={onlineUsers} />}

          </div>
        </div>
      </main>
    </div>
  )
}

export default App
