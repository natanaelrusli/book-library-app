"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookForm from "@/components/admin/forms/BookForm";

const Page = () => {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/books">
          <Button variant="outline">
            <ArrowLeft />
            Go Back
          </Button>
        </Link>
      </div>

      <BookForm />
    </div>
  );
};

export default Page;
