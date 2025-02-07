import React from "react";
import BorrowRequestTable from "@/components/admin/BorrowRequestTable";
import { Card } from "@/components/ui/card";
import { getAllBorrowRequest } from "@/lib/actions/borrowHistory";

const Page = async () => {
  const data = await getAllBorrowRequest({
    limit: 10,
    page: 1,
  });

  return (
    <Card className='p-6'>
      <BorrowRequestTable
        borrowRequests={data.borrowHistory}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
      />
    </Card>
  );
};

export default Page;
