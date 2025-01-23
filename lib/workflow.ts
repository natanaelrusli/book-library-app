import { AppConfig } from "@/lib/config";
import { Client as QStashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";

export const workflowClient = new WorkflowClient({
  baseUrl: AppConfig.env.upstash.qstashUrl,
  token: AppConfig.env.upstash.qstashToken,
});

export const qstashClient = new QStashClient({
  token: AppConfig.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: AppConfig.env.resend.apiKey }),
    },
    body: {
      from: "BookBook Admin <bookbook@natanaelrusli.com",
      to: [email],
      subject,
      html: message,
    },
  });
};

export default workflowClient;
