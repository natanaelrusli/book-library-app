import { serve } from "@upstash/workflow/nextjs";
import { qstashClient } from "@/lib/workflow";

type InitialData = {
  email: string;
};

export const { POST } = serve<InitialData>(
  async (context) => {
    const { email } = context.requestPayload;

    // Welcome Email
    await context.run("new-signup", async () => {
      await sendEmail("message", email);
    });

    await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

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

      await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
    }
  },
  {
    qstashClient: qstashClient,
  },
);

async function sendEmail(message: string, email: string) {
  console.log(`Sending ${message} email to ${email}`);
}

type UserState = "non-active" | "active";

const getUserState = async (): Promise<UserState> => {
  // Implement user state logic here
  return "non-active";
};
