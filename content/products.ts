import { images, type SiteImage } from "./images";

/**
 * All sauna models live here. Add a model by adding an object to `products`.
 * Its page (/saunas/[slug]), home-page card, footer link and sitemap entry
 * are generated from this file.
 */

export type Finish = {
  name: string;
  /** Swatch colour. Visual only, nothing is ordered from this. */
  color: string;
};

export type Faq = { question: string; answer: string };

type ProductBase = {
  slug: string;
  name: string;
  /** One line, shown on the home-page card. */
  tagline: string;
  /** Short paragraph under the name on the product page. */
  intro: string;
  /** Guide price, shown as "From £x". Leave undefined to hide. */
  priceFrom?: number;
  specs: {
    dimensions: string;
    capacity: string;
    heater: string;
    timber: string;
    leadTime: string;
  };
  finishes: Finish[];
  faqs: Faq[];
};

type ProductImages = { card: SiteImage; hero: SiteImage; gallery: SiteImage[] };

/**
 * Set `published: false` to keep a model in this file but hide it everywhere
 * (pages, home, footer, enquiry form, sitemap). Published models need photos.
 */
export type Product = ProductBase & { published: true; images: ProductImages };
type DraftProduct = ProductBase & { published: false; images?: ProductImages };

const sharedFinishes: Finish[] = [
  { name: "Charred", color: "#2b2622" },
  { name: "Natural thermo-ash", color: "#a37a55" },
  { name: "Silvered", color: "#9c9a93" },
  { name: "Limewash", color: "#e6e0d4" },
];

const sharedFaqs: Faq[] = [
  {
    question: "Do I need planning permission?",
    answer:
      "In most UK gardens a sauna of this size falls under permitted development, provided it sits more than two metres from a boundary. We check your site with you before anything is built.",
  },
  {
    question: "What foundation does it need?",
    answer:
      "A level base of paving slabs, a concrete pad or ground screws. We send a simple drawing once your order is confirmed, and can arrange groundwork through a local partner.",
  },
  {
    question: "How is it delivered and installed?",
    answer:
      "The sauna arrives in finished sections on a single vehicle and is assembled on site by our own team, usually within a day.",
  },
];

const allProducts: (Product | DraftProduct)[] = [
  {
    slug: "lune",
    published: true,
    name: "Lune",
    tagline: "A quiet room for two or three.",
    intro:
      "A compact sauna with a single tall window, sized for small gardens and early mornings. One bench, one view, and very little else.",
    priceFrom: 18500,
    images: {
      card: images.luneStudioFront,
      hero: images.luneHouse,
      gallery: [images.luneEntering, images.luneInsideCouple, images.luneWaterside, images.luneStudioDoor],
    },
    specs: {
      dimensions: "2.2 m × 1.8 m × 2.3 m (L × W × H)",
      capacity: "2–3 people",
      heater: "Harvia Legend 6.8 kW electric, or wood-fired on request",
      timber: "Thermally modified ash, aspen interior",
      leadTime: "10–12 weeks",
    },
    finishes: sharedFinishes,
    faqs: [
      ...sharedFaqs,
      {
        question: "How long does Lune take to heat?",
        answer:
          "Around 35 to 45 minutes from cold to 80°C, depending on the season. It can be started remotely from your phone.",
      },
    ],
  },
  {
    slug: "fell",
    // Hidden until we have photographs of the 4–6 person model.
    published: false,
    name: "Fell",
    tagline: "Room for four to six, and a changing space.",
    intro:
      "A larger sauna with a glazed front and a separate changing room. Built for families, friends and long evenings in the garden.",
    priceFrom: 29500,
    specs: {
      dimensions: "3.6 m × 2.2 m × 2.4 m (L × W × H)",
      capacity: "4–6 people",
      heater: "Harvia Legend 9 kW electric, or wood-fired on request",
      timber: "Thermally modified ash, aspen interior",
      leadTime: "12–14 weeks",
    },
    finishes: sharedFinishes,
    faqs: [
      ...sharedFaqs,
      {
        question: "Can the changing room be heated?",
        answer:
          "It stays warm from the sauna itself. An optional underfloor mat keeps it comfortable through winter.",
      },
    ],
  },
];

/** Published models only. Everything on the site reads from this. */
export const products = allProducts.filter((p): p is Product => p.published);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}
