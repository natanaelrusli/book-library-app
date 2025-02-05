import React from "react";
import UserTable from "@/components/admin/UserTable";
import { Card } from "@/components/ui/card";
import { getAllUsers } from "@/lib/actions/user";

const Page = async () => {
  const data = await getAllUsers({ limit: 10, page: 1 });

  return (
    <Card className='p-6'>
      <UserTable users={data.users} />
    </Card>
  );
};

export default Page;
