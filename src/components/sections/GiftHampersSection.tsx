import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Gift, ImageIcon } from 'lucide-react';

const scrollToContact = () => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const hampers = [
  {
    name: 'Royal Collection',
    price: '\u20B92,500',
    items: ['Premium Almonds', 'Iranian Pistachios', 'Medjool Dates', 'Chile Walnuts'],
    image: 'royal-collection-hamper.jpg'
  },
  {
    name: 'Festive Celebration',
    price: '\u20B91,800',
    items: ['Mixed Dry Fruits', 'Cashews', 'Raisins', 'Premium Dates'],
    image: 'festive-celebration-hamper.jpg'
  },
  {
    name: 'Corporate Elite',
    price: '\u20B93,500',
    items: ['California Almonds', 'W240 Cashews', 'Premium Pistachios', 'Trail Mix', 'Dates'],
    image: 'corporate-elite-hamper.jpg'
  }
];

export default function GiftHampersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-secondary/8" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Perfect for Every Occasion</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Luxury <span className="gradient-text">Gift Hampers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrate life's special moments with our elegantly packaged premium
            dry fruit collections. Perfect for Diwali, weddings, and corporate gifting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {hampers.map((hamper, index) => (
            <motion.div
              key={hamper.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/15 to-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative clay-card overflow-hidden">
                <div className="aspect-square bg-secondary/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={`/images/hampers/${hamper.image}`}
                    alt={hamper.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<div class="text-center"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(216, 26%, 55%)" stroke-width="1.5" class="mx-auto mb-2"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V5a2 2 0 00-4 0v3"/><path d="M16 8V5a2 2 0 00-4 0"/><path d="M12 8v13"/><path d="M3 14h18"/></svg><p class="text-sm text-muted-foreground">${hamper.image}</p></div>`;
                    }}
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-display font-bold text-foreground">{hamper.name}</h3>
                    <span className="text-2xl font-display font-bold text-primary">{hamper.price}</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {hamper.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button onClick={scrollToContact} className="w-full rounded-full bg-gradient-to-r from-primary to-steel-blue hover:opacity-90 text-primary-foreground shadow-md">
                    <Gift size={16} className="mr-2" />
                    Order Hamper
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="liquid-glass inline-block px-8 py-6 rounded-2xl">
            <p className="text-lg text-muted-foreground mb-4">
              Need a custom hamper? We create bespoke gift collections for any occasion.
            </p>
            <Button onClick={scrollToContact} variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Create Custom Hamper
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
