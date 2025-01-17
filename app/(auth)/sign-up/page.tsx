"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validation";

const FIELD_NAMES: Record<string, string> = {
  email: "Email",
  password: "Password",
  fullName: "Full Name",
  universityId: "University ID",
  universityCard: "University Card",
};

const FIELD_TYPES: Record<string, string> = {
  email: "email",
  password: "password",
  fullName: "text",
  universityId: "text",
  universityCard: "text",
};

const Page: React.FC = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={async (data) => {
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
