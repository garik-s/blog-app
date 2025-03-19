"use client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import usePostStore from "@/store/usePostStore";

interface PostFormData {
  title: string;
  content: string;
}

const CreatePostForm: FC = () => {
  const { createPost } = usePostStore();
  const { register, handleSubmit, reset } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: PostFormData) => {
    await createPost(data);
    reset();
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          {...register("title", { required: true })}
          className="w-full p-2 border rounded"
          placeholder="Enter title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          {...register("content", { required: true })}
          className="w-full p-2 border rounded"
          placeholder="Enter content"
          rows={4}
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="cursor-pointer bg-gray-200 text-black px-4 py-2 rounded"
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
        <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
