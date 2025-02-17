"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export const createPost = async (formData: FormData) => {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("slug") as string).replace(/\s+/g, "-").toLowerCase(),
      content: formData.get("content") as string,
    },
  });
  revalidatePath("/blog/posts");
};

export const editPost = async (formData: FormData, id: string) => {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("slug") as string).replace(/\s+/g, "-").toLowerCase(),
      content: formData.get("content") as string,
    },
  });
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};
