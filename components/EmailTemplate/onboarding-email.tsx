import * as React from "react";
import { Button } from "@/components/ui/button";
import { AppConfig } from "@/lib/config";

interface EmailTemplateProps {
  firstName: string;
}

export const OnboardingEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <main
    className={"flex flex-col bg-pattern bg-cover p-3 px-5 xs:px-10 md:px-16"}
  >
    <header>
      <h1 className={"text-xl font-bold text-light-200"}>
        Welcome, to BookBook, Your Reading Companion!
      </h1>
    </header>

    <main className={"my-3"}>
      <p>Hi, {firstName}</p>
      <p>
        Welcome to BookBook, we are excited to have you join our community.
        Explore a wide range of books, borrow with ease and manage your reading
        journey seamlessly.
      </p>
    </main>

    <div className={"my-3 flex flex-col gap-2"}>
      <p>Get started by logging in to your account:</p>
      <a href={`${AppConfig.env.appEndpoint}/sign-in`}>
        <Button className={"w-fit"}>Login</Button>
      </a>
    </div>

    <footer>
      <p className={"text-sm"}>Happy reading,</p>
      <p className={"font-bold"}>BookBook Team</p>
    </footer>
  </main>
);
