"use client";

import { motion } from "framer-motion";
import { Terminal, Code2 } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Content */}
            <div className="z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center mb-6"
                >
                    <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
                        <Terminal className="w-4 h-4 text-orange-500" />
                        <span>Hackathon Winners & Builders</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
                >
                    We are the <br className="md:hidden" />
                    <span className="text-gradient">Lazy Monks</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto"
                >
                    We build wild ideas through sleepless nights, turning caffeine into code.
                    Explore our team members and the tools we've engineered during global hackathons.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a className="px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-colors flex items-center gap-2" href="#projects">
                        View Projects
                    </a>
                    <a className="px-8 py-4 glass text-foreground rounded-full font-semibold hover:bg-foreground/10 transition-colors flex items-center gap-2" href="#team">
                        Meet the Team <Code2 className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
