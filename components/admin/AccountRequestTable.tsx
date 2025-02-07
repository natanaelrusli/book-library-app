"use client";

import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { SortAsc, FolderOpenIcon, CrossIcon, SortDesc } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { Empty } from "antd";
import { User } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { redirect, useSearchParams } from "next/navigation";
import Spinner from "../ui/spinner";

type AccountRequestTableProps = {
  users: User[];
  currentPage: number;
  totalPages: number;
  onApprove: (userId: string) => Promise<void>;
  onReject: (userId: string) => Promise<void>;
};

export const constructUrl = (
  baseUrl: string,
  params: { [key: string]: string | number | undefined },
): string => {
  const url = new URL(baseUrl, window.location.origin);
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      url.searchParams.set(key, String(params[key]));
    }
  });
  return url.toString();
};

const AccountRequestTable = ({
  users,
  currentPage,
  totalPages,
  onApprove,
  onReject,
}: AccountRequestTableProps) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const sortBy = searchParams.get("sortBy");
  const sortDirection = searchParams.get("sortDirection");

  const [isLoading, setIsLoading] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("page")) {
      params.set("page", "1");
    }
    if (!params.has("sortBy")) {
      params.set("sortBy", "fullName");
    }
    if (!params.has("sortDirection")) {
      params.set("sortDirection", "asc");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, []);

  const renderEmptyState = () => {
    if (users.length > 0) return null;

    return (
      <div className="mb-4 mt-6 flex w-full flex-col items-center justify-center">
        <Empty />
      </div>
    );
  };

  const handleAction = async (userId: string, action: "approve" | "reject") => {
    try {
      setIsLoading({
        ...isLoading,
        [action + userId]: true,
      });
      toast({
        title: `${action === "approve" ? "Approving" : "Rejecting"} request...`,
      });
      if (action === "approve") {
        await onApprove(userId);
      } else {
        await onReject(userId);
      }
      toast({
        title: `Request ${action} successful`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: `Failed to ${action} request`,
      });
    } finally {
      setIsLoading({
        ...isLoading,
        [action + userId]: false,
      });
    }
  };

  const handleApprove = async (userId: string) =>
    await handleAction(userId, "approve");
  const handleReject = async (userId: string) =>
    await handleAction(userId, "reject");

  const handleSortDirectionChange = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";

    redirect(
      constructUrl("/admin/account-requests", {
        page: parseInt(page || "1"),
        sortBy: sortBy || "fullName",
        sortDirection: newSortDirection,
      }),
    );
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Account Requests</h1>

        <Button variant="outline" onClick={handleSortDirectionChange}>
          {sortDirection === "desc" ? (
            <>
              A - Z <SortAsc />
            </>
          ) : (
            <>
              Z - A <SortDesc />
            </>
          )}
        </Button>
      </div>

      {renderEmptyState()}

      {users.length > 0 && (
        <>
          <div className="mt-6">
            <Table>
              <TableHeader className="rounded-lg bg-secondary">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>University ID No.</TableHead>
                  <TableHead>University ID Card</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="w-[300px] font-bold">
                      {user.fullName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.createdAt && formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>{user.universityId}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            role="button"
                            variant="link"
                            className="text-primary-admin"
                          >
                            <span>Show ID Card</span> <FolderOpenIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex w-fit flex-col gap-2 p-2">
                          <Image
                            src={user.universityCard}
                            alt="ID card"
                            width={150}
                            height={100}
                            className="w-[300px]"
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-200 text-green-800 hover:bg-green-300"
                        onClick={() => handleApprove(user.id)}
                        disabled={isLoading["approve" + user.id]}
                      >
                        Approve Request
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleReject(user.id)}
                      >
                        <TooltipProvider>
                          <Tooltip delayDuration={10}>
                            <TooltipTrigger asChild>
                              <div className="size-fit rounded-full bg-red-600 p-1 hover:bg-red-800">
                                {isLoading["reject" + user.id] ? (
                                  <Spinner />
                                ) : (
                                  <CrossIcon
                                    className="rotate-45 text-white"
                                    size={20}
                                  />
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white p-3">
                              <p>Reject Request</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-2">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={constructUrl("/admin/account-requests", {
                        page: parseInt(page || "1") - 1,
                        sortBy: sortBy || "fullName",
                        sortDirection: sortDirection || "asc",
                      })}
                    />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, currentPage - 3), // Adjust start to ensure currentPage is centered
                    Math.min(totalPages, currentPage + 2), // Adjust end
                  )
                  .map((pageOption) => (
                    <PaginationLink
                      key={pageOption + "page"}
                      href={constructUrl("/admin/account-requests", {
                        page: pageOption,
                        sortBy: sortBy || "fullName",
                        sortDirection: sortDirection || "asc",
                      })}
                      isActive={pageOption === currentPage}
                    >
                      {pageOption}
                    </PaginationLink>
                  ))}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href={constructUrl("/admin/account-requests", {
                        page: parseInt(page || "1") + 1,
                        sortBy: sortBy || "fullName",
                        sortDirection: sortDirection || "asc",
                      })}
                    />
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

export default AccountRequestTable;
