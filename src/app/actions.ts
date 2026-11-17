"use server";

import { getSupabase } from "@/lib/supabase";

export type FormState = { status: "idle" | "success" | "error"; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: real people never fill this hidden field.
  if (formData.get("company")) return { status: "success" };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[newsletter] SUPABASE_URL / SUPABASE_ANON_KEY not set");
    return { status: "error", message: "Signups are not available just now. Please try again later." };
  }

  const { error } = await supabase.from("newsletter_signups").insert({ email });
  // 23505 = unique violation: already subscribed. Treat as success, don't reveal it.
  if (error && error.code !== "23505") {
    console.error("[newsletter] insert failed", error.code, error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
  return { status: "success" };
}
