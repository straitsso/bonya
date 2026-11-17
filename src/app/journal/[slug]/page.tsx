import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@content/site";
import { ButtonLink } from "@/components/Button";
import { JournalCard } from "@/components/JournalCard";
import { Picture } from "@/components/Picture";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { formatDate, getPost, getPostSlugs, getPosts } from "@/lib/journal";
import { absoluteUrl, ogImage } from "@/lib/seo";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

async function load(slug: string) {
  if (!getPostSlugs().includes(slug)) return null;
  return getPost(slug);
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { post } = data;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [ogImage(post.cover)],
    },
  };
}

export default async function JournalPost({ params }: PageProps<"/journal/[slug]">) {
  const data = await load((await params).slug);
  if (!data) notFound();
  const { Content, post } = data;
  const more = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: ogImage(post.cover).url,
    url: absoluteUrl(`/journal/${post.slug}`),
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="mx-auto max-w-3xl px-6 pt-36 pb-12 text-center md:px-10 md:pt-48 md:pb-16">
          <p className="text-[0.8125rem] text-ink-soft">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h1 className="mt-4 text-headline">{post.title}</h1>
          <p className="mx-auto mt-6 max-w-lg text-ink-soft">{post.excerpt}</p>
        </header>

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Picture
            image={post.cover}
            desktop={{ width: 1600, height: 900 }}
            mobile={{ width: 900, height: 1000 }}
            sizes="(min-width: 1152px) 1100px, 100vw"
            priority
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mx-auto max-w-[38rem] px-6 py-16 md:py-24">
          <Content />
        </div>
      </article>

      {more.length ? (
        <Section tone="deep" width="wide" aria-labelledby="more-heading">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 id="more-heading" className="text-title">
              More from the journal
            </h2>
            <ButtonLink href="/journal" variant="text" className="shrink-0">
              All entries
            </ButtonLink>
          </Reveal>
          <div className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
            {more.map((p) => (
              <Reveal key={p.slug}>
                <JournalCard post={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
