import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page";

// Shared spacing scale so every section/card/grid reads off the same rhythm.
export const sectionPaddingY = "py-20 sm:py-24";
export const sectionPaddingX = "px-5 sm:px-8 lg:px-12 xl:px-16";
export const cardPadding = "p-6 sm:p-8";
export const gridGap = "gap-6";
export const contentMaxWidth = "max-w-6xl";

export const accentColors = {
  purple: {
    text: "text-purple-400",
    border: "border-purple-500/40",
    borderHover: "hover:border-purple-400",
    bg: "bg-purple-500",
    glow: "rgba(168, 85, 247, 0.25)",
    shadow: "shadow-purple-500/20",
    from: "from-purple-500",
    to: "to-pink-500",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  pink: {
    text: "text-pink-400",
    border: "border-pink-500/40",
    borderHover: "hover:border-pink-400",
    bg: "bg-pink-500",
    glow: "rgba(236, 72, 153, 0.25)",
    shadow: "shadow-pink-500/20",
    from: "from-pink-500",
    to: "to-rose-500",
    badge: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-500/40",
    borderHover: "hover:border-cyan-400",
    bg: "bg-cyan-500",
    glow: "rgba(6, 182, 212, 0.25)",
    shadow: "shadow-cyan-500/20",
    from: "from-cyan-500",
    to: "to-blue-500",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500/40",
    borderHover: "hover:border-emerald-400",
    bg: "bg-emerald-500",
    glow: "rgba(16, 185, 129, 0.25)",
    shadow: "shadow-emerald-500/20",
    from: "from-emerald-500",
    to: "to-teal-500",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/40",
    borderHover: "hover:border-blue-400",
    bg: "bg-blue-500",
    glow: "rgba(59, 130, 246, 0.25)",
    shadow: "shadow-blue-500/20",
    from: "from-blue-500",
    to: "to-cyan-500",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  orange: {
    text: "text-amber-400",
    border: "border-amber-500/40",
    borderHover: "hover:border-amber-400",
    bg: "bg-amber-500",
    glow: "rgba(245, 158, 11, 0.25)",
    shadow: "shadow-amber-500/20",
    from: "from-amber-500",
    to: "to-orange-500",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  indigo: {
    text: "text-indigo-400",
    border: "border-indigo-500/40",
    borderHover: "hover:border-indigo-400",
    bg: "bg-indigo-500",
    glow: "rgba(99, 102, 241, 0.25)",
    shadow: "shadow-indigo-500/20",
    from: "from-indigo-500",
    to: "to-purple-500",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  },
  red: {
    text: "text-rose-400",
    border: "border-rose-500/40",
    borderHover: "hover:border-rose-400",
    bg: "bg-rose-500",
    glow: "rgba(244, 63, 94, 0.25)",
    shadow: "shadow-rose-500/20",
    from: "from-rose-500",
    to: "to-pink-500",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  },
  gold: {
    text: "text-amber-400",
    border: "border-amber-400/50",
    borderHover: "hover:border-amber-300",
    bg: "bg-amber-400",
    glow: "rgba(251, 191, 36, 0.3)",
    shadow: "shadow-amber-500/30",
    from: "from-amber-400",
    to: "to-yellow-500",
    badge: "bg-amber-500/15 text-amber-300 border-amber-400/30 font-semibold",
  },
  silver: {
    text: "text-slate-500",
    border: "border-slate-400/50",
    borderHover: "hover:border-slate-200",
    bg: "bg-slate-300",
    glow: "rgba(203, 213, 225, 0.25)",
    shadow: "shadow-slate-400/20",
    from: "from-slate-400",
    to: "to-slate-600",
    badge: "bg-slate-500/15 text-slate-500 border-slate-400/30 font-semibold",
  },
  bronze: {
    text: "text-orange-300",
    border: "border-orange-500/50",
    borderHover: "hover:border-orange-400",
    bg: "bg-orange-500",
    glow: "rgba(249, 115, 22, 0.25)",
    shadow: "shadow-orange-500/20",
    from: "from-orange-500",
    to: "to-amber-700",
    badge: "bg-orange-500/15 text-orange-200 border-orange-400/30 font-semibold",
  },
  slate: {
    text: "text-slate-500",
    border: "border-slate-700",
    borderHover: "hover:border-slate-500",
    bg: "bg-slate-700",
    glow: "rgba(148, 163, 184, 0.15)",
    shadow: "shadow-slate-700/20",
    from: "from-slate-700",
    to: "to-slate-800",
    badge: "bg-slate-800 text-slate-300 border-slate-700",
  },
};

export const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const SectionWrapper = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    className={`relative ${sectionPaddingY} ${sectionPaddingX} overflow-hidden flex flex-col justify-center ${className}`}
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: "some" }}
  >
    {/* Ambient Light Accent */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
    <div className="max-w-7xl mx-auto w-full z-10">{children}</div>
  </motion.section>
);

export const SectionHeader = ({ badge, title, subtitle }) => (
  <div className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto">
    {badge && (
      <span className="block text-xs font-mono font-medium tracking-[0.2em] uppercase text-text-muted mb-3">
        {badge}
      </span>
    )}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4 font-heading">
      {title}
    </h2>
    {subtitle && (
      <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
        {subtitle}
      </p>
    )}
  </div>
);

export const IconBox = ({ icon, color = "purple", className = "" }) => {
  const c = accentColors[color] || accentColors.purple;
  return (
    <div className={`p-3 rounded-xl bg-bg-surface border ${c.border} ${c.text} ${className}`}>
      {icon}
    </div>
  );
};

export const GlassCard = ({
  children,
  accentColor = "purple",
  className = "",
  onClick,
}) => {
  const color = accentColors[accentColor] || accentColors.purple;
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      // --card-glow feeds the shared .card-hover-glow rule so every card across
      // About / Experience / Skills / Projects glows in its own accent on hover.
      style={{ "--card-glow": color.glow }}
      className={`relative group card-hover-glow bg-bg-surface backdrop-blur-xl rounded-2xl ${cardPadding} border border-border-default ${color.borderHover} transition-all duration-300 overflow-hidden shadow-xl hover:${color.shadow} ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${color.glow}, transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const PrimaryButton = ({ children, className = "", href, onClick, ...props }) => {
  const commonClasses = `group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 cursor-pointer ${focusRing} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  const innerContent = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 group-hover:opacity-90 transition-opacity"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a href={href} className={commonClasses} onClick={onClick} {...motionProps} {...props}>
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button className={commonClasses} onClick={onClick} {...motionProps} {...props}>
      {innerContent}
    </motion.button>
  );
};

export const SecondaryButton = ({
  children,
  className = "",
  accentColor = "purple",
  href,
  onClick,
  ...props
}) => {
  const color = accentColors[accentColor] || accentColors.purple;
  const commonClasses = `group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm bg-bg-surface backdrop-blur-md border ${color.border} ${color.text} hover:bg-bg-surface-elevated hover:text-text-primary transition-all duration-300 shadow-md cursor-pointer ${focusRing} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  const innerContent = (
    <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
      {children}
    </span>
  );

  if (href) {
    return (
      <motion.a href={href} className={commonClasses} onClick={onClick} {...motionProps} {...props}>
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button className={commonClasses} onClick={onClick} {...motionProps} {...props}>
      {innerContent}
    </motion.button>
  );
};