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

  /* -------------------------------------------------------------------------
   * Highlight section currently in view
   * -----------------------------------------------------------------------*/
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
        ? "text-olive dark:text-pinkish"
        : "text-letuce dark:text-mousse"
    }`;

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/
  return (
    <header className="w-full md:h-16 sm:h-14 h-18 flex justify-between items-center xl:px-36 lg:px-24 md:px-12 sm:px-6 px-4 fixed top-0 z-50 bg-cream dark:bg-midnight transition-colors duration-500">
      {/* Logo + dark-mode toggle ------------------------------------------------ */}
      <div className="flex items-center sm:gap-x-4 gap-x-2">
        <HashLink
          to="/#"
          className="font-bagnard md:text-2xl sm:text-xl text-lg text-olive dark:text-mousse"
        >
          Gibbous&nbsp;Designs
        </HashLink>

        <i
          className={`${
            darkMode ? "bx bx-sun" : "bx bx-moon"
          } md:text-3xl sm:text-2xl text-xl text-letuce dark:text-pinkish sm:ml-4 ml-2 cursor-pointer`}
          onClick={toggleDarkMode}
        />
      </div>

      {/* Mobile menu button ---------------------------------------------------- */}
      <button
        aria-label="Toggle menu"
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`} />
      </button>

      {/* Desktop nav ----------------------------------------------------------- */}
      <nav className="hidden md:flex">
        {sections.map((id) => (
          <HashLink
            key={id}
            smooth
            to={`/#${id}`}
            className={`font-bagnard ${linkClasses(id)}`}
            onClick={() => {
              setActive(id); // highlight immediately on click
              setIsMenuOpen(false); // close menu on mobile
            }}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
            {/* underline */}
            <span
              className={`absolute -bottom-1 left-0 w-full h-[1px] transform scale-x-0
                group-hover:scale-x-100 transition duration-300 ${
                  active === id && location.pathname === "/"
                    ? "bg-olive dark:bg-pinkish scale-x-100"
                    : "bg-letuce dark:bg-mousse"
                }`}
            />
          </HashLink>
        ))}
      </nav>

      {/* Mobile dropdown ------------------------------------------------------- */}
      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-cream dark:bg-dirt md:hidden flex flex-col items-center py-4 shadow-lg">
          {sections.map((id) => (
            <HashLink
              key={id}
              smooth
              to={`/#${id}`}
              className="py-2 text-lg text-olive dark:text-mousse"
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
