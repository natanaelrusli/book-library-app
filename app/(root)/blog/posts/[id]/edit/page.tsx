import PostForm from "@/components/PostForm";
import { Label } from "@/components/ui/label";
import { prisma } from "@/db/prisma";
import { Button, Card } from "antd";
import Link from "next/link";

type PostEditPageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: PostEditPageProps) => {
  const post = await prisma.post.findFirst({
    where: { id: id },
  });

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <Link href={`/blog/posts/${id}`}>
          <Button className="w-fit">Cancel</Button>
        </Link>
        <Label className="text-2xl font-bold">Edit Post</Label>
      </div>

      <PostForm
        defaultValues={{
          title: post?.title ?? "",
          content: post?.content ?? "",
          slug: post?.slug ?? "",
        }}
      />
    </Card>
  );
};

export default Page;
