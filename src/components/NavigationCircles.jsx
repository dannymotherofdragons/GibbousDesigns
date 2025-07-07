import React from "react";

const NavigationCircles = ({ section }) => {
  return (
    <div className="h-[300px] w-[1px] bg-letuce dark:bg-pinkish absolute right-12 hidden md:flex flex-col justify-between items-center transition-colors duration-500">
      <div
        className={`w-5 aspect-square border border-letuce dark:border-mousse rounded-full bg-cream transition-colors 
  duration-500 ${
    section === "home" ? "bg-letuce dark:bg-pinkish" : "bg-cream"
  }`}
      ></div>

      <div
        className={`w-5 aspect-square border border-letuce dark:border-mousse rounded-full bg-cream transition-colors 
  duration-500 ${
    section === "services" ? "bg-letuce  dark:bg-pinkish" : "bg-cream"
  }`}
      ></div>
      <div
        className={`w-5 aspect-square border border-letuce dark:border-mousse rounded-full bg-cream transition-colors 
  duration-500 ${
    section === "work" ? "bg-letuce  dark:bg-pinkish" : "bg-cream"
  }`}
      ></div>
      <div
        className={`w-5 aspect-square border border-letuce dark:border-mousse rounded-full bg-cream transition-colors 
  duration-500 ${
    section === "contact" ? "bg-letuce  dark:bg-pinkish" : "bg-cream"
  }`}
      ></div>
    </div>
  );
};

export default NavigationCircles;
