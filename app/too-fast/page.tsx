import React from "react";
import type { Metadata } from "next";
import Link from "next/link"; // Use Link for navigation
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Whoa there! Slow Down - BookBook",
};

const Page = () => {
  return (
    <main
      className={
        "root-container flex min-h-screen flex-col items-center justify-center"
      }
    >
      <h1 className={"font-bebas-neue text-5xl font-bold text-light-100"}>
        Woww, slow down there..
      </h1>
      <p className={"max-w-xl:text-light mt-3 max-w-[400px] text-light-100"}>
        It looks like you have been moving a bit too fast! For everyone&#39;s
        benefit, we need to ensure our system stays smooth and reliable. <br />{" "}
        That&#39;s why we have a limit on the number of requests that can be
        made in a short time.
      </p>
      {/* Use Link for server-side navigation */}
      <Link href="javascript:history.back()">
        <Button className={"mt-3"}>Back</Button>
      </Link>
    </main>
  );
};

export default Page;
