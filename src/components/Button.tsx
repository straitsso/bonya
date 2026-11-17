import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "light" | "text";

const base =
  "inline-flex items-center justify-center gap-2 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 ease-calm";

const variants: Record<Variant, string> = {
  solid: "min-h-12 px-7 bg-ink text-paper hover:bg-timber",
  outline: "min-h-12 px-7 border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  light: "min-h-12 px-7 border border-paper/80 text-paper hover:bg-paper hover:text-ink",
  text: "min-h-11 underline decoration-1 underline-offset-[6px] decoration-current/40 hover:decoration-current",
};

export function buttonClass(variant: Variant = "solid", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function ButtonLink({ href, variant = "solid", children, className, external }: ButtonLinkProps) {
  if (external) {
    return (
      <a href={href} className={buttonClass(variant, className)} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClass(variant, `${className ?? ""} disabled:opacity-50`)} {...props} />;
}
