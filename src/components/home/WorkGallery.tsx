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
] as const;

export default function WorkGallery() {
  return (
    <section id="work" className={shared.sectionAlt}>
      <div className={shared.inner}>
        <p className={shared.eyebrowTag}>Proof Of Work</p>
        <h2 className={shared.title}>On The Floor, Mid-Run</h2>
        <p className={shared.sub}>A running catalog — more work added as jobs ship.</p>
        <div className={styles.gallery}>
          {GALLERY.map((g) => (
            <div key={g.src} className={styles.item}>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 720px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
