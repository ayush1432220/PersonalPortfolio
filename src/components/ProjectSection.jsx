import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  Code,
  Leaf,
  Lock,
  Puzzle,
  Film,
  Newspaper,
  Trophy,
} from "lucide-react";
import {
  SectionWrapper,
  SectionHeader,
  GlassCard,
  accentColors,
  containerVariants,
} from "./DesignSystem";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 7,
      title: "WanderLust (Airbnb Clone)",
      category: "fullstack",
      description:
        "A full-stack travel stay platform where users can explore and list rooms and hotels. Features a dynamic category-based filtering system to enhance user experience.",
      techStack: ["MongoDB", "Express.js", "EJS", "Bootstrap"],
      icon: <Globe className="w-6 h-6" />,
      liveLink: "https://wonder-krxi.onrender.com/listings",
      githubLink: "https://github.com/ayush1432220/Wonder",
      highlight: "Advanced Filtering System",
      color: "blue",
    },
    {
      id: 1,
      title: "AI News Summarizer",
      category: "fullstack",
      description:
        "A MERN stack app that tackles information overload by fetching real-time global news and using Google's Gemini API to provide quick, bullet-point summaries.",
      techStack: ["React", "Node.js", "MongoDB", "Gemini API"],
      icon: <Newspaper className="w-6 h-6" />,
      liveLink: "https://flourishing-taffy-c497be.netlify.app/",
      githubLink: "https://github.com/ayush1432220/AI-News-Summarizer",
      highlight: "Real-time AI Summaries",
      color: "purple",
    },
    {
      id: 2,
      title: "Secure Disguised Messenger",
      category: "frontend",
      description:
        "A unique web app that encrypts secret messages and disguises them inside harmless-looking study notes for secure communication in plain sight.",
      techStack: ["React", "Cryptography", "Steganography"],
      icon: <Lock className="w-6 h-6" />,
      liveLink: "https://message-crypto.vercel.app/",
      githubLink: "https://github.com/ayush1432220/MessageCrypto",
      highlight: "Steganography in Notes",
      color: "red",
    },
    {
      id: 3,
      title: "QuizMaster",
      category: "frontend",
      description:
        "An interactive quiz application with a dynamic quiz engine and a persistent leaderboard to track user progress, focusing on state management and UX.",
      techStack: ["React", "State Management", "Routing"],
      icon: <Puzzle className="w-6 h-6" />,
      liveLink: "https://quiz-a4mybfbrh-ayush1432220s-projects.vercel.app/",
      githubLink: "https://github.com/ayush1432220/QuizApp",
      highlight: "Interactive Quiz Engine",
      color: "cyan",
    },
    {
      id: 4,
      title: "Sudoku Pro",
      category: "frontend",
      description:
        "A feature-rich Sudoku game built with pure JavaScript, featuring a backtracking algorithm for puzzle generation, a timer, and persistent stats using localStorage.",
      techStack: ["HTML", "CSS", "JavaScript", "Algorithms"],
      icon: <Puzzle className="w-6 h-6" />,
      liveLink: "https://ayush1432220.github.io/Suduko-Pro/", // <-- UPDATED LIVE LINK
      githubLink: "https://github.com/ayush1432220/Suduko-Pro",
      highlight: "Algorithmic Puzzle Generation",
      color: "indigo",
    },
    {
      id: 5,
      title: "ForestAgent",
      category: "ai",
      description:
        "An environmental monitoring tool using client-side image processing to compare satellite images and visually highlight deforestation or land-use changes.", 
      techStack: ["Next.js", "React", "Image Processing"],
      icon: <Leaf className="w-6 h-6" />,
      liveLink: "https://forest-agent.vercel.app/",
      githubLink: "https://github.com/ayush1432220/ForestAgent",
      highlight: "Satellite Image Analysis",
      color: "emerald",
    },
    {
      id: 6,
      title: "MediaDiscover",
      category: "frontend",
      description:
        "A dynamic and responsive web application built with vanilla JavaScript for exploring and discovering movies and TV shows, complete with details and user reviews.",
      techStack: ["HTML", "CSS", "JavaScript", "API"],
      icon: <Film className="w-6 h-6" />,
      liveLink: "https://ayush1432220.github.io/MediaDiscover/",
      githubLink: "https://github.com/ayush1432220/MediaDiscover",
      highlight: "Vanilla JS Movie Explorer",
      color: "orange",
    },
  ];

  const categories = [
    { id: "all", label: "All", icon: <Code className="w-4 h-4" /> },
    {
      id: "fullstack",
      label: "Full Stack",
      icon: <Globe className="w-4 h-4" />,
    },
    { id: "ai", label: "AI/ML", icon: <Zap className="w-4 h-4" /> },
    { id: "frontend", label: "Frontend", icon: <Code className="w-4 h-4" /> },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        title="Featured Projects"
        subtitle="A showcase of innovative projects spanning full-stack development, AI/ML applications, and frontend engineering."
      />

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm relative overflow-hidden ${
              activeFilter === category.id
                ? "text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeFilter === category.id && (
              <motion.div
                layoutId="active-filter-pill"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -z-10"
                style={{ borderRadius: "12px" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {category.icon} {category.label}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.map((project) => (
          <GlassCard key={project.id} accentColor={project.color}>
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${
                  accentColors[project.color].from
                } ${accentColors[project.color].to} text-white shadow-lg`}
              >
                {project.icon}
              </div>
              {project.award && (
                <div className="flex items-center gap-1 text-yellow-400 text-xs font-semibold bg-yellow-400/10 px-3 py-1 rounded-full">
                  <Trophy className="w-3 h-3" />
                  <span>Award Winner</span>
                </div>
              )}
            </div>
            <div>
              <p
                className={`text-sm font-semibold mb-1 ${
                  accentColors[project.color].text
                }`}
              >
                {project.highlight}
              </p>
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-slate-800/70 text-slate-300 px-3 py-1 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-700 flex gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center py-2 px-4 rounded-lg text-sm font-semibold text-white transition-colors bg-gradient-to-r ${
                    accentColors[project.color].from
                  } ${accentColors[project.color].to} hover:brightness-125`}
                >
                  Live Demo
                </a>
              )}
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 px-4 rounded-lg text-sm font-semibold text-slate-300 transition-colors bg-slate-700/80 hover:bg-slate-700"
              >
                View Code
              </a>
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
