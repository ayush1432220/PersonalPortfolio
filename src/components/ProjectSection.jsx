import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Zap,
  Code,
  Leaf,
  Lock,
  Puzzle,
  Film,
  Newspaper,
  Compass,
  Eye,
  Github,
  Linkedin,
  ArrowUpRight,
  Sparkles,
  Bot,
  Cpu,
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
import { usePointerTilt } from "../hooks/usePointerTilt";

/**
 * Wrapper that gives a project card a subtle 3D tilt toward the pointer.
 * Exists as its own component because hooks can't be called inside .map().
 */
function TiltCard({ children }) {
  const tiltRef = usePointerTilt({ max: 6, perspective: 1200 });
  return (
    <div ref={tiltRef} className="h-full will-change-transform">
      {children}
    </div>
  );
}

function ProjectVisual({ project }) {
  if (!project.image) {
    return (
      <div className="flex items-center justify-center h-40 sm:h-full min-h-[10rem] rounded-xl bg-slate-950 border border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-grid opacity-20" />
        <IconBox
          icon={React.cloneElement(project.icon, { className: "w-8 h-8" })}
          color={project.color}
          className="relative z-10 !p-4"
        />
      </div>
    );
  }

  return (
    <div className="h-full min-h-[16rem] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group/visual flex flex-col">
      <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-slate-900 border-b border-slate-800">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
      </div>
      <img
        src={project.image}
        alt={`${project.title} preview`}
        className="w-full flex-1 min-h-0 object-cover object-top transition-transform duration-500 group-hover/visual:scale-105"
      />
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Lumina AI — Smart Home Energy OS",
      category: "ai",
      description:
        "Smart Home Energy OS & 3D Digital Twin Dashboard engineered at HCLTech. Combines physics-based appliance modeling with ML for hourly load forecasting, state-wise electricity tariff calculations (5 Indian states + solar net metering), multimodal OCR bill scanning, and LangChain + Mistral energy diagnostics.",
      techStack: ["FastAPI", "Next.js", "Three.js", "Zustand", "scikit-learn", "LangChain", "Mistral AI", "OCR"],
      icon: <Cpu className="w-5 h-5" />,
      image: "/projects/lumina-ai.png",
      liveLink: null,
      githubLink: "https://github.com/ayush1432220",
      linkedinPost: "https://www.linkedin.com/posts/ayush-chaurasiya96_hcltech-buildinpublic-machinelearning-activity-7483822847312916481-jUyK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4VEcUBR3vvx5RDV0P56zpSIMOqhtM0n7o",
      highlight: "HCLTech Energy OS & Digital Twin",
      color: "cyan",
    },
    {
      id: 2,
      title: "SAARTHI – AI Station Navigation System",
      category: "ai",
      description:
        "An AI-powered railway passenger assistance system integrating Retrieval-Augmented Generation (RAG), Computer Vision, multilingual voice interaction, and 3D station navigation using LangChain, ChromaDB, YOLOv8, CSRNet, and FastAPI for intelligent route guidance, crowd monitoring, and real-time passenger support.",
      techStack: ["React.js", "Node.js", "FastAPI", "MongoDB", "LangChain", "ChromaDB", "YOLOv8", "CSRNet", "Three.js", "Sarvam AI"],
      icon: <Compass className="w-5 h-5" />,
      liveLink: "https://sarthi-liart.vercel.app/",
      githubLink: "https://github.com/ayush1432220/SARTHI",
      linkedinPost: "https://www.linkedin.com/posts/ayush-chaurasiya96_hcltech-generativeai-rag-activity-7487544881129762816-MNPn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4VEcUBR3vvx5RDV0P56zpSIMOqhtM0n7o",
      highlight: "AI RAG & 3D Railway Nav",
      color: "purple",
    },
    {
      id: 3,
      title: "NavSarthi AI RAG Chatbot",
      category: "ai",
      description:
        "A RAG-based AI chatbot system featuring automated document ingestion, intelligent text chunking, vector embeddings, semantic vector search, and LLM-powered response generation to deliver context-grounded answers from custom knowledge bases.",
      techStack: ["Python", "RAG", "LangChain", "Vector Search", "Embeddings", "LLMs", "FastAPI"],
      icon: <Bot className="w-5 h-5" />,
      liveLink: null,
      githubLink: "https://github.com/ayush1432220/NavSarthi-AI-Chatbot",
      linkedinPost: null,
      highlight: "RAG Knowledge Base Chatbot",
      color: "emerald",
    },
    {
      id: 4,
      title: "AI Student Focus Level Monitoring",
      category: "ai",
      description:
        "An intelligent engagement monitoring system for online classrooms utilizing webcam Computer Vision and Machine Learning. Analyzes real-time facial cues, eye tracking, blink detection, and head pose to generate dynamic Focus Scores and real-time analytics reports over Socket.IO.",
      techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Python", "OpenCV", "MediaPipe", "Socket.IO"],
      icon: <Eye className="w-5 h-5" />,
      liveLink: null,
      githubLink: "https://github.com/ayush1432220",
      linkedinPost: "https://www.linkedin.com/posts/ayush-chaurasiya96_artificialintelligence-machinelearning-computervision-activity-7469370130888736769-retX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4VEcUBR3vvx5RDV0P56zpSIMOqhtM0n7o",
      highlight: "Computer Vision & Focus Analytics",
      color: "blue",
    },
    {
      id: 5,
      title: "WanderLust (Airbnb Clone)",
      category: "fullstack",
      description:
        "A full-stack travel stay platform where users can explore and list rooms and hotels. Built with dynamic category filtering, map integrations, and complete user authentication.",
      techStack: ["MongoDB", "Express.js", "Node.js", "EJS", "Bootstrap"],
      icon: <Globe className="w-5 h-5" />,
      liveLink: "https://wonder-krxi.onrender.com/listings",
      githubLink: "https://github.com/ayush1432220/Wonder",
      linkedinPost: null,
      highlight: "Advanced Filtering System",
      color: "indigo",
    },
    {
      id: 6,
      title: "AI News Summarizer",
      category: "ai",
      description:
        "A MERN stack app that tackles news overload by fetching real-time global headlines and utilizing Google Gemini AI to generate concise, bulleted summaries.",
      techStack: ["React", "Node.js", "MongoDB", "Gemini AI API"],
      icon: <Newspaper className="w-5 h-5" />,
      liveLink: "https://flourishing-taffy-c497be.netlify.app/",
      githubLink: "https://github.com/ayush1432220/AI-News-Summarizer",
      linkedinPost: null,
      highlight: "Real-time AI Summaries",
      color: "purple",
    },
    {
      id: 7,
      title: "Secure Disguised Messenger",
      category: "frontend",
      description:
        "A unique web app that encrypts confidential text messages and disguises them inside benign-looking study notes for safe communication in plain sight.",
      techStack: ["React", "Cryptography", "Steganography", "Tailwind CSS"],
      icon: <Lock className="w-5 h-5" />,
      liveLink: "https://message-crypto.vercel.app/",
      githubLink: "https://github.com/ayush1432220/MessageCrypto",
      linkedinPost: null,
      highlight: "Steganography in Notes",
      color: "red",
    },
    {
      id: 8,
      title: "ForestAgent",
      category: "ai",
      description:
        "An environmental AI monitoring tool using client-side image processing to compare satellite imagery and visually highlight deforestation & land-use changes.",
      techStack: ["Next.js", "React", "Image Processing", "Tailwind CSS"],
      icon: <Leaf className="w-5 h-5" />,
      liveLink: "https://forest-agent.vercel.app/",
      githubLink: "https://github.com/ayush1432220/ForestAgent",
      linkedinPost: null,
      highlight: "Satellite Image Analysis",
      color: "cyan",
    },
    {
      id: 9,
      title: "QuizMaster Pro",
      category: "frontend",
      description:
        "An interactive quiz application with a dynamic test engine, timer controls, state persistence, and a live leaderboard to track performance.",
      techStack: ["React", "State Management", "React Router", "CSS Modules"],
      icon: <Puzzle className="w-5 h-5" />,
      liveLink: "https://quiz-a4mybfbrh-ayush1432220s-projects.vercel.app/",
      githubLink: "https://github.com/ayush1432220/QuizApp",
      linkedinPost: null,
      highlight: "Interactive Quiz Engine",
      color: "orange",
    },
    {
      id: 10,
      title: "Sudoku Pro Solver",
      category: "frontend",
      description:
        "A feature-rich Sudoku game built with pure JavaScript, featuring a recursive backtracking algorithm for puzzle generation and interactive solver aids.",
      techStack: ["HTML5", "CSS3", "JavaScript ES6+", "Algorithms"],
      icon: <Puzzle className="w-5 h-5" />,
      liveLink: "https://ayush1432220.github.io/Suduko-Pro/",
      githubLink: "https://github.com/ayush1432220/Suduko-Pro",
      linkedinPost: null,
      highlight: "Algorithmic Puzzle Generator",
      color: "gold",
    },
    {
      id: 11,
      title: "MediaDiscover",
      category: "frontend",
      description:
        "A dynamic and responsive web application built with vanilla JavaScript for discovering trending movies, TV shows, cast details, and user reviews.",
      techStack: ["HTML5", "CSS3", "Vanilla JS", "TMDB API"],
      icon: <Film className="w-5 h-5" />,
      liveLink: "https://ayush1432220.github.io/MediaDiscover/",
      githubLink: "https://github.com/ayush1432220/MediaDiscover",
      linkedinPost: null,
      highlight: "Vanilla JS Movie Explorer",
      color: "blue",
    },
  ];

  const categories = [
    { id: "all", label: "All Projects", icon: <Code className="w-3.5 h-3.5" /> },
    { id: "ai", label: "AI & RAG", icon: <Zap className="w-3.5 h-3.5" /> },
    { id: "fullstack", label: "Full Stack", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "frontend", label: "Frontend", icon: <Code className="w-3.5 h-3.5" /> },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const featuredProject = filteredProjects.find((p) => p.id === 1);
  const restProjects = filteredProjects.filter((p) => p.id !== 1);

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        badge="FEATURED WORK"
        title="Crafted Software & AI Applications"
        subtitle="A showcase of production-ready web applications, intelligent RAG & Computer Vision systems, and algorithmic solutions."
      />

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            aria-pressed={activeFilter === category.id}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-300 relative ${focusRing} ${
              activeFilter === category.id
                ? "text-text-primary bg-purple-600/30 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                : "text-text-secondary hover:text-text-primary bg-bg-surface border border-border-default hover:border-border-strong"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {category.icon}
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Featured Project Showcase */}
      <AnimatePresence mode="popLayout">
        {featuredProject && (
          <motion.div
            key="featured"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <GlassCard accentColor={featuredProject.color} className="p-0 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 sm:p-7 lg:p-8">
                  <ProjectVisual project={featuredProject} />
                </div>
                <div className="p-6 sm:p-7 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-mono font-semibold text-amber-300 uppercase tracking-wider">
                      Featured Project
                    </span>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${accentColors[featuredProject.color].badge}`}
                    >
                      {featuredProject.highlight}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 font-heading">
                    {featuredProject.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-5">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-bg-surface text-text-secondary border border-border-default px-2.5 py-1 rounded-md text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {featuredProject.liveLink && (
                      <a
                        href={featuredProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-white transition-all bg-gradient-to-r ${accentColors[featuredProject.color].from} ${accentColors[featuredProject.color].to} hover:brightness-110 shadow-md ${focusRing}`}
                      >
                        Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {featuredProject.linkedinPost && (
                      <a
                        href={featuredProject.linkedinPost}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-cyan-300 hover:text-text-primary transition-all bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 ${focusRing}`}
                      >
                        <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> Post <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={featuredProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary transition-all bg-bg-surface border border-border-default hover:border-border-strong ${focusRing}`}
                    >
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {restProjects.map((project) => (
          <TiltCard key={project.id}>
            <GlassCard accentColor={project.color} className="flex flex-col justify-between h-full">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <IconBox icon={project.icon} color={project.color} />
                  <span
                    className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${
                      accentColors[project.color].badge
                    }`}
                  >
                    {project.highlight}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-text-primary mb-2.5 font-heading group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-bg-surface text-text-secondary border border-border-default px-2.5 py-1 rounded-md text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="pt-4 border-t border-border-default flex flex-wrap items-center gap-2">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-white transition-all bg-gradient-to-r ${
                        accentColors[project.color].from
                      } ${accentColors[project.color].to} hover:brightness-110 shadow-md ${focusRing}`}
                    >
                      Live Demo
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.linkedinPost && (
                    <a
                      href={project.linkedinPost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-cyan-300 hover:text-text-primary transition-all bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 ${focusRing}`}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                      Post
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary transition-all bg-bg-surface border border-border-default hover:border-border-strong ${focusRing}`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </a>
                </div>
              </div>
            </GlassCard>
          </TiltCard>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
