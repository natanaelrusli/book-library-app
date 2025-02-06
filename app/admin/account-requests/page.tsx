import React from "react";
import { StatusEnum } from "@/db/schema";
import { getUserByStatus } from "@/lib/actions/user";

export const metadata = {
  title: "BookBook - Account Requests",
  description: "View and manage account requests",
};

const Page = async () => {
  const data = await getUserByStatus({
    limit: 10,
    page: 1,
    status: StatusEnum.PENDING,
  });

  return (
    <div>
      <p>There are {data.users.length} users</p>
      <pre>{JSON.stringify(data.users, null, 2)}</pre>
    </div>
  );
};

export default Page;
