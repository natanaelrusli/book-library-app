"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CreateBookForm from "@/components/admin/CreateBookForm";
import { createBookSchema } from "@/lib/validation";
import { z } from "zod";

type BookFormValues = z.infer<typeof createBookSchema>;

const Page = () => {
  return (
    <div>
      <Link href="/admin/books">
        <Button variant="outline">
          <ArrowLeft />
          Go Back
        </Button>
      </Link>

      <CreateBookForm<BookFormValues>
        schema={createBookSchema}
        defaultValues={{
          title: "",
          author: "",
          genre: "",
          numOfBooks: 0,
          bookImage: "",
          bookColor: "",
          bookVideo: "",
          bookSummary: "",
        }}
        fieldDescriptions={{
          title: {
            label: "Book Title",
            placeholder: "Enter the Book Title",
          },
          author: {
            label: "Author Name",
            placeholder: "Enter the Author name",
          },
          genre: {
            label: "Book Genre",
            placeholder: "Enter the genre of the book",
          },
          numOfBooks: {
            label: "Total Number of Books",
            placeholder: "Enter the total number of books",
          },
          bookImage: {
            label: "Book Image",
          },
          bookColor: {
            label: "Book Primary Color",
          },
          bookVideo: {
            label: "Book Video",
          },
          bookSummary: {
            label: "Book Summary",
          },
        }}
      />
    </div>
  );
};

export default Page;
