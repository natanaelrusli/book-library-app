import { getAllUsers } from "@/lib/actions/user";
import React from "react";

const Page = async () => {
  const data = await getAllUsers({ limit: 10, page: 1 });

  return (
    <div>
      <h1>All Users</h1>
      <p>There are {data.users.length} users</p>
      <pre>{JSON.stringify(data.users, null, 2)}</pre>
    </div>
  );
};

export default Page;
