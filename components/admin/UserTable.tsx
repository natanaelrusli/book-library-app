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
import { Card } from "../ui/card";

const UserTable = () => {
  return (
    <Card className='p-6'>
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
            <TableRow>
              <TableCell className='w-[300px] font-bold'>John Doe</TableCell>
              <TableCell>Dec 19, 2023</TableCell>
              <TableCell>
                <Badge className='bg-primary-admin text-white hover:bg-primary-admin'>
                  Admin
                </Badge>
              </TableCell>
              <TableCell>100</TableCell>
              <TableCell>123456789</TableCell>
              <TableCell>
                <Button variant='link' className='text-primary-admin'>
                  Show ID Card
                </Button>
              </TableCell>
              <TableCell>
                <div className='cursor-pointer text-red-400'>
                  <Trash2Icon />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default UserTable;
