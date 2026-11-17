/**
 * Image registry. Every photograph on the site is referenced from here.
 *
 * To swap a placeholder for real photography:
 *   1. Drop the file in /public/images (e.g. /public/images/lune-hero.jpg)
 *   2. Change `src` below to "/images/lune-hero.jpg" and update `alt`
 *   3. For art-directed crops, add a separate `mobileSrc` (e.g. a portrait crop)
 *
 * Unsplash placeholders are cropped on the fly, so `mobileSrc` is optional for them.
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Optional different file for small screens (art direction). */
  mobileSrc?: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  heroPoster: {
    src: u("1713270176378-45fbf4a27099"),
    alt: "Timber sauna interior opening onto a still lake at sunset",
  },
  luneHero: {
    src: u("1712659606957-b7395ba9ebb2"),
    alt: "Dark timber sauna interior with a stone heater and a tall window framing snowy mountains",
  },
  luneDetail: {
    src: u("1757940661240-f2e8d2ff93bf"),
    alt: "Warm lighting along timber benches beside a stone heater",
  },
  luneBench: {
    src: u("1712659601630-df4ad47defc8"),
    alt: "A timber bench beside a window looking out to a winter landscape",
  },
  fellHero: {
    src: u("1604609165742-58e1b9cf0457"),
    alt: "A pale timber sauna raised on legs above rocks at the water's edge",
  },
  fellDeck: {
    src: u("1757940809566-70aaf9501138"),
    alt: "Glazed sauna wall reflecting a timber deck and a line of trees at dusk",
  },
  fellDetail: {
    src: u("1757940807425-5d2afa01ddd0"),
    alt: "Sauna interior with a stone heater and a large picture window",
  },
  fellRitual: {
    src: u("1759300031446-88e81c8a26c9"),
    alt: "A timber bucket and ladle resting on a sauna bench",
  },
  design: {
    src: u("1710772195999-92e5301e8587"),
    alt: "Low evening sun across the timber door and window of a sauna",
  },
  story: {
    src: u("1617372607364-f55cb6fa0502"),
    alt: "A timber cabin dusted with snow in a quiet forest",
  },
  interiorBright: {
    src: u("1655194911126-6032bdcccc9d"),
    alt: "A pale timber sauna interior with a black heater and a wide window onto snow and pine trees",
  },
  journalSteam: {
    src: u("1759216852708-d57a21133557"),
    alt: "Water poured from a ladle onto hot sauna stones",
  },
  journalLake: {
    src: u("1660133373249-9e7b4de2efcf"),
    alt: "A timber walkway leading to a lake through birch trees",
  },
  journalTools: {
    src: u("1678988227223-45112511eca2"),
    alt: "A black bucket and two timber ladles on a sauna bench",
  },
} satisfies Record<string, SiteImage>;
