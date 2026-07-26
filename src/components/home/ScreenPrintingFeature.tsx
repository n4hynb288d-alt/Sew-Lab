import ScreenPrintingBackground from "./ScreenPrintingBackground";
import MobileGridBackdrop from "./MobileGridBackdrop";
import styles from "./ScreenPrintingFeature.module.css";

type ScreenPrintingFeatureProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  useCases: readonly string[];
  moq?: string;
  leadTime?: string;
  ctaLabel?: string;
};

export default function ScreenPrintingFeature({
  title,
  description,
  bullets,
  useCases,
  moq,
  leadTime,
  ctaLabel,
}: ScreenPrintingFeatureProps) {
  return (
    <section id="screen-printing" className={styles.feature}>
      <ScreenPrintingBackground />
      <MobileGridBackdrop />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>SP</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <ul className={styles.bullets}>
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <div className={styles.useCases}>
            <span className={styles.useCasesLabel}>Best For</span>
            <div className={styles.useCasesTags}>
              {useCases.map((u) => (
                <span key={u} className={styles.useCaseTag}>
                  {u}
                </span>
              ))}
            </div>
          </div>

          {(moq || leadTime) && (
            <div className={styles.specs}>
              {moq && (
                <div className={styles.spec}>
                  <span className={styles.specLabel}>MOQ</span>
                  <span className={styles.specValue}>{moq}</span>
                </div>
              )}
              {leadTime && (
                <div className={styles.spec}>
                  <span className={styles.specLabel}>Lead Time</span>
                  <span className={styles.specValue}>{leadTime}</span>
                </div>
              )}
            </div>
          )}

          <a href="#contact" className={styles.cta}>
            {ctaLabel ?? `Start a ${title} Project`}
          </a>
        </div>
      </div>
    </section>
  );
}
