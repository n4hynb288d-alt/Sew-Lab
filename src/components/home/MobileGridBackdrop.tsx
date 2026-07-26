"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./MobileGridBackdrop.module.css";

const SCREEN_PRINT_VIDEO = "/videos/print-shop-loop.mp4";
const HERO_VIDEO = "/videos/hero-production.mp4";
const EMBROIDERY_IMAGE = {
  src: "/images/production/09AAD566-94C2-4749-B427-D9401D18D504.JPG",
  alt: "Embroidery machine head stitching a logo in real time",
};
const FINISHING_IMAGE = {
  src: "/images/production/Finishing.JPG",
  alt: "Felt appliqué patch on a cap, embroidery machine and thread wall in the background",
};

// The same 4-tile grid used on the mobile landing (MobileHeroGrid), reused
// here as the persistent background behind every swiped-to service section
// on mobile — the backdrop never changes as you swipe, only the text panel
// on top of it does. Each XBackground component hides itself on mobile (see
// their own mobile media query), and this renders in its place as a sibling.
export default function MobileGridBackdrop() {
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
