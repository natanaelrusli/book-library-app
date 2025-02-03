import React from "react";
import BookForm from "@/components/admin/forms/BookForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BookInsert, getBookById, updateBook } from "@/lib/actions/book";
import { z } from "zod";
import { createBookSchema } from "@/lib/validation";

const EditBook = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const book = await getBookById(id);

  const handleUpdateBook = async (book: z.infer<typeof createBookSchema>) => {
    "use server";

    const updatedBook = await updateBook({
      id: id,
      totalCopies: book.numOfBooks,
      cover: book.bookImage,
      video: book.bookVideo,
      summary: book.bookSummary,
      ...book,
    } as unknown as BookInsert);
    console.log("updatedBook", updatedBook);
  };

  return (
    <>
      <div className="mb-6">
        <Link href={`/admin/books/${book.id}`}>
          <Button variant="outline">
            <ArrowLeft />
            Go Back
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <p>Editing {book.title}</p>
      </div>

      <BookForm book={book} type="update" handleSubmit={handleUpdateBook} />
    </>
  );
};

export default EditBook;
