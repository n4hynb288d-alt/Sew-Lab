import shared from "./shared.module.css";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section id="contact" className={shared.sectionDark}>
      <div className={styles.inner}>
        <p className={shared.eyebrowTag}>Get Started</p>
        <h2 className={shared.title}>Start A Project</h2>
        <p className={styles.sub}>
          Tell us the run size, the timeline, and what you need decorated.
        </p>
        <a href="tel:4242353673" className={styles.phone}>
          424.235.3673
        </a>
      </div>
    </section>
  );
}
