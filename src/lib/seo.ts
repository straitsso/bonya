import type { SiteImage } from "@content/images";
import { site } from "@content/site";
import { isUnsplash, withCrop } from "./image";

/** Open Graph image for a registry image (Unsplash URLs are cropped to 1200×630). */
export function ogImage(image: SiteImage) {
  if (isUnsplash(image.src)) {
    return { url: `${withCrop(image.src, 1200, 630)}&w=1200&q=75&fm=jpg`, width: 1200, height: 630, alt: image.alt };
  }
  // Local photos are served as-is; social platforms crop them to fit.
  return { url: new URL(image.src, site.url).toString(), alt: image.alt };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
