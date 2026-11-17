import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "@content/products";
import { site } from "@content/site";
import { Accordion } from "@/components/Accordion";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { Label } from "@/components/Label";
import { Picture } from "@/components/Picture";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { absoluteUrl, ogImage } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/saunas/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title = `${product.name}, ${product.specs.capacity.toLowerCase()} outdoor sauna`;
  return {
    title,
    description: `${product.tagline} ${product.intro}`,
    alternates: { canonical: `/saunas/${product.slug}` },
    openGraph: { title, description: product.tagline, images: [ogImage(product.images.hero)] },
  };
}

const specRows = [
  ["Dimensions", "dimensions"],
  ["Capacity", "capacity"],
  ["Heater", "heater"],
  ["Timber", "timber"],
  ["Lead time", "leadTime"],
] as const;

export default async function ProductPage({ params }: PageProps<"/saunas/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);
  // The hero is already shown full-bleed, so the gallery skips it.
  const [first, ...rest] = product.images.gallery.filter((img) => img.src !== product.images.hero.src);
  const enquireHref = `/enquire?model=${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${site.name} ${product.name}`,
    description: product.intro,
    brand: { "@type": "Brand", name: site.name },
    image: ogImage(product.images.hero).url,
    url: absoluteUrl(`/saunas/${product.slug}`),
    ...(product.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            price: product.priceFrom,
            priceCurrency: site.currency,
            availability: "https://schema.org/PreOrder",
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero label={product.specs.capacity} headline={product.name} poster={product.images.hero} size="medium" />

      {/* Intro */}
      <Section width="narrow" aria-labelledby="intro-heading">
        <Reveal className="text-center">
          <h2 id="intro-heading" className="text-headline">
            {product.tagline}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-ink-soft">{product.intro}</p>
          {product.priceFrom ? (
            <p className="mt-6 text-[0.8125rem] tracking-wide">From {formatPrice(product.priceFrom)}, installed</p>
          ) : null}
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={enquireHref}>Enquire</ButtonLink>
            <ButtonLink href={site.booking.call} variant="outline" external>
              Book a call
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      {/* Gallery */}
      <section aria-label={`${product.name} gallery`} className="pb-24 md:pb-40">
        <div className="mx-auto max-w-7xl space-y-4 px-6 md:space-y-6 md:px-10">
          {first ? (
            <Reveal>
              <Picture
                image={first}
                desktop={{ width: 1800, height: 1000 }}
                mobile={{ width: 900, height: 1100 }}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="h-auto w-full object-cover"
              />
            </Reveal>
          ) : null}
          {rest.length ? (
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {rest.map((img, i) => (
                <Reveal key={img.src} delay={(i % 2) * 120}>
                  <Picture
                    image={img}
                    desktop={{ width: 1000, height: 1200 }}
                    mobile={{ width: 900, height: 1000 }}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Specs + finishes */}
      <Section tone="deep" width="wide" aria-labelledby="specs-heading">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <Label className="text-ink-soft">Specification</Label>
            <h2 id="specs-heading" className="mt-4 text-title">
              The details
            </h2>
            <table className="mt-10 w-full text-left">
              <caption className="sr-only">{product.name} specification</caption>
              <tbody>
                {specRows.map(([label, key]) => (
                  <tr key={key} className="border-t border-line align-top last:border-b">
                    <th scope="row" className="w-36 py-4 pr-6 font-normal text-ink-soft">
                      {label}
                    </th>
                    <td className="py-4">{product.specs[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={120}>
            <Label className="text-ink-soft">Finishes</Label>
            <h2 className="mt-4 text-title">Four exterior finishes</h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Every finish is applied by hand in the workshop. We will send physical samples once you enquire.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
              {product.finishes.map((f) => (
                <li key={f.name}>
                  <span
                    aria-hidden="true"
                    className="block aspect-square w-full max-w-24 rounded-full border border-ink/10"
                    style={{ backgroundColor: f.color }}
                  />
                  <span className="mt-3 block text-[0.8125rem]">{f.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section width="narrow" aria-labelledby="faq-heading">
        <Reveal>
          <Label className="text-ink-soft">Questions</Label>
          <h2 id="faq-heading" className="mt-4 mb-10 text-title">
            About {product.name}
          </h2>
          <Accordion items={product.faqs} />
          <p className="mt-8 text-ink-soft">
            More in our{" "}
            <Link href="/faq" className="underline decoration-1 underline-offset-4 hover:text-ink">
              general FAQ
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <CtaBand title={`Enquire about ${product.name}`} enquireHref={enquireHref} />

      {others.length ? (
        <Section width="wide" aria-labelledby="others-heading">
          <Reveal>
            <h2 id="others-heading" className="text-title">
              Also in the collection
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-16 md:grid-cols-2 md:gap-10">
            {others.map((p) => (
              <Reveal key={p.slug}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
