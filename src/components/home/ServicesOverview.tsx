import shared from "./shared.module.css";
import styles from "./ServicesOverview.module.css";

const SERVICES = [
  { code: "SP", name: "Screen Printing", href: "#screen-printing", desc: "Multi-color & spot-color production printing." },
  { code: "EMB", name: "Embroidery", href: "#embroidery", desc: "In-house digitizing, flat to 3D puff." },
  { code: "DTF", name: "DTF Printing", href: "#dtf", desc: "Full-color transfers, no minimums." },
  { code: "FUL", name: "Fulfillment", href: "#fulfillment", desc: "Pick, pack, and ship from the floor." },
  { code: "FIN", name: "Finishing", href: "#finishing", desc: "Tagging, bagging, and final QC." },
] as const;

export default function ServicesOverview() {
  return (
    <section id="services" className={shared.section}>
      <div className={shared.inner}>
        <p className={shared.eyebrowTag}>What We Run</p>
        <h2 className={shared.title}>Services Overview</h2>
        <p className={shared.sub}>
          Five capabilities, one production line. Jump to the details below.
        </p>
        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <a key={s.code} href={s.href} className={styles.card}>
              <span className={styles.code}>{s.code}</span>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.desc}>{s.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
