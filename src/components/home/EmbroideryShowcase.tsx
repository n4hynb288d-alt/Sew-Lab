"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import shared from "./shared.module.css";
import styles from "./EmbroideryShowcase.module.css";

const ITEMS = [
  {
    src: "/images/applications/0DE04229-8B2E-4945-9F34-CFEE2D5800D7.JPG",
    alt: "Black snapback with a bold flat-stitched 'Thrasher Magazine' logo on a mannequin head, thread wall in the background",
    label: "Flat Embroidery",
  },
  {
    src: "/images/applications/2ECA7121-F059-47A6-B455-94706F234191.JPG",
    alt: "Close-up of a raised 3D puff embroidered patch reading 'American Hot Rod Corporation' on a black cap",
    label: "3D Puff Embroidery",
  },
  {
    src: "/images/applications/82004865-D972-421F-8755-54A8273A99EF.jpg",
    alt: "Navy trucker cap with a red tackle-twill 'L' flanked by fine-line flame graphics, thread wall in the background",
    label: "Outline + Fill Combo",
  },
  {
    src: "/images/applications/5A73FDC1-7285-4DFF-92BD-7C6C9751CA68.jpg",
    alt: "Black cap with a densely stitched multi-color alien-and-flames patch",
    label: "Dense Fill Stitch",
  },
  {
    src: "/images/applications/IMG_7361.jpeg",
    alt: "Black cap with a multi-color 'Thrasher Workshop' logo combining pink, blue, and white thread",
    label: "Multi-Color Thread Blend",
  },
  {
    src: "/images/applications/6287C402-B0AE-43A9-A104-40D419383B82.jpg",
    alt: "Black trucker cap with a flaming rose embroidered directly onto the mesh back panel",
    label: "Mesh Panel Embroidery",
  },
  {
    src: "/images/applications/70068594720__9EEBF301-5721-49F9-8481-306F0CC87C4A.jpeg",
    alt: "White, gold, and red trucker caps with a tackle-twill 'SF' logo and matching script lettering",
    label: "Script Lettering + Twill",
  },
  {
    src: "/images/applications/88895E3E-7A8A-4E88-9EF0-B972571CDCB7.JPG",
    alt: "Large tackle-twill 'Mirrored End' lettering with satin-stitch borders across the back of a black jacket",
    label: "Tackle Twill Lettering",
  },
  {
    src: "/images/applications/DBE1686B-FF32-4CAC-8904-81EEF9259FE7.JPG",
    alt: "Close-up of a felt chenille letter appliqué with satin-stitch edging on a navy wool cap",
    label: "Chenille Felt Appliqué",
  },
  {
    src: "/images/applications/E3C449B7-7875-49AF-A489-613FAF6852D4.jpg",
    alt: "Three trucker caps in tan, blue, and black, each with the same full-color photo-realistic eagle embroidery",
    label: "Photo-Realistic Embroidery",
  },
  {
    src: "/images/applications/IMG_1183.JPG",
    alt: "Tone-on-tone 'Achille Apparel' lettering embroidered vertically on a white jacket panel",
    label: "Tone-on-Tone Lettering",
  },
  {
    src: "/images/applications/IMG_1184.JPG",
    alt: "Oversized lightning-bolt logo patch embroidered across the back of a black hoodie",
    label: "Oversized Back Patch",
  },
  {
    src: "/images/applications/IMG_7358.jpeg",
    alt: "Black cap with a small 'Thrasher' logo embroidered on the side panel",
    label: "Side Panel Placement",
  },
  {
    src: "/images/applications/IMG_7360.jpeg",
    alt: "Black cap with 'Thrasher' script embroidered above the back strap closure",
    label: "Back Strap Placement",
  },
  {
    src: "/images/applications/IMG_7362.jpeg",
    alt: "Grey beanie with a fine-line outline-stitched sun face design on the cuff",
    label: "Fine-Line Outline Stitch",
  },
] as const;

// Desktop: hovering a cell lifts its mask. Mobile has no hover, so a finger
// dragged across the row does the same thing — both are driven by the same
// pointer-tracking here (Pointer Events fire on move for mouse regardless of
// button state, and on touch only while the finger is down and moving).
export default function EmbroideryShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateActiveFromPoint = (x: number, y: number) => {
    const index = cellRefs.current.findIndex((cell) => {
      if (!cell) return false;
      const rect = cell.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });
    setActiveIndex(index === -1 ? null : index);
  };

  return (
    <section className={shared.sectionAlt}>
      <div className={shared.inner}>
        <p className={shared.eyebrowTag}>EMB</p>
        <h2 className={shared.title}>Types of Applications</h2>
      </div>
      <div className={styles.galleryWrap}>
        <div
          className={styles.row}
          onPointerMove={(e) => updateActiveFromPoint(e.clientX, e.clientY)}
          onPointerLeave={() => setActiveIndex(null)}
          onPointerUp={() => setActiveIndex(null)}
          onPointerCancel={() => setActiveIndex(null)}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.src}
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              className={styles.cell}
            >
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 860px) 33vw, 20vw" />
              <div className={`${styles.mask} ${activeIndex === i ? styles.revealed : ""}`} />
              <span className={`${styles.label} ${activeIndex === i ? styles.revealed : ""}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
