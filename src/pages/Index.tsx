import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import BrandIntroSection from '../components/sections/BrandIntroSection';
import OwnerStorySection from '../components/sections/OwnerStorySection';
import ProductsSection from '../components/sections/ProductsSection';
import HealthBenefitsSection from '../components/sections/HealthBenefitsSection';
import GiftHampersSection from '../components/sections/GiftHampersSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <BrandIntroSection />
        <OwnerStorySection />
        <ProductsSection />
        <HealthBenefitsSection />
        <GiftHampersSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
