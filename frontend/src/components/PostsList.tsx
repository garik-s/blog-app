"use client";
import { FC, useEffect } from "react";
import PostItem from "@/components/PostItem";
import usePostStore from "@/store/usePostStore";
import useAuthStore from "@/store/useAuthStore";
import Loading from "@/components/Loading";
import Link from "next/link";

const PostList: FC = () => {
    const { posts, currentPage, searchQuery, fetchPosts, loading } = usePostStore();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        fetchPosts(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    if (loading) return <Loading />;

    if (posts.length === 0) {
        return <h2 className="flex justify-center">No posts available.</h2>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                {isAuthenticated ? (
                    <Link href="/post/create">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                            Create New Post
                        </button>
                    </Link>
                ) : (
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                        disabled
                    >
                        Create New Post
                    </button>
                )}
            </div>

            {!isAuthenticated && (
                <div className="text-red-500 text-center">
                    <p>You need to be logged in to create, update, or delete posts.</p>
                </div>
            )}

            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
