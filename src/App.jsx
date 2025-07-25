import React from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/scrollToTop";
import Hero from "./components/Hero";
import ServicesNew from "./components/ServicesNew";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Availability from "./components/Availability";
import ProjectDetail from "./components/ProjectDetail";
import HeroNew from "./components/HeroNew";
// (optional) tiny helper that scrolls to top on normal route changes
// import ScrollToTop from "./components/ScrollToTop";

const App = () => {
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
                {/* <Hero /> */}
                <ServicesNew />
                <Projects />
                <Contact />
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
