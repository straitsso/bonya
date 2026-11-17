/** Shared layout for simple text pages written in MDX (delivery, warranty, policies). */
export default function TextLayout({ children }: LayoutProps<"/">) {
  return <div className="mx-auto max-w-[40rem] px-6 pt-36 pb-24 md:pt-48 md:pb-40">{children}</div>;
}
