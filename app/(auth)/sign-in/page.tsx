"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";

const FIELD_NAMES = {
  email: "Email",
  password: "Password",
};

const FIELD_TYPES = {
  email: "email",
  password: "password",
};

const Page = () => (
  <AuthForm
    type={"SIGN_IN"}
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={async (data: { email: string; password: string }) => {
      if (data.email === "user@example.com" && data.password === "password") {
        return { success: true };
      }
      return { success: false, error: "Invalid credentials" };
    }}
    FIELD_NAMES={FIELD_NAMES}
    FIELD_TYPES={FIELD_TYPES}
  />
);

export default Page;
