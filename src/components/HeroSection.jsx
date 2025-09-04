import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  Zap,
  ArrowRight,
  Github,
  Mail,
  Linkedin,
} from "lucide-react";
import {
  SectionWrapper,
  PrimaryButton,
  SecondaryButton,
  accentColors,
} from "./DesignSystem";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-400/30 shadow-md shadow-purple-500/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
            Available for Opportunities
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Ayush Chaurasiya
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            A creative Full-Stack Developer and Robotics Engineer, transforming
            complex problems into elegant, high-performance digital solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <PrimaryButton href="#projects">
              Explore My Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </PrimaryButton>

            <SecondaryButton href="#contact">
              Let's Build Together
            </SecondaryButton>
          </motion.div>

          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              {
                href: "https://github.com/ayush1432220",
                icon: <Github className="w-5 h-5" />,
              },
              {
                href: "https://www.linkedin.com/in/ayush-chaurasiya96",
                icon: <Linkedin className="w-5 h-5" />,
              },
              {
                href: "mailto:chaurasiyavinod96@gmail.com",
                icon: <Mail className="w-5 h-5" />,
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2, color: "#c084fc" }}
                className="p-3 bg-slate-800/60 hover:bg-slate-700/80 rounded-lg transition-all duration-300 border border-slate-700/80 text-slate-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
          <motion.div
            className="w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[450px] h-[450px] mx-auto bg-gradient-to-br from-slate-900/10 to-transparent rounded-full flex items-center justify-center border border-purple-500/20 shadow-2xl shadow-purple-500/20 p-8">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <img 
                    src="/logo.jpg" 
                    alt="Ayush Chaurasiya" 
                    className="w-full h-full object-cover object-center rounded-full transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Gradient overlay for better integration */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
                {/* Animated border ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-20 animate-spin" style={{ animationDuration: '8s' }}></div>
              </div>
            </div>
          </motion.div>

          {[
            {
              icon: <Code className="w-10 h-10 text-blue-300" />,
              pos: "top-4 right-4",
              color: "blue",
            },
            {
              icon: <Cpu className="w-10 h-10 text-emerald-300" />,
              pos: "bottom-4 left-4",
              color: "emerald",
            },
            {
              icon: <Zap className="w-10 h-10 text-purple-300" />,
              pos: "top-1/2 -right-8",
              color: "purple",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`absolute w-20 h-20 bg-slate-900/60 backdrop-blur-md rounded-2xl flex items-center justify-center border ${
                accentColors[item.color].border
              }/40 shadow-lg ${accentColors[item.color].shadow} ${item.pos}`}
              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}