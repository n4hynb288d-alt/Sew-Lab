import Image from "next/image";
import shared from "./shared.module.css";
import styles from "./ClientCredibility.module.css";

const CLIENTS = [
  { src: "/logos/clients/nike.png", alt: "Nike" },
  { src: "/logos/clients/adidas.jpg", alt: "Adidas" },
  { src: "/logos/clients/sony-music.jpg", alt: "Sony Music" },
  { src: "/logos/clients/netflix.webp", alt: "Netflix" },
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
            <div key={c.src} className={styles.logo}>
              <Image src={c.src} alt={c.alt} fill sizes="200px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
