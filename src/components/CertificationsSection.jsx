import React from "react";
import { motion } from "framer-motion";
import { Brain, Server, Monitor, ExternalLink, CheckCircle, GraduationCap } from "lucide-react";
import { SectionWrapper, SectionHeader, GlassCard, IconBox, accentColors, containerVariants } from "./DesignSystem";

export default function CertificationsSection() {
  const certifications = [
    {
      title: "Career Essentials in Generative AI",
      provider: "Microsoft & LinkedIn Learning",
      description:
        "Comprehensive professional credential covering Generative AI fundamentals, LLM architecture, prompt engineering, and ethical AI implementation.",
      icon: <Brain className="w-6 h-6 text-purple-300" />,
      color: "purple",
      link: "https://www.linkedin.com/learning/certificates/81aefc1569b41ca39b8c72dd7577cea477d907869962cd246c89ef1e1dea2039",
      badgeText: "Verified Credential",
    },
    {
      title: "Web Development Workshop",
      provider: "IIT Kharagpur (Kshitij 2026)",
      description:
        "Hands-on intensive workshop certification in modern full-stack web architectures and responsive web design principles.",
      icon: <GraduationCap className="w-6 h-6 text-cyan-300" />,
      color: "cyan",
      link: null,
      badgeText: "IIT Kharagpur Workshop",
    },
    {
      title: "Building RESTful APIs with Node.js & Express",
      provider: "LinkedIn Learning",
      description:
        "Specialized course certification on REST architecture design, route handling, middleware pipelines, and API security.",
      icon: <Server className="w-6 h-6 text-emerald-300" />,
      color: "emerald",
      link: null,
      badgeText: "LinkedIn Certification",
    },
    {
      title: "Modern Web Design with HTML5 & CSS3",
      provider: "TechGyan",
      description:
        "Hands-on certification in responsive web layout, flexbox/grid layout systems, and CSS animation principles.",
      icon: <Monitor className="w-6 h-6 text-blue-300" />,
      color: "blue",
      link: null,
      badgeText: "Practical Web Design",
    },
  ];

  return (
    <SectionWrapper id="certifications">
      <SectionHeader
        badge="VALIDATED SKILLS"
        title="Certifications & Continuous Learning"
        subtitle="Validated technical expertise across Generative AI, full-stack development, and backend microservices from top institutions."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
      >
        {certifications.map((cert) => {
          const content = (
            <GlassCard accentColor={cert.color} className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <IconBox icon={cert.icon} color={cert.color} />

                  {cert.link ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                      <CheckCircle className="w-3 h-3 text-cyan-400" /> Verify
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-text-secondary bg-bg-surface border border-border-default px-2.5 py-1 rounded-full">
                      {cert.badgeText}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-1 font-heading group-hover:text-purple-300 transition-colors">
                  {cert.title}
                </h3>
                <p className={`text-xs font-mono font-semibold mb-3 ${accentColors[cert.color].text}`}>
                  {cert.provider}
                </p>
                <p className="text-text-secondary leading-relaxed text-xs sm:text-sm">
                  {cert.description}
                </p>
              </div>
            </GlassCard>
          );

          return cert.link ? (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              {content}
            </a>
          ) : (
            <div key={cert.title} className="h-full">
              {content}
            </div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}