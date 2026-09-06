import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Lightbulb, Trophy, Cpu, Code2, Sparkles, Target, Compass } from "lucide-react";
import { SectionWrapper, SectionHeader, GlassCard, IconBox, containerVariants } from "./DesignSystem";
import Reveal from "./Reveal";

export default function AboutMeSection() {
  const coreStrengths = [
    { name: "MERN Stack Development", desc: "React, Node.js, Express, MongoDB", color: "cyan" },
    { name: "AI/ML & Generative AI", desc: "Gemini API, FastAPI, OpenCV, Image Processing", color: "purple" },
    { name: "Robotics & Hardware Engineering", desc: "Arduino, Autonomous Navigation, Control Systems", color: "amber" },
    { name: "Security & Cryptography", desc: "Steganography, Message Encryption, Auth", color: "emerald" },
  ];

  const education = [
    {
      title: "B.Tech in Computer Science & Engineering",
      institute: "Maharishi University of Information Technology (MUIT), Lucknow",
      period: "2021 – 2025",
      score: "CGPA: 7.56",
    },
    {
      title: "Intermediate (Class 12)",
      institute: "Cosmopolitan Inter College — UP Board",
      period: "2022",
      score: "68%",
    },
    {
      title: "High School (Class 10)",
      institute: "Cosmopolitan Inter College — UP Board",
      period: "2020",
      score: "82.16%",
    },
  ];

  return (
    <SectionWrapper id="about">
      <SectionHeader
        badge="BACKGROUND & VISION"
        title="Engineering Solutions Across Software & Hardware"
        subtitle="Driven by curiosity at the intersection of web development, artificial intelligence, and robotics."
      />

      <motion.div
        className="grid lg:grid-cols-12 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
      >
        {/* Left Column: My Passion (7 cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <GlassCard accentColor="purple" className="flex-1">
            {/* Ambient accent dot — slow figure-8 drift with an independent breathing
                pulse, so the card feels alive rather than statically decorated.
                Nested spans keep drift and pulse on separate transforms. */}
            <span
              aria-hidden="true"
              className="animate-drift pointer-events-none absolute top-6 right-7 z-0"
            >
              <span
                className="animate-soft-pulse block w-2.5 h-2.5 rounded-full"
                style={{
                  background: "var(--dot-purple)",
                  boxShadow: "0 0 12px var(--dot-purple-glow)",
                }}
              />
            </span>

            <div className="flex items-center gap-3 mb-4">
              <IconBox icon={<Lightbulb className="w-6 h-6" />} color="purple" />
              <div>
                <span className="text-xs font-mono font-medium text-purple-400 uppercase tracking-wider">CORE PURPOSE</span>
                <h3 className="text-2xl font-bold text-text-primary font-heading">Passionate Engineer & Creator</h3>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed text-base sm:text-lg mb-4">
              I thrive on building technology that solves real problems. Whether it's crafting high-performance 
              <strong className="text-purple-300"> Full-Stack web platforms</strong>, integrating 
              <strong className="text-pink-300"> Generative AI APIs</strong> for automated summarization, or engineering 
              <strong className="text-cyan-300"> autonomous roborace bots</strong> that win podium finishes nationwide.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              My approach blends rigorous engineering principles with sleek design taste, ensuring every application is reliable, fast, and delightful to interact with.
            </p>
          </GlassCard>

          {/* Academic Journey Card */}
          <GlassCard accentColor="blue">
            <div className="flex items-center gap-3 mb-4">
              <IconBox icon={<GraduationCap className="w-6 h-6" />} color="blue" />
              <div>
                <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">EDUCATION</span>
                <h3 className="text-2xl font-bold text-text-primary font-heading">Academic Foundation</h3>
              </div>
            </div>

            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.title}
                  className="p-4 rounded-xl bg-bg-surface border border-border-default flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-semibold text-text-primary text-base">{edu.title}</h4>
                    <p className="text-text-secondary text-sm mt-0.5">{edu.institute}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/30">
                      {edu.period}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Core Pillars (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <GlassCard accentColor="cyan" className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <IconBox icon={<Target className="w-6 h-6" />} color="cyan" />
                <div>
                  <span className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider">CAPABILITIES</span>
                  <h3 className="text-2xl font-bold text-text-primary font-heading">Core Competencies</h3>
                </div>
              </div>

              <div className="space-y-3.5">
                {/* Rows enter one after another (60ms apart) rather than as a block. */}
                {coreStrengths.map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.06} from="scale" duration={0.5}>
                    <div className="row-nudge p-3.5 rounded-xl bg-bg-surface border border-border-default hover:border-border-strong flex items-start gap-3">
                      <div
                        className="w-2 h-2 mt-2 rounded-full flex-shrink-0"
                        style={{
                          background: "var(--dot-cyan)",
                          boxShadow: "0 0 8px var(--dot-cyan-glow)",
                        }}
                      ></div>
                      <div>
                        <h4 className="font-semibold text-text-primary text-sm">{item.name}</h4>
                        <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-default flex items-center justify-between text-xs text-text-secondary font-mono">
              <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-purple-400" /> Continuous Learner</span>
              <span className="text-purple-300">13+ Awards Won</span>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}