"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function FormattedDateCell(date: Date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <TableCell>{formattedDate}</TableCell>;
}

interface BookTableProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
}

const BookTable = ({ books, currentPage, totalPages }: BookTableProps) => {
  return (
    <div>
      {!books.length ? (
        <div className="flex h-[500px] w-full flex-col items-center justify-center gap-2">
          <p className="text-lg font-semibold text-slate-600">
            No books found.
          </p>
          <p className="text-sm">Add a book by creating a new book</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader className="rounded-lg bg-secondary">
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Date created</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-bold">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  {book.createdAt && FormattedDateCell(book.createdAt)}
                  <TableCell>
                    {
                      <Button className="view-btn">
                        <Link href={`/admin/books/${book.id}`}>
                          View Detail
                        </Link>
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-2">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`?page=${currentPage - 1}`} />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, currentPage - 3), // Adjust start to ensure currentPage is centered
                    Math.min(totalPages, currentPage + 2), // Adjust end
                  )
                  .map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href={`?page=${page}`}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`?page=${currentPage + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default BookTable;
