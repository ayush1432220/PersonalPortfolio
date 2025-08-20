import React, { useEffect } from "react";
import ReactGA from "react-ga4";

import HeroSection from './components/HeroSection';
import AboutMeSection from './components/AboutMe';
import SkillsSection from './components/SkillSection';
import ProjectsSection from './components/ProjectSection';
import AchievementsSection from './components/AchievementSection';
import ContactSection from './components/ContactSection';
import CertificationsSection from './components/CertificationsSection';

export default function App() {
  useEffect(() => {
    ReactGA.initialize("G-1Z5GQXEC42");
    ReactGA.send("pageview");   // 👈 First pageview send
  }, []);

  return (
    <div className="bg-slate-950 text-white font-sans">
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <CertificationsSection/>
      <ContactSection />
    </div>
  );
}
