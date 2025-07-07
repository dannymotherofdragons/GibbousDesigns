import React from "react";
import NavigationCircles from "./NavigationCircles";

const Contact = () => {
  return (
    <div
      id="contact"
      className="h-screen flex flex-col justify-center items-center"
    >
      <h2 className="font-bagnard text-4xl font-light md:mb-32 mb-24">
        Let's Connect!
      </h2>
      <form className="flex flex-col lg:space-y-12 space-y-8">
        <input
          type="email"
          placeholder="Email"
          className="md:[500px] w-[330px] h-13 pl-3 text-lg outline-0 border border-letuce dark:border-mousse placeholder-letuce dark:placeholder-pinkish/50 transition-colors duration-500"
        ></input>
        <textarea
          placeholder="Message"
          className="md:[500px] w-[330px] h-13 pl-3 text-lg outline-0 border border-letuce dark:border-mousse placeholder-letuce dark:placeholder-pinkish/50 min-h-[100px] max-h[1200px] resize-y p-3 transition-colors duration-500"
        ></textarea>
        <input
          type="submit"
          value="Stay Connected"
          className="font-bagnard md:[500px] w-[330px] h-13 pl-3 text-lg outline-0 bg-letuce dark:bg-mousse text-cream uppercase font-thin cursor-pointer tracking-wide shadow-md shadow-mousse/20 transition-colors duration-500"
        ></input>
      </form>
      <NavigationCircles section="contact" />
    </div>
  );
};

export default Contact;
