import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const DISPLAY_FONT_NAME = "Bebas Neue";

async function loadDisplayFont() {
  return readFile(join(process.cwd(), "src/app/fonts/BebasNeue-Regular.ttf"));
}

export async function brandMarkImage({
  width,
  height,
  text,
  fontSize,
}: {
  width: number;
  height: number;
  text: string;
  fontSize: number;
}) {
  const font = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontFamily: DISPLAY_FONT_NAME,
            fontSize,
            letterSpacing: Math.round(fontSize * 0.08),
            lineHeight: 1,
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      width,
      height,
      fonts: [
        {
          name: DISPLAY_FONT_NAME,
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
