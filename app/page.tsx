import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { NewsSection } from "@/components/news-section";
import { CharacterShowcase } from "@/components/character-showcase";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroBanner />
      <NewsSection />
      <CharacterShowcase />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
