import shared from "./shared.module.css";
import styles from "./ContractPositioning.module.css";

const CUSTOMERS = [
  "White Label Brands",
  "Contract Distributors",
  "Licensing Companies",
  "Tour Merchandise Companies",
  "Corporate Merchandise Teams",
  "Large-Volume Buyers",
] as const;

export default function ContractPositioning() {
  return (
    <section id="contract" className={shared.sectionDark}>
      <div className={shared.inner}>
        <p className={shared.eyebrowTag}>Built To Run As Your Production Partner</p>
        <h2 className={shared.title}>Contract &amp; Licensing Ready</h2>
        <p className={styles.copy}>
          SEW-LAB runs as an extension of your team, not a print shop you have to manage. We
          produce under your label, to your spec, at the volume your program actually needs —
          consistent enough to put your name on it.
        </p>
        <ul className={styles.tags}>
          {CUSTOMERS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
