"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

function unlockMutedInlinePlay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

export default function LoginBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let gestureRetryAttached = false;
    let gestureCleanup: (() => void) | undefined;

    const tryPlay = () => {
      unlockMutedInlinePlay(video);
      const playPromise = video.play();
      if (!playPromise) return;
      playPromise.catch(() => {
        if (gestureRetryAttached) return;
        gestureRetryAttached = true;
        const retry = () => {
          unlockMutedInlinePlay(video);
          void video.play().catch(() => {});
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

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      gestureCleanup?.();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
    >
      <source src="/admin_customer_login_video.mp4" type="video/mp4" />
      <source src="/admin_customer_login_video.mov" type="video/quicktime" />
    </video>
  );
}
