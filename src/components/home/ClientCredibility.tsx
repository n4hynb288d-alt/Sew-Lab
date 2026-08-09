import Image from "next/image";
import shared from "./shared.module.css";
import styles from "./ClientCredibility.module.css";

// Natural pixel dimensions of each source file — passed to next/image for
// correct aspect ratio/srcset. Rendered size is normalized separately in
// ClientCredibility.module.css (fixed height, auto width) so every logo
// matches Nike's height regardless of how each source image is cropped.
const CLIENTS = [
  { src: "/logos/clients/nike.png", alt: "Nike", width: 1024, height: 534 },
  { src: "/logos/clients/adidas.png", alt: "Adidas", width: 597, height: 114 },
  { src: "/logos/clients/sony-music.png", alt: "Sony Music", width: 258, height: 278 },
  { src: "/logos/clients/netflix.png", alt: "Netflix", width: 466, height: 800 },
  { src: "/logos/clients/ceremony-of-roses.png", alt: "Ceremony of Roses", width: 860, height: 446 },
  { src: "/logos/clients/three-ten-merch.png", alt: "Three Ten Merch", width: 276, height: 42 },
] as const;

export default function ClientCredibility() {
  return (
    <section id="clients" className={`${shared.section} ${styles.forceLight}`}>
      <div className={shared.inner}>
        <p className={shared.eyebrowTag}>Credibility</p>
        <h2 className={shared.title}>Trusted By Teams Behind</h2>
        <p className={shared.sub}>Production for brands, labels, and platforms that don&apos;t get second chances on quality.</p>
        <div className={styles.row}>
          {CLIENTS.map((c) => (
            <div key={c.src} className={styles.logo}>
              <Image src={c.src} alt={c.alt} width={c.width} height={c.height} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
