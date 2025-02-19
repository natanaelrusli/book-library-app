"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { toast } from "@/hooks/use-toast";
import { createPost } from "@/lib/actions/post";
import { createPostSchema } from "@/lib/validation";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";

const Page = () => {
  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", slug: "", content: "" },
  });

  const [formStatus, setFormStatus] = useState<
    "submitting" | "success" | "error" | "idle"
  >("idle");

  const handleSubmit = async (values: z.infer<typeof createPostSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("content", values.content);

    try {
      setFormStatus("submitting");
      await createPost(formData);
      toast({ title: "Success", description: "Post created successfully" });
      form.reset();
      setFormStatus("success");
    } catch (error) {
      console.error(error);
      setFormStatus("error");
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setFormStatus("idle");
    }
  };

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <Link href="/blog/posts">
          <Button className="w-fit border border-gray-200 bg-white hover:bg-white">
            Back to Posts
          </Button>
        </Link>
        <Label className="text-2xl font-bold">Add New Post</Label>
      </div>
      <div className="mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Title</Label>
                  <FormControl>
                    <Input {...field} placeholder="e.g. My First Post" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <Label>Slug</Label>
                  <FormControl>
                    <Input {...field} placeholder="e.g. my-post" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <Label>Content</Label>
                  <FormControl>
                    <TextArea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="bg-primary-admin text-white hover:bg-dark-100"
              type="submit"
              disabled={formStatus === "submitting"}
            >
              {formStatus === "submitting" && (
                <Spin
                  indicator={
                    <LoadingOutlined className="mr-2 size-3 text-white" spin />
                  }
                  size="small"
                />
              )}
              Create Post
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default Page;
