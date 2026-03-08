import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Sparkles, Gem, Heart } from 'lucide-react';

const features = [
  { icon: Leaf, title: 'Premium Sourcing', description: 'Handpicked from trusted orchards with farm-to-home traceability' },
  { icon: Sparkles, title: 'Freshness Guaranteed', description: 'Temperature-controlled storage in airtight, tamper-proof containers' },
  { icon: Gem, title: 'Trusted Quality', description: 'Consistent quality built over years with personal care' },
  { icon: Heart, title: 'Family Values', description: 'Every customer treated like family, every pack made with love' }
];

export default function BrandIntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-medium mb-4 block">About Welcome Dry Fruit House</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight text-foreground">
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

            <div className="grid grid-cols-3 gap-6">
              {[
                { val: '1+', label: 'Years of Trust' },
                { val: '100%', label: 'Pure & Natural' },
                { val: '50+', label: 'Products' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-display font-bold text-accent">{stat.val}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

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
                className={`${index % 2 === 0 ? 'clay-card' : 'clay-card-rose'} p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-primary/20 flex items-center justify-center mb-4">
                  <feature.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
