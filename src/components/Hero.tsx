import type { SiteImage } from "@content/images";
import { HeroVideo } from "./HeroVideo";
import { Picture } from "./Picture";
import { Label } from "./Label";

type HeroProps = {
  label?: string;
  headline: string;
  poster: SiteImage;
  videoSrc?: string;
  /** Optional element under the headline (e.g. a button). */
  children?: React.ReactNode;
  /** Shorter hero for inner pages. */
  size?: "full" | "medium";
};

export function Hero({ label, headline, poster, videoSrc, children, size = "full" }: HeroProps) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-ink text-paper ${
        size === "full" ? "h-svh min-h-[34rem]" : "h-[75svh] min-h-[28rem]"
      }`}
    >
      <div className="absolute inset-0 -z-10">
        <Picture
          image={poster}
          desktop={{ width: 1920, height: 1080 }}
          mobile={{ width: 900, height: 1500 }}
          sizes="100vw"
          priority
          className="h-full w-full object-cover"
        />
        {videoSrc ? <HeroVideo src={videoSrc} /> : null}
        {/* Scrim keeps white type legible over any frame. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
        {label ? <Label className="mb-5 text-paper/85">{label}</Label> : null}
        <h1 className="max-w-[12ch] text-display">{headline}</h1>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
