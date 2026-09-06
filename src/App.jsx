import React, { useEffect } from "react";
import ReactGA from "react-ga4";

import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./components/ThemeProvider";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import AboutMeSection from "./components/AboutMe";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillSection";
import ProjectsSection from "./components/ProjectSection";
import AchievementsSection from "./components/AchievementSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    try {
      const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-1Z5GQXEC42";
      if (gaId) {
        ReactGA.initialize(gaId);
        ReactGA.send("pageview");
      }
    } catch {
      // Analytics init can legitimately fail (ad blockers, etc.) — ignore.
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg-page text-text-primary font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-purple-600 focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to content
        </a>
        <CustomCursor />
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <StatsSection />
          <AboutMeSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <AchievementsSection />
          <CertificationsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
