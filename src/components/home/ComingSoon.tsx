import ComingSoonBackdrop from "./ComingSoonBackdrop";
import Logo3D from "./Logo3D";
import styles from "./ComingSoon.module.css";

// Temporary stand-in for the full homepage: the mobile hero's exact look
// (MobileHeroGrid), unconditionally at every viewport width, with the
// spinning logo's back face reading COMING-SOON instead of the swipe hint.
export default function ComingSoon() {
  return (
    <section className={styles.landing}>
      <ComingSoonBackdrop />
      <div className={styles.logoOverlay}>
        <div className={styles.logoScale}>
          <Logo3D backText="COMING-SOON" />
        </div>
      </div>
    </section>
  );
}
