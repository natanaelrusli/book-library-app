"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";
import { signInWithCredentials } from "@/lib/actions/auth";

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
    onSubmit={signInWithCredentials}
    FIELD_NAMES={FIELD_NAMES}
    FIELD_TYPES={FIELD_TYPES}
  />
);

export default Page;
