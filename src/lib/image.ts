import type { ImageLoader } from "next/image";

/**
 * Unsplash placeholders are resized by Unsplash's own CDN (imgix) rather than
 * the Next.js optimizer, so we get true server-side crops at any aspect ratio.
 * Once real photography is in /public/images, the default optimizer takes over
 * automatically, because this loader is only applied to Unsplash URLs.
 */
export const isUnsplash = (src: string) => src.startsWith("https://images.unsplash.com/");

export const unsplashLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  url.searchParams.set("auto", "format");
  return url.toString();
};

/** Bake an aspect-ratio crop into an Unsplash URL. No-op for local images. */
export function withCrop(src: string, width: number, height: number) {
  if (!isUnsplash(src)) return src;
  const url = new URL(src);
  url.searchParams.set("ar", `${width}:${height}`);
  url.searchParams.set("fit", "crop");
  if (!url.searchParams.has("crop")) url.searchParams.set("crop", "entropy");
  return url.toString();
}
