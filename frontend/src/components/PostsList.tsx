"use client";
import { FC, useEffect } from "react";
import PostItem from "@/components/PostItem";
import usePostStore from "@/store/usePostStore";
import Loading from "@/components/Loading";

const PostList: FC = () => {
    const { posts, currentPage, searchQuery, fetchPosts, resetStore, loading } = usePostStore();

    useEffect(() => {
        return () => resetStore();
    }, []);

    useEffect(() => {
        fetchPosts(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    if (loading) return <Loading />;

    if (posts.length === 0) {
        return <h2 className="flex justify-center">No posts available.</h2>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
