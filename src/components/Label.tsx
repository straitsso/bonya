import type { ReactNode } from "react";

/** Small uppercase eyebrow label above headings. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-label font-medium uppercase ${className}`}>{children}</p>;
}
