"use client";

import React from "react";
import {
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  Pagination,
} from "../ui/pagination";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { ReceiptIcon, SortAsc } from "lucide-react";
import { constructUrl, formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { BorrowHistory } from "@/types";
import { Empty } from "antd";

type BorrowRequestTableProps = {
  currentPage: number;
  totalPages: number;
  borrowRequests: BorrowHistory[];
};

type TableRowProps = {
  request: BorrowHistory;
};

const BorrowRequestRow = ({ request }: TableRowProps) => (
  <TableRow key={request.id}>
    <TableCell className="w-[250px] p-4 font-bold">
      {request.book.title}
    </TableCell>
    <TableCell>{request.user.fullName}</TableCell>
    <TableCell>
      <Badge>{request.borrowStatus}</Badge>
    </TableCell>
    <TableCell>
      {request.borrowDate && formatDate(request.borrowDate)}
    </TableCell>
    <TableCell>
      {(request.returnDate && formatDate(request.returnDate)) || "-"}
    </TableCell>
    <TableCell>{request.dueDate && formatDate(request.dueDate)}</TableCell>
    <TableCell className="cursor-pointer gap-3">
      <button
        aria-label="Generate Receipt"
        className="flex items-center gap-2 hover:text-primary-admin"
      >
        <ReceiptIcon />
        <Label className="cursor-pointer">Generate</Label>
      </button>
    </TableCell>
    <TableCell>
      <Button variant="outline">Update Status</Button>
    </TableCell>
  </TableRow>
);

const BorrowRequestTable = ({
  currentPage,
  totalPages,
  borrowRequests,
}: BorrowRequestTableProps) => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortBy = searchParams.get("sortBy") || "fullName";
  const sortDirection = searchParams.get("sortDirection") || "asc";

  const toggleSort = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    window.location.href = constructUrl("/admin/book-requests", {
      page,
      sortBy,
      sortDirection: newSortDirection,
    });
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Borrow Book Requests</h1>
        <Button variant="outline" onClick={toggleSort}>
          {sortDirection === "asc" ? "Older to Recent" : "Recent to Older"}{" "}
          <SortAsc />
        </Button>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader className="rounded-lg bg-secondary">
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>User Requested</TableHead>
              <TableHead>Borrow Status</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {borrowRequests.length > 0 ? (
              borrowRequests.map((request) => (
                <BorrowRequestRow key={request.id} request={request} />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-4 text-center text-gray-500"
                >
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-2">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={constructUrl("/admin/book-requests", {
                      page: page - 1,
                      sortBy,
                      sortDirection,
                    })}
                  />
                </PaginationItem>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2),
                )
                .map((pageOption) => (
                  <PaginationLink
                    key={pageOption + "page"}
                    href={constructUrl("/admin/book-requests", {
                      page: pageOption,
                      sortBy,
                      sortDirection,
                    })}
                    isActive={pageOption === currentPage}
                  >
                    {pageOption}
                  </PaginationLink>
                ))}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={constructUrl("/admin/book-requests", {
                      page: page + 1,
                      sortBy,
                      sortDirection,
                    })}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default BorrowRequestTable;
