import { submitEmailHandler } from "./emailHandler";

export async function submitToWaitlist(payload) {
  const result = await submitEmailHandler({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    type: "waitlist",
  });

  return {
    ...result,
    message: result.success
      ? "Successfully joined the waitlist. Check your email for confirmation."
      : result.message,
  };
}
