import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PACKAGES: Record<string, { priceId: string; name: string; amount: number }> = {
  "photo-walk": {
    priceId: "price_1TA0mVL3UZF2GmIa0r0Q9tAw",
    name: "Seattle Photo Walk",
    amount: 15000,
  },
  "adventure": {
    priceId: "price_1TA0mmL3UZF2GmIaxEpsOnja",
    name: "Seattle Adventure Portrait Session",
    amount: 27500,
  },
  "vip": {
    priceId: "price_1TA0nCL3UZF2GmIaECkBiuBQ",
    name: "VIP Private Photo Experience",
    amount: 55000,
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { packageId, customerName, customerEmail, sessionDate, sessionTime, notes } = await req.json();

    const pkg = PACKAGES[packageId];
    if (!pkg) throw new Error("Invalid package selected");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const origin = req.headers.get("origin") || "https://pnwportraits.com";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: [{ price: pkg.priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking-canceled`,
      metadata: {
        packageName: pkg.name,
        customerName,
        sessionDate,
        sessionTime,
        notes: notes || "",
      },
    });

    // Save booking to database
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseAdmin.from("bookings").insert({
      customer_name: customerName,
      customer_email: customerEmail,
      package_name: pkg.name,
      session_date: sessionDate,
      session_time: sessionTime,
      stripe_session_id: session.id,
      payment_status: "pending",
      amount_cents: pkg.amount,
      notes: notes || null,
    });

    // --- Owner notifications (fire-and-forget) ---

    // 1. Email notification via transactional queue
    const emailHtml = `
      <h2>New Booking Received!</h2>
      <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
      <p><strong>Package:</strong> ${pkg.name}</p>
      <p><strong>Date:</strong> ${sessionDate}</p>
      <p><strong>Time:</strong> ${sessionTime}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
      <p><strong>Amount:</strong> $${(pkg.amount / 100).toFixed(2)}</p>
      <hr>
      <p style="color:#888;font-size:12px;">This is an automated notification from PNW Portraits.</p>
    `;

    supabaseAdmin.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        to: "cloudyandcoolprod@gmail.com",
        from: "PNW Portraits <notify@notify.www.pnwportraits.com>",
        sender_domain: "notify.www.pnwportraits.com",
        subject: `New Booking: ${pkg.name} — ${customerName}`,
        html: emailHtml,
        text: `New booking from ${customerName} (${customerEmail}). Package: ${pkg.name}. Date: ${sessionDate} at ${sessionTime}.${notes ? ` Notes: ${notes}` : ""}`,
        purpose: "transactional",
        label: "booking_notification",
        message_id: `booking-notify-${session.id}`,
        queued_at: new Date().toISOString(),
      },
    }).then(({ error }) => {
      if (error) console.error("Failed to enqueue booking notification email:", error);
    });

    // 2. SMS notification via Twilio
    const smsUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-booking-sms`;
    fetch(smsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        customerName,
        packageName: pkg.name,
        sessionDate,
        sessionTime,
        notes: notes || "",
      }),
    }).catch((err) => console.error("Failed to send booking SMS:", err));

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
