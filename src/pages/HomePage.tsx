import { HeroSection } from "@/components/home/HeroSection";
import { EventsSection } from "@/components/home/EventsSection";
import { OffersSection } from "@/components/home/OffersSection";
import { ContactSection } from "@/components/home/ContactSection";
import { TopCoachesSection } from "@/components/home/TopCoachesSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <EventsSection />
      <OffersSection />
      <TopCoachesSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
