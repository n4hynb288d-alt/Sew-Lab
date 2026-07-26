import Link from "next/link";
import styles from "./page.module.css";

// Visual placeholder only — no auth wired up yet.
export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>SEW-LAB Accounts</p>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.body}>Account access isn&apos;t open yet. Check back soon.</p>
        <Link href="/" className={styles.back}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
