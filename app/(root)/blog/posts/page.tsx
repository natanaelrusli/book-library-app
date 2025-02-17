import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import { Button, Empty, Input } from "antd";
import { Textarea } from "@/components/ui/textarea";
import TextArea from "antd/es/input/TextArea";
import { createPost } from "@/lib/actions/post";

const Page = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      createdAt: true,
    },
    // take: 1,
    // skip: 1,
  });

  const postsCount = await prisma.post.count({
    where: {
      published: true,
    },
  });

  return (
    <Card className="p-6">
      <div className="mt-3 w-full border-b pb-6">
        <Label className="text-3xl font-semibold">
          All Posts ({postsCount})
        </Label>
      </div>

      <ul className="my-2">
        {!posts.length && (
          <div className="my-8">
            <Empty description="No posts yet!" />
          </div>
        )}
        {posts.map((post) => (
          <li key={post.id} className="border-b border-black/10 leading-8">
            <div className="flex flex-col gap-4 px-1 py-5">
              <Link href={`/blog/posts/${post.id}`}>
                <h2 className="text-lg font-bold">{post.title}</h2>
              </Link>
              <p className="line-clamp-4 overflow-hidden text-ellipsis text-sm">
                {post.content}
              </p>
              <p className="text-xs text-gray-600">
                {new Date(post.createdAt).toDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Label className="text-2xl font-bold">Add New Post</Label>
        <div className="mt-3">
          <form action={createPost} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Input name="title" type="text" />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Slug</Label>
              <Input name="slug" type="text" />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Content</Label>
              <TextArea name="content" rows={5} />
            </div>

            <button className="w-fit rounded-lg border border-gray-400 px-4 py-2 transition-all duration-500 hover:shadow-md">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default Page;
