import { images } from "@content/images";
import { products } from "@content/products";
import { site } from "@content/site";
import { ButtonLink } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { JournalCard } from "@/components/JournalCard";
import { Label } from "@/components/Label";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SplitBlock } from "@/components/SplitBlock";
import { getPosts } from "@/lib/journal";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);

  return (
    <>
      <Hero label={site.heroLabel} headline={site.heroHeadline} poster={images.luneHouse} videoSrc={site.heroVideo} />

      {/* Models */}
      <Section id="saunas" width="wide" aria-labelledby="saunas-heading">
        <Reveal className="mx-auto max-w-xl text-center">
          <Label className="text-ink-soft">The saunas</Label>
          <h2 id="saunas-heading" className="mt-4 text-headline">
            {products.length > 1 ? "Two rooms, one idea" : "A quiet room for the garden"}
          </h2>
        </Reveal>
        <div
          className={`mt-16 grid gap-16 md:mt-24 md:gap-10 ${
            products.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-xl"
          }`}
        >
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 120}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Design approach */}
      <Section tone="deep" width="wide" aria-labelledby="design-heading">
        <SplitBlock image={images.luneStudioAbove}>
          <Label className="text-ink-soft">Design</Label>
          <h2 id="design-heading" className="mt-4 text-headline">
            Made to disappear into the garden
          </h2>
          <p className="mt-6 text-ink-soft">
            Simple volumes, honest timber and a single framed view. Each sauna is built by hand in our workshop,
            finished in a palette taken from bark, stone and ash, and left to weather quietly over the years.
          </p>
        </SplitBlock>
      </Section>

      {/* Story teaser */}
      <Section width="wide" aria-labelledby="story-heading">
        <SplitBlock image={images.luneGardenCouple} reverse>
          <Label className="text-ink-soft">Our story</Label>
          <h2 id="story-heading" className="mt-4 text-headline">
            A small workshop, a long tradition
          </h2>
          <p className="mt-6 text-ink-soft">
            Bonya began with a borrowed sauna at the end of a friend&rsquo;s garden and a conviction that the ritual
            deserved a better room. We still build every one ourselves.
          </p>
          <ButtonLink href="/about" variant="text" className="mt-8">
            Learn more<span className="sr-only"> about our story</span>
          </ButtonLink>
        </SplitBlock>
      </Section>

      {/* Journal */}
      {posts.length > 0 ? (
        <Section tone="deep" width="wide" aria-labelledby="journal-heading">
          <Reveal className="flex items-end justify-between gap-6">
            <div>
              <Label className="text-ink-soft">Journal</Label>
              <h2 id="journal-heading" className="mt-4 text-headline">
                Notes on heat and rest
              </h2>
            </div>
            <ButtonLink href="/journal" variant="text" className="hidden shrink-0 md:inline-flex">
              All entries
            </ButtonLink>
          </Reveal>
          <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-8">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 120}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
          <ButtonLink href="/journal" variant="text" className="mt-12 md:hidden">
            All entries
          </ButtonLink>
        </Section>
      ) : null}

      {/* See it in person */}
      <Section id="visit" width="narrow" aria-labelledby="visit-heading">
        <Reveal className="text-center">
          <Label className="text-ink-soft">See it in person</Label>
          <h2 id="visit-heading" className="mt-4 text-headline">
            Sit in one before you decide
          </h2>
          <p className="mx-auto mt-6 max-w-md text-ink-soft">
            Visit our workshop in East London, or let us walk you through the details on a video call. There is no
            obligation, and no hurry.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={site.booking.visit} external>
              Book a visit
            </ButtonLink>
            <ButtonLink href={site.booking.call} variant="outline" external>
              Book a video call
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      {/* Newsletter */}
      <Section tone="deep" width="narrow" spacing="tight" aria-labelledby="newsletter-heading">
        <Reveal className="text-center">
          <h2 id="newsletter-heading" className="text-title">
            Occasional letters from the workshop
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-ink-soft">New models, journal entries and open days. A few times a year.</p>
          <div className="mx-auto mt-8 max-w-md text-left">
            <NewsletterForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
