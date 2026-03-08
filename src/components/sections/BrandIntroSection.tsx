import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  { icon: '🌱', title: 'Premium Sourcing', description: 'Handpicked from trusted orchards with farm-to-home traceability' },
  { icon: '✨', title: 'Freshness Guaranteed', description: 'Temperature-controlled storage in airtight, tamper-proof containers' },
  { icon: '💎', title: 'Trusted Quality', description: 'Consistent quality built over years with personal care' },
  { icon: '❤️', title: 'Family Values', description: 'Every customer treated like family, every pack made with love' }
];

export default function BrandIntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium mb-4 block">About Welcome Dry Fruit House</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Nourish Health,
              <span className="gradient-text"> Celebrate Life</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Welcome Dry Fruit House began as a family dream, rooted in passion and tradition. 
              Our founder grew up in a community where dry fruits were treasured as family gifts, 
              festive treats, and healthy daily snacks.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Today, in our sparkling clean warehouse, each batch of dry fruits is sorted and 
              sealed with care.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { val: '1+', label: 'Years of Trust' },
                { val: '100%', label: 'Pure & Natural' },
                { val: '50+', label: 'Products' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-display font-bold text-secondary">{stat.val}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="glass-panel p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
