import React, { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const sections = ["home", "services", "work", "contact"];

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const location = useLocation();

  // keep a single observer instance
  const observerRef = useRef(null);

  //highlight component in view
  useEffect(() => {
    if (location.pathname !== "/") return; // only run on the landing page

    /* Create the observer only once */
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        // switch a little before the section reaches the top and
        // keep observing until well past the middle
        root: null,
        rootMargin: "-10% 0px -65% 0px",
        threshold: 0.25, // fire when ~25 % is visible
      }
    );

    /* Start observing every section that actually exists on the page */
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    /* Cleanup */
    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  /* -------------------------------------------------------------------------
   * Helpers
   * -----------------------------------------------------------------------*/
  const linkClasses = (id) =>
    `group lg:text-lg md:text-base text-sm lg:mr-12 mr-8 tracking-wide relative ${
      active === id && location.pathname === "/"
        ? "text-gibbouspurple dark:text-gibbouspurple"
        : "text-gray-950 dark:text-gray-50"
    }`;

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/
  return (
    <header className="sticky top-8 mx-6 lg:mx-12 z-50 flex items-center h-18 px-5 bg-gray-50 border-4 dark:bg-midnight transition-colors duration-500">
      {/* Logo + dark-mode toggle ------------------------------------------------ */}

      <div className="flex items-center sm:gap-x-4 gap-x-2">
        <HashLink
          to="/#"
          className="text-xl lg:text-4xl font-extrabold  text-gray-950 dark:text-gray-50 hover:text-gibbouspurple hover:-translate-y-1 transition-all duration-500"
        >
          GIBBOUS&nbsp;DESIGNS
        </HashLink>

        <i
          className={`${
            darkMode ? "bx bx-sun" : "bx bx-moon"
          } md:text-3xl sm:text-2xl text-2xl text-gray-950 dark:text-gray-50 hover:text-gibbouspurple font-bold hover:-translate-y-1 transition-all duration-500`}
          onClick={toggleDarkMode}
        />
      </div>

      {/* Mobile menu button ---------------------------------------------------- */}
      <button
        aria-label="Toggle menu"
        className="md:hidden text-5xl cursor-pointer ml-auto"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`} />
      </button>

      {/* Desktop nav ----------------------------------------------------------- */}
      <div className="flex items-center md:ml-auto lg:ml-auto">
        <nav className="hidden md:flex items-center space-x-12 sm:ml-auto ">
          {sections.map((id) => (
            <HashLink
              key={id}
              smooth
              to={`/#${id}`}
              className={` ${linkClasses(
                id
              )}  hover:text-gibbouspurple hover:-translate-y-1 transition-all duration-500`}
              onClick={() => {
                setActive(id); // highlight immediately on click
                setIsMenuOpen(false); // close menu on mobile
              }}
            >
              {id.toUpperCase()}
              {/* underline */}
              <span
                className={`absolute -bottom-1 left-0 w-full h-[1px] transform scale-x-0
                group-hover:scale-x-100 transition duration-300 ${
                  active === id && location.pathname === "/"
                    ? "bg-gibbouspurple dark:bg-gibbouspurple 7scale-x-100"
                    : "bg-gibbouspurple dark:bg-gibbouspurple"
                }`}
              />
            </HashLink>
          ))}
        </nav>
      </div>
      {/* Mobile dropdown ------------------------------------------------------- */}
      {isMenuOpen && (
        <nav className="absolute w-full top-full left-0 bg-gray-50 dark:bg-green-950 md:hidden flex flex-col items-center py-4 shadow-lg">
          {sections.map((id) => (
            <HashLink
              key={id}
              smooth
              to={`/#${id}`}
              className="py-2 text-lg text-gray-950 dark:text-gray-50"
              onClick={() => {
                setActive(id);
                setIsMenuOpen(false);
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </HashLink>
          ))}
        </nav>
      )}
    </header>
  );
}
