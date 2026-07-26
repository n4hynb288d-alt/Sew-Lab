import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Utility/label face — production-ticket codes, eyebrows, nav. Never used
// for body copy.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Condensed poster/stencil face — used sparingly for the wordmark and big
// headlines only. Body copy stays on Geist Sans.
const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

// Editorial italic serif — used only for captions overlaid on photography
// (e.g. the embroidery application labels), never for body copy or UI.
const instrumentSerif = Instrument_Serif({
  variable: "--font-caption",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "SEW-LAB — Full-Package Apparel Decoration",
  description:
    "White label, contract, and licensing apparel decoration. Screen printing, embroidery, DTF, fulfillment, and finishing — from quick-turn samples to mass production. Quality. Consistency. Customer Service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
