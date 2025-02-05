import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import "@/styles/admin.css";
import Header from "@/components/admin/Header";
import { SessionProvider } from "next-auth/react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <main className='flex min-h-screen w-full flex-row'>
      <Sidebar session={session} />
      <div className='admin-container'>
        <Header session={session} />

        <SessionProvider session={session}>{children}</SessionProvider>
      </div>
    </main>
  );
};

export default Layout;
