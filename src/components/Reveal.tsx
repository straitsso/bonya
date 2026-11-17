import type { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Fades its children in when scrolled into view. Pure markup: the single
 * RevealObserver in the root layout does the work. Without JS, content is visible.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">) {
  return (
    <Tag
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
