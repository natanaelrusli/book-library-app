import { OnboardingEmail } from "@/components/EmailTemplate/onboarding-email";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { AppConfig } from "@/lib/config";

const resend = new Resend(AppConfig.env.resend.apiKey);

type EmailRequestParams = {
  email: string;
};

export async function POST(req: NextRequest) {
  const body: EmailRequestParams = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email not found" });
  }

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@natanaelrusli.com>",
    to: [body.email],
    subject: "Hello world",
    react: await OnboardingEmail({ firstName: "John" }),
  });

  if (!error) {
    return NextResponse.json({
      status: "success",
    });
  }

  return NextResponse.json({
    status: "fail",
    data,
    error,
  });
}
