import React, { useRef } from "react";
import Draggable from "react-draggable";
import { stickers } from "../data"; // [{ id, src }, …]

/* ------------------------------------------------------------------ */
/*  1.  PRE‑SET CO‑ORDS  – edit or extend as you wish                 */
/* ------------------------------------------------------------------ */
const startPositions = [
  { top: 40, left: 40 },
  { top: 120, left: 240 },
  { top: 220, left: 120 },
  { top: 60, left: 340 },
  { top: 200, left: 20 },
];

/* ------------------------------------------------------------------ */
/*  2.  SINGLE STICKER COMPONENT  – uses nodeRef so React‑18 is happy */
/* ------------------------------------------------------------------ */
function Sticker({ src, pos }) {
  const nodeRef = useRef(null);

  return (
    <Draggable bounds="parent" nodeRef={nodeRef}>
      <img
        ref={nodeRef}
        src={src}
        alt=""
        style={{ position: "absolute", ...pos }} /* place sticker   */
        className="w-50 h-auto select-none cursor-grab active:cursor-grabbing drop-shadow-lg"
        draggable={false}
      />
    </Draggable>
  );
}

/* ------------------------------------------------------------------ */
/*  3.  HERO SECTION WITH BOARD                                       */
/* ------------------------------------------------------------------ */
export default function HeroNew() {
  return (
    <div
      id="home"
      className="w-full flex flex-col px-6 lg:px-12 mt-20 lg:mt-10 mb-20"
    >
      <h1 className="text-[26px] lg:text-5xl tracking-wide leading-none lg:mt-16 mb-16">
        We’re an approachable, curious, and collaborative creative studio.
        Partnering with startups and businesses of all kinds, we craft inspiring
        stories and turn bold ideas into reality—together. Let’s collaborate!
      </h1>

      {/* sticker board */}
      <div className="relative overflow-hidden min-h-[80vh] w-full bg-gibbouspurple">
        {stickers.map(({ id, src }, i) => (
          <Sticker
            key={id}
            src={src}
            pos={startPositions[i % startPositions.length]} /* cycle coords */
          />
        ))}

        {stickers.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-gray-50 font-semibold pointer-events-none">
            Add some stickers to start!
          </p>
        )}
      </div>
    </div>
  );
}
