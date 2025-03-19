import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface PostStore {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  fetchPosts: (page: number, searchQuery: string) => Promise<void>;
  createPost: (newPost: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
  updatePost: (id: number, updatedPost: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  totalPages: 1,
  currentPage: 1,
  searchQuery: '',

  fetchPosts: async (page, searchQuery) => {
    try {
      const { data } = await axios.get(`${API_URL}/posts`, {
        params: { page, searchQuery },
      });
      const { posts, totalPages } = data;
      set({ posts, totalPages, currentPage: page });
    } catch (error) {
      toast.error('Failed to fetch posts!');
      console.error('Error fetching posts:', error);
    }
  },

  createPost: async (newPost) => {
    try {
      const { data } = await axios.post<Post>(`${API_URL}/posts`, newPost);
      set((state) => ({ posts: [...state.posts, data] }));
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post!');
      console.error('Error creating post:', error);
    }
  },

  updatePost: async (id, updatedPost) => {
    try {
      await axios.put(`${API_URL}/posts/${id}`, updatedPost);
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
      }));
      toast.success('Post updated successfully!');
    } catch (error) {
      toast.error('Failed to update post!');
      console.error('Error updating post:', error);
    }
  },

  deletePost: async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete post!');
      console.error('Error deleting post:', error);
    }
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setPage: (page) => {
    set({ currentPage: page });
  },
}));

export default usePostStore;
