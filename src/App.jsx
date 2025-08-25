// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { projects } from "./data"; // <-- add this

import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/scrollToTop";
import ServicesNew from "./components/ServicesNew";
import ProjectsNew from "./components/ProjectsNew";
import Contact from "./components/Contact";
import Availability from "./components/Availability";
import ProjectDetail from "./components/ProjectDetail";
import HeroNew from "./components/HeroNew";

const App = () => {
  const n = projects.length;
  const LATE_FUDGE = 10; // try 2 first; increase to 3–4 if you still want it later
  const contactMarginTop = `-${65 - LATE_FUDGE}dvh`; // smaller magnitude = starts later

  return (
    <ThemeProvider>
      <ScrollToTop />
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-midnight text-gray-900 dark:text-mousse transition-colors duration-500">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroNew />
                <ServicesNew />
                <ProjectsNew />

                {/* use EXACT overlap instead of -mt-[100vh] */}
                <section
                  className="relative z-20"
                  style={{ marginTop: contactMarginTop }}
                >
                  <Contact />
                </section>

                <Availability />
              </>
            }
          />

          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
