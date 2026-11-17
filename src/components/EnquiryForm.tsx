"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryField, type EnquiryState } from "@/app/actions";

const initial: EnquiryState = { status: "idle" };

type Option = { value: string; label: string };

const inputClass =
  "mt-2 block min-h-12 w-full border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/70 transition-colors hover:border-stone focus:border-ink aria-[invalid=true]:border-[#8a2f1d]";

export function EnquiryForm({
  models,
  defaultModel = "",
  email,
}: {
  models: Option[];
  defaultModel?: string;
  email: string;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="border-t border-line pt-10 text-center">
        <h2 className="text-headline">Thank you</h2>
        <p className="mx-auto mt-6 max-w-md text-ink-soft">
          Your enquiry is with us. Someone from the workshop will reply within two working days, usually sooner.
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.errors ?? {};

  const field = (name: EnquiryField, label: string, input: React.ReactNode, optional = false) => (
    <div>
      <label htmlFor={`enq-${name}`} className="text-[0.8125rem] font-medium">
        {label}
        {optional ? <span className="font-normal text-ink-soft"> (optional)</span> : null}
      </label>
      {input}
      {err[name] ? (
        <p id={`enq-${name}-error`} className="mt-2 text-[0.8125rem] text-[#8a2f1d]">
          {err[name]}
        </p>
      ) : null}
    </div>
  );

  const a11y = (name: EnquiryField) => ({
    id: `enq-${name}`,
    name,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `enq-${name}-error` : undefined,
  });

  return (
    <form action={action} noValidate className="space-y-7">
      {state.status === "error" && state.message ? (
        <p role="alert" className="border-l-2 border-[#8a2f1d] pl-4 text-[0.875rem] text-[#8a2f1d]">
          {state.message}{" "}
          {!state.errors ? (
            <a href={`mailto:${email}`} className="underline underline-offset-4">
              {email}
            </a>
          ) : null}
        </p>
      ) : null}

      <div className="grid gap-7 md:grid-cols-2">
        {field("name", "Name", <input {...a11y("name")} required autoComplete="name" defaultValue={v.name} className={inputClass} />)}
        {field(
          "email",
          "Email",
          <input {...a11y("email")} type="email" required autoComplete="email" defaultValue={v.email} className={inputClass} />,
        )}
        {field(
          "phone",
          "Phone",
          <input {...a11y("phone")} type="tel" autoComplete="tel" defaultValue={v.phone} className={inputClass} />,
          true,
        )}
        {field(
          "location",
          "Location",
          <input
            {...a11y("location")}
            autoComplete="address-level2"
            placeholder="Town or postcode"
            defaultValue={v.location}
            className={inputClass}
          />,
          true,
        )}
      </div>

      {field(
        "model",
        "Model",
        <select {...a11y("model")} defaultValue={v.model ?? defaultModel} className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22 stroke=%22%231a1816%22><path d=%22M1 1l5 5 5-5%22/></svg>')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10`}>
          <option value="">Not sure yet</option>
          {models.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>,
        true,
      )}

      {field(
        "message",
        "Message",
        <textarea
          {...a11y("message")}
          rows={6}
          placeholder="Tell us a little about your garden and how you would like to use the sauna."
          defaultValue={v.message}
          className={`${inputClass} resize-y`}
        />,
        true,
      )}

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.8125rem] text-ink-soft">
          We only use your details to reply to this enquiry. See our{" "}
          <a href="/privacy" className="underline underline-offset-4">
            privacy notice
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 w-full bg-ink px-9 text-[0.8125rem] font-medium tracking-wide text-paper transition-colors hover:bg-timber disabled:opacity-50 sm:w-auto"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
