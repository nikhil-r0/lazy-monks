"use client";

import { Terminal } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-foreground/10 py-12 relative z-10 glass rounded-t-3xl">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-orange-500" />
                    <span className="text-xl font-bold text-foreground tracking-tight">Lazy Monks</span>
                </div>

                <p className="text-foreground/50 text-sm">
                    Built with caffeine and Next.js. © {new Date().getFullYear()} Lazy Monks.
                </p>

                <div className="flex gap-6 text-sm font-medium text-foreground/60">
                    <a href="#team" className="hover:text-foreground transition-colors">Team</a>
                    <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
                    <a href="mailto:hello@example.com" className="hover:text-orange-400 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
