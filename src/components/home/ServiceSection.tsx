import shared from "./shared.module.css";
import styles from "./ServiceSection.module.css";
import ServiceMedia from "./ServiceMedia";

type ServiceSectionProps = {
  id: string;
  code: string;
  title: string;
  description: string;
  bullets: readonly string[];
  video: string;
  image?: { src: string; alt: string };
  useCases: readonly string[];
  moq?: string;
  leadTime?: string;
  ctaLabel?: string;
  reverse?: boolean;
  tone?: "default" | "alt";
};

export default function ServiceSection({
  id,
  code,
  title,
  description,
  bullets,
  video,
  image,
  useCases,
  moq,
  leadTime,
  ctaLabel,
  reverse = false,
  tone = "default",
}: ServiceSectionProps) {
  return (
    <section id={id} className={tone === "alt" ? shared.sectionAlt : shared.section}>
      <div className={shared.inner}>
        <div className={`${styles.layout} ${reverse ? styles.reverse : ""}`}>
          <div className={styles.media}>
            <ServiceMedia code={code} videoSrc={video} image={image} />
          </div>
          <div className={styles.copy}>
            <p className={shared.eyebrowTag}>{code}</p>
            <h2 className={shared.title}>{title}</h2>
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
              {ctaLabel ?? `Start a ${title} Project`} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
