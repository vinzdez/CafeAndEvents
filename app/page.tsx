/**
 * @satisfies CAF-01-01-AC-01 Landing page loads in under 2 seconds on mobile 3G
 * @satisfies CAF-01-01-AC-05 Page is fully responsive (mobile, tablet, desktop)
 */
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import AboutSection from "@/app/components/AboutSection";
import Gallery from "@/app/components/Gallery";
import EventsSection from "@/app/components/EventsSection";
import Footer from "@/app/components/Footer";
import ErrorBoundary from "@/app/components/ErrorBoundary";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <Gallery />
      <ErrorBoundary>
        <EventsSection />
      </ErrorBoundary>
      <Footer />
    </>
  );
}
