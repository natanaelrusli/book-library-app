"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import EnlargedImage from "../EnlargedImage";
import { toast } from "@/hooks/use-toast";

interface BookTableProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
  onDelete: (id: string) => Promise<void>;
}

const BookTable = ({
  books,
  currentPage,
  totalPages,
  onDelete,
}: BookTableProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);

      toast({
        title: "Book deleted successfully",
        description: "The book has been deleted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "An error occurred while deleting the book",
      });
    }
  };

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
                  <TableCell className='font-bold'>
                    <div className='flex items-center gap-3'>
                      <Image
                        src={book.cover}
                        alt='cover image'
                        width={100}
                        height={200}
                        className='w-[40px]'
                      />
                      {book.title}
                    </div>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>
                    {book.createdAt ? formatDate(book.createdAt) : "-"}
                  </TableCell>
                  <TableCell>
                    {!selectedImage && (
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
                              className='size-full max-h-80 object-contain'
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

                            <Button
                              onClick={() => setSelectedImage(book.cover)}
                              className='w-full bg-primary-admin text-white hover:bg-slate-800'
                            >
                              <ZoomIn />
                              Enlarge Image
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </TableCell>
                  <TableCell className='flex gap-2'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* i want to center the button below without using padding */}
                        <div className='mt-3 flex justify-center'>
                          <Button variant='outline'>...</Button>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-56'>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/books/${book.id}`}
                              className='flex w-full cursor-pointer items-center justify-between'
                            >
                              View Detail
                              <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(book.id)}
                          >
                            <div className='flex w-full cursor-pointer items-center text-red-600'>
                              Delete Book
                              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

          <EnlargedImage
            onClose={() => setSelectedImage("")}
            src={selectedImage}
          />
        </>
      )}
    </div>
  );
};

export default BookTable;
