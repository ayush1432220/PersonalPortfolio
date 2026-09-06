import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Monitor,
  Server,
  Database,
  Code,
  Brain,
  Cpu,
  GitBranch,
  Github,
  Zap,
  Sparkles,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { SectionWrapper, SectionHeader, GlassCard, IconBox, accentColors, focusRing } from "./DesignSystem";
import NeuralConstellation from "./NeuralConstellation";
import Reveal from "./Reveal";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { rafThrottle } from "../lib/animations";

/**
 * One skill category card.
 *
 * Owns a single reveal observer so all of its proficiency bars fill together as a
 * group when the card arrives, each offset by 80ms. The bars are the reason this
 * needs its own component: they must animate FROM 0%, which means the width can
 * only be set once we know the card is in view.
 */
function SkillCard({ category, immediate }) {
  const [ref, isRevealed] = useRevealOnScroll({ threshold: 0.15, immediate });
  const accent = accentColors[category.color];

  return (
    <div ref={ref}>
      <GlassCard accentColor={category.color}>
        {/* Category Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <IconBox icon={category.icon} color={category.color} />
          <div>
            <h3 className="text-lg font-bold text-text-primary font-heading">{category.title}</h3>
            {category.repos.length > 0 && (
              <span className="text-[11px] font-mono text-purple-400 flex items-center gap-1 mt-0.5">
                <Github className="w-3 h-3" /> {category.repos.length} Repositories
              </span>
            )}
          </div>
        </div>

        {/* Skills List with Proficiency Indicators */}
        <div className="space-y-3.5 mb-6">
          {category.skills.map((skill, i) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-text-primary flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  {skill.name}
                </span>
                <span className="font-mono text-text-secondary">{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-border-default overflow-hidden">
                {/* Width transitions 0 → target only once the card is in view, staggered
                    80ms per bar. Under reduced motion the hook reports revealed
                    immediately, so bars simply render at their final width. */}
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${accent.from} ${accent.to}`}
                  style={{
                    width: isRevealed ? `${skill.level}%` : "0%",
                    transition: "width 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: `${i * 0.08}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Related Github Repos */}
        {category.repos.length > 0 && (
          <div className="pt-4 border-t border-border-default">
            <span className="text-[11px] font-mono text-text-secondary block mb-2 uppercase tracking-wider">
              FEATURED CODE:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {category.repos.map((repo) => (
                <a
                  key={repo}
                  href={`https://github.com/ayush1432220/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--chip-accent": accent.glow }}
                  className={`tech-chip inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-bg-surface border border-border-default text-text-secondary hover:text-cyan-300 ${focusRing}`}
                >
                  <Terminal className="w-3 h-3" />
                  {repo}
                </a>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("all");
  // Once the user has touched a filter the cards are already on screen, so the
  // re-stagger should fire on mount rather than waiting for a scroll trigger.
  const [hasFiltered, setHasFiltered] = useState(false);

  // Sliding indicator behind the active filter pill.
  const tabsRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const skillCategories = [
    {
      title: "Frontend Engineering",
      group: "fullstack",
      icon: <Monitor className="w-6 h-6" />,
      skills: [
        { name: "React.js", level: 92 },
        { name: "JavaScript ES6+", level: 95 },
        { name: "Tailwind CSS & UI/UX", level: 90 },
        { name: "Framer Motion Animations", level: 88 },
      ],
      color: "blue",
      repos: ["MediaDiscover", "QuizApp", "Suduko-Pro"],
    },
    {
      title: "Backend Development",
      group: "fullstack",
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: "Node.js & Express.js", level: 88 },
        { name: "RESTful API Architecture", level: 92 },
        { name: "JWT & Security Auth", level: 85 },
        { name: "EJS & SSR Technologies", level: 84 },
      ],
      color: "emerald",
      repos: ["X_automation", "Wonder"],
    },
    {
      title: "Databases & Cloud",
      group: "fullstack",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "MongoDB & Mongoose ODM", level: 88 },
        { name: "Cloudinary & File Uploads", level: 86 },
        { name: "Data Modeling & Schema", level: 85 },
        { name: "Local & Session Storage", level: 92 },
      ],
      color: "purple",
      repos: [],
    },
    {
      title: "Core Languages",
      group: "core",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "JavaScript (Node & Browser)", level: 95 },
        { name: "C Programming", level: 88 },
        { name: "Java (OOP & Data Structures)", level: 82 },
        { name: "C++ Fundamentals", level: 80 },
      ],
      color: "orange",
      repos: ["MessageCrypto"],
    },
    {
      title: "AI & Machine Learning",
      group: "ai",
      icon: <Brain className="w-6 h-6" />,
      skills: [
        { name: "Generative AI (Gemini API)", level: 90 },
        { name: "FastAPI Integration", level: 82 },
        { name: "OpenCV & Computer Vision", level: 80 },
        { name: "Image Analysis Algorithms", level: 84 },
      ],
      color: "pink",
      repos: ["ForestAgent", "AI-News-Summarizer"],
    },
    {
      title: "Robotics & Hardware Systems",
      group: "ai",
      icon: <Cpu className="w-6 h-6" />,
      skills: [
        { name: "Arduino Microcontrollers", level: 92 },
        { name: "Sensor & Actuator Control", level: 90 },
        { name: "Autonomous Line Follower", level: 94 },
        { name: "Roborace Hardware Tuning", level: 96 },
      ],
      color: "indigo",
      repos: [],
    },
    {
      title: "DevOps & Tools",
      group: "core",
      icon: <GitBranch className="w-6 h-6" />,
      skills: [
        { name: "Git & GitHub Workflow", level: 92 },
        { name: "Vite & Build Tooling", level: 88 },
        { name: "Postman & API Testing", level: 90 },
        { name: "Netlify, Vercel & Render", level: 86 },
      ],
      color: "cyan",
      repos: [],
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Skills" },
    { id: "fullstack", label: "Full-Stack Web" },
    { id: "ai", label: "AI & Robotics" },
    { id: "core", label: "Core & Tools" },
  ];

  const filteredCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.group === activeTab);

  /**
   * Measure the active pill and move the indicator to it.
   * useLayoutEffect so the indicator is positioned before paint on first render
   * (otherwise it visibly slides in from 0 on mount).
   */
  useLayoutEffect(() => {
    const container = tabsRef.current;
    if (!container) return;

    const measure = () => {
      const activeBtn = container.querySelector('[data-active="true"]');
      if (!activeBtn) return;
      setIndicator({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        ready: true,
      });
    };

    measure();

    // Pills wrap at narrow widths, so re-measure on resize.
    const onResize = rafThrottle(measure);
    window.addEventListener("resize", onResize);
    return () => {
      onResize.cancel();
      window.removeEventListener("resize", onResize);
    };
  }, [activeTab]);

  return (
    <SectionWrapper id="skills">
      {/* Same background system as the hero, but sparser/quieter so it stays behind the content */}
      <NeuralConstellation density={0.6} opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge="CAPABILITIES & TOOLSET"
          title="Technical Arsenal & Expertise"
          subtitle="From full-stack web engineering to generative AI models and hardware robotics, bridging software and physical systems."
        />

        {/* Filter Pills — a single indicator slides between tabs instead of each
            pill hard-swapping its background colour. */}
        <div ref={tabsRef} className="relative flex flex-wrap justify-center gap-2.5 mb-12">
          {/* The moving pill. Hidden until measured so it never flashes at 0,0. */}
          <span
            aria-hidden="true"
            className="absolute top-0 h-full rounded-full bg-purple-600/30 border border-purple-500/50 shadow-lg shadow-purple-500/20 pointer-events-none"
            style={{
              left: 0,
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left}px)`,
              opacity: indicator.ready ? 1 : 0,
              transition:
                "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
            }}
          />

          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              data-active={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setHasFiltered(true);
              }}
              aria-pressed={activeTab === tab.id}
              className={`relative z-10 px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-colors duration-300 border ${focusRing} ${
                activeTab === tab.id
                  ? "text-text-primary border-transparent"
                  : "text-text-secondary hover:text-text-primary bg-bg-surface border-border-default hover:border-border-strong"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid.
            key={activeTab} deliberately remounts the grid on filter change so the
            entrance stagger replays for the new set instead of the cards cutting
            in instantly. Reveals are one-shot per mount, so scrolling past the
            section repeatedly does NOT re-fire them. */}
        <div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredCategories.map((category, i) => (
            <Reveal
              key={category.title}
              delay={i * 0.08}
              from="up"
              immediate={hasFiltered}
            >
              <SkillCard category={category} immediate={hasFiltered} />
            </Reveal>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="max-w-4xl mx-auto p-7 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 via-bg-surface-elevated/80 to-cyan-500/10 backdrop-blur-xl border border-purple-500/30 text-center shadow-2xl">
          <Zap className="w-8 h-8 text-amber-400 mx-auto mb-3 animate-pulse" />
          <h4 className="text-xl sm:text-2xl font-bold text-text-primary font-heading mb-2">
            Continuous Evolution & Innovation
          </h4>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Building software is a continuous process of learning and refinement. Whether optimizing full-stack API latency, training computer vision algorithms, or tuning microcontrollers for 60km/h roboraces, I bring a methodical approach to every problem.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}