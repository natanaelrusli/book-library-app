import React from "react";
import UserTable from "@/components/admin/UserTable";
import { Card } from "@/components/ui/card";
import {
  deleteUserById,
  getUserByStatus,
  updateUserRole,
} from "@/lib/actions/user";
import { revalidatePath } from "next/cache";
import { toast } from "@/hooks/use-toast";
import { RoleEnum, StatusEnum } from "@/db/schema";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./searchParams";

export const metadata = {
  title: "BookBook - All Users",
  description: "View and manage user accounts",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { page } = await loadSearchParams(searchParams);

  const data = await getUserByStatus({
    limit: 10,
    page,
    status: StatusEnum.APPROVED,
  });

  const handleDelete = async (userId: string) => {
    "use server";
    const res = await deleteUserById({
      userId,
    });

    if (!res.success) {
      toast({
        title: "Failed to delete user",
        description: "An error occurred while deleting the user.",
      });
      return;
    }

    revalidatePath("/admin/books");
  };

  const handleRoleUpdate = async ({
    userId,
    role,
  }: {
    userId: string;
    role: RoleEnum;
  }) => {
    "use server";
    const res = await updateUserRole({
      userId,
      role,
    });

    if (!res.success) {
      toast({
        title: "Failed to update user role",
        description: "An error occurred while updating the user role.",
      });
      return;
    }

    revalidatePath("/admin/users");
  };

  return (
    <Card className="p-6">
      <UserTable
        users={data.users}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onDelete={handleDelete}
        onRoleUpdate={handleRoleUpdate}
      />
    </Card>
  );
};

export default Page;
