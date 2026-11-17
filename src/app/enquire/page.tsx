import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@content/products";
import { site } from "@content/site";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Enquire",
  description: "Tell us about your garden and which sauna interests you. We reply within two working days.",
  alternates: { canonical: "/enquire" },
};

const models = products.map((p) => ({ value: p.name, label: `${p.name} (${p.specs.capacity})` }));

/** Reads ?model=<slug> (from product pages) to preselect the model. */
async function PrefilledForm({ searchParams }: { searchParams: PageProps<"/enquire">["searchParams"] }) {
  const { model } = await searchParams;
  const match = products.find((p) => p.slug === model);
  return <EnquiryForm models={models} defaultModel={match?.name} email={site.email} />;
}

export default function EnquirePage({ searchParams }: PageProps<"/enquire">) {
  return (
    <>
      <PageHeader label="Enquire" title="Begin with a conversation">
        <p>
          Tell us a little about where the sauna would go and we will be in touch within two working days. Prefer to
          talk?{" "}
          <a href={site.booking.call} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
            Book a call
          </a>
          .
        </p>
      </PageHeader>
      <div className="mx-auto max-w-2xl px-6 pb-24 md:px-10 md:pb-40">
        <Suspense fallback={<EnquiryForm models={models} email={site.email} />}>
          <PrefilledForm searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
