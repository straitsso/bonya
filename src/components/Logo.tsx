/**
 * Bonya wordmark (public/logo.png, used as a mask), so it takes the current text
 * colour: white over the hero, timber brown on the solid header, paper in the footer.
 * Swap in an SVG later by changing the mask URL.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block aspect-[507/192] h-7 bg-current md:h-8 ${className}`}
      style={{
        maskImage: "url(/logo.png)",
        WebkitMaskImage: "url(/logo.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}
