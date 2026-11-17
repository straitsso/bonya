import type { Faq } from "@content/products";

/** FAQ accordion on native <details>: keyboard and screen-reader friendly with no JS. */
export function Accordion({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span aria-hidden="true" className="relative h-3 w-3 shrink-0">
              <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
              <span className="absolute top-1/2 left-0 h-px w-full rotate-90 bg-current transition-transform duration-300 ease-calm group-open:rotate-0" />
            </span>
          </summary>
          <p className="max-w-2xl pb-7 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
