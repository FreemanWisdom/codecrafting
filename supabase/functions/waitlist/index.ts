import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || name.length < 2 || name.length > 120) {
      return jsonResponse({ error: "Please provide a valid name." }, 400);
    }

    if (!email || email.length > 254 || !emailRegex.test(email)) {
      return jsonResponse({ error: "Please provide a valid email." }, 400);
    }

    if (phone.length > 40) {
      return jsonResponse({ error: "Please provide a valid phone number." }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom = Deno.env.get("RESEND_FROM_EMAIL");

    if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !resendFrom) {
      console.error("Waitlist function is missing required server configuration.");
      return jsonResponse({ error: "Server configuration error" }, 500);
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error: insertError } = await supabaseAdmin.from("waitlist").insert({
      name,
      email,
      phone: phone || null,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return jsonResponse({ error: "This email is already on the waitlist." }, 409);
      }

      console.error("Waitlist insert failed:", insertError);
      return jsonResponse({ error: "Unable to join the waitlist right now." }, 500);
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: resendFrom,
        to: email,
        subject: "You're on the waitlist 🚀",
        html: `<h2>Welcome, ${escapeHtml(name)}!</h2><p>You’ve successfully joined the CodeCrafting waitlist.</p>`,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Waitlist confirmation email failed:", errorText);
      return jsonResponse({
        message: "Successfully joined the waitlist. Confirmation email could not be sent.",
        emailSent: false,
      }, 200);
    }

    return jsonResponse({
      message: "Successfully joined the waitlist.",
      emailSent: true,
    }, 200);
  } catch (error) {
    console.error("Waitlist request failed:", error);
    return jsonResponse({ error: "Invalid request." }, 400);
  }
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
