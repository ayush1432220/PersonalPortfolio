import React from 'react';
import { motion } from 'framer-motion';
import { Award, Brain, Server, Code, Monitor, Users, ExternalLink } from 'lucide-react';
import { SectionWrapper, SectionHeader, GlassCard, accentColors, containerVariants } from './DesignSystem';

export default function CertificationsSection() {
    const certifications = [
        {
            title: "Career Essentials in Generative AI",
            provider: "Microsoft and LinkedIn",
            description: "Completed a comprehensive learning path on the fundamentals and applications of Generative AI.",
            icon: <Brain className="w-6 h-6" />,
            color: "purple",
            link: "https://www.linkedin.com/learning/certificates/81aefc1569b41ca39b8c72dd7577cea477d907869962cd246c89ef1e1dea2039"
        },
        {
            title: "Node.js & Express Bootcamp",
            provider: "DevTown",
            description: "An intensive 7-day hands-on bootcamp covering backend development with Node.js and Express.",
            icon: <Server className="w-6 h-6" />,
            color: "emerald",
            link: null
        },
        {
            title: "Java and C++ Programming",
            provider: "Udemy",
            description: "A foundational course on object-oriented programming, data structures, and algorithms in Java and C++.",
            icon: <Code className="w-6 h-6" />,
            color: "red",
            link: null
        },
        {
            title: "Web Design with HTML & CSS",
            provider: "TechGyan",
            description: "Gained comprehensive skills in modern web design principles through hands-on projects with HTML5 & CSS3.",
            icon: <Monitor className="w-6 h-6" />,
            color: "blue",
            link: null
        },
        {
            title: "C Programming Certification",
            provider: "Complete Coding by Prashant Sir",
            description: "Successfully passed a certification test, enhancing foundational skills in C programming and logic.",
            icon: <Code className="w-6 h-6" />,
            color: "orange",
            link: null
        },
        {
            title: "AI Day Lucknow Attendee",
            provider: "ML Community",
            description: "Attended workshops and networked with industry experts on the latest trends in Artificial Intelligence.",
            icon: <Users className="w-6 h-6" />,
            color: "yellow",
            link: null
        }
    ];

    const CardContent = ({ cert }) => (
        <>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${accentColors[cert.color].from} ${accentColors[cert.color].to} rounded-xl text-white shadow-lg`}>
                        {cert.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                        <p className={`text-sm font-medium ${accentColors[cert.color].text}`}>{cert.provider}</p>
                    </div>
                </div>
                {cert.link && (
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                )}
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
                {cert.description}
            </p>
        </>
    );

    return (
        <SectionWrapper id="certifications">
            <SectionHeader 
                title="Certifications & Learning"
                subtitle="A commitment to continuous growth, validated by industry-recognized certifications and active community participation."
            />
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {certifications.map((cert) => (
                    cert.link ? (
                        <a key={cert.title} href={cert.link} target="_blank" rel="noopener noreferrer">
                            <GlassCard accentColor={cert.color} className="h-full">
                                <CardContent cert={cert} />
                            </GlassCard>
                        </a>
                    ) : (
                        <GlassCard key={cert.title} accentColor={cert.color} className="h-full">
                            <CardContent cert={cert} />
                        </GlassCard>
                    )
                ))}
            </motion.div>
        </SectionWrapper>
    );
}