import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <HeroSection />
      <FeaturesSection />
    </main>
    <Footer />
  </div>
);

export default Index;
