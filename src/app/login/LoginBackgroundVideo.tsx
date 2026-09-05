"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const POSTER_SRC = "/admin_customer_login_video-poster.jpg";

function unlockMutedInlinePlay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.controls = false;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.removeAttribute("controls");
}

function isActuallyPlaying(video: HTMLVideoElement) {
  return !video.paused && !video.ended && video.currentTime > 0;
}

export default function LoginBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReducedMotion(query.matches);
    syncReducedMotion();
    query.addEventListener("change", syncReducedMotion);
    return () => query.removeEventListener("change", syncReducedMotion);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    let gestureRetryAttached = false;
    let gestureCleanup: (() => void) | undefined;

    const revealIfPlaying = () => {
      if (isActuallyPlaying(video)) {
        setIsPlaying(true);
      }
    };

    const tryPlay = () => {
      unlockMutedInlinePlay(video);
      const playPromise = video.play();
      if (!playPromise) {
        revealIfPlaying();
        return;
      }
      playPromise.then(revealIfPlaying).catch(() => {
        // Autoplay blocked (Low Power Mode, etc.). Keep the poster visible
        // forever — never reveal a play button. A later user gesture may
        // start playback under the poster.
        if (gestureRetryAttached) return;
        gestureRetryAttached = true;
        const retry = () => {
          unlockMutedInlinePlay(video);
          void video.play().then(revealIfPlaying).catch(() => {});
        };
        window.addEventListener("pointerdown", retry, { once: true });
        window.addEventListener("touchstart", retry, { once: true });
        window.addEventListener("keydown", retry, { once: true });
        gestureCleanup = () => {
          window.removeEventListener("pointerdown", retry);
          window.removeEventListener("touchstart", retry);
          window.removeEventListener("keydown", retry);
        };
      });
    };

    unlockMutedInlinePlay(video);
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("playing", revealIfPlaying);
    video.addEventListener("timeupdate", revealIfPlaying);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("playing", revealIfPlaying);
      video.removeEventListener("timeupdate", revealIfPlaying);
      gestureCleanup?.();
    };
  }, [reducedMotion]);

  return (
    <div className={styles.backdrop} aria-hidden>
      <Image
        src={POSTER_SRC}
        alt=""
        fill
        preload
        className={styles.poster}
        sizes="100vw"
      />
      {reducedMotion ? null : (
        <video
          ref={videoRef}
          className={`${styles.video} ${isPlaying ? styles.videoVisible : styles.videoHidden}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          aria-hidden
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src="/admin_customer_login_video.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
