"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Whether the playing iframe should be mounted.
  const [active, setActive] = useState(false);
  // Muted + loop for scroll-triggered autoplay; sound on for the click fallback.
  const [muted, setMuted] = useState(true);

  // Auto-play when the video scrolls into view (muted + looping, per spec).
  useEffect(() => {
    const el = containerRef.current;
    if (!el || active) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            setMuted(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const embedUrl = useMemo(() => {
    const base = `https://www.youtube.com/embed/${videoId}`;
    if (muted) {
      // Muted, looping background autoplay (loop requires playlist=<videoId>).
      return `${base}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`;
    }
    // User-initiated playback (click fallback) — sound on.
    return `${base}?autoplay=1&playsinline=1&rel=0`;
  }, [videoId, muted]);

  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        {active ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setActive(true);
              setMuted(false);
            }}
            className="absolute inset-0 w-full h-full group"
            aria-label={`Play ${title}`}
          >
            <img
              src={poster}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[hsl(var(--nav-theme))] text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 md:w-9 md:h-9 ml-1" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
