"use client";

import { useActionState } from "react";
import { subscribe, type FormState } from "@/app/actions";

const initial: FormState = { status: "idle" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="font-serif text-title">
        Thank you. We will write occasionally, and only when there is something worth saying.
      </p>
    );
  }

  return (
    <form action={action} className="w-full" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-0">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            aria-invalid={state.status === "error" || undefined}
            aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
            className="h-12 w-full border-b border-ink/40 bg-transparent px-0 placeholder:text-ink-soft focus:border-ink"
          />
        </div>
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="h-12 bg-ink px-7 text-[0.8125rem] font-medium tracking-wide text-paper transition-colors hover:bg-timber disabled:opacity-50"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {state.status === "error" ? (
        <p id="newsletter-error" role="alert" className="mt-3 text-[0.8125rem] text-[#8a2f1d]">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
