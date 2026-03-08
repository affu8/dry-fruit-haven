import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Heart, Brain, Zap, Eye, Shield, Droplets } from 'lucide-react';

const benefits = [
  { name: 'Almonds', icon: Heart, benefits: ['Heart health', 'Vitamin E rich', 'Energy boost', 'Weight management'], description: 'Packed with healthy fats, fiber, protein, vitamins, and minerals. A daily handful can significantly improve cardiovascular health.', image: 'almonds-benefit.jpg' },
  { name: 'Cashews', icon: Zap, benefits: ['Iron & zinc', 'Brain health', 'Heart healthy', 'Steady energy'], description: 'Rich in nutrients promoting heart health, blood sugar control, and steady sustained energy throughout the day.', image: 'cashews-benefit.jpg' },
  { name: 'Pistachios', icon: Eye, benefits: ['High fiber', 'Eye health', 'Gut health', 'Blood sugar'], description: 'Great source of healthy fats, fiber, protein, and antioxidants. Known as the "smiling nut" in many cultures.', image: 'pistachios-benefit.jpg' },
  { name: 'Walnuts', icon: Brain, benefits: ['Omega-3', 'Brain power', 'Anti-inflammatory', 'Heart health'], description: 'Exceptionally nutritious with the highest omega-3 content among nuts. The brain-shaped nut that actually helps your brain.', image: 'walnuts-benefit.jpg' },
  { name: 'Dates', icon: Shield, benefits: ['High fiber', 'Natural energy', 'Brain support', 'Antioxidants'], description: 'High in fiber and antioxidants, supporting brain health. Nature\'s candy with powerful nutritional benefits.', image: 'dates-benefit.jpg' },
  { name: 'Raisins', icon: Droplets, benefits: ['Quick energy', 'Blood pressure', 'Digestive health', 'Iron rich'], description: 'Packed with minerals and antioxidants for optimal body function. A perfect natural sweetener and energy booster.', image: 'raisins-benefit.jpg' }
];

export default function HealthBenefitsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-accent font-medium mb-4 block">Nature's Powerhouse</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
              Health <span className="gradient-text">Benefits</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover why dry fruits are called nature's superfoods — packed with nutrients that your body needs every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="clay-card p-8 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-accent/15 to-primary/15 group-hover:from-accent/25 group-hover:to-primary/25 transition-all">
                    <item.icon size={30} className="text-accent" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">{item.name}</h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.benefits.map((benefit) => (
                    <span key={benefit} className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                      {benefit}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
