import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function OwnerStorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-muted/30">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-1">
                <div className="w-full h-full rounded-3xl bg-background" />
              </div>
              
              {/* Image Placeholder */}
              <div className="absolute inset-4 rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">👨‍💼</div>
                  <p className="text-muted-foreground text-sm">[OWNER_PROFILE_IMAGE]</p>
                  <p className="text-muted-foreground text-xs mt-2">Founder, Welcome Dry Fruit House</p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl glass-panel flex items-center justify-center text-4xl"
              >
                🌰
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl glass-panel flex items-center justify-center text-3xl"
              >
                🥜
              </motion.div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-secondary font-medium mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              A Journey of
              <span className="gradient-text"> Passion & Trust</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                In the early days, our founder carefully handpicked almonds, cashews, and pistachios 
                from trusted orchards, driven by values of honesty and quality. Over time, our humble 
                stall transformed into a premium store, but we never lost that personal touch.
              </p>
              <p>
                Every decision – from sourcing to packaging – is guided by honesty, hard work, and 
                an unshakable commitment to quality. Our team visits the orchards and processing 
                facilities personally, ensuring each nut and berry meets strict purity standards.
              </p>
              <p>
                Our mission is simple: to make healthy eating joyful. We believe every family 
                deserves access to pure, premium dry fruits that nourish the body and soul.
              </p>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary"
            >
              <p className="text-xl font-display italic text-foreground">
                "Trust isn't built through packaging or price. It's built over years – when the 
                quality is consistent, the service is personal, and the experience is seamless."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
