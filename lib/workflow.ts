import { AppConfig } from "@/lib/config";
import { Client as QStashClient } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";

export const workflowClient = new WorkflowClient({
  baseUrl: AppConfig.env.upstash.qstashUrl,
  token: AppConfig.env.upstash.qstashToken,
});

export const qstashClient = new QStashClient({
  token: AppConfig.env.upstash.qstashToken,
});

export default workflowClient;
