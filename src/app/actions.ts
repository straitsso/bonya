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

export type EnquiryField = "name" | "email" | "phone" | "model" | "location" | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  /** Echoed back so the form keeps what was typed after a failed submit. */
  values?: Partial<Record<EnquiryField, string>>;
};

const LIMITS: Record<EnquiryField, number> = {
  name: 200,
  email: 254,
  phone: 50,
  model: 100,
  location: 200,
  message: 5000,
};

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  if (formData.get("company")) return { status: "success" };

  const values = Object.fromEntries(
    (Object.keys(LIMITS) as EnquiryField[]).map((k) => [k, String(formData.get(k) ?? "").trim()]),
  ) as Record<EnquiryField, string>;

  const errors: EnquiryState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  for (const k of Object.keys(LIMITS) as EnquiryField[]) {
    if (values[k].length > LIMITS[k]) errors[k] = "This is a little too long.";
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[enquiry] SUPABASE_URL / SUPABASE_ANON_KEY not set");
    return {
      status: "error",
      message: "Our enquiry form is unavailable just now. Please email us instead.",
      values,
    };
  }

  const { error } = await supabase.from("enquiries").insert({
    name: values.name,
    email: values.email.toLowerCase(),
    phone: values.phone || null,
    model: values.model || null,
    location: values.location || null,
    message: values.message || null,
  });
  if (error) {
    console.error("[enquiry] insert failed", error.code, error.message);
    return { status: "error", message: "Something went wrong. Please try again, or email us.", values };
  }
  return { status: "success" };
}
