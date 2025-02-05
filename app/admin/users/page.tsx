import React from "react";
import UserTable from "@/components/admin/UserTable";
import { Card } from "@/components/ui/card";
import { deleteUserById, getAllUsers } from "@/lib/actions/user";
import { revalidatePath } from "next/cache";
import { toast } from "@/hooks/use-toast";

const Page = async () => {
  const data = await getAllUsers({ limit: 10, page: 1 });

  const handleDelete = async (id: string) => {
    "use server";
    const res = await deleteUserById(id);

    if (!res.success) {
      toast({
        title: "Failed to delete user",
        description: "An error occurred while deleting the user.",
      });
      return;
    }

    revalidatePath("/admin/books");
  };

  return (
    <Card className='p-6'>
      <UserTable
        users={data.users}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onDelete={handleDelete}
      />
    </Card>
  );
};

export default Page;
