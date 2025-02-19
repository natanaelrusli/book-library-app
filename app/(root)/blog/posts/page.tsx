import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import { Empty } from "antd";

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
    </Card>
  );
};

export default Page;
