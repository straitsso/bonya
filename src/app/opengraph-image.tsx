import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@content/site";

export const alt = `${site.name}: architectural outdoor saunas`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card: the wordmark on warm paper. Pages with photos override it. */
export default async function Image() {
  const logo = await readFile(path.join(process.cwd(), "public/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fcfaf6",
          gap: 36,
        }}
      >
        <img src={src} width={507} height={192} alt="" />
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#5f5953", textTransform: "uppercase" }}>
          {site.heroLabel}
        </div>
      </div>
    ),
    size,
  );
}
