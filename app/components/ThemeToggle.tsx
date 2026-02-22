"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="fixed top-6 right-6 z-50 w-10 h-10" />; // Placeholder to prevent layout shift
    }

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-6 right-6 z-50 glass p-3 rounded-full text-foreground hover:scale-110 transition-transform flex items-center justify-center"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-orange-500" />}
        </motion.button>
    );
}
