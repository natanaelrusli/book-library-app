import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BookTable from "@/components/admin/BookTable";
import { deleteBookById, getAllBooks } from "@/lib/actions/book";
import { loadSearchParams } from "./searchParams";
import type { SearchParams } from "nuqs/server";
import { revalidatePath } from "next/cache";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { page } = await loadSearchParams(searchParams);

  const books = await getAllBooks({
    limit: 10,
    page,
  });

  const handleDelete = async (id: string) => {
    "use server";

    await deleteBookById(id);
    revalidatePath("/admin/books");
  };

  return (
    <Card className="p-5">
      <div className="mb-6 mt-2 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-700">All Books</h1>

        <Link href={"/admin/books/new"}>
          <Button className="bg-primary-admin text-white hover:bg-dark-400">
            + Create a New Book
          </Button>
        </Link>
      </div>

      <BookTable {...books} onDelete={handleDelete} />
    </Card>
  );
};

export default Page;
