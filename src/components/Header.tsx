"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@content/site";
import { Logo } from "./Logo";

/** Routes that open with a full-bleed dark hero, where the header starts transparent. */
const HERO_ROUTES = [/^\/$/];

export function Header() {
  const pathname = usePathname();
  const overHero = HERO_ROUTES.some((r) => r.test(pathname));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close the drawer on navigation (routes stay mounted under cacheComponents' <Activity>).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = !overHero || scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-calm ${
          solid ? "border-b border-line bg-paper/95 text-ink backdrop-blur-sm" : "border-b border-transparent text-paper"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
          <Link href="/" aria-label={`${site.name}, home`} className="-mx-2 px-2 py-2">
            <Logo className={`transition-colors duration-500 ${solid ? "text-timber" : "text-paper"}`} />
          </Link>
          <div className="flex items-center gap-2 md:gap-6">
            <Link
              href="/enquire"
              className="hidden text-[0.8125rem] font-medium tracking-wide underline-offset-[6px] hover:underline md:inline"
            >
              Enquire
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="-mr-2 flex h-11 items-center gap-3 px-2 text-[0.8125rem] font-medium tracking-wide"
            >
              <span className="hidden sm:inline">Menu</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
              <span className="sr-only sm:hidden">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false); // backdrop click
        }}
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md bg-paper p-0 text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-[2px] open:animate-[drawer-in_500ms_var(--ease-calm)]"
      >
        <div className="flex h-full flex-col px-8 pb-10">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Logo className="text-timber" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 items-center gap-3 px-2 text-[0.8125rem] font-medium tracking-wide"
            >
              Close
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label="Primary" className="mt-12 flex-1">
            <ul className="space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-1 font-serif text-[2.25rem] leading-tight transition-colors hover:text-timber-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-1 text-ink-soft">
            <a href={`mailto:${site.email}`} className="block py-1 hover:text-ink">
              {site.email}
            </a>
            <ul className="flex gap-5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
