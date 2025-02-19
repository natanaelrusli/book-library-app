"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { createPostSchema } from "@/lib/validation";
import { createPost } from "@/lib/actions/post";
import { toast } from "@/hooks/use-toast";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Textarea } from "./ui/textarea";

type PostformProps = {
  defaultValues?: {
    title: string;
    slug: string;
    content: string;
  };
};

const PostForm = ({ defaultValues }: PostformProps) => {
  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: defaultValues || { title: "", slug: "", content: "" },
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
                  <Textarea rows={5} {...field} />
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
  );
};

export default PostForm;
