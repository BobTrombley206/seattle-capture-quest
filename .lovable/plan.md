

# Booking Notifications — Email + SMS to You

## Current State
Right now, when someone books, the `create-checkout` function saves the booking to the database and redirects to Stripe — but **nobody notifies you**. There's no email or text sent to you as the photographer.

## What We'll Build

Add owner notifications to the `create-checkout` edge function so that immediately after a booking is saved, you get:

1. **Email notification** — sent to your Gmail via the existing email infrastructure (queue-based, using your `notify.www.pnwportraits.com` domain)
2. **SMS notification** — sent to your phone via Twilio

### Email Notification
We'll enqueue an email to you (e.g. `bob@gmail.com`) through the existing `enqueue_email` RPC, routed through `transactional_emails` queue → `process-email-queue` dispatcher. The email will contain the customer name, package, date/time, and any notes.

### SMS Notification (Twilio)
Twilio is available as a connector. We'll:
1. Connect Twilio to this project (you'll need a Twilio account with a phone number)
2. Create a `send-booking-sms` edge function that sends a text to your phone
3. Call it from `create-checkout` after saving the booking

## Files Changed

| File | Action |
|------|--------|
| `supabase/functions/create-checkout/index.ts` | **Update** — add email enqueue + call SMS function after booking insert |
| `supabase/functions/send-booking-sms/index.ts` | **Create** — Twilio SMS via connector gateway |

## Setup Required From You
- **Your email address** — where to send booking notifications
- **Your phone number** — where to receive SMS alerts
- **Twilio connection** — I'll prompt you to connect Twilio (you need a Twilio account with at least one phone number)

## Technical Details

The email notification uses the existing queue infrastructure — no new tables or functions needed. The SMS function calls Twilio's `Messages.json` endpoint through the connector gateway, which handles auth automatically.

Both notifications fire at booking creation time (before payment completes). If you'd prefer to only be notified after successful payment, we'd need a Stripe webhook — that's a separate piece of work we can add later.

