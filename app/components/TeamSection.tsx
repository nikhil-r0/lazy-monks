"use client";

import { motion } from "framer-motion";
import { teamMembers } from "../data/content";
import { Github, Linkedin, Globe } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export default function TeamSection() {
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto relative z-10" id="team">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the <span className="text-gradient">Team</span></h2>
                <p className="text-foreground/70 max-w-2xl mx-auto">
                    The brilliant minds behind the sleep-deprived coding sessions.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {teamMembers.map((member) => (
                    <motion.div
                        key={member.id}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="glass rounded-2xl overflow-hidden group border border-orange-500/10 hover:border-orange-500/30 transition-colors"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                            {/* Using regular img tag. In a real Next.js app, replace with next/image */}
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 relative z-20">
                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <p className="text-purple-400 text-sm mb-4 font-medium">{member.role}</p>
                            <p className="text-foreground/70 text-sm mb-6 line-clamp-3">{member.bio}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {member.skills.map((skill, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-foreground/5 rounded-full text-foreground/80">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                                {member.socials.github && (
                                    <a href={member.socials.github} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {member.socials.linkedin && (
                                    <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-[#0a66c2] transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {member.socials.portfolio && (
                                    <a href={member.socials.portfolio} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-orange-500 transition-colors">
                                        <Globe className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
