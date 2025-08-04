import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data";
import { motion, useScroll, useTransform } from "framer-motion";

/* -------------------------------------------
   Breakpoint helper (sm <640, md ≥640, lg ≥1024)
------------------------------------------- */
// function useBreakpoint() {
//   const get = () =>
//     window.innerWidth >= 1024 ? "lg" : window.innerWidth >= 640 ? "md" : "sm";
//   const [bp, setBp] = useState(get());
//   useEffect(() => {
//     const onR = () => setBp(get());
//     window.addEventListener("resize", onR);
//     return () => window.removeEventListener("resize", onR);
//   }, []);
//   return bp; // "sm" | "md" | "lg"
// }

function buildTransforms(progress, idx, total) {
  const slice = 1 / total;
  const start = idx * slice;
  const inEnd = start + slice * 0.35;
  const outBeg = start + slice * 0.65;
  const end = start + slice;

  const rotateX = useTransform(
    progress,
    [start, inEnd, outBeg, end],
    idx === 0 ? [0, 0, 0, -90] : [90, 0, 0, -90]
  );

  const cardOpacity = useTransform(
    progress,
    [start, inEnd, outBeg, end],
    idx === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  const headlineY = useTransform(
    progress,
    [start, inEnd, outBeg, end],
    ["100%", "0%", "0%", "-100%"]
  );

  const pointerEvents = useTransform(cardOpacity, (v) =>
    v >= 0.5 ? "auto" : "none"
  );

  const infoFacing = useTransform(rotateX, (v) => -v);
  const infoOpacity = cardOpacity;

  return {
    rotateX,
    cardOpacity,
    headlineY,
    pointerEvents,
    infoFacing,
    infoOpacity,
  };
}

export default function ProjectsScroller() {
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={stageRef} style={{ height: `${projects.length * 100}vh` }}>
      <div
        id="work"
        className="
          sticky top-0 h-screen w-full overflow-hidden
          [perspective:800px] sm:[perspective:900px] lg:[perspective:1000px]
        "
      >
        {projects.map((p, i) => {
          const {
            rotateX,
            cardOpacity,
            headlineY,
            pointerEvents,
            infoFacing,
            infoOpacity,
          } = buildTransforms(scrollYProgress, i, projects.length);

          return (
            <article
              key={p.id}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: projects.length - i }}
            >
              {/* Headline (slides only) */}
              <motion.h2
                style={{ y: headlineY }}
                className="
                  absolute inset-0 flex items-center justify-center pointer-events-none
                  whitespace-nowrap
                  text-[28vw] sm:text-[18vw] md:text-[12vw] lg:text-[8vw]
                  font-extrabold uppercase
                "
              >
                {p.name}&nbsp;{p.name}&nbsp;{p.name}&nbsp;
              </motion.h2>

              {/* Single flipping CARD (image + info) */}
              <motion.div
                style={{ rotateX, opacity: cardOpacity, pointerEvents }}
                className="
                  relative
                  overflow-hidden [transform-style:preserve-3d] bg-white
                  shadow-[0_30px_60px_-10px_rgba(0,0,0,0.25)]
                  w-[90vw] sm:w-[70vw] lg:w-[35vw]
                  h-[32vh] sm:h-[40vh] lg:h-[60vh]
                  max-w-[92vw] sm:max-w-3xl
                "
              >
                {/* front face (image) — full-bleed with 1px overdraw to kill thin seams */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="
                    absolute -inset-px block
                    w-[calc(100%+2px)] h-[calc(100%+2px)]
                    object-cover
                    [backface-visibility:hidden]
                    [transform:translateZ(0.001px)]
                  "
                />

                {/* back face (optional) */}
                <div
                  className="
                    absolute inset-0 flex items-center justify-center
                    text-3xl font-bold text-white bg-black/70
                    [transform:rotateX(180deg)] [backface-visibility:hidden]
                  "
                >
                  {p.name}
                </div>

                {/* INFO BAR (counter-rotated to stay crisp) */}
                <motion.div
                  style={{ rotateX: infoFacing, opacity: infoOpacity }}
                  className="absolute inset-x-0 bottom-0 [transform-style:preserve-3d] [will-change:transform]"
                >
                  <div
                    className="
                      [transform:translateZ(1px)]
                      bg-white/90 backdrop-blur-sm
                      shadow-[0_-8px_24px_-8px_rgb(0_0_0/.25)]
                      flex items-end justify-between gap-3 sm:gap-4
                      px-4 py-3 sm:px-5 sm:py-3
                    "
                  >
                    <div>
                      <h3 className="font-semibold leading-tight text-lg sm:text-xl lg:text-2xl uppercase">
                        {p.name}
                      </h3>
                      <p className="uppercase tracking-widest text-neutral-500 text-[10px] sm:text-xs">
                        {p.scope}
                      </p>
                    </div>
                    <Link
                      to={`/projects/${p.id}`}
                      className="
                        shrink-0 rounded-md font-semibold
                        px-4 py-2 text-sm sm:text-base
                        bg-black text-white hover:bg-gibbouspurple transition-colors
                      "
                    >
                      VIEW PROJECT
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
