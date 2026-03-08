import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const benefits = [
  {
    name: 'Almonds',
    icon: '🌰',
    color: 'from-amber-500 to-amber-700',
    benefits: ['Heart health', 'Vitamin E rich', 'Energy boost', 'Weight management'],
    description: 'Packed with healthy fats, fiber, protein, vitamins, and minerals.'
  },
  {
    name: 'Cashews',
    icon: '🥜',
    color: 'from-yellow-100 to-yellow-300',
    benefits: ['Iron & zinc', 'Brain health', 'Heart healthy', 'Steady energy'],
    description: 'Rich in nutrients promoting heart health and blood sugar control.'
  },
  {
    name: 'Pistachios',
    icon: '🫛',
    color: 'from-green-400 to-green-600',
    benefits: ['High fiber', 'Eye health', 'Gut health', 'Blood sugar'],
    description: 'Great source of healthy fats, fiber, protein, and antioxidants.'
  },
  {
    name: 'Walnuts',
    icon: '🧠',
    color: 'from-amber-700 to-amber-900',
    benefits: ['Omega-3', 'Brain power', 'Anti-inflammatory', 'Heart health'],
    description: 'Exceptionally nutritious with the highest omega-3 content among nuts.'
  },
  {
    name: 'Dates',
    icon: '🌴',
    color: 'from-orange-600 to-orange-800',
    benefits: ['High fiber', 'Natural energy', 'Brain support', 'Antioxidants'],
    description: 'High in fiber and antioxidants, supporting brain health.'
  },
  {
    name: 'Raisins',
    icon: '🍇',
    color: 'from-purple-600 to-purple-800',
    benefits: ['Quick energy', 'Blood pressure', 'Digestive health', 'Iron rich'],
    description: 'Packed with minerals and antioxidants for optimal body function.'
  }
];

export default function HealthBenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pistachio-green/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-golden-almond/10 blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-pistachio-green font-medium mb-4 block">Nature's Powerhouse</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Health <span className="gradient-text">Benefits</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dry fruits are nutrient-dense superfoods that pack more fiber, vitamins, 
            and minerals per bite than most fresh fruit.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-panel p-8 hover:bg-muted/50 transition-all group"
            >
              {/* Icon & Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display font-bold">{item.name}</h3>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{item.description}</p>

              {/* Benefits Tags */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                  >
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
