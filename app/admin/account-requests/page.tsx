import React from "react";
import { StatusEnum } from "@/db/schema";
import { getUserByStatus } from "@/lib/actions/user";

const Page = async () => {
  const data = await getUserByStatus({
    limit: 10,
    page: 1,
    status: StatusEnum.PENDING,
  });

  return (
    <div>
      <h1>All Users</h1>
      <p>There are {data.users.length} users</p>
      <pre>{JSON.stringify(data.users, null, 2)}</pre>
    </div>
  );
};

export default Page;
