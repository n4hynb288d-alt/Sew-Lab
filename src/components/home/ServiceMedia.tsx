"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ServiceMedia.module.css";

type ServiceMediaProps = {
  code: string;
  videoSrc: string;
  image?: { src: string; alt: string };
};

// Subtle slow-motion feel, as requested — noticeable without looking like
// something is wrong with playback.
const PLAYBACK_RATE = 0.75;

// Video is optional per service: drop a file at the given path and it
// autoplays only while the section is actually on screen (saves bandwidth
// with 5 of these on one page, and means nothing is playing behind the
// hero on first load). Missing file, load error, or reduced-motion all fall
// back to the section's static photo, or a placeholder panel if it doesn't
// have one yet.
export default function ServiceMedia({ code, videoSrc, image }: ServiceMediaProps) {
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
      { threshold: 0.35 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <div ref={containerRef} className={styles.frame}>
      {showVideo ? (
        <video
          // React's synthetic onError is unreliable for <video>/<audio> —
          // confirmed via testing here: the native error event fires
          // (video.error gets populated) but the React prop never does.
          // A real addEventListener via the ref callback (with its return
          // value as cleanup, a React 19 feature) is what actually works.
          ref={(video) => {
            videoElRef.current = video;
            if (!video) return;
            video.playbackRate = PLAYBACK_RATE;
            const onError = () => setVideoFailed(true);
            video.addEventListener("error", onError);
            // A fast local 404 can finish (and fire "error") before React
            // gets around to calling this ref callback, particularly in a
            // large first-paint commit — so the listener above alone can
            // miss it. Catch that case by checking the already-set state.
            if (video.error) {
              setVideoFailed(true);
            }
            return () => video.removeEventListener("error", onError);
          }}
          className={styles.media}
          src={videoSrc}
          poster={image?.src}
          muted
          loop
          playsInline
        />
      ) : image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 860px) 100vw, 50vw"
          className={styles.media}
        />
      ) : (
        <div className={styles.placeholder}>
          <span>{code} — Video Placeholder</span>
        </div>
      )}
      <div className={styles.mask} />
    </div>
  );
}
