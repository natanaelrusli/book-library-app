import { Label } from "@/components/ui/label";
import { prisma } from "@/db/prisma";
import { formatDate } from "@/lib/utils";
import { Button, Card } from "antd";
import { Calendar } from "lucide-react";
import Link from "next/link";

type PostPageProps = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params: { id } }: PostPageProps) => {
  const post = await prisma.post.findFirst({
    where: { id: id },
  });

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <Button className="w-fit">
          <Link href="/blog/posts">Back to Posts</Link>
        </Button>

        <Label className="text-2xl font-bold">{post?.title}</Label>
      </div>

      <div className="my-4">
        <p className="text-sm">{post?.content}</p>
      </div>

      <hr />

      <div className="mt-5 flex items-center gap-3 text-xs text-dark-700">
        <Calendar className="size-4" />
        <p>{formatDate(post?.createdAt || "")}</p>
      </div>
    </Card>
  );
};

export default PostPage;
