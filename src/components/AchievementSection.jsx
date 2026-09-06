import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Rocket,
  Zap,
  Users,
  Code,
  Globe,
  Award,
  Eye,
  Sparkles,
  Medal,
  Star,
} from "lucide-react";
import {
  SectionWrapper,
  SectionHeader,
  GlassCard,
  IconBox,
  accentColors,
  containerVariants,
  focusRing,
} from "./DesignSystem";

export default function AchievementsSection() {
  const [filter, setFilter] = useState("all");

  const achievements = [
    {
      title: "Prism 2k24 Roborace",
      organizer: "Lucknow University",
      position: "1st Place Winner",
      badgeType: "gold",
      icon: <Trophy className="w-6 h-6 text-amber-300" />,
      description:
        "Designed and engineered a custom autonomous roborace vehicle from scratch, securing 1st position through superior motor torque tuning and chassis geometry.",
      color: "gold",
      type: "robotics",
    },
    {
      title: "Thar 2k24 Tug of War",
      organizer: "Rajasthan Technical University",
      position: "1st Place Winner",
      badgeType: "gold",
      icon: <Trophy className="w-6 h-6 text-amber-300" />,
      description:
        "Engineered a high-torque robotic system winning top honors in the robotic tug-of-war championship through structural mechanical design.",
      color: "gold",
      type: "robotics",
    },
    {
      title: "Botfiesta 2023 Roborace",
      organizer: "MUIT, Lucknow",
      position: "1st Place Winner",
      badgeType: "gold",
      icon: <Trophy className="w-6 h-6 text-amber-300" />,
      description:
        "Secured first position in campus championship with an agile track robot designed for rapid acceleration and obstacle navigation.",
      color: "gold",
      type: "robotics",
    },
    {
      title: "IEEE Roborace Championship",
      organizer: "Bansal Institute (IEEE)",
      position: "1st Place Winner",
      badgeType: "gold",
      icon: <Trophy className="w-6 h-6 text-amber-300" />,
      description:
        "Secured 1st place in IEEE certified robotics competition evaluating vehicle control dynamics and obstacle course speed.",
      color: "gold",
      type: "robotics",
    },
    {
      title: "Eye Controlled Mouse Demo",
      organizer: "MUIT, Lucknow",
      position: "1st Place Winner",
      badgeType: "gold",
      icon: <Eye className="w-6 h-6 text-amber-300" />,
      description:
        "Developed a hands-free mouse control software using computer vision eye-tracking algorithms, taking home 1st prize in software demo.",
      color: "gold",
      type: "demo",
    },
    {
      title: "WebX Hackathon",
      organizer: "GLA University",
      position: "2nd Place (Silver)",
      badgeType: "silver",
      icon: <Code className="w-6 h-6 text-text-primary" />,
      description:
        "Designed and built a cyberpunk esports UI platform during a 24-hour hackathon, blending artistic aesthetics with interactive frontend performance.",
      color: "silver",
      type: "hackathon",
    },
    {
      title: "Gantavya 2k24 Roborace",
      organizer: "SRMCEM, Lucknow",
      position: "2nd Place (Silver)",
      badgeType: "silver",
      icon: <Award className="w-6 h-6 text-text-primary" />,
      description:
        "Podium finish in roborace competition demonstrating advanced wireless control stability and rapid lap timing.",
      color: "silver",
      type: "robotics",
    },
    {
      title: "Line Follower Competition",
      organizer: "Bansal Institute (IEEE RAS)",
      position: "2nd Place (Silver)",
      badgeType: "silver",
      icon: <Award className="w-6 h-6 text-text-primary" />,
      description:
        "Programmed an IR-sensor array line-follower bot achieving 2nd place for high-speed track navigation and precision PID control.",
      color: "silver",
      type: "robotics",
    },
    {
      title: "Cozmolench Techfest",
      organizer: "IIT Bombay",
      position: "3rd Place (Bronze)",
      badgeType: "bronze",
      icon: <Rocket className="w-6 h-6 text-orange-400" />,
      description:
        "Competed at IIT Bombay's flagship tech festival against top national engineering teams, securing 3rd place in robotics mechanics.",
      color: "bronze",
      type: "robotics",
    },
    {
      title: "Technoxian WRC Global Stage",
      organizer: "World Robotics Championship",
      position: "4th Rank Global",
      badgeType: "bronze",
      icon: <Globe className="w-6 h-6 text-orange-400" />,
      description:
        "Designed a high-speed racing bot competing against international university teams, securing 4th overall rank.",
      color: "bronze",
      type: "robotics",
    },
    {
      title: "Celesta Death Race",
      organizer: "IIT Patna",
      position: "6th Place Rank",
      badgeType: "bronze",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      description:
        "Raced a rugged mechanical bot in extreme arena challenges, demonstrating resilience and engineering adaptability.",
      color: "purple",
      type: "robotics",
    },
    {
      title: "Techkriti '23",
      organizer: "IIT Kanpur",
      position: "Certificate of Merit",
      badgeType: "bronze",
      icon: <Star className="w-6 h-6 text-indigo-400" />,
      description:
        "The inception of my robotics journey, earning a Certificate of Merit at IIT Kanpur's annual technical festival.",
      color: "indigo",
      type: "robotics",
    },
    {
      title: "Hack with Uttar Pradesh 2025",
      organizer: "Chandigarh University",
      position: "Hackathon Participant",
      badgeType: "bronze",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      description:
        "State-level 36-hour hackathon developing a meeting automation tool, sharpening real-world product development skills.",
      color: "blue",
      type: "hackathon",
    },
  ];

  const filterButtons = [
    { id: "all", label: "All Achievements" },
    { id: "gold", label: "1st Place Wins (5)" },
    { id: "hackathon", label: "Hackathons" },
    { id: "robotics", label: "Robotics" },
  ];

  const filteredAchievements =
    filter === "all"
      ? achievements
      : filter === "gold"
      ? achievements.filter((a) => a.badgeType === "gold")
      : achievements.filter((a) => a.type === filter);

  return (
    <SectionWrapper id="achievements">
      <SectionHeader
        badge="HONORS & AWARDS"
        title="13+ National & State Victories"
        subtitle="A proven track record of engineering excellence across robotics championships, hackathons, and software demonstrations."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-14">
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            aria-pressed={filter === btn.id}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-300 ${focusRing} ${
              filter === btn.id
                ? "text-text-primary bg-purple-600/30 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                : "text-text-secondary hover:text-text-primary bg-bg-surface border border-border-default hover:border-border-strong"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredAchievements.map((ach) => (
          <GlassCard key={ach.title} accentColor={ach.color} className="flex flex-col justify-between h-full">
            <div>
              {/* Header Icon + Position Badge */}
              <div className="flex items-start justify-between mb-4">
                <IconBox icon={ach.icon} color={ach.color} />

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                    accentColors[ach.color].badge
                  }`}
                >
                  <Medal className="w-3.5 h-3.5" />
                  {ach.position}
                </span>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-1 font-heading group-hover:text-amber-300 transition-colors">
                {ach.title}
              </h3>
              <p className="text-xs font-mono text-purple-400 mb-3">
                {ach.organizer}
              </p>
              <p className="text-text-secondary leading-relaxed text-xs sm:text-sm">
                "{ach.description}"
              </p>
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
