import type { Metadata } from "next";
import { faqGroups } from "@content/faq";
import { Accordion } from "@/components/Accordion";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about choosing, ordering and living with a Bonya outdoor sauna.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader label="Support" title="Frequently asked questions" />
      <div className="mx-auto max-w-2xl space-y-20 px-6 pb-24 md:px-10 md:pb-40">
        {faqGroups.map((group) => (
          <Reveal as="section" key={group.title} aria-labelledby={`faq-${group.title.toLowerCase().replace(/\W+/g, "-")}`}>
            <h2 id={`faq-${group.title.toLowerCase().replace(/\W+/g, "-")}`} className="mb-8 text-title">
              {group.title}
            </h2>
            <Accordion items={group.items} />
          </Reveal>
        ))}
      </div>
      <CtaBand title="Still have a question?" body="Send us a note or book a short call. We are always happy to help." />
    </>
  );
}
