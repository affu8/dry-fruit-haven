import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Our Story', href: '#story' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' }
];

const scrollToSection = (href: string) => {
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 py-3"
    >
      <div className="container mx-auto px-6">
        <div
          className="px-6 py-3 flex items-center justify-between rounded-2xl transition-all duration-300"
          style={{
            background: scrolled
              ? 'linear-gradient(135deg, hsla(0, 0%, 100%, 0.85), hsla(30, 25%, 96%, 0.85))'
              : 'linear-gradient(135deg, hsla(0, 0%, 100%, 0.6), hsla(0, 0%, 100%, 0.3))',
            backdropFilter: 'blur(30px) saturate(1.5)',
            border: '1px solid hsla(0, 0%, 100%, 0.5)',
            boxShadow: scrolled
              ? '0 8px 32px hsla(200, 18%, 17%, 0.1)'
              : '0 8px 32px hsla(216, 26%, 55%, 0.08)',
          }}
        >
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('#')}>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
              <img
                src="/images/logo.png"
                alt="Welcome Dry Fruit House"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-display font-bold text-base leading-tight text-foreground">Welcome</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Dry Fruit House</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium px-4 py-2 rounded-full text-foreground/70 hover:text-rose-pink hover:bg-rose-pink/5 transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden sm:block px-6 py-2 rounded-full bg-gradient-to-r from-rose-pink to-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
          >
            Order Now
          </button>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-4 md:hidden flex flex-col gap-1 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, hsla(0, 0%, 100%, 0.9), hsla(30, 25%, 96%, 0.9))',
              backdropFilter: 'blur(30px)',
              border: '1px solid hsla(0, 0%, 100%, 0.5)',
              boxShadow: '0 8px 32px hsla(200, 18%, 17%, 0.1)',
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { scrollToSection(link.href); setMobileOpen(false); }}
                className="text-left text-sm font-medium px-4 py-3 rounded-xl text-foreground/70 hover:text-rose-pink hover:bg-rose-pink/5 transition-all"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => { scrollToSection('#contact'); setMobileOpen(false); }}
              className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-pink to-primary text-primary-foreground text-sm font-medium"
            >
              Order Now
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
