import { Post } from "@/types";
import axios from "axios";
import UpdatePostForm from "@/components/UpdatePostForm";



const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface PostEditPageProps {
  params: {
    id: string;
  };
}


export default async function PostEditPage({ params }: PostEditPageProps) {
  const post = await getPostId(params);
  
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <UpdatePostForm post={post} />
    </div>
  );
}

export async function generateStaticParams() {
  let posts: Post[] = [];
  try {
    const response = await axios.get(`${API_URL}/posts`);
    posts = response.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

const getPostId = async (params: { id: string }): Promise<Post> => {
  const { data } = await axios.get<Post>(`${API_URL}/posts/${(await params).id}`);
  return data;
};
