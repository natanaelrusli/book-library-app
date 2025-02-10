import React from "react";
import BorrowRequestTable from "@/components/admin/BorrowRequestTable";
import { Card } from "@/components/ui/card";
import {
  getAllBorrowRequest,
  updateBorrowStatus,
} from "@/lib/actions/borrowHistory";
import { BorrowStatusEnum } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "BookBook - Book Borrw Requests",
  description: "View and manage book borrow requests",
};

const Page = async () => {
  const data = await getAllBorrowRequest({
    limit: 10,
    page: 1,
  });

  const handleBorrowStatusUpdate = async (
    borrowStatus: BorrowStatusEnum,
    borrowDataId: string
  ) => {
    "use server";

    await updateBorrowStatus({
      borrowStatus,
      borrowDataId,
    });
    revalidatePath("/admin/book-requests");
  };

  return (
    <Card className='p-6'>
      <BorrowRequestTable
        borrowRequests={data.borrowHistory}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onUpdateStatus={handleBorrowStatusUpdate}
      />
    </Card>
  );
};

export default Page;
