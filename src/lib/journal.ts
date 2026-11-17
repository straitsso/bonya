import fs from "node:fs";
import path from "node:path";
import { images } from "@content/images";
import type { SiteImage } from "@content/images";

/**
 * Journal posts are MDX files in /content/journal. Each exports `metadata`:
 *
 *   export const metadata = {
 *     title: "…", date: "2026-11-01", excerpt: "…", image: "journalSteam",
 *   }
 *
 * `image` is a key from content/images.ts. The filename is the URL slug.
 */
export type PostMeta = {
  title: string;
  date: string;
  excerpt: string;
  image: keyof typeof images;
};

export type Post = PostMeta & { slug: string; cover: SiteImage };

const DIR = path.join(process.cwd(), "content/journal");

export function getPostSlugs() {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string) {
  const mod = await import(`@content/journal/${slug}.mdx`);
  const meta = mod.metadata as PostMeta;
  return { Content: mod.default, post: { ...meta, slug, cover: images[meta.image] } as Post };
}

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(getPostSlugs().map(async (slug) => (await getPost(slug)).post));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}
