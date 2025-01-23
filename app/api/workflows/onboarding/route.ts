import { serve } from "@upstash/workflow/nextjs";
import { qstashClient } from "@/lib/workflow";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 60 * 60 * 24;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

export const { POST } = serve<InitialData>(
  async (context) => {
    const { email } = context.requestPayload;

    // Welcome Email
    await context.run("new-signup", async () => {
      await sendEmail("message", email);
    });

    await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS);

    while (true) {
      const state = await context.run("check-user-state", async () => {
        return await getUserState();
      });

      if (state === "non-active") {
        await context.run("send-email-non-active", async () => {
          await sendEmail("message", email);
        });
      } else if (state === "active") {
        await context.run("send-email-active", async () => {
          await sendEmail("message", email);
        });
      }

      await context.sleep("wait-for-1-month", THIRTY_DAYS_IN_MS);
    }
  },
  {
    qstashClient: qstashClient,
  },
);

async function sendEmail(message: string, email: string) {
  console.log(`Sending ${message} email to ${email}`);
}

const getUserState = async (): Promise<UserState> => {
  // Implement user state logic here
  return "non-active";
};
