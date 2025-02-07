"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createBookSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/admin/forms/FileUpload";
import ColorPicker from "@/components/admin/ColorPicker";
import Spinner from "@/components/ui/spinner";
import { toast } from "@/hooks/use-toast";
import { Book } from "@/types";

interface Props extends Partial<Book> {
  type?: "create" | "update";
  book?: Book;
  handleSubmit: (book: z.infer<typeof createBookSchema>) => Promise<void>;
}

const BookForm = ({ type, handleSubmit, book }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form: UseFormReturn<z.infer<typeof createBookSchema>> = useForm({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: book?.title || "",
      genre: book?.genre || "",
      author: book?.author || "",
      description: book?.description || "",
      rating: book?.rating || 1,
      numOfBooks: book?.availableCopies || 1,
      bookImage: book?.cover || "",
      bookColor: book?.color || "#fafafa",
      bookVideo: book?.video || "",
      bookSummary: book?.summary || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createBookSchema>) => {
    try {
      setIsLoading(true);
      await handleSubmit(values);

      if (type === "create") {
        router.push("/admin/books");
      } else {
        toast({
          title: "Success",
          description: `${values.title} updated successfully`,
        });
        router.push(`/admin/books/${book?.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"flex max-w-4xl flex-col gap-4"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book Title"
                    {...field}
                    className={"book-form_input"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter the author name"
                    {...field}
                    className={"book-form_input"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter the genre of the book"
                    {...field}
                    className={"book-form_input"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Rating
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    required
                    placeholder="Enter the rating of the book"
                    {...field}
                    className={"book-form_input"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"numOfBooks"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Total Number of Books
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    required
                    min={1}
                    max={100}
                    placeholder="Enter the total number of books"
                    {...field}
                    className={"book-form_input"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"bookImage"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Cover
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type={"image"}
                    accept={"image/*"}
                    placeholder={"Upload a book cover"}
                    folder={"/book"}
                    variant={"light"}
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"bookColor"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Cover Color
                </FormLabel>
                <FormControl>
                  <ColorPicker
                    onPickerChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Book Description"
                    rows={10}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"bookVideo"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Video
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type={"video"}
                    accept={"video/*"}
                    placeholder={"Upload a book trailer"}
                    folder={"/books/videos"}
                    variant={"light"}
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"bookSummary"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Book Summary"
                    rows={5}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="book-form_btn text-white"
          >
            {isLoading && <Spinner />}
            {type === "update" ? "Update Book" : "Add Book to Library"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
