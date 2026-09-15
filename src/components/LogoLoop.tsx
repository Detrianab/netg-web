import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type LogoItem = { id: string; node: ReactNode; title?: string; href?: string };

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

export function LogoLoop({
  logos,
  speed = 60,
  direction = "left",
  gap = 56,
  pauseOnHover = true,
  fadeOut = true,
  ariaLabel = "Client logos",
  className,
  style,
}: LogoLoopProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(track.scrollWidth / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [logos, gap]);

  const duration = distance > 0 ? distance / Math.max(speed, 1) : 20;
  const items = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={
        {
          ...style,
          "--logoloop-gap": `${gap}px`,
          "--logoloop-duration": `${duration}s`,
          "--logoloop-distance": `${distance}px`,
          maskImage: fadeOut
            ? "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)"
            : undefined,
          WebkitMaskImage: fadeOut
            ? "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)"
            : undefined,
        } as CSSProperties
      }
      role="region"
      aria-label={ariaLabel}
    >
      <ul
        ref={trackRef}
        className={cn(
          "flex w-max items-center will-change-transform",
          direction === "left" ? "animate-[logoloop_var(--logoloop-duration)_linear_infinite]" : "animate-[logoloop-reverse_var(--logoloop-duration)_linear_infinite]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ gap: "var(--logoloop-gap)" }}
      >
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`} className="shrink-0" aria-hidden={index >= logos.length}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer" title={item.title}>
                {item.node}
              </a>
            ) : (
              item.node
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogoLoop;
