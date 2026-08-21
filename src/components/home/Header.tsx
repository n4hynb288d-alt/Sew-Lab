import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.nav}>
      <Link href="#top" className={styles.navMark}>
        SEW-LAB
      </Link>
      <nav className={styles.navLinks}>
        <a href="#services">Capabilities</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
        <a href="https://moxy-eight.vercel.app/" target="_blank" rel="noopener noreferrer">
          Mock-Ups
        </a>
      </nav>
      <div className={styles.navActions}>
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
