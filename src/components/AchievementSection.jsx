import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Rocket, Zap, Users, Target, Code, Cpu, Globe, Award, Eye } from 'lucide-react';
import { SectionWrapper, SectionHeader, GlassCard, accentColors, containerVariants } from './DesignSystem';

export default function AchievementsSection() {
    const achievements = [
        { 
            title: "Techkriti '23", 
            organizer: "IIT Kanpur",
            position: "Certificate of Merit", 
            icon: <Rocket className="w-8 h-8" />, 
            description: "The starting point of my robotics journey, competing at a prestigious annual technical and entrepreneurial festival.",
            color: "indigo",
            type: "Robotics"
        },
        { 
            title: "Prism 2k24 Roborace", 
            organizer: "Lucknow University",
            position: "1st Place", 
            icon: <Trophy className="w-8 h-8" />, 
            description: "Designed and developed a robotic car from scratch, clinching the top position through superior engineering and strategy.",
            color: "gold",
            type: "Robotics"
        },
        { 
            title: "Thar 2k24 Tug of War", 
            organizer: "Rajasthan Technical University",
            position: "1st Place", 
            icon: <Trophy className="w-8 h-8" />, 
            description: "Showcased prowess in the robotic tug of war, pushing the boundaries of innovation and mechanical strength.",
            color: "gold",
            type: "Robotics"
        },
        { 
            title: "Botfiesta 2023 Roborace", 
            organizer: "MUIT, Lucknow",
            position: "1st Place", 
            icon: <Trophy className="w-8 h-8" />, 
            description: "Secured the first position in a campus championship, reflecting the team's hard work and dedication.",
            color: "gold",
            type: "Robotics"
        },
        { 
            title: "IEEE Roborace Competition", 
            organizer: "Bansal Institute (IEEE)",
            position: "1st Place", 
            icon: <Trophy className="w-8 h-8" />, 
            description: "Secured top honors in an IEEE-certified competition, testing technical, programming, and teamwork skills.",
            color: "gold",
            type: "Robotics"
        },
        { 
            title: "Software Demonstration", 
            organizer: "MUIT, Lucknow",
            position: "1st Place", 
            icon: <Eye className="w-8 h-8" />, 
            description: "Presented the 'Eye Controlled Mouse' project, winning first prize for innovation in hands-free computing.",
            color: "gold",
            type: "Project Demo"
        },
        { 
            title: "WebX Hackathon", 
            organizer: "GLA University",
            position: "2nd Place", 
            icon: <Code className="w-8 h-8" />, 
            description: "Designed a cyberpunk-themed UI for an esports platform, blending web development skills with creative design.",
            color: "silver",
            type: "Hackathon"
        },
        { 
            title: "Gantavya 2k24 Roborace", 
            organizer: "SRMCEM, Lucknow",
            position: "2nd Place", 
            icon: <Award className="w-8 h-8" />, 
            description: "Clinched a podium finish in an exhilarating competition showcasing skills in robotics and autonomous driving.",
            color: "silver",
            type: "Robotics"
        },
        { 
            title: "Line Follower Competition", 
            organizer: "Bansal Institute (IEEE RAS)",
            position: "2nd Place", 
            icon: <Award className="w-8 h-8" />, 
            description: "Secured second position in a competition focused on precision navigation and control systems.",
            color: "silver",
            type: "Robotics"
        },
        { 
            title: "Cozmolench", 
            organizer: "Techfest, IIT Bombay",
            position: "3rd Place", 
            icon: <Rocket className="w-8 h-8" />, 
            description: "An exhilarating experience testing advanced robotics abilities and securing a podium finish against top national talent.",
            color: "bronze",
            type: "Robotics"
        },
        { 
            title: "Technoxian WRC", 
            organizer: "Global Stage",
            position: "4th Rank", 
            icon: <Globe className="w-8 h-8" />, 
            description: "Designed a high-performing robot for complex racetrack challenges, testing problem-solving and adaptability.",
            color: "bronze",
            type: "Robotics"
        },
        { 
            title: "Celesta Death Race", 
            organizer: "IIT Patna",
            position: "6th Place", 
            icon: <Zap className="w-8 h-8" />, 
            description: "Built and raced a robot in an intense high-speed competition, gaining valuable lessons in resilience and performance.",
            color: "purple",
            type: "Robotics"
        },
    ];

    return (
        <SectionWrapper id="achievements">
            <SectionHeader 
                title="Competition Journey"
                subtitle="A track record of performance and innovation across national-level robotics competitions, hackathons, and project showcases."
            />
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {achievements.map((ach) => (
                    <GlassCard key={ach.title} accentColor={ach.color}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 bg-gradient-to-br ${accentColors[ach.color].from} ${accentColors[ach.color].to} rounded-xl text-white shadow-lg`}>
                                {ach.icon}
                            </div>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-slate-800/70 ${accentColors[ach.color].text}`}>
                                <Award className="w-4 h-4" />
                                {ach.position}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{ach.title}</h3>
                            <p className="text-slate-400 font-medium mb-3">{ach.organizer}</p>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                "{ach.description}"
                            </p>
                        </div>
                    </GlassCard>
                ))}
            </motion.div>
        </SectionWrapper>
    )
}