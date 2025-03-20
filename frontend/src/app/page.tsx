import PostList from "@/components/PostsList";
import SearchPosts from "@/components/SearchPosts";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <SearchPosts />
      <PostList />
      <Pagination />
    </div>
  );
}
