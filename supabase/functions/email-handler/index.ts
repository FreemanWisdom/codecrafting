type SubmissionBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  type?: unknown;
  message?: unknown;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const RESEND_API_URL = "https://api.resend.com/emails";
const WAITLIST_TEMPLATE_ID = "0c1fc474-5e44-446a-8ec9-34273a882f9a";
const SENDER = "CodingGroups <onboarding@codinggroups.org>";
const ADMIN_EMAIL = "freemanchinazaekpere@gmail.com";

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function parseSubmission(body: SubmissionBody) {
  if (typeof body.email !== "string" || typeof body.type !== "string") return null;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = body.email.trim().toLowerCase();
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const type = body.type.trim().toLowerCase();
  const message = typeof body.message === "string" && body.message.trim() ? body.message.trim() : "";

  if (!email || !type || !EMAIL_REGEX.test(email)) return null;
  if (type === "waitlist" && name.length < 2) return null;

  return { name, email, phone, type, message };
}

function formatDateTime(date: Date) {
  return {
    date: new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date),
    time: new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", timeZone: "UTC", timeZoneName: "short" }).format(date),
  };
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Invalid input" }, 400);

  let body: SubmissionBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid input" }, 400);
  }

  const submission = parseSubmission(body);
  if (!submission) return jsonResponse({ error: "Invalid input" }, 400);

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) return jsonResponse({ error: "Email failed" }, 500);

  const { name, email, phone, type, message } = submission;
  const { date, time } = formatDateTime(new Date());

  if (type === "waitlist") {
    const confirmationResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: SENDER,
        to: email,
        template: {
          id: WAITLIST_TEMPLATE_ID,
          variables: { NAME: name, SIGNUP_DATE: date, SIGNUP_TIME: time, MESSAGE: message || "No message provided" },
        },
      }),
    });

    if (!confirmationResponse.ok) return jsonResponse({ error: "Confirmation email failed", details: await confirmationResponse.text() }, 500);

    const adminResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: SENDER,
        to: ADMIN_EMAIL,
        subject: `New CodingGroups waitlist signup — ${name}`,
        html: `<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#172033;line-height:1.6;"><h2 style="margin-bottom:8px;">New CodingGroups Waitlist Signup</h2><p style="color:#64748b;margin-top:0;">A new person has joined the CodingGroups waitlist.</p><table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr><tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr><tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "Not provided")}</td></tr><tr><td><strong>Signup Type</strong></td><td>Waitlist</td></tr><tr><td><strong>Status</strong></td><td>Waitlisted</td></tr><tr><td><strong>Date</strong></td><td>${escapeHtml(date)}</td></tr><tr><td><strong>Time</strong></td><td>${escapeHtml(time)}</td></tr><tr><td><strong>Source</strong></td><td>CodingGroups website</td></tr><tr><td><strong>Message</strong></td><td>${escapeHtml(message || "N/A")}</td></tr></table><h3>Recommended actions</h3><ul><li>Confirm the signup is visible in the waitlist/admin view.</li><li>Keep the contact available for launch and early-access communication.</li><li>Use the submitted contact details for appropriate onboarding follow-up.</li></ul></body></html>`,
      }),
    });

    if (!adminResponse.ok) return jsonResponse({ error: "Admin notification failed", details: await adminResponse.text() }, 500);
    return jsonResponse({ message: "Success", details: "Waitlist confirmation and admin notification sent." }, 200);
  }

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: SENDER,
      to: ADMIN_EMAIL,
      subject: "New Form Submission",
      html: `<p>Email: ${escapeHtml(email)}</p><p>Type: ${escapeHtml(type)}</p><p>Message: ${escapeHtml(message || "N/A")}</p>`,
    }),
  });

  let data: unknown = null;
  try {
    data = await resendResponse.json();
  } catch {
    data = null;
  }

  if (!resendResponse.ok) return jsonResponse({ error: "Resend error", details: data }, 500);
  return jsonResponse({ message: "Success" }, 200);
});
