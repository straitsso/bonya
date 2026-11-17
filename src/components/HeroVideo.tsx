"use client";

import { useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Muted, looping background video. Sits over the poster <Picture>, which stays
 * visible until the first frame plays, and is skipped for reduced-motion users.
 * Not rendered on the server, so the poster is always the LCP element.
 */
export function HeroVideo({ src }: { src: string }) {
  const allowed = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const [ready, setReady] = useState(false);

  if (!allowed) return null;

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-calm ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      onPlaying={() => setReady(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
