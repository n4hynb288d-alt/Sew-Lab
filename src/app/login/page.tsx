import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <video
        className={styles.video}
        src="/admin_customer_login_video.mov"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
      />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.card}>
        <p className={styles.eyebrow}>SEW-LAB Accounts</p>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.body}>Quality. Consistency. Customer Service.</p>
        <div className={styles.actions}>
          <a
            href="https://sew-lab-back-portal.vercel.app/admin/login"
            className={styles.choice}
          >
            Admin login
          </a>
          <a
            href="https://sew-lab-back-portal.vercel.app/customer/login"
            className={styles.choice}
          >
            Customer login
          </a>
        </div>
        <Link href="/home" className={styles.back}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
