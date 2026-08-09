import Image from "next/image";
import shared from "./shared.module.css";
import styles from "./WorkGallery.module.css";

const GALLERY = [
  {
    src: "/images/production/IMG_9717.jpeg",
    alt: "Screen printing screens loaded with red ink, ready for production",
  },
  {
    src: "/images/production/09AAD566-94C2-4749-B427-D9401D18D504.JPG",
    alt: "Embroidery machine head stitching a logo in real time",
  },
  {
    src: "/images/production/IMG_9718.jpeg",
    alt: "Screen printing frames stacked and labeled by mesh count",
  },
  {
    src: "/images/gallery/screen-print-in-progress.jpeg",
    alt: "Black cap with a screen printed graphic held up over the press screens mid-run",
  },
  {
    src: "/images/gallery/little-miss-reckless-cap.jpeg",
    alt: "Camo cap with embroidered 'Little Miss Reckless' script lettering, thread wall in the background",
  },
  {
    src: "/images/gallery/sun-face-embroidery.jpeg",
    alt: "Black cap with an embroidered smiling sun face design",
  },
  {
    src: "/images/gallery/jacket-print-lining.JPG",
    alt: "Corduroy jacket with a full-color printed mountain-scene lining",
  },
] as const;

export default function WorkGallery() {
  return (
    <section id="work" className={shared.sectionAlt}>
      <div className={shared.inner}>
        <p className={shared.eyebrowTag}>Proof Of Work</p>
        <h2 className={shared.title}>On The Floor, Mid-Run</h2>
        <p className={shared.sub}>A running catalog — more work added as jobs ship.</p>
        <div className={styles.galleryScroll}>
          <div className={styles.gallery}>
            {GALLERY.map((g) => (
              <div key={g.src} className={styles.item}>
                <Image src={g.src} alt={g.alt} fill sizes="(max-width: 720px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
