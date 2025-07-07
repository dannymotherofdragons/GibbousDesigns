import React from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/scrollToTop";
import Hero from "./components/hero";
import ServicesNew from "./components/ServicesNew";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Availability from "./components/Availability";
import ProjectDetail from "./components/ProjectDetail";
// (optional) tiny helper that scrolls to top on normal route changes
// import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Navbar />

      <div className="min-h-screen bg-cream dark:bg-midnight text-olive dark:text-mousse transition-colors duration-500">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
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
