import { FC } from "react"
import { Post } from "@/types";
import Link from "next/link";
import usePostStore from "@/store/usePostStore";

interface PostProps {
  post: Post;
}

const PostItem: FC<PostProps> = ({ post }) => {
  const { deletePost, setPage } = usePostStore();

  const handleDelete = async (postId: number) => {
    await deletePost(postId);
    setPage(1);
  };

  return (
    <div className="container border p-4 rounded shadow-lg bg-gray">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-800 mt-2">{post.content}</p>
      <p className="text-gray-600 text-sm mt-2">
        Created At: {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="mt-4 flex gap-x-4">
        <Link
          href={`/post/${post.id}`}
          className="text-blue-500 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(post.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
