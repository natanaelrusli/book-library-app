import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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

type UserTableProps = {
  users: User[];
};

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-2xl font-bold'>All Users</h1>

        <Button variant='outline'>
          A - Z <SortAsc />
        </Button>
      </div>

      <div className='mt-6'>
        <Table>
          <TableHeader className='rounded-lg bg-secondary'>
            <TableRow>
              <TableHead>Name</TableHead>
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
                  <div className='cursor-pointer text-red-400'>
                    <Trash2Icon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
