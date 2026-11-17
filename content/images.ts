/**
 * Image registry. Every photograph on the site is referenced from here.
 *
 * To swap a placeholder for real photography:
 *   1. Drop the file in /public/images (e.g. /public/images/lune-hero.jpg)
 *   2. Change `src` below to "/images/lune-hero.jpg" and update `alt`
 *   3. For art-directed crops, add a separate `mobileSrc` (e.g. a portrait crop)
 *
 * Crops are done with object-fit, so a separate `mobileSrc` is only needed when the
 * subject would be cut off on narrow screens. (Unsplash URLs also work here: they are
 * cropped on the fly by src/lib/image.ts.)
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Optional different file for small screens (art direction). */
  mobileSrc?: string;
};

export const images = {
  // Product photography (2–3 person model).
  luneStudioFront: {
    src: "/images/lune-studio-front.webp",
    alt: "Lune from the front: a rounded sauna clad in vertical timber slats with a full-height glass door",
  },
  luneStudioAbove: {
    src: "/images/lune-studio-above.webp",
    alt: "Lune seen from above, its soft rounded corners and dark slatted roof",
  },
  luneStudioDoor: {
    src: "/images/lune-studio-door.webp",
    alt: "Lune with its timber door open, showing the warm cedar interior",
  },
  luneStudioBack: {
    src: "/images/studio-back.webp",
    alt: "The rear of the sauna, a continuous wall of vertical timber slats",
  },
  luneHouse: {
    src: "/images/lune-house.webp",
    alt: "Lune beneath the deep overhang of a modern house, set among garden planting",
  },
  luneEntering: {
    src: "/images/lune-entering.webp",
    alt: "A woman stepping into Lune through its glass door on a sunlit terrace",
  },
  luneGardenCouple: {
    src: "/images/lune-garden-couple.webp",
    alt: "Two people walking across a garden terrace towards the sauna",
  },
  luneInsideCouple: {
    src: "/images/lune-inside-couple.webp",
    alt: "Two people talking on the cedar benches inside Lune",
  },
  luneWaterside: {
    src: "/images/lune-waterside.webp",
    alt: "Lune on a terrace by the water, someone resting on the upper bench inside",
  },
} satisfies Record<string, SiteImage>;
