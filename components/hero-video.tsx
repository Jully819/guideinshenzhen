"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/video/welcome-to-shenzhen.mp4";
const POSTER = "/video/welcome-to-shenzhen-poster.jpg";

/* The file's own dimensions. Used as the aspect box so the column reserves its
   height before anything loads, which is what stops the hero shifting. */
const W = 1256;
const H = 720;

/**
 * The hero's welcome film. Replaces the drawn skyline that used to sit here.
 *
 * ⚠️ IT IS A CLIENT COMPONENT FOR ONE REASON, AND IT IS NOT DECORATION. The
 * file is 14MB. `hidden lg:block` would still have let a phone download every
 * byte of it, because display:none does not reliably stop a video fetching,
 * and this site's whole image budget is 200KB per file. So the <video> is
 * MOUNTED behind a media query rather than hidden by one. Below 1024px nothing
 * is requested at all. If you ever make this a server component again, check
 * the network panel on a phone profile before you believe it is free.
 *
 * MUTED IS NOT A STYLE CHOICE. Browsers refuse to autoplay anything with sound,
 * so an unmuted autoplay video simply does not start. The file does carry an
 * audio track, which is never heard and is dead weight in the download. Strip
 * it if the file is ever re-encoded.
 *
 * THE PAUSE BUTTON IS REQUIRED, not polish. WCAG 2.2.2 says content that plays
 * automatically for more than five seconds needs a mechanism to pause it. This
 * is fifteen seconds and it loops. The same reasoning already governs the
 * marquee, which stops dead under prefers-reduced-motion.
 *
 * REDUCED MOTION gets the poster frame and a paused video, not an autoplay one.
 * Somebody who has asked the system for less movement should not be handed a
 * looping film they then have to go and stop.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  /* null while undecided. Rendering the video before the media query has been
     read would defeat the point of gating it. */
  const [show, setShow] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setShow(wide.matches);
      setReduced(still.matches);
    };

    sync();
    wide.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  function toggle() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }

  return (
    <div
      className="hidden lg:col-span-5 lg:block"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      {show && (
        <div className="relative size-full overflow-hidden rounded-2xl bg-paper-dim">
          <video
            ref={videoRef}
            src={SRC}
            poster={POSTER}
            width={W}
            height={H}
            muted
            loop
            playsInline
            autoPlay={!reduced}
            preload="metadata"
            aria-label="A short welcome film of Shenzhen"
            className="size-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause the video" : "Play the video"}
            /* Sits on footage of unknown brightness, so it carries its own
               dark ground rather than trusting the frame underneath it. */
            className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-ink/70 text-paper backdrop-blur-sm transition-colors hover:bg-ink focus-visible:ring-2 focus-visible:ring-paper focus-visible:outline-none"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      )}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="3" height="9" rx="0.5" />
      <rect x="7" y="1.5" width="3" height="9" rx="0.5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M3 1.8v8.4a.5.5 0 0 0 .76.43l6.5-4.2a.5.5 0 0 0 0-.86l-6.5-4.2A.5.5 0 0 0 3 1.8Z" />
    </svg>
  );
}
