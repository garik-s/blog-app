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
  loading: boolean;
  fetchPosts: (page: number, searchQuery: string) => Promise<void>;
  createPost: (newPost: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
  updatePost: (id: number, updatedPost: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  resetStore: () => void;
}

const initialState = {
  posts: [],
  totalPages: 1,
  currentPage: 1,
  searchQuery: '',
  loading: false,
};

const usePostStore = create<PostStore>((set) => ({
  ...initialState,

  fetchPosts: async (page, searchQuery) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${API_URL}/posts`, {
        params: { page, searchQuery },
        withCredentials: true,
      });
      const { posts, totalPages } = data;
      set({ posts, totalPages, currentPage: page });
    } catch (error) {
      toast.error('Failed to fetch posts!');
      console.error('Error fetching posts:', error);
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (newPost) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(`${API_URL}/posts`, newPost, {
        withCredentials: true,
      });

      set((state) => ({ posts: [...state.posts, data] }));
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post!');
      console.error('Error creating post:', error);
    } finally {
      set({ loading: false });
    }
  },

  updatePost: async (id, updatedPost) => {
    set({ loading: true });
    try {
      await axios.put(`${API_URL}/posts/${id}`, updatedPost, {
        withCredentials: true,
      });
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...updatedPost } : post
        ),
      }));
      toast.success('Post updated successfully!');
    } catch (error) {
      toast.error("Failed to update post!");
      console.error("Error updating post:", error);
    } finally {
      set({ loading: false });
    }
  },

  deletePost: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URL}/posts/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete post!');
      console.error('Error deleting post:', error);
    } finally {
      set({ loading: false });
    }
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setPage: (page) => {
    set({ currentPage: page });
  },

  resetStore: () => {
    set(initialState);
  },
}));

export default usePostStore;
