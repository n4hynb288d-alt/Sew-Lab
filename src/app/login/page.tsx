import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>SEW-LAB Accounts</p>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.body}>Choose Admin or Customer access.</p>
        <div className={styles.actions}>
          <a href="/admin/login" className={styles.choice}>
            Admin login
          </a>
          <a href="/customer/login" className={styles.choice}>
            Customer login
          </a>
        </div>
        <Link href="/" className={styles.back}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
