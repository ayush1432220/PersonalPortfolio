import React from "react";
import { motion } from "framer-motion";

export const accentColors = {
  purple: {
    text: "text-purple-400",
    border: "border-purple-400",
    bg: "bg-purple-400",
    shadow: "shadow-purple-500/30",
    from: "from-purple-500",
    to: "to-pink-500",
  },
  pink: {
    text: "text-pink-400",
    border: "border-pink-400",
    bg: "bg-pink-400",
    shadow: "shadow-pink-500/30",
    from: "from-pink-500",
    to: "fuchsia-500",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-400",
    bg: "bg-cyan-400",
    shadow: "shadow-cyan-500/30",
    from: "from-cyan-500",
    to: "sky-500",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-400",
    bg: "bg-emerald-400",
    shadow: "shadow-emerald-500/30",
    from: "from-emerald-500",
    to: "green-500",
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-400",
    bg: "bg-blue-400",
    shadow: "shadow-blue-500/30",
    from: "from-blue-500",
    to: "cyan-500",
  },
  orange: {
    text: "text-orange-400",
    border: "border-orange-400",
    bg: "bg-orange-400",
    shadow: "shadow-orange-500/30",
    from: "from-orange-500",
    to: "amber-500",
  },
  indigo: {
    text: "text-indigo-400",
    border: "border-indigo-400",
    bg: "bg-indigo-400",
    shadow: "shadow-indigo-500/30",
    from: "from-indigo-500",
    to: "violet-500",
  },
  red: {
    text: "text-red-400",
    border: "border-red-400",
    bg: "bg-red-400",
    shadow: "shadow-red-500/30",
    from: "from-red-500",
    to: "rose-500",
  },
  yellow: {
    text: "text-yellow-400",
    border: "border-yellow-400",
    bg: "bg-yellow-400",
    shadow: "shadow-yellow-500/30",
    from: "from-yellow-400",
    to: "amber-400",
  },
  slate: {
    text: "text-slate-400",
    border: "border-slate-400",
    bg: "bg-slate-400",
    shadow: "shadow-slate-500/30",
    from: "from-slate-500",
    to: "gray-500",
  },
  gold: {
    text: "text-yellow-400",
    border: "border-yellow-400",
    bg: "bg-yellow-400",
    shadow: "shadow-yellow-500/30",
    from: "from-yellow-400",
    to: "amber-400",
  },
  silver: {
    text: "text-slate-300",
    border: "border-slate-300",
    bg: "bg-slate-300",
    shadow: "shadow-slate-400/30",
    from: "from-slate-400",
    to: "gray-400",
  },
  bronze: {
    text: "text-orange-400",
    border: "border-orange-400",
    bg: "bg-orange-400",
    shadow: "shadow-orange-500/30",
    from: "from-orange-400",
    to: "amber-500",
  },
};

export const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const SectionWrapper = ({ children, id }) => (
  <motion.section
    id={id}
    className="relative py-24 px-6 overflow-hidden min-h-screen flex flex-col justify-center"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" />
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="max-w-7xl mx-auto w-full z-10">{children}</div>
  </motion.section>
);

export const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 animate-pulse"></div>
  </div>
);

export const GlassCard = ({
  children,
  accentColor = "purple",
  className = "",
}) => {
  const color = accentColors[accentColor];
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: 1.03,
        transition: { type: "spring", stiffness: 300 },
      }}
      className={`group bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-700 hover:${color.border} transition-all duration-300 shadow-lg hover:${color.shadow} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const PrimaryButton = ({ children, className = "", href, ...props }) => {
    const commonClasses = `group relative bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg shadow-purple-500/25 ${className}`;
  
    const motionProps = {
      whileHover: { scale: 1.05, boxShadow: "0 0 25px rgba(236, 72, 153, 0.5)" },
      whileTap: { scale: 0.95 },
    };
  
    const content = (
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    );
  
    if (href) {
      return (
        <motion.a
          href={href}
          className={commonClasses}
          {...motionProps}
          {...props}
        >
          {content}
        </motion.a>
      );
    }
  
    return (
      <motion.button className={commonClasses} {...motionProps} {...props}>
        {content}
      </motion.button>
    );
};

export const SecondaryButton = ({
  children,
  className = "",
  accentColor = "purple",
  href, 
  ...props
}) => {
  const color = accentColors[accentColor];
  const commonClasses = `bg-slate-900/60 backdrop-blur-sm border ${color.border}/60 ${color.text} hover:bg-purple-500/20 hover:${color.border} hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-md ${color.shadow} ${className}`;
  
  const motionProps = {
    whileHover: {
      scale: 1.05,
      boxShadow: `0 0 25px rgba(192, 132, 252, 0.4)`,
    },
    whileTap: { scale: 0.95 },
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
    </span>
  );

  if (href) {
    return (
        <motion.a 
            href={href} 
            className={commonClasses}
            {...motionProps}
            {...props}
        >
            {content}
        </motion.a>
    );
  }

  return (
    <motion.button
      className={commonClasses}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
};