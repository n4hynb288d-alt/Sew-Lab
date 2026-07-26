import HeroBackground from "./HeroBackground";
import Logo3D from "./Logo3D";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBackground />
      <div className={styles.heroScrim} />
      <div className={styles.heroContent}>
        <Logo3D />
        <p className={styles.eyebrow}>Full-Package Apparel Decoration</p>
        <h1 className={styles.heroHeadline}>
          Full-package decoration for brands, distributors, licensing programs, and tour merch.
        </h1>
        <p className={styles.heroSub}>
          Screen printing, embroidery, DTF, finishing, and fulfillment built for quick turns,
          consistent quality, and production-scale execution.
        </p>
        <div className={styles.heroCtas}>
          <a href="#contact" className={styles.ctaPrimary}>
            Start a Project
          </a>
          <a href="#services" className={styles.ctaSecondary}>
            View Capabilities
          </a>
        </div>
      </div>
      <p className={styles.slogan}>Quality. Consistency. Customer Service.</p>
    </section>
  );
}
