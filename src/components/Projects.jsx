import React from "react";
import { projects } from "../data";
import NavigationCircles from "./NavigationCircles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom"; // or your routing solution
import { Link } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate(); // using React Router for navigation
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const openProject = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div
      id="work"
      className="min-h-screen flex flex-col justify-center items-center px-4 lg:mt-30 mt-auto"
      ref={ref}
    >
      <h2 className="font-bagnard text-4xl font-light md:mb-32 mb-24">Work</h2>
      <section className="scroll-margin-top">
        <div className="w-full xl:w-[900px] lg:w-[850px] md:w-[600px] grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-32 xl:mb-0 md:mb-20 mb-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative group overflow-hidden shadow-lg md:max-w-[400px] max-w-[320px] w-full mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: index * 0.6,
                ease: "easeOut",
              }}
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition filter-glow duration-300 group-hover:blur-xs group-hover:scale-105"
                />

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10"
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
                  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>

                {/* Button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <Link
                    to={`/projects/${project.id}`}
                    className="bg-letuce dark:bg-mousse text-cream px-4 py-2 aspect-square grid place-items-center rounded-full text-sm font-medium shadow-md hover:bg-letuce/80 dark:hover:bg-chocolate transition cursor-pointer"
                  >
                    ↗
                  </Link>
                </div>
              </div>

              {/* Title and Scope info */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-chocolate/50 bg-opacity-70 backdrop-blur-xs text-cream px-4 py-2 max-w-[90%] w-[90%] md:w-[90%]">
                <h3 className="text-lg font-bagnard font-medium">
                  {project.name}
                </h3>
                <p className="text-sm">{project.scope}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* <NavigationCircles section="work" /> */}
    </div>
  );
};

export default Projects;
