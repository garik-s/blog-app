import PostList from "@/components/PostsList";
import SearchPosts from "@/components/SearchPosts";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link href="/post/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create New Post
          </button>
        </Link>
      </div>
      <SearchPosts />
      <PostList />
      <Pagination />
    </div>
  );
}
