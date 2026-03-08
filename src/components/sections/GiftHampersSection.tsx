import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/button';

const hampers = [
  {
    name: 'Royal Collection',
    price: '₹2,500',
    items: ['Premium Almonds', 'Iranian Pistachios', 'Medjool Dates', 'Chile Walnuts'],
    image: '[GIFT_HAMPER_IMAGE]'
  },
  {
    name: 'Festive Celebration',
    price: '₹1,800',
    items: ['Mixed Dry Fruits', 'Cashews', 'Raisins', 'Premium Dates'],
    image: '[GIFT_HAMPER_IMAGE]'
  },
  {
    name: 'Corporate Elite',
    price: '₹3,500',
    items: ['California Almonds', 'W240 Cashews', 'Premium Pistachios', 'Trail Mix', 'Dates'],
    image: '[GIFT_HAMPER_IMAGE]'
  }
];

export default function GiftHampersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium mb-4 block">Perfect for Every Occasion</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Luxury <span className="gradient-text">Gift Hampers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrate life's special moments with our elegantly packaged premium 
            dry fruit collections. Perfect for Diwali, weddings, and corporate gifting.
          </p>
        </motion.div>

        {/* Hampers Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {hampers.map((hamper, index) => (
            <motion.div
              key={hamper.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <div className="relative glass-panel overflow-hidden">
                {/* Image Placeholder */}
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎁</div>
                    <p className="text-sm text-muted-foreground">{hamper.image}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-display font-bold">{hamper.name}</h3>
                    <span className="text-2xl font-display font-bold text-accent">{hamper.price}</span>
                  </div>

                  {/* Items List */}
                  <ul className="space-y-2 mb-6">
                    {hamper.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Order Hamper
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Hamper CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-panel inline-block px-8 py-6">
            <p className="text-lg text-muted-foreground mb-4">
              Need a custom hamper? We create bespoke gift collections for any occasion.
            </p>
            <Button variant="outline" className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Create Custom Hamper
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
