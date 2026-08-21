import Link from "next/link";
import styles from "./Header.module.css";

const FRONT_MARK = "SEW-LAB";
const CYCLE_ALT = "COMING-SOON";
const SIZER_MARK = CYCLE_ALT.length > FRONT_MARK.length ? CYCLE_ALT : FRONT_MARK;

export default function Header({ cycleMark = false }: { cycleMark?: boolean }) {
  return (
    <header className={styles.nav}>
      <Link
        href="#top"
        className={styles.navMark}
        {...(cycleMark ? { "aria-label": FRONT_MARK } : {})}
      >
        {cycleMark ? (
          <span className={styles.navMarkCycle}>
            <span className={styles.navMarkSizer} aria-hidden="true">
              {SIZER_MARK}
            </span>
            <span className={`${styles.navMarkWord} ${styles.navMarkFront}`} aria-hidden="true">
              {FRONT_MARK}
            </span>
            <span className={`${styles.navMarkWord} ${styles.navMarkBack}`} aria-hidden="true">
              {CYCLE_ALT}
            </span>
          </span>
        ) : (
          FRONT_MARK
        )}
      </Link>
      <nav className={styles.navLinks}>
        <a href="#services">Capabilities</a>
        <a href="#work">Work</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className={styles.navActions}>
        {/* Visual placeholder only — no auth wired up yet. */}
        <Link href="/login" className={styles.navLogin}>
          Login
        </Link>
        <a href="#contact" className={styles.navCta}>
          Start a Project
        </a>
      </div>
    </header>
  );
}
