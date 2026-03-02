import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") ?? "*";
const RESEND_FROM_EMAIL =
  Deno.env.get("RESEND_FROM_EMAIL") ?? "CodeCrafting <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method Not Allowed" }, 405);
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body." }, 400);
    }

    const name = (body?.name ?? "").trim();
    const email = (body?.email ?? "").trim().toLowerCase();
    const phone = (body?.phone ?? "").trim();

    if (name.length < 2) {
      return jsonResponse({ error: "Name must be at least 2 characters." }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return jsonResponse({ error: "Invalid email address." }, 400);
    }

    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (phone && !phoneRegex.test(phone)) {
      return jsonResponse({ error: "Phone must be 7–15 digits." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ name, email, phone: phone || null });

    if (dbError) {
      if (dbError.code === "23505") {
        return jsonResponse({ error: "You're already on the waitlist." }, 409);
      }

      console.error("Database error:", dbError);
      return jsonResponse({ error: dbError.message }, 500);
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (resendKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: RESEND_FROM_EMAIL,
            to: [email],
            subject: "You're on the waitlist 🎉",
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:auto;">
                <h2>Welcome, ${name} 🚀</h2>
                <p>You’ve successfully joined our waitlist.</p>
                <p>We’ll notify you when we launch.</p>
              </div>
            `,
            text: `Welcome, ${name}! You've successfully joined the CodeCrafting waitlist. We'll notify you when we launch.`,
          }),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error("Resend error:", errorText);
        }
      } catch (emailError) {
        console.error("Email send failed:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY not set — email skipped.");
    }

    return jsonResponse({
      success: true,
      message: `Thanks ${name}! You're on the waitlist.`,
    });

  } catch (err: any) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
