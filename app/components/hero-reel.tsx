"use client";

import { useEffect, useRef, useState } from "react";

type HeroReelProps = {
  src: string;
  poster: string;
  label: string;
};

export function HeroReel({ src, poster, label }: HeroReelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function applyPreference() {
      if (preference.matches) video?.pause();
      else void video?.play().catch(() => { /* The poster remains available if autoplay is blocked. */ });
    }
    applyPreference();
    preference.addEventListener("change", applyPreference);
    return () => preference.removeEventListener("change", applyPreference);
  }, [src]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
        loop
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        className="reel-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "Pause the bail bond reel" : "Play the bail bond reel"}
      >
        {playing ? "Pause" : "Play"}
      </button>
    </>
  );
}
