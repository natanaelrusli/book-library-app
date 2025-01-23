import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div>
      <Link href={"/admin/books/new"}>
        <Button>+ Create a New Book</Button>
      </Link>
      <p>Books page</p>
    </div>
  );
};

export default Page;
