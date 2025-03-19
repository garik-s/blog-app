"use client"
import { FC, useEffect } from "react";
import PostItem from "./PostItem";
import usePostStore from "@/store/usePostStore";


const PostList: FC = () => {
    const { posts, currentPage, searchQuery, fetchPosts } = usePostStore();

    useEffect(() => {
        fetchPosts(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    return (
        <div className="space-y-4">
            {posts.length === 0 ? (
                <h2 className="text-gray-500 flex justify-center">No posts available.</h2>
            ) : (
                posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))
            )}
        </div>
    );
};

export default PostList;
