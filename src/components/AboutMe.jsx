import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, Trophy } from 'lucide-react';
import { SectionWrapper, SectionHeader, GlassCard, accentColors, containerVariants } from './DesignSystem';

export default function AboutMeSection() {
    return (
        <SectionWrapper id="about">
            <SectionHeader 
                title="About Me"
                subtitle="A growth-oriented developer passionate about creating innovative solutions at the intersection of technology and human needs."
            />
            <motion.div 
                className="grid lg:grid-cols-5 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="lg:col-span-3 space-y-8">
                    <GlassCard accentColor="purple">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 bg-gradient-to-br ${accentColors.purple.from} ${accentColors.purple.to} rounded-xl text-white shadow-lg`}>
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white">My Passion</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                            I'm driven by the endless possibilities that emerge when <strong>Full-Stack Development</strong>, 
                            <strong> AI/ML</strong>, and <strong>Robotics</strong> converge. Every line of code I write and every 
                            robot I build represents a step toward creating technology that doesn't just work—it transforms.
                        </p>
                    </GlassCard>
                     <GlassCard accentColor="blue">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 bg-gradient-to-br ${accentColors.blue.from} ${accentColors.blue.to} rounded-xl text-white shadow-lg`}>
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white">Academic Journey</h3>
                        </div>
                        <div className={`border-l-4 ${accentColors.blue.border} pl-4`}>
                            <h4 className="font-semibold text-slate-100">B.Tech Computer Science & Engineering</h4>
                            <p className="text-slate-300">MUIT, Lucknow • CGPA: 7.56</p>
                            <p className="text-sm text-slate-400">Final Year • 2021-2025</p>
                        </div>
                    </GlassCard>
                </div>
                <div className="lg:col-span-2 space-y-8">
                     <GlassCard accentColor="emerald">
                        <div className="flex items-center gap-4 mb-4">
                           <div className={`p-3 bg-gradient-to-br ${accentColors.emerald.from} ${accentColors.emerald.to} rounded-xl text-white shadow-lg`}>
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white">Core Strengths</h3>
                        </div>
                        <ul className="space-y-2">
                           {["MERN Stack Development", "AI/ML Implementations", "Robotics Competition Winner", "RESTful API Design"].map((item, i) => (
                               <li key={i} className="flex items-center gap-3">
                                   <div className={`w-1.5 h-1.5 ${accentColors.emerald.bg} rounded-full`}></div>
                                   <span className="text-slate-300">{item}</span>
                               </li>
                           ))}
                        </ul>
                    </GlassCard>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}