import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { stickers } from "../data";

function getBreakpoint() {
  if (window.innerWidth >= 1024) return "desktop";
  if (window.innerWidth >= 640) return "tablet";
  return "mobile";
}

/** React hook that tracks the current Tailwind‑style breakpoint. */
function useBreakpoint() {
  const [bp, setBp] = useState(getBreakpoint());

  useEffect(() => {
    const handleResize = () => setBp(getBreakpoint());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return bp;
}

/** One draggable sticker. */
function Sticker({ src, pos }) {
  const bp = useBreakpoint(); // ← "mobile" | "tablet" | "desktop"
  const nodeRef = useRef(null);

  // pick the coordinates & size for the current breakpoint
  const { top, left, size } = pos[bp];

  // Tailwind size classes for all breakpoints
  const sizeClass = `${size} sm:${pos.tablet.size} lg:${pos.desktop.size}`;

  return (
    <Draggable bounds="parent" nodeRef={nodeRef}>
      <img
        ref={nodeRef}
        src={src}
        alt=""
        style={{
          position: "absolute",
          top: `${top}%`,
          left: `${left}%`,
          transform: "translate(-50%, -50%)", //centers in position
        }}
        className={`${sizeClass} h-auto select-none cursor-grab active:cursor-grabbing drop-shadow-lg`}
        draggable={false}
      />
    </Draggable>
  );
}

/** The hero section that renders all stickers. */
export default function HeroNew() {
  return (
    <section
      id="home"
      className="flex w-full flex-col px-6 pt-18 pb-20 lg:px-12 lg:pt-6"
    >
      <h1 className="text-[26px] lg:text-5xl tracking-wide leading-none lg:mt-16 mb-12">
        We’re an approachable, curious, and collaborative creative studio.
        Partnering with startups and businesses of all kinds, we craft inspiring
        stories and turn bold ideas into reality—together. Let’s collaborate!
      </h1>

      <div className="relative overflow-hidden min-h-[80vh] w-full bg-gibbouspurple">
        {stickers.map(({ id, src, ...breakpoints }) => (
          <Sticker key={id} src={src} pos={breakpoints} />
        ))}
      </div>
    </section>
  );
}
