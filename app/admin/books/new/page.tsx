"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookForm from "@/components/admin/forms/BookForm";
import { createBook } from "@/lib/actions/book";
import { z } from "zod";
import { createBookSchema } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";

const Page = () => {
  const handleSubmitBook = async (book: z.infer<typeof createBookSchema>) => {
    const res = await createBook(book);
    if (!res.success) {
      console.error(res);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Book created successfully.",
    });
    return;
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/books">
          <Button variant="outline">
            <ArrowLeft />
            Go Back
          </Button>
        </Link>
      </div>

      <BookForm handleSubmit={handleSubmitBook} />
    </div>
  );
};

export default Page;
