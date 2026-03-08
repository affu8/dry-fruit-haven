import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Gift } from 'lucide-react';

const scrollToContact = () => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const hampers = [
  {
    name: 'Royal Collection',
    price: '₹2,500',
    items: ['Premium Almonds', 'Iranian Pistachios', 'Medjool Dates', 'Chile Walnuts'],
    image: 'royal-collection-hamper.jpg'
  },
  {
    name: 'Festive Celebration',
    price: '₹1,800',
    items: ['Mixed Dry Fruits', 'Cashews', 'Raisins', 'Premium Dates'],
    image: 'festive-celebration-hamper.jpg'
  },
  {
    name: 'Corporate Elite',
    price: '₹3,500',
    items: ['California Almonds', 'W240 Cashews', 'Premium Pistachios', 'Trail Mix', 'Dates'],
    image: 'corporate-elite-hamper.jpg'
  }
];

export default function GiftHampersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-pink/3 via-background to-primary/5" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-rose-pink font-medium mb-4 block">Perfect for Every Occasion</span>
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
              <div className="absolute inset-0 bg-gradient-to-br from-rose-pink/10 via-primary/10 to-secondary/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative clay-card overflow-hidden">
                <div className="aspect-[4/3] bg-secondary/20 overflow-hidden rounded-t-[1.5rem]">
                  <img
                    src={`/images/hampers/${hamper.image}`}
                    alt={hamper.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/products/royal-gift-hamper.jpg';
                    }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-display font-bold text-foreground">{hamper.name}</h3>
                    <span className="text-xl font-display font-bold text-rose-pink">{hamper.price}</span>
                  </div>

                  <ul className="space-y-1.5 mb-5">
                    {hamper.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-pink flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button onClick={scrollToContact} className="w-full rounded-full bg-gradient-to-r from-rose-pink to-primary hover:opacity-90 text-primary-foreground shadow-md">
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
            <Button onClick={scrollToContact} variant="outline" className="rounded-full border-rose-pink text-rose-pink hover:bg-rose-pink hover:text-primary-foreground">
              Create Custom Hamper
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
