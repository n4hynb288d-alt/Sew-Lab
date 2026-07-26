import Image from "next/image";
import styles from "./FinishingBackground.module.css";

const IMAGE = {
  src: "/images/production/Finishing.JPG",
  alt: "Felt appliqué patch on a cap, embroidery machine and thread wall in the background",
};

// No video for Finishing yet — this is a static photo, so no error/fallback
// or play-on-visibility logic is needed, just the same full-bleed
// object-fit: cover + mask treatment as the video sections.
export default function FinishingBackground() {
  return (
    <div className={styles.background}>
      <Image src={IMAGE.src} alt={IMAGE.alt} fill className={styles.media} sizes="100vw" priority={false} />
      <div className={styles.mask} />
    </div>
  );
}
