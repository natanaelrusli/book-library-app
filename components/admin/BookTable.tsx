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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DownloadIcon, ImageIcon, ZoomIn } from "lucide-react";
import Image from "next/image";
import { downloadImage, formatDate } from "@/lib/utils";

interface BookTableProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
}

const BookTable = ({ books, currentPage, totalPages }: BookTableProps) => {
  return (
    <div>
      {!books.length ? (
        <div className='flex h-[500px] w-full flex-col items-center justify-center gap-2'>
          <p className='text-lg font-semibold text-slate-600'>
            No books found.
          </p>
          <p className='text-sm'>Add a book by creatin a new book</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader className='rounded-lg bg-secondary'>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Date created</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className='font-bold'>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>
                    {book.createdAt ? formatDate(book.createdAt) : "-"}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <div className='cursor-pointer rounded-lg p-2 transition-all hover:bg-slate-400 hover:text-primary-admin'>
                          <ImageIcon />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className='flex flex-col items-center gap-2'>
                          <Image
                            src={book.cover}
                            alt={book.title}
                            width={200}
                            height={150}
                            className='size-full'
                          />
                          <Button
                            onClick={() =>
                              downloadImage(
                                book.cover,
                                `${book.title}-${formatDate(new Date())}`
                              )
                            }
                            className='w-full bg-primary-admin text-white hover:bg-slate-800'
                          >
                            <DownloadIcon />
                            Download Image
                          </Button>
                          <Button className='w-full bg-primary-admin text-white hover:bg-slate-800'>
                            <ZoomIn />
                            Enlarge Image
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    {
                      <Button className='view-btn'>
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
          <div className='mt-2'>
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
                    Math.min(totalPages, currentPage + 2) // Adjust end
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
