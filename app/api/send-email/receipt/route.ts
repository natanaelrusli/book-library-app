import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { AppConfig } from "@/lib/config";
import ReceiptEmail from "@/emails/receipt-email";

const resend = new Resend(AppConfig.env.resend.apiKey);

type EmailRequestParams = {
  email: string;
  bookTitle: string;
  fullName: string;
  borrowDate: string;
  dueDate: string;
};

export async function POST(req: NextRequest) {
  const body: EmailRequestParams = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email not found" });
  }

  const { data, error } = await resend.emails.send({
    from: "BookBook Admin <onboarding@natanaelrusli.com>",
    to: [body.email],
    subject: "Receipt Email",
    react: await ReceiptEmail({
      bookTitle: body.bookTitle,
      fullName: body.fullName,
      borrowDate: body.borrowDate,
      dueDate: body.dueDate,
    }),
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
