import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Handshake, Rocket } from 'lucide-react';
import { SectionWrapper, SectionHeader, GlassCard, PrimaryButton, accentColors, containerVariants, cardVariants } from './DesignSystem';

export default function ContactSection() {
    const contactInfo = [
        { icon: <Mail className="w-6 h-6" />, label: "Email", value: "chaurasiyavinod96@gmail.com", link: "mailto:chaurasiyavinod96@gmail.com", color: "blue" },
        { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+91 9616250906", link: "tel:+919616250906", color: "emerald" },
        { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "in/ayush-chaurasiya96", link: "https://www.linkedin.com/in/ayush-chaurasiya96", color: "cyan" },
        { icon: <Github className="w-6 h-6" />, label: "GitHub", value: "ayush1432220", link: "https://github.com/ayush1432220", color: "slate" }
    ];

    const whyWorkWithMePoints = [
        {
            title: "Full-Stack Expertise:",
            text: "From React frontends to Node.js backends, I build complete, end-to-end solutions."
        },
        {
            title: "Competition-Proven:",
            text: "Multiple top positions in hackathons showcase my ability to deliver high-quality work under pressure."
        },
        {
            title: "AI & Robotics Ready:",
            text: "Experience with cutting-edge technologies to build tomorrow's innovative solutions."
        }
    ];

    return (
        <SectionWrapper id="contact">
            <SectionHeader
                title="Let's Build Together"
                subtitle="Ready to collaborate on the next breakthrough solution? Whether it's a project, an idea, or an opportunity, I'm ready to connect."
            />
            <GlassCard accentColor="purple" className="max-w-5xl mx-auto p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left - Contact info */}
                    <motion.div 
                        className="space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {contactInfo.map((contact) => (
                           <motion.a
                                key={contact.label}
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={cardVariants}
                                whileHover={{ scale: 1.05, transition: { type: 'spring' } }}
                                className={`flex items-center gap-4 p-4 bg-slate-800/70 rounded-xl transition-all duration-300 hover:bg-slate-800 border border-slate-700 hover:${accentColors[contact.color].border}`}
                           >
                               <div className={`p-3 ${accentColors[contact.color].text} bg-slate-900/80 rounded-lg`}>
                                   {contact.icon}
                               </div>
                               <div>
                                   <div className="text-sm font-medium text-slate-400">{contact.label}</div>
                                   <div className="font-semibold text-slate-200">{contact.value}</div>
                               </div>
                           </motion.a>
                        ))}
                    </motion.div>
                    
                    {/* Right - Why Work With Me */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Rocket className={`w-10 h-10 ${accentColors.purple.text} drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]`} />
                            <h3 className="text-2xl font-bold text-white">Why Work With Me?</h3>
                        </div>
          
                        <div className="space-y-4">
                            {whyWorkWithMePoints.map((point, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className={`w-2 h-2 mt-2 flex-shrink-0 rounded-full ${accentColors.purple.bg} shadow-lg`}></div>
                                    <p className="text-slate-300">
                                        <span className="text-white font-semibold">{point.title}</span> {point.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            {/* --- CORRECTION IS HERE --- */}
                            <PrimaryButton 
                                href="mailto:chaurasiyavinod96@gmail.com"
                                className="w-full"
                            >
                                <Mail className="w-5 h-5" />
                                Send an Email
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </SectionWrapper>
    )
}