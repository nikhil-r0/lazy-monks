import HeroSection from "./components/HeroSection";
import ScrollRevealSection from "./components/ScrollRevealSection";
import TeamSection from "./components/TeamSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground relative">
      <HeroSection />
      <ScrollRevealSection />

      {/* Spacer or gentle gradient transition */}
      <div className="h-24 bg-gradient-to-b from-transparent to-[#050505]/50" />

      <TeamSection />

      {/* Spacer */}
      <div className="h-32" />

      <ProjectsSection />

      <Footer />
    </main>
  );
}
