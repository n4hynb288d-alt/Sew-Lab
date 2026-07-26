"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./EmbroideryBackground.module.css";

const VIDEO_SRC = "/videos/services/embroidery.mp4";
const FALLBACK_IMAGE = {
  src: "/images/production/EMB_ROOM.jpeg",
  alt: "Wide view of the embroidery floor with rows of multi-head machines, thread wall, and staff prepping garments",
};

// Same fluid-fill approach as the hero/screen-printing sections: absolutely
// positioned, full-bleed, object-fit: cover — the video always fills the
// section and rescales with it (window resize, mobile vs. desktop) with no
// distortion and no JS required for the scaling itself. No embroidery video
// exists yet, so this currently always falls back to the production photo.
export default function EmbroideryBackground() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const showVideo = !videoFailed && !reducedMotion;

  useEffect(() => {
    if (!showVideo) return;
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoElRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <div ref={containerRef} className={styles.background}>
      {showVideo ? (
        <video
          ref={(video) => {
            videoElRef.current = video;
            if (!video) return;
            const onError = () => setVideoFailed(true);
            video.addEventListener("error", onError);
            // A fast local 404 can fire "error" before React calls this ref
            // callback — catch that already-failed state too.
            if (video.error) {
              setVideoFailed(true);
            }
            return () => video.removeEventListener("error", onError);
          }}
          className={styles.media}
          src={VIDEO_SRC}
          poster={FALLBACK_IMAGE.src}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src={FALLBACK_IMAGE.src}
          alt={FALLBACK_IMAGE.alt}
          fill
          className={styles.media}
          sizes="100vw"
        />
      )}
      <div className={styles.mask} />
    </div>
  );
}
