import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Award } from 'lucide-react';

export default function OwnerStorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-card">
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-rose-pink/8 blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/15 blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-pink via-primary to-secondary p-1">
                <div className="w-full h-full rounded-3xl bg-card" />
              </div>

              <div className="absolute inset-4 rounded-2xl bg-muted overflow-hidden">
                <img
                  src="/images/owner-profile.jpg"
                  alt="Founder, Welcome Dry Fruit House"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="flex items-center justify-center w-full h-full text-center p-8">
                      <div><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="hsl(335, 87%, 71%)" stroke-width="1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
                      <p class="text-sm mt-4" style="color: hsl(200, 10%, 45%)">owner-profile.jpg</p></div>
                    </div>`;
                  }}
                />
              </div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl clay-card flex items-center justify-center"
              >
                <Star size={28} className="text-rose-pink" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl clay-card flex items-center justify-center"
              >
                <Award size={24} className="text-primary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-rose-pink font-medium mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-foreground">
              A Journey of
              <span className="gradient-text"> Passion & Trust</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                In the early days, our founder carefully handpicked almonds, cashews, and pistachios
                from trusted orchards, driven by values of honesty and quality.
              </p>
              <p>
                Every decision -- from sourcing to packaging -- is guided by honesty, hard work, and
                an unshakable commitment to quality.
              </p>
              <p>
                Our mission is simple: to make healthy eating joyful. We believe every family
                deserves access to pure, premium dry fruits.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-rose-pink/8 to-primary/10 border-l-4 border-rose-pink"
            >
              <p className="text-xl font-display italic text-foreground">
                "Trust isn't built through packaging or price. It's built over years -- when the
                quality is consistent and the experience is seamless."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
