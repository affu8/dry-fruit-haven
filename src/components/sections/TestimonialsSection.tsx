import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Regular Customer',
    avatar: '👨',
    quote: 'The quality of dry fruits from Welcome Dry Fruit House is unmatched. Every pack feels like a premium experience.',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    role: 'Health Enthusiast',
    avatar: '👩',
    quote: 'I trust only Welcome Dry Fruit House for my family. The freshness and taste are consistently excellent.',
    rating: 5
  },
  {
    name: 'Mohammed Ali',
    role: 'Business Owner',
    avatar: '👨‍💼',
    quote: 'Their gift hampers are perfect for corporate gifting. Professional packaging and premium quality.',
    rating: 5
  },
  {
    name: 'Lakshmi Devi',
    role: 'Homemaker',
    avatar: '👩‍🍳',
    quote: 'From Diwali sweets to daily snacks, Welcome Dry Fruit House has become an essential part of our kitchen.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-medium mb-4 block">What People Say</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Customer <span className="gradient-text">Love</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our countless happy customers speak for us. People come back because they 
            know each pack carries the same wholesome goodness.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="glass-panel p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-4xl opacity-20">"</div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-foreground mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-display font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
