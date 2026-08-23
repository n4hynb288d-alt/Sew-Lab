"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function LoginBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const armInlinePlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "true");
      video.disablePictureInPicture = true;
      if ("disableRemotePlayback" in video) {
        video.disableRemotePlayback = true;
      }
    };

    const tryPlay = () => {
      armInlinePlayback();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.pause();
        return;
      }
      if (!video.paused && !video.ended) return;
      void video.play().catch(() => {
        // Autoplay blocked — retry on the next gesture or visibility change.
      });
    };

    armInlinePlayback();
    tryPlay();

    const onReady = () => tryPlay();
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onReady);
    window.addEventListener("touchstart", onReady, { passive: true });
    window.addEventListener("pointerdown", onReady, { passive: true });

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onReady);
      window.removeEventListener("touchstart", onReady);
      window.removeEventListener("pointerdown", onReady);
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
      // iOS Safari still keys off the legacy attribute for inline autoplay.
      {...{ "webkit-playsinline": "true" }}
    >
      <source src="/admin_customer_login_video.mp4" type="video/mp4" />
      <source src="/admin_customer_login_video.mov" type="video/quicktime" />
    </video>
  );
}
