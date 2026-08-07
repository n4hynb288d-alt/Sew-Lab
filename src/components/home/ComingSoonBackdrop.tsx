"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ComingSoonBackdrop.module.css";

const SCREEN_PRINT_VIDEO = "/videos/screen-print-production.mp4";
const HERO_VIDEO = "/videos/embroidery-heads.mp4";
const EMBROIDERY_IMAGE = {
  src: "/images/production/09AAD566-94C2-4749-B427-D9401D18D504.JPG",
  alt: "Embroidery machine head stitching a logo in real time",
};
const FINISHING_IMAGE = {
  src: "/images/production/Finishing.JPG",
  alt: "Felt appliqué patch on a cap, embroidery machine and thread wall in the background",
};

// Same 4-tile grid as MobileGridBackdrop, but unconditional — the coming-soon
// page reuses the mobile hero's exact look at every viewport width, not just
// the <=640px breakpoint MobileGridBackdrop is gated to elsewhere on the
// site. Kept as its own component rather than stripping the media query off
// the shared one so the real site's desktop/mobile split is untouched.
export default function ComingSoonBackdrop() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [spFailed, setSpFailed] = useState(false);
  const [heroFailed, setHeroFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        for (const video of [spVideoRef.current, heroVideoRef.current]) {
          if (!video) continue;
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.grid}>
      <div className={styles.tile}>
        {!spFailed ? (
          <video
            ref={(video) => {
              spVideoRef.current = video;
              if (!video) return;
              const onError = () => setSpFailed(true);
              video.addEventListener("error", onError);
              if (video.error) setSpFailed(true);
              return () => video.removeEventListener("error", onError);
            }}
            className={styles.media}
            src={SCREEN_PRINT_VIDEO}
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <div className={styles.placeholder}>
            <span>SP — Video Placeholder</span>
          </div>
        )}
      </div>

      <div className={styles.tile}>
        <Image
          src={FINISHING_IMAGE.src}
          alt={FINISHING_IMAGE.alt}
          fill
          className={`${styles.media} ${styles.finishingPosition}`}
          sizes="50vw"
        />
      </div>

      <div className={styles.tile}>
        <Image
          src={EMBROIDERY_IMAGE.src}
          alt={EMBROIDERY_IMAGE.alt}
          fill
          className={`${styles.media} ${styles.mirrored}`}
          sizes="50vw"
        />
      </div>

      <div className={styles.tile}>
        {!heroFailed ? (
          <video
            ref={(video) => {
              heroVideoRef.current = video;
              if (!video) return;
              const onError = () => setHeroFailed(true);
              video.addEventListener("error", onError);
              if (video.error) setHeroFailed(true);
              return () => video.removeEventListener("error", onError);
            }}
            className={styles.media}
            src={HERO_VIDEO}
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <div className={styles.placeholder}>
            <span>HERO — Video Placeholder</span>
          </div>
        )}
      </div>

      <div className={styles.mask} />
    </div>
  );
}
