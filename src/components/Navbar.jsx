import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowUpRight, Zap, Code, User, Trophy, Award, Mail, FolderGit2, Briefcase } from "lucide-react";
import { focusRing, sectionPaddingX } from "./DesignSystem";
import { ThemeToggle } from "./ThemeProvider";
import { useMagnetic } from "../hooks/useMagnetic";

const navLinks = [
  { name: "About", href: "#about", icon: <User className="w-4 h-4" /> },
  { name: "Experience", href: "#experience", icon: <Briefcase className="w-4 h-4" /> },
  { name: "Skills", href: "#skills", icon: <Code className="w-4 h-4" /> },
  { name: "Projects", href: "#projects", icon: <FolderGit2 className="w-4 h-4" /> },
  { name: "Competitions", href: "#achievements", icon: <Trophy className="w-4 h-4" /> },
  { name: "Certifications", href: "#certifications", icon: <Award className="w-4 h-4" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const talkCtaRef = useMagnetic({ strength: 8, radius: 70 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section scroll tracking
      const sections = navLinks.map((link) => link.href.substring(1));
      sections.unshift("hero");

      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${sectionPaddingX} py-4 transition-all duration-300 pointer-events-none`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand / Logo */}
        <motion.a
          href="#hero"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`group flex items-center gap-3 p-1.5 pr-4 rounded-full bg-bg-surface-elevated backdrop-blur-xl border border-border-default hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 ${focusRing}`}
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-purple-500/30 p-0.5 group-hover:scale-105 transition-transform duration-300">
            <img src="/logo.jpg" alt="Ayush" className="w-full h-full object-cover rounded-full" />
            <div className="absolute inset-0 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-text-primary group-hover:text-purple-300 transition-colors font-heading">
              Ayush Chaurasiya
            </span>
            <span className="text-[10px] text-text-secondary font-mono tracking-wider">Full-Stack & AI</span>
          </div>
        </motion.a>

        {/* Desktop Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`hidden md:flex items-center gap-0.5 lg:gap-1 px-3 lg:px-4 py-2 rounded-full border transition-all duration-300 shadow-xl ${
            scrolled
              ? "bg-bg-surface-elevated backdrop-blur-xl border-border-default shadow-purple-950/20"
              : "bg-bg-surface backdrop-blur-md border-border-default"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3 lg:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${focusRing} ${
                  isActive
                    ? "text-text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-elevated"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-pink-600/30 border border-purple-500/40 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </motion.nav>

        {/* Available Pill & Quick CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Hire
          </div>

          <a
            ref={talkCtaRef}
            href="#contact"
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-md shadow-purple-500/20 will-change-transform ${focusRing}`}
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Theme Toggle + Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-full bg-bg-surface border border-border-default text-text-secondary hover:text-text-primary backdrop-blur-md transition-colors ${focusRing}`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pointer-events-auto mt-3 mx-2 p-5 rounded-2xl bg-bg-surface-elevated backdrop-blur-2xl border border-border-default shadow-2xl shadow-purple-950/40"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-default">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Available for Hire
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={activeSection === link.href.substring(1) ? "true" : undefined}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface-elevated transition-colors ${focusRing}`}
                >
                  <span className="p-2 rounded-lg bg-bg-surface-elevated text-purple-400">{link.icon}</span>
                  {link.name}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-border-default">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 ${focusRing}`}
                >
                  <Zap className="w-4 h-4" /> Let's Connect
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
