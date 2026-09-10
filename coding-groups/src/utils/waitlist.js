const FUNCTION_URL =
  import.meta.env.VITE_WAITLIST_FUNCTION_URL ||
  "https://uwshalogougfxgolnyut.supabase.co/functions/v1/waitlist";

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
      status: response.status,
      message:
        data.message ||
        data.error ||
        (response.ok ? "Successfully joined the waitlist." : "Something went wrong."),
      details: data.details,
    };
  } catch (error) {
    console.error("Waitlist request failed:", error);
    return {
      success: false,
      status: 0,
      message: "Network error — please check your internet connection and try again.",
      details: null,
    };
  }
}
