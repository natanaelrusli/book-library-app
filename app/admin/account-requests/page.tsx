import React from "react";
import { StatusEnum } from "@/db/schema";
import { getUserByStatus, updateUserStatus } from "@/lib/actions/user";
import AccountRequestTable from "@/components/admin/AccountRequestTable";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { loadSearchParams } from "./searchParams";
import { SearchParams } from "nuqs/server";

export const metadata = {
  title: "BookBook - Account Requests",
  description: "View and manage account requests",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { page } = await loadSearchParams(searchParams);

  const data = await getUserByStatus({
    limit: 10,
    page,
    status: StatusEnum.PENDING,
  });

  const handleApprove = async (userId: string) => {
    "use server";
    await updateUserStatus({ userId, status: StatusEnum.APPROVED });
    revalidatePath("/admin/account-requests");
  };

  const handleReject = async (userId: string) => {
    "use server";
    await updateUserStatus({ userId, status: StatusEnum.REJECTED });
    revalidatePath("/admin/account-requests");
  };

  return (
    <Card className="p-6">
      <AccountRequestTable
        users={data.users}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </Card>
  );
};

export default Page;
