"use client"
import { FC } from "react";
import { Post } from "@/types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import usePostStore from "@/store/usePostStore";

interface PostFormProps {
  post: Post;
}

const UpdatePostForm: FC<PostFormProps> = ({ post }) => {
  const { updatePost } = usePostStore();  
  const { register, handleSubmit } = useForm<Post>({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: Post) => {
    await updatePost(post.id, data);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          {...register("title")}
          className="w-full p-2 border rounded"
          placeholder="Enter title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          {...register("content")}
          className="w-full p-2 border rounded"
          placeholder="Enter content"
          rows={4}
        />
      </div>
      <div className="flex justify-between">
        <button type="button" className="cursor-pointer bg-gray-200 text-black px-4 py-2 rounded" onClick={() => router.push("/")}>
          Cancel
        </button>
        <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </div>


    </form >
  );
};

export default UpdatePostForm;
