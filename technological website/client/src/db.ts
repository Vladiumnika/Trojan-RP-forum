export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  timestamp: number;
  comments: Comment[];
  likes: number;
  views: number;
}

const DB_NAME = 'DevCoreDB';
const DB_VERSION = 1;
const STORE_NAME = 'posts';

export const db = {
  async open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  },

  async getAllPosts(): Promise<Post[]> {
    const database = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async savePosts(posts: Post[]): Promise<void> {
    const database = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      posts.forEach(post => store.put(post));
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  },

  async addPost(post: Post): Promise<void> {
    const database = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(post);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
};
