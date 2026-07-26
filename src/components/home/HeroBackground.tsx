"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroBackground.module.css";

const VIDEO_SRC = "/videos/hero-production.mp4";
const LOOP_SECONDS = 15;
const FALLBACK_IMAGE = {
  src: "/images/production/IMG_9716.jpeg",
  alt: "Screen printing screens loaded with orange and red ink",
};

// Video is optional: drop a file at public/videos/hero-production.mp4 and it
// autoplays. Until then (or if it fails to load, or the visitor prefers
// reduced motion), this falls back to the same static production photo the
// hero always used.
export default function HeroBackground() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const showVideo = !videoFailed && !reducedMotion;

  return (
    <div className={styles.background}>
      {showVideo ? (
        <video
          // A ref callback (with its return value as cleanup, a React 19
          // feature) attaches the loop listener the instant this exact node
          // mounts and detaches it on unmount — no separate effect/ref
          // timing to get out of sync. Loops just the first LOOP_SECONDS of
          // the clip rather than the whole (much longer) file, and nudges
          // playback forward after the seek in case a browser pauses on it.
          // React's synthetic onError is unreliable for <video> — the
          // native error event fires (video.error gets populated) but the
          // React prop never does. A real addEventListener via this ref
          // callback is what actually works.
          ref={(video) => {
            if (!video) return;
            const restart = () => {
              video.currentTime = 0;
              if (video.paused) {
                void video.play().catch(() => {});
              }
            };
            const onTimeUpdate = () => {
              if (video.currentTime >= LOOP_SECONDS) restart();
            };
            // Safety net: if anything ever lets playback slip past
            // LOOP_SECONDS (a stale cached build, a browser quirk timeupdate
            // doesn't catch in time), this guarantees it still loops instead
            // of playing out the full ~42s clip and sitting on the last
            // frame — "ended" is only reachable at all if that happened.
            const onEnded = restart;
            const onError = () => setVideoFailed(true);
            video.addEventListener("timeupdate", onTimeUpdate);
            video.addEventListener("ended", onEnded);
            video.addEventListener("error", onError);
            // A fast local 404 can fire "error" before React calls this ref
            // callback — catch that already-failed state too.
            if (video.error) {
              setVideoFailed(true);
            }
            return () => {
              video.removeEventListener("timeupdate", onTimeUpdate);
              video.removeEventListener("ended", onEnded);
              video.removeEventListener("error", onError);
            };
          }}
          className={styles.media}
          src={VIDEO_SRC}
          poster={FALLBACK_IMAGE.src}
          autoPlay
          muted
          playsInline
        />
      ) : (
        <Image
          src={FALLBACK_IMAGE.src}
          alt={FALLBACK_IMAGE.alt}
          fill
          priority
          className={styles.media}
          sizes="100vw"
        />
      )}
    </div>
  );
}
