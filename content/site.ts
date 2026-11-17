/**
 * Site-wide settings: brand, contact, navigation, footer.
 * Everything a non-developer is likely to change lives in /content.
 */
export const site = {
  name: "Bonya",
  /**
   * Used for absolute URLs (sitemap, OG). Set NEXT_PUBLIC_SITE_URL once you have a
   * custom domain; until then Vercel's production domain is used automatically.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Architectural outdoor saunas, designed in London and built by hand from thermally modified timber.",
  heroLabel: "Designed in London",
  heroHeadline: "Heat, slowly made",
  locale: "en_GB",
  currency: "GBP",
  /** Booking links. Replace with your Cal.com / Calendly event URLs. */
  booking: {
    visit: "https://cal.com/bonya/showroom-visit",
    call: "https://cal.com/bonya/video-call",
  },
  /** Hero video in /public. Set to undefined to show the poster image only. */
  heroVideo: "/video/hero.mp4" as string | undefined,
  email: "hello@bonya.co.uk",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
} as const;

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Saunas", href: "/#saunas" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Visit or call", href: "/#visit" },
  { label: "Enquire", href: "/enquire" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    // Each model in content/products.ts is added above these automatically.
    links: [{ label: "Enquire", href: "/enquire" }],
  },
  {
    title: "Explore",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Book a visit", href: "/#visit" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Delivery", href: "/delivery" },
      { label: "Warranty", href: "/warranty" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const policyLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
