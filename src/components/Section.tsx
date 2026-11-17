import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Background tone. */
  tone?: "paper" | "deep" | "ink";
  /** Content width. */
  width?: "narrow" | "default" | "wide" | "full";
  /** Vertical rhythm. */
  spacing?: "default" | "tight" | "none";
  className?: string;
  "aria-labelledby"?: string;
};

const tones = {
  paper: "bg-paper text-ink",
  deep: "bg-paper-deep text-ink",
  ink: "bg-ink text-paper",
};

const widths = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

const spacings = {
  default: "py-24 md:py-40",
  tight: "py-16 md:py-24",
  none: "",
};

export function Section({
  children,
  id,
  tone = "paper",
  width = "default",
  spacing = "default",
  className = "",
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} ${spacings[spacing]} scroll-mt-20`} {...rest}>
      <div className={`mx-auto px-6 md:px-10 ${widths[width]} ${className}`}>{children}</div>
    </section>
  );
}
