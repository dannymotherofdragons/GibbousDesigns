import React, { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const sections = ["home", "services", "work", "contact"];

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState(null);
  const location = useLocation();

  const lastYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");
  const sectionElsRef = useRef([]);

  // Sync with URL (and clear when not on "/")
  useEffect(() => {
    if (location.pathname !== "/") {
      setActive(null);
      return;
    }
    const hash = (location.hash || "#home").slice(1);
    if (sections.includes(hash)) setActive(hash);
  }, [location.pathname, location.hash]);

  // Cache section elements
  useEffect(() => {
    if (location.pathname !== "/") return;
    sectionElsRef.current = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);
  }, [location.pathname]);

  // Track scroll direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastYRef.current ? "down" : "up";
      lastYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Direction-aware scroll spy
  useEffect(() => {
    if (location.pathname !== "/") return;

    let raf = 0;

    const measure = () => {
      const els = sectionElsRef.current;
      if (!els.length) return;

      const activationY =
        dirRef.current === "up" ? 0 : Math.round(window.innerHeight * 0.35);

      let chosenId = null;
      let bestTop = -Infinity;

      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= activationY && rect.top > bestTop) {
          bestTop = rect.top;
          chosenId = el.id;
        }
      }

      if (!chosenId) {
        for (const el of els) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom > 0) {
            chosenId = el.id;
            break;
          }
        }
      }

      if (chosenId && chosenId !== active) setActive(chosenId);
    };

    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          measure();
        });
      }
    };

    const onResize = () => {
      sectionElsRef.current = sections
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      measure();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [location.pathname]); // <- removed `active` here

  const linkClasses = (id) =>
    `group lg:text-lg md:text-base text-sm lg:mr-12 mr-8 tracking-wide relative ${
      location.pathname === "/" && active === id
        ? "text-gibbouspurple dark:text-gibbouspurple"
        : "text-gray-950 dark:text-gray-50"
    }`;

  return (
    <header className="sticky top-8 mx-6 lg:mx-12 z-50 flex items-center h-16 px-5 bg-gray-50 border-4 dark:bg-midnight transition-colors duration-500">
      {/* Logo + dark-mode toggle */}
      <div className="flex items-center sm:gap-x-4 gap-x-2">
        <HashLink
          to="/#home"
          className="text-xl lg:text-4xl font-extrabold text-gray-950 dark:text-gray-50 hover:text-gibbouspurple hover:-translate-y-1 transition-all duration-500"
          // onClick={() => setActive("home")} // optional: remove if hash-sync is enough
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

      {/* Mobile menu button */}
      <button
        aria-label="Toggle menu"
        className="md:hidden text-5xl cursor-pointer ml-auto"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`} />
      </button>

      {/* Desktop nav */}
      <div className="flex items-center md:ml-auto">
        {/* ^ removed redundant lg:ml-auto */}
        <nav className="hidden md:flex items-center space-x-12 sm:ml-auto">
          {sections.map((id) => {
            const isActive = location.pathname === "/" && active === id;
            return (
              <HashLink
                key={id}
                smooth
                to={`/#${id}`}
                className={`${linkClasses(
                  id
                )} hover:text-gibbouspurple hover:-translate-y-1 transition-all duration-500`}
                aria-current={isActive ? "page" : undefined}
                // onClick={() => setActive(id)} // optional: remove if you don’t need instant flash
                onClick={() => setIsMenuOpen(false)}
              >
                {id.toUpperCase()}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[1px] transform transition duration-300 bg-gibbouspurple dark:bg-gibbouspurple ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </HashLink>
            );
          })}
        </nav>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <nav className="absolute w-full top-full left-0 bg-gray-50 dark:bg-midnight md:hidden flex flex-col items-center py-4 shadow-lg">
          {/* ^ unified color */}
          {sections.map((id) => (
            <HashLink
              key={id}
              smooth
              to={`/#${id}`}
              className={`py-2 text-lg ${
                location.pathname === "/" && active === id
                  ? "text-gibbouspurple dark:text-gibbouspurple"
                  : "text-gray-950 dark:text-gray-50"
              }`}
              // onClick={() => setActive(id)} // optional
              onClick={() => setIsMenuOpen(false)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </HashLink>
          ))}
        </nav>
      )}
    </header>
  );
}
