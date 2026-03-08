import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Brain, Zap, Eye, Shield, Droplets } from 'lucide-react';

const benefits = [
  { name: 'Almonds', icon: Heart, benefits: ['Heart health', 'Vitamin E rich', 'Energy boost', 'Weight management'], description: 'Packed with healthy fats, fiber, protein, vitamins, and minerals.', image: 'almonds-benefit.jpg' },
  { name: 'Cashews', icon: Zap, benefits: ['Iron & zinc', 'Brain health', 'Heart healthy', 'Steady energy'], description: 'Rich in nutrients promoting heart health and blood sugar control.', image: 'cashews-benefit.jpg' },
  { name: 'Pistachios', icon: Eye, benefits: ['High fiber', 'Eye health', 'Gut health', 'Blood sugar'], description: 'Great source of healthy fats, fiber, protein, and antioxidants.', image: 'pistachios-benefit.jpg' },
  { name: 'Walnuts', icon: Brain, benefits: ['Omega-3', 'Brain power', 'Anti-inflammatory', 'Heart health'], description: 'Exceptionally nutritious with the highest omega-3 content among nuts.', image: 'walnuts-benefit.jpg' },
  { name: 'Dates', icon: Shield, benefits: ['High fiber', 'Natural energy', 'Brain support', 'Antioxidants'], description: 'High in fiber and antioxidants, supporting brain health.', image: 'dates-benefit.jpg' },
  { name: 'Raisins', icon: Droplets, benefits: ['Quick energy', 'Blood pressure', 'Digestive health', 'Iron rich'], description: 'Packed with minerals and antioxidants for optimal body function.', image: 'raisins-benefit.jpg' }
];

export default function HealthBenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-card">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-rose-pink/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-rose-pink font-medium mb-4 block">Nature's Powerhouse</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Health <span className="gradient-text">Benefits</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dry fruits are nutrient-dense superfoods that pack more fiber, vitamins,
            and minerals per bite than most fresh fruit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="clay-card p-8 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rose-pink/15 to-primary/15">
                  <item.icon size={26} className="text-rose-pink" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">{item.name}</h3>
              </div>
              <p className="text-muted-foreground mb-6">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit) => (
                  <span key={benefit} className="px-3 py-1 rounded-full text-xs font-medium bg-soft-rose/30 text-foreground group-hover:bg-rose-pink/15 group-hover:text-rose-pink transition-colors">
                    {benefit}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
