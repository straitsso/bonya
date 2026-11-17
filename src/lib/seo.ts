import type { SiteImage } from "@content/images";
import { site } from "@content/site";
import { isUnsplash, withCrop } from "./image";

/** 1200×630 Open Graph image for a registry image (Unsplash is cropped on the fly). */
export function ogImage(image: SiteImage) {
  const url = isUnsplash(image.src)
    ? `${withCrop(image.src, 1200, 630)}&w=1200&q=75&fm=jpg`
    : new URL(image.src, site.url).toString();
  return { url, width: 1200, height: 630, alt: image.alt };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
