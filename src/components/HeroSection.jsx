import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  Zap,
  ArrowRight,
  Github,
  Mail,
  Linkedin,
  Sparkles,
  Bot,
  Layers,
  Terminal,
} from "lucide-react";
import { PrimaryButton, SecondaryButton, focusRing, sectionPaddingX } from "./DesignSystem";
import NeuralConstellation from "./NeuralConstellation";
import AnimatedText from "./AnimatedText";
import { usePointerTilt } from "../hooks/usePointerTilt";
import { useMagnetic } from "../hooks/useMagnetic";

export default function HeroSection() {
  // Hand-written pointer effects: the avatar tilts in 3D, the CTAs lean toward the cursor.
  const avatarTiltRef = usePointerTilt({ max: 14, scale: 1.02, perspective: 800 });
  const primaryCtaRef = useMagnetic({ strength: 12, radius: 90 });
  const secondaryCtaRef = useMagnetic({ strength: 12, radius: 90 });
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    "Full-Stack Software Developer",
    "AI/ML Solution Craftsman",
    "4x National Robotics Champion",
    "Creative Frontend Engineer",
  ];

  // Role Cycling interval
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section
      id="hero"
      className={`relative min-h-screen pt-28 pb-20 sm:pb-24 ${sectionPaddingX} flex flex-col justify-center overflow-hidden bg-radial-gradient-hero`}
    >
      {/* Signature background: hand-written node network (denser here than elsewhere) */}
      <NeuralConstellation density={1.15} opacity={0.7} />

      {/* Grid Pattern Background Overlay */}
      <div className="absolute inset-0 bg-radial-grid opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Bio */}
        <motion.div
          className="lg:col-span-7 space-y-7 text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Availability & Dynamic Role Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-300 px-4 py-2 rounded-full text-xs font-mono font-medium backdrop-blur-xl border border-purple-500/30 shadow-lg shadow-purple-500/10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Available for Hiring & Collaborations</span>
            </motion.div>
          </div>

          {/* Main Headline — hand-written word-by-word stagger (see AnimatedText) */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1] font-heading">
              {/* immediate: the hero is above the fold — never gate it on a scroll observer */}
              <AnimatedText text="Hi, I'm" as="span" className="block" delay={0.15} immediate />
              <AnimatedText
                text="Ayush Chaurasiya"
                as="span"
                className="block"
                delay={0.3}
                immediate
                wordClassName="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
              />
            </h1>

            {/* Cycling Role Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-10 flex items-center"
            >
              <span className="text-lg sm:text-2xl font-mono text-cyan-400 font-semibold flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </span>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Engineering high-performance full-stack applications, intelligent AI models, and 
            award-winning robotics. Transforming complex technical challenges into 
            seamless digital experiences.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Wrapped in spans so the magnetic hook can transform them without
                needing the shared button components to forward refs. */}
            <span ref={primaryCtaRef} className="inline-block will-change-transform">
              <PrimaryButton href="#projects">
                Explore Featured Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </PrimaryButton>
            </span>

            <span ref={secondaryCtaRef} className="inline-block will-change-transform">
              <SecondaryButton href="#contact" accentColor="cyan">
                Let's Build Together
              </SecondaryButton>
            </span>
          </motion.div>

          {/* Social Badges */}
          <motion.div
            className="flex items-center gap-3 pt-4 border-t border-border-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-xs text-text-secondary font-mono">CONNECT:</span>
            {[
              {
                href: "https://github.com/ayush1432220",
                icon: <Github className="w-4 h-4" />,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/ayush-chaurasiya96",
                icon: <Linkedin className="w-4 h-4" />,
                label: "LinkedIn",
              },
              {
                href: "mailto:chaurasiyavinod96@gmail.com",
                icon: <Mail className="w-4 h-4" />,
                label: "Email",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className={`p-2.5 bg-bg-surface hover:bg-bg-surface-elevated rounded-xl transition-all duration-300 border border-border-default text-text-secondary hover:text-purple-300 hover:border-purple-500/40 shadow-md ${focusRing}`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Multi-Ring Avatar & Floating Tech Badges */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Ambient Glow Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-600/10 to-cyan-500/20 rounded-full blur-3xl -z-10"></div>

          {/* Avatar Container */}
          <div className="relative w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">

            {/* Center Glass Frame around Logo — tilts in 3D toward the pointer */}
            <div
              ref={avatarTiltRef}
              className="relative w-56 h-56 sm:w-68 sm:h-68 rounded-full p-1.5 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-2xl shadow-purple-500/30 will-change-transform"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-bg-page relative group">
                <img
                  src="/logo.jpg"
                  alt="Ayush Chaurasiya"
                  className="w-full h-full object-cover object-center rounded-full transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-950/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Floating Tech Badges */}
            {[
              {
                icon: <Code className="w-5 h-5 text-cyan-400" />,
                title: "Full Stack MERN",
                pos: "-top-3 -left-2 sm:-left-6",
                borderColor: "border-cyan-500/40",
              },
              {
                icon: <Bot className="w-5 h-5 text-purple-400" />,
                title: "Robotics Winner",
                pos: "-bottom-4 -right-2 sm:-right-6",
                borderColor: "border-purple-500/40",
              },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                className={`absolute ${badge.pos} px-4 py-2.5 bg-bg-surface-elevated backdrop-blur-xl rounded-2xl border ${badge.borderColor} shadow-2xl flex items-center gap-2.5 z-20`}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: idx * 1.2,
                  ease: "easeInOut",
                }}
              >
                <div className="p-1.5 rounded-lg bg-bg-surface border border-border-default">
                  {badge.icon}
                </div>
                <span className="text-xs font-semibold text-text-primary font-heading">
                  {badge.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}