const FUNCTION_URL =
  "https://uwshalogougfxgolnyut.supabase.co/functions/v1/email-handler";

export async function submitEmailHandler(payload) {
  try {
    const response = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email?.trim(),
        type: payload.type?.trim(),
        message: payload.message?.trim() || undefined,
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
        (response.ok ? "Success" : "Something went wrong."),
      details: data.details,
    };
  } catch (error) {
    console.error("Email handler request failed:", error);
    return {
      success: false,
      status: 0,
      message:
        "Network error — please check your internet connection and try again.",
      details: null,
    };
  }
}
