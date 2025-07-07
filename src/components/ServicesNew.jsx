import React from "react";
import NavigationCircles from "./NavigationCircles";
import { projects, scopeDescriptions } from "../data/index";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function groupProjectsByScope(projects) {
  const grouped = {};
  projects.forEach((proj) => {
    if (!grouped[proj.scope]) {
      grouped[proj.scope] = [];
    }
    grouped[proj.scope].push(proj);
  });
  return grouped;
}

export default function ServicesNew() {
  const groupedProjects = groupProjectsByScope(projects);
  const serviceTitles = Object.keys(groupedProjects);

  // Create refs for each service block
  const views = serviceTitles.map(() =>
    useInView({
      triggerOnce: true,
      threshold: 0.1,
    })
  );

  return (
    <div
      id="services"
      className="min-h-screen flex flex-col justify-center items-center px-4 lg:mt-30 mt-auto"
    >
      <h2 className="font-bagnard text-4xl font-light md:mb-32 mb-24">
        Services
      </h2>
      {serviceTitles.map((scopeTitle, index) => {
        const [ref, inView] = views[index];
        return (
          <motion.div
            ref={ref}
            key={scopeTitle}
            className="w-full xl:w-[900px] lg:w-[850px] md:w-[600px] grid lg:grid-cols-2 lg:gap-12 gap-32 xl:mb-0 md:mb-20 mb-0 border-b border-neutral-300 pb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              delay: index * 0.3,
              ease: "easeOut",
            }}
          >
            <div>
              <h2 className="font-bagnard text-3xl dark:text-pinkish text-letuce mb-2 mt-4">
                {scopeTitle}
              </h2>
              <p className="text-[16px] dark:text-mousse text-midnight mb-4">
                {scopeDescriptions[scopeTitle] || "No description available."}
              </p>
              {/* <p className="text-xs text-midnight dark:text-chocolate">
                {groupedProjects[scopeTitle].length} project(s)
              </p> */}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-end">
              {/* Show only the first 4 project thumbnails */}
              {groupedProjects[scopeTitle].slice(0, 4).map((proj) => (
                <Link
                  to={`/projects/${proj.id}`}
                  key={proj.id}
                  className="relative w-16 h-16 block"
                >
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full rounded-md object-cover hover:scale-105 transition-transform"
                  />
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter id={`noiseFilter-${proj.id}`}>
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.65"
                          numOctaves="2"
                          stitchTiles="stitch"
                          result="noise"
                        />
                        <feColorMatrix
                          in="noise"
                          type="matrix"
                          values="1 0 0 0 0.35
                  0.5 0.25 0 0 0.25
                  0.2 0.1 0.1 0 0.15
                  0 0 0 1 0"
                        />
                      </filter>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="white"
                      filter={`url(#noiseFilter-${proj.id})`}
                    />
                  </svg>
                </Link>
              ))}

              {/* Show a "+" square if there are more than 4 projects */}
              {groupedProjects[scopeTitle].length > 4 && (
                <a
                  href="#work"
                  className="w-16 h-16 relative z-10 rounded-md bg-letuce/50 dark:bg-chocolate flex items-center justify-center text-xl font-bold text-midnight dark:text-cream hover:scale-105 transition-transform"
                >
                  <span className="text-lg font-bold">+</span>
                  <span className="text-lg font-medium">
                    {groupedProjects[scopeTitle].length - 4}
                  </span>
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <filter id="noiseFilter">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="2"
                        stitchTiles="stitch"
                        result="noise"
                      />
                      <feColorMatrix
                        in="noise"
                        type="matrix"
                        values="1 0 0 0 0.35
              0.5 0.25 0 0 0.25
              0.2 0.1 0.1 0 0.15
              0 0 0 1 0"
                      />
                    </filter>
                    <rect
                      width="100%"
                      height="100%"
                      filter="url(#noiseFilter)"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              )}
            </div>
            <div></div>
            <div className="w-full">
              <p className="-mt-20 w-full text-midnight dark:text-chocolate text-end">
                This is a description or extra text for the project.
              </p>
            </div>
          </motion.div>
        );
      })}
      <NavigationCircles section="services" />
    </div>
  );
}
