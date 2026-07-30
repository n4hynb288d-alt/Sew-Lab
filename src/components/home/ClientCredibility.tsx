import shared from "./shared.module.css";
import styles from "./ClientCredibility.module.css";

const CLIENTS = [
  { mask: "/logos/clients/nike.png", alt: "Nike" },
  { mask: "/logos/clients/adidas-mask.png", alt: "Adidas" },
  { mask: "/logos/clients/sony-music-mask.png", alt: "Sony Music" },
  { mask: "/logos/clients/netflix-mask.png", alt: "Netflix" },
] as const;

export default function ClientCredibility() {
  return (
    <section id="clients" className={shared.section}>
      <div className={shared.inner}>
        <p className={shared.eyebrowTag}>Credibility</p>
        <h2 className={shared.title}>Trusted By Teams Behind</h2>
        <p className={shared.sub}>Production for brands, labels, and platforms that don&apos;t get second chances on quality.</p>
        <div className={styles.row}>
          {CLIENTS.map((c) => (
            <div
              key={c.mask}
              className={styles.logo}
              role="img"
              aria-label={c.alt}
              style={{ WebkitMaskImage: `url(${c.mask})`, maskImage: `url(${c.mask})` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
