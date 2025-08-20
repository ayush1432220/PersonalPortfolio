import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Database, Code, Brain, Cpu, GitBranch, Sparkles, Github, Zap, Star, Wrench } from 'lucide-react';
import * as THREE from 'three';
import { SectionWrapper, SectionHeader, GlassCard, accentColors, containerVariants } from './DesignSystem';

export default function SkillsSection() {
    const canvasRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!canvasRef.current) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const particles = new THREE.Group();
        const geometries = [new THREE.TetrahedronGeometry(0.3), new THREE.OctahedronGeometry(0.25), new THREE.IcosahedronGeometry(0.2)];
        for (let i = 0; i < 80; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL((Math.random() * 0.3) + 0.7, 0.8, 0.6), transparent: true, opacity: 0.3 });
            const particle = new THREE.Mesh(geometry, material);
            particle.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20);
            particle.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            particles.add(particle);
        }
        scene.add(particles);
        camera.position.z = 15;

        const animate = () => {
            requestAnimationFrame(animate);
            particles.children.forEach((particle, index) => {
                particle.rotation.x += 0.001 + (index * 0.0001);
                particle.rotation.y += 0.002;
                particle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
                particle.position.x += (mousePosition.x * 0.0001);
                particle.position.z += (mousePosition.y * 0.0001);
            });
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mousePosition]);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const skillCategories = [
        { title: "Frontend Development", icon: <Monitor className="w-6 h-6" />, skills: ["React.js", "JavaScript ES6+", "Tailwind CSS", "Framer Motion"], color: "blue", repos: ["MediaDiscover", "QuizApp", "Suduko-Pro"] },
        { title: "Backend Development", icon: <Server className="w-6 h-6" />, skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication"], color: "emerald", repos: ["X_automation"] },
        { title: "Database & Storage", icon: <Database className="w-6 h-6" />, skills: ["MongoDB", "Mongoose ODM", "Cloudinary", "Data Modeling"], color: "purple", repos: [] },
        { title: "Programming Languages", icon: <Code className="w-6 h-6" />, skills: ["C/C++", "Python", "Java", "JavaScript"], color: "orange", repos: ["MessageCrypto"] },
        { title: "AI & Machine Learning", icon: <Brain className="w-6 h-6" />, skills: ["Generative AI", "FastAPI", "OpenCV", "Computer Vision"], color: "pink", repos: ["ForestAgent", "AI-News-Summarizer"] },
        { title: "Robotics & Hardware", icon: <Cpu className="w-6 h-6" />, skills: ["Arduino Programming", "Sensor Integration", "Autonomous Systems"], color: "indigo", repos: [] },
        { title: "Tools & DevOps", icon: <GitBranch className="w-6 h-6" />, skills: ["Git & GitHub", "Version Control", "Zustand State", "API Integration"], color: "cyan", repos: [] }
    ];

    return (
        <SectionWrapper id="skills">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
            
            <div className="relative z-10">
                <SectionHeader 
                    title="Technical Arsenal"
                    subtitle="From full-stack development to AI-powered robotics, I bridge the gap between imagination and implementation."
                />
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {skillCategories.map((category) => (
                        <GlassCard key={category.title} accentColor={category.color}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 rounded-xl bg-gradient-to-br ${accentColors[category.color].from} ${accentColors[category.color].to} shadow-lg group-hover:scale-110 transition-transform duration-300 text-white`}>
                                    {category.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                                        {category.title}
                                    </h3>
                                    {category.repos.length > 0 && (
                                        <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                                            <Github className="w-3 h-3" />
                                            <span>{category.repos.length} Featured Repos</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {category.skills.map((skill) => (
                                    <div key={skill} className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-2 border border-slate-700/50">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${accentColors[category.color].from} ${accentColors[category.color].to} shadow-lg`}></div>
                                        <span className="text-slate-200 font-medium">{skill}</span>
                                    </div>
                                ))}
                            </div>

                            {category.repos.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-slate-700/50">
                                    <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2"><Github className="w-4 h-4" /> Featured Repositories</h4>
                                    <div className="space-y-2">
                                        {category.repos.map((repo) => (
                                            <a key={repo} href={`https://github.com/ayush1432220/${repo}`} target="_blank" rel="noopener noreferrer" 
                                               className={`block text-sm text-slate-400 hover:${accentColors[category.color].text} transition-colors hover:underline`}>
                                                {repo}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    ))}
                </motion.div>

                <div className="text-center">
                    <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/10">
                        <Zap className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Continuous Evolution</h3>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Technology never stops evolving, and neither do I. From winning robotics competitions to building full-stack applications, I believe in learning through action and innovation.
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}