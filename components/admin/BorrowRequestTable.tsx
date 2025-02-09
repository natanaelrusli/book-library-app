"use client";

// TODO:
// handle the flow of book borrowing
// borrowed then can be changed to returned or late
// once it is returned cannot be changed to borrowing
// if it is borrowed and today pass the due date, update the status to late

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { ReceiptIcon, SortAsc } from "lucide-react";
import { cn, constructUrl, formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { BorrowHistory, BorrowStatus } from "@/types";
import { Empty } from "antd";
import BookCover from "@/components/BookCover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BorrowStatusEnum } from "@/db/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BorrowRequestContext,
  useBorrowRequestContext,
} from "@/context/BorrowRequestContext";
import { toast } from "@/hooks/use-toast";
import UserData from "@/components/admin/BorrowRequestTable/UserData";

type BorrowRequestTableProps = {
  currentPage: number;
  totalPages: number;
  borrowRequests: BorrowHistory[];
  onUpdateStatus: (
    borrowStatus: BorrowStatusEnum,
    borrowDataId: string,
  ) => Promise<void>;
};

type TableRowProps = {
  request: BorrowHistory;
};

const statusBadgeVariant = (status: BorrowStatus) => {
  switch (status) {
    case "RETURNED":
      return "secondary";
    case "LATE":
      return "destructive";
    case "BORROWED":
      return "outline";
    default:
      return "outline";
  }
};

const BorrowRequestRow = ({ request }: TableRowProps) => {
  const [borrowStatus, setBorrowStatus] = useState<BorrowStatus>(
    request.borrowStatus,
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { onUpdateStatus } = useBorrowRequestContext();

  const handleBorrowStatusUpdate = async () => {
    try {
      setIsUpdating(true);
      await onUpdateStatus(borrowStatus as BorrowStatusEnum, request.id);
      toast({
        title: "Success",
        description: `Success updating status to ${borrowStatus}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error updating status",
        variant: "destructive",
      });
      throw new Error("Error updating status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <TableRow key={request.id}>
      <TableCell className="flex w-[250px] items-center gap-5 p-4 font-bold">
        <BookCover
          className="h-[80px] w-[50px] object-contain"
          coverColor={request.book.color}
          coverImage={request.book.cover}
        />
        {request.book.title}
      </TableCell>
      <TableCell>{<UserData user={request.user} />}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge
              className={
                cn(
                  borrowStatus === "LATE" &&
                    "bg-red text-white hover:bg-red-600",
                  borrowStatus === "RETURNED" &&
                    "bg-green-600 text-white hover:bg-green",
                ) + " cursor-pointer"
              }
              variant={statusBadgeVariant(borrowStatus)}
            >
              {borrowStatus}
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            {Object.values(BorrowStatusEnum).map((item) => (
              <DropdownMenuItem
                key={item as string}
                className="cursor-pointer"
                onClick={() => setBorrowStatus(item)}
              >
                {item as string}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <TableCell>
        {request.borrowDate && formatDate(request.borrowDate)}
      </TableCell>
      <TableCell>
        {(request.returnDate && formatDate(request.returnDate)) || "-"}
      </TableCell>
      <TableCell>{request.dueDate && formatDate(request.dueDate)}</TableCell>
      <TableCell className="cursor-pointer gap-3">
        <Button
          variant="outline"
          aria-label="Generate Receipt"
          className="flex items-center gap-2 hover:text-primary-admin"
        >
          <ReceiptIcon />
          <Label className="cursor-pointer">Generate</Label>
        </Button>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="outline"
                  disabled={borrowStatus === request.borrowStatus || isUpdating}
                  onClick={handleBorrowStatusUpdate}
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-sm font-bold text-primary-admin shadow-md">
              {borrowStatus === request.borrowStatus
                ? "Change the borrow status before updating"
                : `Original status: ${request.borrowStatus}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
};

const BorrowRequestTable = ({
  currentPage,
  totalPages,
  borrowRequests,
  onUpdateStatus,
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
    <BorrowRequestContext.Provider value={{ onUpdateStatus }}>
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
    </BorrowRequestContext.Provider>
  );
};

export default BorrowRequestTable;
