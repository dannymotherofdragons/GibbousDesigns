import { useMemo } from "react";

export default function LoopText({
  text = "EXPLORE PROJECTS",
  repeat = 20,
  speed = 200,
  direction = "left", // "left" | "right"
  className = "text-4xl lg:text-8xl font-extrabold uppercase text-gray-900",
}) {
  // Build one long segment (no measuring — just repeat)
  const segment = useMemo(
    () => (text.trim() + "\u00A0 | \u00A0").repeat(repeat),
    [text, repeat]
  );

  return (
    <div className="w-full mt-24">
      <div className="group relative w-full h-22 lg:h-32 bg-gibbouspurple overflow-hidden flex items-center border-t-4 border-b-4 border-gray-900">
        <style>{` 
        @keyframes marquee-left  { 0% {transform:translateX(0)}   100% {transform:translateX(-50%)} }
        @keyframes marquee-right { 0% {transform:translateX(-50%)} 100% {transform:translateX(0)} }
      `}</style>

        <div
          className="flex whitespace-nowrap will-change-transform
                   group-hover:[animation-play-state:paused]"
          style={{
            animation: `${
              direction === "left" ? "marquee-left" : "marquee-right"
            } ${speed}s linear infinite`,
          }}
        >
          {/* Two identical segments side-by-side for seamless looping */}
          <span className={className}>{segment}</span>
          <span className={className} aria-hidden="true">
            {segment}
          </span>
        </div>
      </div>
    </div>
  );
}
