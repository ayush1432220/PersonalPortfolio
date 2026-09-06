import React from "react";
import { motion } from "framer-motion";
import { Trophy, Code2, GraduationCap, Award, Sparkles } from "lucide-react";
import { containerVariants, cardVariants, sectionPaddingX } from "./DesignSystem";

export default function StatsSection() {
  const stats = [
    {
      label: "Competitions & Awards",
      value: "13+",
      subtext: "National & State Level Victories",
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      color: "from-amber-500/20 to-yellow-500/10",
      borderColor: "border-amber-500/30",
    },
    {
      label: "Podium Champions",
      value: "4x",
      subtext: "1st Place Winner in Robotics & Demos",
      icon: <Award className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 to-pink-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      label: "Featured Projects",
      value: "7+",
      subtext: "Full-Stack, AI & Steganography Apps",
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 to-blue-500/10",
      borderColor: "border-cyan-500/30",
    },
    {
      label: "Academic Excellence",
      value: "7.56",
      subtext: "CGPA • B.Tech CSE (MUIT Lucknow)",
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/30",
    },
  ];

  return (
    <div className={`relative py-14 sm:py-16 ${sectionPaddingX} max-w-7xl mx-auto z-20`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${stat.color} backdrop-blur-xl border ${stat.borderColor} transition-all duration-300 shadow-xl overflow-hidden group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-bg-surface border border-border-default shadow-inner group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <Sparkles className="w-4 h-4 text-text-muted group-hover:text-purple-400 transition-colors" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-text-primary">
              {stat.label}
            </div>
            <div className="text-[11px] text-text-secondary mt-1 font-mono">
              {stat.subtext}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
