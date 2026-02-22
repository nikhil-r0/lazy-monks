import { Github, Linkedin, Globe, Code2, Terminal, Cpu, Layout, Server, Database, Smartphone } from "lucide-react";

export const teamMembers = [
    {
        id: 1,
        name: "Nikhil R",
        role: "Full Stack Developer",
        bio: "Passionate about creating scalable web applications and intuitive interfaces.",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
        skills: ["React", "Next.js", "Node.js", "TypeScript"],
        socials: {
            github: "https://github.com/nikhil-r0",
            linkedin: "https://linkedin.com",
            portfolio: "https://example.com"
        }
    },
    {
        id: 2,
        name: "Aryan Mishra",
        role: "UI/UX & Frontend Engineer",
        bio: "Crafting beautiful, user-centric experiences with a keen eye for interactive design.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
        skills: ["Figma", "Tailwind CSS", "Framer Motion", "Vue"],
        socials: {
            github: "https://github.com/AZREAL-08",
            linkedin: "https://www.linkedin.com/in/aryan-mishra-78205129a",
            portfolio: "https://example.com"
        }
    },
    {
        id: 3,
        name: "Prajwal S",
        role: "Backend Architect",
        bio: "Building robust APIs, managing databases, and ensuring system reliability.",
        image: "/Vade.jpeg",
        skills: ["Python", "PostgreSQL", "Docker", "AWS"],
        socials: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
        }
    },
    {
        id: 4,
        name: "Nishanth Anthony",
        role: "Machine Learning Engineer",
        bio: "Integrating AI models into practical applications to solve real-world problems.",
        image: "/Nishanth.jpeg",
        skills: ["PyTorch", "TensorFlow", "FastAPI", "OpenAI"],
        socials: {
            github: "https://github.com/Nish344",
            linkedin: "https://www.linkedin.com/in/nishanth-antony-b60110289/",
            portfolio: "https://example.com"
        }
    }
];

export const hackathonProjects = [
    {
        id: "proj-1",
        title: "NeuroSync",
        hackathon: "Global Hack Week 2025",
        description: "An AI-powered focus application that analyzes your workflow patterns and optimizes your breaks. Won 1st place in the Productivity Track.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        techStack: ["Next.js", "Python", "Vercel AI SDK", "Tailwind"],
        links: {
            github: "https://github.com",
            demo: "https://example.com",
        }
    },
    {
        id: "proj-2",
        title: "EcoChain",
        hackathon: "EarthHack 24",
        description: "A decentralized platform for tracking carbon offsets using smart contracts to ensure transparency in corporate emissions reporting.",
        image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=800",
        techStack: ["React", "Solidity", "Ethers.js", "Node.js"],
        links: {
            github: "https://github.com",
            demo: "https://example.com",
        }
    },
    {
        id: "proj-3",
        title: "Visionary API",
        hackathon: "Build with AI",
        description: "A plug-and-play accessibility tool that automatically generates descriptive alt-text for legacy websites using computer vision.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80&w=800",
        techStack: ["FastAPI", "OpenCV", "React", "Docker"],
        links: {
            github: "https://github.com",
            demo: "https://example.com",
        }
    }
];
