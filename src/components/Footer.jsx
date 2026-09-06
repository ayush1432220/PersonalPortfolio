import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles, Code2 } from "lucide-react";
import { focusRing, sectionPaddingX } from "./DesignSystem";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`relative bg-bg-page border-t border-border-default pt-20 sm:pt-24 pb-12 ${sectionPaddingX} overflow-hidden z-20`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-border-default">

          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/40 p-0.5">
              <img src="/logo.jpg" alt="Ayush" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <span className="text-base font-bold text-text-primary font-heading tracking-tight block">
                Ayush Chaurasiya
              </span>
              <span className="text-xs text-text-secondary font-mono">
                Full-Stack Software Engineer & AI/Robotics Craftsman
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-text-secondary">
            <a href="#about" className={`hover:text-purple-300 transition-colors rounded ${focusRing}`}>About</a>
            <a href="#skills" className={`hover:text-purple-300 transition-colors rounded ${focusRing}`}>Skills</a>
            <a href="#projects" className={`hover:text-purple-300 transition-colors rounded ${focusRing}`}>Projects</a>
            <a href="#achievements" className={`hover:text-purple-300 transition-colors rounded ${focusRing}`}>Competitions</a>
            <a href="#certifications" className={`hover:text-purple-300 transition-colors rounded ${focusRing}`}>Certifications</a>
            <a href="#contact" className={`hover:text-purple-300 transition-colors rounded ${focusRing}`}>Contact</a>
          </div>

          {/* Back to top Button */}
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-full bg-bg-surface border border-border-default text-text-secondary hover:text-text-primary hover:border-purple-500/40 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 ${focusRing}`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Bar: Copyright, Tech Badge & Clock */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Ayush Chaurasiya. Built with</span>
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>React & Vite</span>
          </div>

          <div className="flex items-center gap-4">
            {time && (
              <span className="px-3 py-1 rounded-full bg-bg-surface border border-border-default text-text-secondary">
                LOCAL TIME: {time}
              </span>
            )}

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ayush1432220"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-bg-surface border border-border-default text-text-secondary hover:text-purple-300 transition-colors ${focusRing}`}
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-chaurasiya96"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-bg-surface border border-border-default text-text-secondary hover:text-purple-300 transition-colors ${focusRing}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:chaurasiyavinod96@gmail.com"
                className={`p-2 rounded-lg bg-bg-surface border border-border-default text-text-secondary hover:text-purple-300 transition-colors ${focusRing}`}
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
