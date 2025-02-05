"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { SortAsc, Trash2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Empty } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

type UserTableProps = {
  users: User[];
  currentPage: number;
  totalPages: number;
  onDelete: (id: string) => Promise<void>;
};

const UserTable = ({
  users,
  currentPage,
  totalPages,
  onDelete,
}: UserTableProps) => {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      await onDelete(id);
      toast({
        title: "User deleted!",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to delete user",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const renderEmptyState = () => {
    if (users.length > 0) return null;

    return (
      <div className='mb-4 mt-6 flex w-full flex-col items-center justify-center'>
        <Empty />
        <Link href={`/admin/account-requests`}>
          <Button variant='outline' className='mt-4'>
            Go to Account Request
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-2xl font-bold'>All Users</h1>

        <Button variant='outline'>
          A - Z <SortAsc />
        </Button>
      </div>

      {renderEmptyState()}

      {users.length > 0 && (
        <div className='mt-6'>
          <Table>
            <TableHeader className='rounded-lg bg-secondary'>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Books Borrowed</TableHead>
                <TableHead>University ID No.</TableHead>
                <TableHead>University ID Card</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='w-[300px] font-bold'>
                    {user.fullName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.createdAt && formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Badge className='cursor-pointer bg-primary-admin text-white hover:bg-primary-admin'>
                          {user.role}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='flex w-fit flex-col gap-2 p-2'>
                        <Badge variant='outline' className='cursor-pointer'>
                          Admin
                        </Badge>
                        <Badge variant='outline' className='cursor-pointer'>
                          User
                        </Badge>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{user.booksBorrowed || 0}</TableCell>
                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='link' className='text-primary-admin'>
                          Show ID Card
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='flex w-fit flex-col gap-2 p-2'>
                        <Image
                          src={user.universityCard}
                          alt='ID card'
                          width={150}
                          height={100}
                          className='w-[300px]'
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    {session?.user?.id === user.id ? null : (
                      <Button
                        variant='link'
                        className='text-red-500'
                        onClick={() => handleDelete(user.id)}
                        disabled={isDeleting}
                      >
                        <Trash2Icon size={20} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

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
    </div>
  );
};

export default UserTable;
