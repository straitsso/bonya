import type { Metadata } from "next";
import { images } from "@content/images";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { Label } from "@/components/Label";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SplitBlock } from "@/components/SplitBlock";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Story",
  description: "A small London workshop building architectural outdoor saunas by hand, for daily ritual and long restoration.",
  alternates: { canonical: "/about" },
  openGraph: { title: "Our Story", images: [ogImage(images.story)] },
};

const principles = [
  {
    title: "Ritual",
    body: "A sauna is not a gadget. It is a place you return to, morning or evening, to slow down. We design for the hundredth visit, not the first.",
  },
  {
    title: "Restoration",
    body: "Heat, cold water and rest, in that order. Every detail, from bench height to window placement, is there to help you settle.",
  },
  {
    title: "Craft",
    body: "Each sauna is built by the same small team, in one workshop, from timber we can trace. Nothing is assembled from a flat pack.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero label="Our story" headline="A better room for an old ritual" poster={images.fellDeck} size="medium" />

      <Section width="narrow" aria-labelledby="beginning-heading">
        <Reveal>
          <Label className="text-ink-soft">The beginning</Label>
          <h2 id="beginning-heading" className="mt-4 text-headline">
            It started at the end of a garden
          </h2>
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.8] text-ink/90">
            <p>
              Bonya began with a borrowed sauna, a draughty timber shed at the bottom of a friend&rsquo;s garden in
              North London. It was not beautiful, but every evening spent in it ended the same way: quieter, warmer
              and more at ease.
            </p>
            <p>
              We wanted that feeling in a room that deserved it. Something that would sit well beside a house, age
              gracefully in British weather and be built properly, by people who would stand behind it.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section tone="deep" width="wide" aria-labelledby="workshop-heading">
        <SplitBlock image={images.interiorBright}>
          <Label className="text-ink-soft">The workshop</Label>
          <h2 id="workshop-heading" className="mt-4 text-headline">
            Built by hand in East London
          </h2>
          <p className="mt-6 text-ink-soft">
            Our saunas are made start to finish in one workshop. We cut, join, finish and test every sauna before it
            leaves, then install it ourselves.
          </p>
        </SplitBlock>
      </Section>

      <Section width="wide" aria-labelledby="principles-heading">
        <Reveal className="max-w-xl">
          <Label className="text-ink-soft">What we care about</Label>
          <h2 id="principles-heading" className="mt-4 text-headline">
            Three things, done carefully
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} className="border-t border-line pt-8">
              <h3 className="text-title">{p.title}</h3>
              <p className="mt-4 text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep" width="wide" aria-labelledby="timber-heading">
        <SplitBlock image={images.design} reverse>
          <Label className="text-ink-soft">Materials</Label>
          <h2 id="timber-heading" className="mt-4 text-headline">
            Timber that is meant to weather
          </h2>
          <p className="mt-6 text-ink-soft">
            Thermally modified ash outside, pale aspen within. No chemical treatments, no plastics where you sit, and
            a finish that softens to silver if you let it.
          </p>
        </SplitBlock>
      </Section>

      <CtaBand />
    </>
  );
}
