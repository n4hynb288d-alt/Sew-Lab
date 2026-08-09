"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HeroGrid.module.css";

const SCREEN_PRINT_VIDEO = "/videos/hero-grid-screen-print.mp4";
const HERO_VIDEO = "/videos/hero-production.mp4";
const HERO_LOOP_SECONDS = 15;
const FINISHING_IMAGE = {
  src: "/images/production/Finishing.JPG",
  alt: "Felt appliqué patch on a cap, embroidery machine and thread wall in the background",
};
const SCREEN_PRINTING_IMAGE = {
  src: "/images/production/IMG_9716.jpeg",
  alt: "Screen printing screens loaded with orange and red ink",
};

// Desktop counterpart to the mobile landing's 4-tile grid (MobileGridBackdrop)
// — same 2x2 layout and play/pause-on-visibility behavior, different footage
// suited to the wider desktop frame. Sits behind the hero content in place of
// the old single-video HeroBackground.
export default function HeroGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [spFailed, setSpFailed] = useState(false);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);

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
        <div className={styles.tileMask} />
      </div>

      <div className={styles.tile}>
        <Image
          src={FINISHING_IMAGE.src}
          alt={FINISHING_IMAGE.alt}
          fill
          className={`${styles.media} ${styles.finishingPosition}`}
          sizes="50vw"
        />
        <div className={styles.tileMask} />
      </div>

      <div className={styles.tile}>
        <Image
          src={SCREEN_PRINTING_IMAGE.src}
          alt={SCREEN_PRINTING_IMAGE.alt}
          fill
          className={styles.media}
          sizes="50vw"
        />
        <div className={styles.tileMask} />
      </div>

      <div className={styles.tile}>
        {!heroVideoFailed ? (
          <video
            // Same "loop just the first HERO_LOOP_SECONDS" trick as the old
            // HeroBackground — the full clip runs much longer than a loop
            // tile needs, so this restarts it early rather than playing out
            // the whole thing before cycling.
            ref={(video) => {
              heroVideoRef.current = video;
              if (!video) return;
              const restart = () => {
                video.currentTime = 0;
                if (video.paused) {
                  void video.play().catch(() => {});
                }
              };
              const onTimeUpdate = () => {
                if (video.currentTime >= HERO_LOOP_SECONDS) restart();
              };
              const onEnded = restart;
              const onError = () => setHeroVideoFailed(true);
              video.addEventListener("timeupdate", onTimeUpdate);
              video.addEventListener("ended", onEnded);
              video.addEventListener("error", onError);
              if (video.error) setHeroVideoFailed(true);
              return () => {
                video.removeEventListener("timeupdate", onTimeUpdate);
                video.removeEventListener("ended", onEnded);
                video.removeEventListener("error", onError);
              };
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
            <span>Hero — Video Placeholder</span>
          </div>
        )}
        <div className={styles.tileMask} />
      </div>
    </div>
  );
}
