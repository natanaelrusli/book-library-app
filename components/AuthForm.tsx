"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
  FIELD_NAMES: Record<string, string>;
  FIELD_TYPES: Record<string, string>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
  FIELD_NAMES,
  FIELD_TYPES,
}: Props<T>) => {
  const isSignedIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-2xl font-semibold text-white"}>
        {isSignedIn ? "Welcome back!" : "Crate your account"}
      </h1>

      <p className={"text-light-100"}>
        {isSignedIn
          ? "Access the vast collection of resources"
          : "Please complete all fields and upload a valid university ID to access the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={FIELD_TYPES[field.name]}
                        placeholder=""
                        {...field}
                        className={"form-input"}
                      />
                    )}
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className={"form-btn"}>
            {isSignedIn ? "Sign in" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className={"text-center text-base font-medium"}>
        {isSignedIn ? "New to BookBook? " : "Already have an account? "}

        <Link
          href={isSignedIn ? "/sign-up" : "sign-in"}
          className={"font-bold text-primary"}
        >
          {isSignedIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
