"use client";

import React, { useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import FileUpload from "@/components/admin/forms/FileUpload";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
  FIELD_NAMES: Record<string, string>;
  FIELD_TYPES: Record<string, string>;
}

const AUTH_WORDING = {
  success: "Success",
  error: "Error",
  successLogin: "You have successfully logged in",
  successRegister: "Successfully registered",
  welcomeBack: "Welcome back!",
  createAccount: "Crate your account",
  loginCaption: "Access the vast collection of resources",
  signupCaption:
    "Please complete all fields and upload a valid university ID to access the library",
  signinButtonText: "Sign in",
  signupButtonText: "Sign up",
  signupRedirectText: "Already have an account? ",
  signinRedirectText: "New to BookBook? ",
  signupLinkText: "Create an account",
  signinLinkText: "Sign in",
};

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
  FIELD_NAMES,
  FIELD_TYPES,
}: Props<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isSignedIn = type === "SIGN_IN";
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      setIsLoading(true);
      const result = await onSubmit(data);

      if (result.success) {
        toast({
          title: AUTH_WORDING.success,
          description: isSignedIn
            ? AUTH_WORDING.successLogin
            : AUTH_WORDING.successRegister,
        });

        router.push("/");
      } else {
        toast({
          title: AUTH_WORDING.success,
          description: result.error,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: AUTH_WORDING.success,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-2xl font-semibold text-white"}>
        {isSignedIn ? AUTH_WORDING.welcomeBack : AUTH_WORDING.createAccount}
      </h1>

      <p className={"text-light-100"}>
        {isSignedIn ? AUTH_WORDING.loginCaption : AUTH_WORDING.signupCaption}
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
                      <FileUpload
                        variant={"dark"}
                        folder={"/univesity-card/"}
                        type={"image"}
                        accept={"image"}
                        placeholder={"Upload university Card"}
                        onFileChange={field.onChange}
                        value={field.value}
                      />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button disabled={isLoading} type="submit" className={"form-btn"}>
            {isLoading && <Spinner />}
            {isSignedIn
              ? AUTH_WORDING.signinButtonText
              : AUTH_WORDING.signupButtonText}
          </Button>
        </form>
      </Form>

      <p className={"text-center text-base font-medium"}>
        {isSignedIn
          ? AUTH_WORDING.signinRedirectText
          : AUTH_WORDING.signupRedirectText}

        <Link
          href={isSignedIn ? "/sign-up" : "sign-in"}
          className={"font-bold text-primary"}
        >
          {isSignedIn
            ? AUTH_WORDING.signupLinkText
            : AUTH_WORDING.signinLinkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
