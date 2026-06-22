import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PuzzlesGrid from "@/components/PuzzlesGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <PuzzlesGrid />
    </main>
  );
}
