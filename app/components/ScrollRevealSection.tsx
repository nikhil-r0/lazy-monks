"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

    return (
        <section ref={containerRef} className="py-32 relative perspective-1000">
            <motion.div
                style={{ scale, opacity, rotateX, transformPerspective: 1000 }}
                className="max-w-6xl mx-auto px-4"
            >
                <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden text-center border-t border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
                        Hackathon Veterans.
                    </h2>
                    <p className="text-foreground/70 text-lg md:text-2xl max-w-3xl mx-auto relative z-10">
                        Between the four of us, we have consumed 400+ cans of energy drinks, resolved 10,000+ merge conflicts, and shipped products in under 48 hours.
                    </p>

                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        {[
                            { label: "Hackathons", value: "15+" },
                            { label: "First Places", value: "4" },
                            { label: "Lines of Code", value: "100k+" },
                            { label: "Hours Sleep", value: "0" },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-4xl md:text-6xl font-bold text-gradient mb-2">{stat.value}</span>
                                <span className="text-sm uppercase tracking-wider text-foreground/50">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
