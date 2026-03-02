// src/utils/waitlist.js

const FUNCTION_URL = import.meta.env.VITE_WAITLIST_FUNCTION_URL;

if (!FUNCTION_URL) {
  throw new Error("Missing VITE_WAITLIST_FUNCTION_URL in .env file.");
}

export async function submitToWaitlist(payload) {
  try {
    const response = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name?.trim(),
        email: payload.email?.trim(),
        phone: payload.phone?.trim() || undefined,
      }),
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    return {
      success: response.ok,
      message:
        data.message ||
        data.error ||
        (response.ok
          ? "Successfully joined the waitlist."
          : "Something went wrong."),
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Network error — please check your internet connection and try again.",
      status: 0,
    };
  }
}