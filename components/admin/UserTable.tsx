"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Empty } from "antd";
import { Check, FolderOpenIcon, SortAsc, Trash2Icon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn, formatDate } from "@/lib/utils";
import { User } from "@/types";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RoleEnum } from "@/db/schema";

type UserTableProps = {
  users: User[];
  currentPage: number;
  totalPages: number;
  onDelete: (id: string) => Promise<void>;
  onRoleUpdate: ({ userId, role }: {userId: string, role: RoleEnum}) => Promise<void>;
};

const UserTable = ({
  users,
  currentPage,
  totalPages,
  onDelete,
  onRoleUpdate
}: UserTableProps) => {
  const { data: session } = useSession();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(selectedUserId);
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

  const handleRoleUpdate = async (userId: string, roleEnum: string) => {
    try {
      setIsLoading({
        ...isLoading,
        ["role" + userId]: true,
      });
      toast({
        title: "Updating user role...",
      });
      
      await onRoleUpdate({
        userId,
        role: roleEnum as RoleEnum,
      });

      toast({
        title: "User role updated!",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to update user role",
      });
    } finally {
      setIsLoading({
        ...isLoading,
        ["role" + userId]: false,
      });
    }
  }

  const getRoleBadgeColor = (role: RoleEnum) => {
    const defaultStyling = "cursor-pointer rounded-lg";

    switch (role) {
      case RoleEnum.ADMIN:
        return cn(`${defaultStyling} bg-red-200 text-red-800`);
      case RoleEnum.USER:
        return cn(`${defaultStyling} bg-green-200 text-green-800`);
      default:
        return defaultStyling;
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

  const UserStatusDropdown = ({userId, role }: { userId: string, role: RoleEnum }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant="outline"
            className={getRoleBadgeColor(role as RoleEnum)}
          >
            {role}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-fit flex-col gap-1 p-3">
          {Object.values(RoleEnum).map((roleEnum) => (
            <button
              key={roleEnum}
              disabled={role === roleEnum}
              onClick={() => handleRoleUpdate(userId, roleEnum)}
            >
              <div className="flex w-full cursor-pointer items-center justify-between p-2 text-sm font-semibold hover:cursor-pointer hover:rounded-lg hover:bg-gray-50">
                {roleEnum}
                {role === roleEnum ? <Check className="size-3" /> : null}
              </div>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
                      <UserStatusDropdown userId={user.id} role={user.role as RoleEnum} />
                    </TableCell>
                  <TableCell>{user.booksBorrowed || 0}</TableCell>
                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          role='button'
                          variant='link'
                          className='text-primary-admin'
                        >
                          <span>Show ID Card</span> <FolderOpenIcon />
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
                        onClick={() => handleDeleteClick(user.id)}
                        disabled={isDeleting}
                      >
                        <Trash2Icon className='text-red-500' size={20} />
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

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
};

export default UserTable;
