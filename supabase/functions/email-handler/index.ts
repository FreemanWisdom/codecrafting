type SubmissionBody = {
  email?: unknown;
  type?: unknown;
  message?: unknown;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const RESEND_API_URL = "https://api.resend.com/emails";

function jsonResponse(
  body: Record<string, string>,
  status: number,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseSubmission(body: SubmissionBody) {
  if (typeof body.email !== "string" || typeof body.type !== "string") {
    return null;
  }

  const email = body.email.trim().toLowerCase();
  const type = body.type.trim().toLowerCase();
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : "";

  if (!email || !type || !EMAIL_REGEX.test(email)) {
    return null;
  }

  return { email, type, message };
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Invalid input" }, 400);
  }

  let body: SubmissionBody;

  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid input" }, 400);
  }

  const submission = parseSubmission(body);

  if (!submission) {
    return jsonResponse({ error: "Invalid input" }, 400);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    return jsonResponse({ error: "Email failed" }, 500);
  }

  const { email, type, message } = submission;

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Waitlist <onboarding@resend.dev>",
      to: "freemanchinazaekpere@gmail.com",
      subject: "New Form Submission",
      html: `<p>Email: ${escapeHtml(email)}</p><p>Type: ${escapeHtml(type)}</p><p>Message: ${
        escapeHtml(message || "N/A")
      }</p>`,
    }),
  });

  let data: unknown = null;

  try {
    data = await resendResponse.json();
  } catch {
    data = null;
  }

  if (!resendResponse.ok) {
    return new Response(
      JSON.stringify({
        error: "Resend error",
        details: data,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  return jsonResponse({ message: "Success" }, 200);
});
