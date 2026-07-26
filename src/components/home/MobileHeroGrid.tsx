import MobileGridBackdrop from "./MobileGridBackdrop";
import Logo3D from "./Logo3D";
import styles from "./MobileHeroGrid.module.css";

// Mobile-only landing (see Hero.module.css — the desktop hero hides itself
// at this same breakpoint). The 4-tile grid (MobileGridBackdrop) is the same
// backdrop that stays behind every section as you swipe through Screen
// Printing, Embroidery, DTF, and Finishing — only this first view adds the
// spinning 3D wordmark and swipe hint on top of it.
export default function MobileHeroGrid() {
  return (
    <section className={styles.landing}>
      <MobileGridBackdrop />
      <div className={styles.logoOverlay}>
        <div className={styles.logoScale}>
          <Logo3D />
        </div>
      </div>
      <p className={styles.swipeHint}>Swipe up</p>
    </section>
  );
}
