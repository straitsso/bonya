import { getImageProps } from "next/image";
import type { SiteImage } from "@content/images";
import { isUnsplash, unsplashLoader, withCrop } from "@/lib/image";

type Crop = { width: number; height: number };

type PictureProps = {
  image: SiteImage;
  /** Crop used from the md breakpoint up. */
  desktop: Crop;
  /** Crop used below md. Defaults to the desktop crop. */
  mobile?: Crop;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Art-directed responsive image: separate mobile and desktop crops via <picture>,
 * built on next/image's getImageProps so srcset, lazy loading and priority hints
 * all behave like <Image>.
 */
export function Picture({ image, desktop, mobile = desktop, sizes, priority, className }: PictureProps) {
  const common = {
    alt: image.alt,
    sizes,
    quality: priority ? 75 : 60,
    // Not `preload`: with art direction it would preload the mobile crop on desktop too.
    ...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {}),
  };

  const build = (src: string, crop: Crop) =>
    getImageProps({
      ...common,
      src: withCrop(src, crop.width, crop.height),
      width: crop.width,
      height: crop.height,
      ...(isUnsplash(src) ? { loader: unsplashLoader } : {}),
    }).props;

  const desktopProps = build(image.src, desktop);
  const mobileProps = build(image.mobileSrc ?? image.src, mobile);

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopProps.srcSet} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from mobileProps */}
      <img {...mobileProps} className={className} />
    </picture>
  );
}
