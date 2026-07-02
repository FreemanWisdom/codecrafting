import { submitEmailHandler } from "./emailHandler";

export async function submitToWaitlist(payload) {
  const result = await submitEmailHandler({
    email: payload.email,
    type: "waitlist",
  });

  return {
    ...result,
    message: result.success
      ? "Successfully joined the waitlist."
      : result.message,
  };
}
