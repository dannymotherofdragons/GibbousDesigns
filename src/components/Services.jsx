import React, { useState, useEffect } from "react";
import { skillCards } from "../data/index.js";
import NavigationCircles from "./NavigationCircles";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isLargeScreen, setIsLargeScreen] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getPositionClass = (card) => {
    const position = isLargeScreen
      ? card.hoverPosition.large
      : card.hoverPosition.small;
    return position === "bottom" ? "bottom-0" : "top-0";
  };

  const getHoverPositionClass = (card) => {
    const position = isLargeScreen
      ? card.hoverPosition.large
      : card.hoverPosition.small;
    return position === "bottom" ? "bottom-full" : "top-full";
  };

  return (
    <div
      id="services"
      className="min-h-screen flex flex-col justify-center items-center px-4 xl:py-0 py-10"
      ref={ref}
    >
      <h2 className="text-4xl font-light mb-32 xl:mt-20">Skill-set</h2>
      <div className="w-full xl:w-[900px] lg:w-[850px] md:w-[600px] grid lg:grid-cols-3 grid-cols-1 lg:gap-12 gap-32 xl:mb-0 mb-16">
        {skillCards.map((card, index) => (
          <motion.div
            key={index}
            className="lg:max-w-[280px] md:max-w-[400px] max-w-[320px] w-full mx-auto ring-2 ring-mousse/10 shadow-md shadow-mousse/20 relative isolate"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              delay: index * 0.6,
              ease: "easeOut",
            }}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className="p-3 bg-cream dark:bg-dirt transition-colors duration-500">
              <i
                className={`${card.icon} md:text-4xl text-3xl text-midnight dark:text-cream transition-colors duration-500`}
              ></i>
              <h3 className="md:text-2xl text-xl font-bold my-4 text-letuce dark:text-mousse transition-colors duration-500">
                {card.title}
              </h3>
              <p className="text-slate-900 dark:text-cream md:h-28 h-24 md:text-base text-sm font-light overflow-y-auto custom-scrollbar pr-2 transition-colors duration-500">
                {card.description}
              </p>
            </div>
            <div
              className={`w-full absolute left-0 ${getPositionClass(
                card
              )} flex flex-col gap-y-5 py-4 transition-all duration-300 -z-10 ${
                hoveredCardIndex === index && `${getHoverPositionClass(card)}`
              }`}
            >
              {isLargeScreen && card.hoverPosition.large === "top" && (
                <div className="flex justify-between">
                  {[...Array(card.projectCount)].map((_, index) => (
                    <a
                      href="#"
                      key={index}
                      className="text-lg bg-letuce dark:bg-chocolate w-10 aspect-square grid place-items-center text-cream rounded-full transition-colors"
                    >
                      {index + 1}
                    </a>
                  ))}
                </div>
              )}
              <h2 className="text-2xl text-center text-midnight dark:text-cream font-light tracking-wide">
                Projects
              </h2>
              {(!isLargeScreen ||
                (isLargeScreen && card.hoverPosition.large === "bottom")) && (
                <div className="flex justify-between">
                  {[...Array(card.projectCount)].map((_, index) => (
                    <a
                      href="#"
                      key={index}
                      className="text-lg bg-letuce dark:bg-chocolate w-10 aspect-square grid place-items-center text-cream rounded-full transition-colors"
                    >
                      {index + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <NavigationCircles section="services" className="scroll-margin-top" />
    </div>
  );
};

export default Services;
