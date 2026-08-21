import ComingSoonBackdrop from "./ComingSoonBackdrop";
import styles from "./ComingSoon.module.css";

// Temporary stand-in for the full homepage: the mobile hero's exact look
// (MobileHeroGrid) at every viewport width. The wordmark fade lives on the
// header mark (see Header cycleMark) rather than a centered 3D overlay.
export default function ComingSoon() {
  return (
    <section className={styles.landing}>
      <ComingSoonBackdrop />
    </section>
  );
}
