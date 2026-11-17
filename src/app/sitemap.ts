import type { MetadataRoute } from "next";
import { products } from "@content/products";
import { getPosts } from "@/lib/journal";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const pages = ["/", "/about", "/journal", "/enquire", "/faq", "/delivery", "/warranty"];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p) })),
    ...products.map((p) => ({ url: absoluteUrl(`/saunas/${p.slug}`) })),
    ...posts.map((p) => ({ url: absoluteUrl(`/journal/${p.slug}`), lastModified: p.date })),
  ];
}
