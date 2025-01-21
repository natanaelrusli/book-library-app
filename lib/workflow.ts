import { Client as WorkflowClient } from "@upstash/workflow";
import { AppConfig } from "@/lib/config";

const workflowClient = new WorkflowClient({
  baseUrl: AppConfig.env.upstash.qstashUrl,
  token: AppConfig.env.upstash.qstashToken,
});
