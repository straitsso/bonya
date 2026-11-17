import type { ReactNode } from "react";
import type { SiteImage } from "@content/images";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

/** Alternating image/text block. `reverse` puts the image on the right on desktop. */
export function SplitBlock({
  image,
  children,
  reverse,
  portrait = true,
}: {
  image: SiteImage;
  children: ReactNode;
  reverse?: boolean;
  portrait?: boolean;
}) {
  const crop = portrait ? { width: 1000, height: 1250 } : { width: 1200, height: 900 };
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
      <Reveal className={reverse ? "md:order-2" : ""}>
        <Picture
          image={image}
          desktop={crop}
          mobile={{ width: 900, height: 1000 }}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="h-auto w-full object-cover"
        />
      </Reveal>
      <Reveal delay={120} className="max-w-md">
        {children}
      </Reveal>
    </div>
  );
}
