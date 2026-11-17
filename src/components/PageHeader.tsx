import type { ReactNode } from "react";
import { Label } from "./Label";

/** Title block for pages without a hero. Clears the fixed header. */
export function PageHeader({
  label,
  title,
  children,
  align = "center",
}: {
  label?: string;
  title: string;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <header
      className={`mx-auto max-w-3xl px-6 pt-36 pb-16 md:px-10 md:pt-48 md:pb-24 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      {label ? <Label className="text-ink-soft">{label}</Label> : null}
      <h1 className="mt-4 text-headline">{title}</h1>
      {children ? (
        <div className={`mt-6 text-ink-soft ${align === "center" ? "mx-auto max-w-lg" : "max-w-lg"}`}>{children}</div>
      ) : null}
    </header>
  );
}
