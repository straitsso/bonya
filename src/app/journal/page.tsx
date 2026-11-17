import type { Metadata } from "next";
import Link from "next/link";
import { JournalCard } from "@/components/JournalCard";
import { PageHeader } from "@/components/PageHeader";
import { Picture } from "@/components/Picture";
import { Reveal } from "@/components/Reveal";
import { formatDate, getPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on heat, cold water, rest and the craft of building saunas.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const [featured, ...rest] = await getPosts();

  return (
    <>
      <PageHeader label="Journal" title="Notes on heat and rest">
        <p>Occasional writing on ritual, restoration and the craft of building saunas.</p>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-40">
        {featured ? (
          <Reveal as="article" className="group">
            <Link href={`/journal/${featured.slug}`} className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr] md:gap-16">
              <div className="overflow-hidden bg-paper-deep">
                <Picture
                  image={featured.cover}
                  desktop={{ width: 1400, height: 900 }}
                  mobile={{ width: 900, height: 700 }}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  priority
                  className="h-auto w-full object-cover transition-transform duration-[1200ms] ease-calm group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <p className="text-[0.8125rem] text-ink-soft">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </p>
                <h2 className="mt-3 text-headline">{featured.title}</h2>
                <p className="mt-4 text-ink-soft">{featured.excerpt}</p>
                <span className="mt-8 inline-block text-[0.8125rem] font-medium underline decoration-1 underline-offset-[6px] decoration-ink/30 group-hover:decoration-ink">
                  Read
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        {rest.length ? (
          <div className="mt-24 grid gap-14 border-t border-line pt-16 md:mt-32 md:grid-cols-3 md:gap-8">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 120}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
