import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact form handler. Validates input and returns a success response.
 * Email delivery is intentionally stubbed - wiring a provider (Resend,
 * Postmark, etc.) is a documented next step.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Placeholder: log server-side. Replace with real email/CRM delivery.
  console.info("[contact] new message from", parsed.data.email);

  return NextResponse.json({ ok: true });
}
