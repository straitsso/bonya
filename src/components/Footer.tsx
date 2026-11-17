import Link from "next/link";
import { products } from "@content/products";
import { footerColumns, policyLinks, site } from "@content/site";
import { Logo } from "./Logo";

export function Footer() {
  const columns = footerColumns.map((col) =>
    col.title === "Shop"
      ? { ...col, links: [...products.map((p) => ({ label: p.name, href: `/saunas/${p.slug}` })), ...col.links] }
      : col,
  );

  return (
    <footer className="bg-ink text-paper/75">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" aria-label={`${site.name}, home`} className="inline-block text-paper">
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs">{site.description}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-label font-sans font-medium text-paper uppercase">{col.title}</h2>
              <ul className="mt-5 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-1 transition-colors hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-paper/15 pt-8 text-[0.8125rem] md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {policyLinks.map((l) => (
              <Link key={l.href} href={l.href} className="py-1 hover:text-paper">
                {l.label}
              </Link>
            ))}
            <span className="py-1">© {site.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
