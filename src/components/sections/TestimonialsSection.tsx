import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, User } from 'lucide-react';

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Regular Customer', quote: 'The quality of dry fruits from Welcome Dry Fruit House is unmatched. Every pack feels like a premium experience.', rating: 5 },
  { name: 'Priya Sharma', role: 'Health Enthusiast', quote: 'I trust only Welcome Dry Fruit House for my family. The freshness and taste are consistently excellent.', rating: 5 },
  { name: 'Mohammed Ali', role: 'Business Owner', quote: 'Their gift hampers are perfect for corporate gifting. Professional packaging and premium quality.', rating: 5 },
  { name: 'Lakshmi Devi', role: 'Homemaker', quote: 'From Diwali sweets to daily snacks, Welcome Dry Fruit House has become an essential part of our kitchen.', rating: 5 }
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-card">
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-secondary/15 blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">What People Say</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Customer <span className="gradient-text">Love</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="clay-card p-8 relative"
            >
              <div className="absolute top-6 right-6">
                <Quote size={28} className="text-primary/15" />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-golden-almond fill-golden-almond" />
                ))}
              </div>
              <p className="text-lg text-foreground mb-6 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/15 to-secondary/30 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
