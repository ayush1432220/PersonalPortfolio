import React from "react";
import { Briefcase, Calendar, MapPin, Building2, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { SectionWrapper, SectionHeader, GlassCard, accentColors, contentMaxWidth } from "./DesignSystem";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { useMagnetic } from "../hooks/useMagnetic";

/**
 * One timeline entry.
 *
 * Its own component so a single reveal observer can drive BOTH the card's slide-in
 * and the "activation" pulse on the timeline node beside it — the node should fire
 * exactly when its card arrives, which is only possible if they share reveal state.
 */
function ExperienceItem({ exp }) {
  const [ref, isRevealed] = useRevealOnScroll({ threshold: 0.15 });
  const projectLinkRef = useMagnetic({ strength: 8, radius: 70 });
  const accent = accentColors[exp.color];

  return (
    <div ref={ref} className="relative pl-10 sm:pl-16">
      {/* Timeline node — pulses once the moment its card enters view. */}
      <div
        style={{ "--node-glow": accent.glow }}
        className={`absolute left-4 sm:left-6 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-page border-2 z-10 ${accent.border} ${
          isRevealed ? "animate-node-activate" : ""
        }`}
      ></div>

      {/* Card slides in from the rail side (this timeline is single-rail, not alternating). */}
      <div
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? "none" : "translateX(-24px)",
          transition:
            "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <GlassCard accentColor={exp.color}>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className={`w-5 h-5 ${accent.text}`} />
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary font-heading">
                  {exp.role} <span className="text-text-secondary font-normal">@ {exp.company}</span>
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-secondary">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" /> {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {exp.location}
                </span>
              </div>
            </div>

            <span
              className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border ${accent.badge}`}
            >
              {exp.type}
            </span>
          </div>

          <ul className="space-y-2.5 mb-6 text-text-secondary text-sm leading-relaxed">
            {exp.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${accent.text}`} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-default">
            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  style={{ "--chip-accent": accent.glow }}
                  className="tech-chip bg-bg-surface text-text-secondary border border-border-default px-2.5 py-1 rounded-md text-[11px] font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>

            {exp.projectLink && (
              <a
                ref={projectLinkRef}
                href={exp.projectLink}
                className="inline-flex items-center gap-1 text-xs font-mono font-medium text-purple-300 hover:text-purple-200 will-change-transform"
              >
                View Project Lumina AI <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const experiences = [
    {
      role: "AI/ML Intern",
      company: "HCL Technologies",
      location: "On-Site",
      period: "July 2026 – July 2026",
      type: "AI/ML & Microservices",
      color: "purple",
      skills: ["FastAPI", "Next.js", "Three.js", "Zustand", "scikit-learn", "LangChain", "Mistral AI", "RAG", "ChromaDB", "OCR"],
      points: [
        "Engineered Lumina AI — Smart Home Energy OS & 3D Digital Twin Dashboard combining physics-based appliance modeling with ML load prediction engines.",
        "Implemented state-wise electricity tariff calculations across 5 Indian states with solar net metering and multimodal OCR bill extraction.",
        "Built conversational energy diagnostics powered by LangChain, Mistral, and FastAPI microservices while collaborating in Agile teams using Git/GitHub.",
      ],
      projectLink: "#projects",
    },
    {
      role: "Full Stack MERN Intern",
      company: "Infoseek",
      location: "Lucknow, India",
      period: "Jul 2025 – Aug 2025",
      type: "Full-Stack Development",
      color: "cyan",
      skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "JWT Auth"],
      points: [
        "Engineered full-stack web applications utilizing the MERN Stack with secure JWT authentication and scalable RESTful APIs.",
        "Crafted responsive and fluid user interfaces adhering to modern UI/UX design patterns.",
        "Collaborated on real-world client features using Git/GitHub version control best practices.",
      ],
    },
    {
      role: "Tech Intern",
      company: "Feeding Trends",
      location: "Remote / Hybrid",
      period: "June 2025 – Aug 2025",
      type: "Frontend & Performance",
      color: "emerald",
      skills: ["React.js", "Node.js", "REST APIs", "Performance Optimization"],
      points: [
        "Developed responsive web features using React.js and Node.js for high-traffic media feeds.",
        "Integrated backend REST APIs and optimized platform load times and client rendering performance.",
      ],
    },
  ];

  return (
    <SectionWrapper id="experience">
      <SectionHeader
        badge="CAREER & INTERNSHIPS"
        title="Professional Experience"
        subtitle="Hands-on industry experience building scalable AI microservices, MERN full-stack applications, and high-performance web systems."
      />

      <div className={`${contentMaxWidth} mx-auto relative`}>
        {/* Timeline Connecting Line */}
        <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-emerald-500 opacity-30"></div>

        {/* "Data pulse" — a signal travelling the rail, echoing the constellation's
            network motif. Pure CSS loop so it never depends on a JS frame loop. */}
        <div
          aria-hidden="true"
          className="absolute left-4 sm:left-6 top-2 bottom-2 w-0.5 -translate-x-1/2 pointer-events-none overflow-hidden"
        >
          <span
            className="animate-timeline-travel absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--dot-cyan)",
              boxShadow: "0 0 12px 4px var(--dot-cyan-glow)",
            }}
          />
        </div>

        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp) => (
            <ExperienceItem key={exp.company} exp={exp} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
