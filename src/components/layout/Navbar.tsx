import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Our Story', href: '#story' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' }
];

const INSTAGRAM_URL = 'https://www.instagram.com/welcomedryfruithouse/';
const PHONE_NUMBER_DISPLAY = '+91 9886223323';
const PHONE_NUMBER_LINK = 'tel:+919886223323';

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 py-3"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`liquid-glass px-3 sm:px-5 py-2.5 flex items-center justify-between rounded-2xl transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
            <button
              type="button"
              className="flex items-center"
              onClick={() => scrollToSection('#')}
              aria-label="Go to top"
            >
              <div className="h-11 sm:h-12 w-[160px] sm:w-[190px] rounded-xl overflow-hidden bg-card/70 border border-border/60 p-1">
                <img
                  src="/images/logo.png"
                  alt="Welcome Dry Fruit House logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium px-4 py-2 rounded-full text-foreground/70 hover:text-rose-pink hover:bg-rose-pink/10 transition-all duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border bg-background/70 text-muted-foreground hover:text-rose-pink hover:border-rose-pink/30 transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={PHONE_NUMBER_LINK}
                className="px-5 h-10 rounded-full bg-gradient-to-r from-rose-pink to-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-md inline-flex items-center gap-2"
              >
                <Phone size={14} />
                {PHONE_NUMBER_DISPLAY}
              </a>
            </div>

            <button
              className="md:hidden w-10 h-10 rounded-full border border-border bg-background/70 text-foreground flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] md:hidden"
              aria-label="Close menu"
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="fixed top-[4.6rem] left-4 right-4 z-50 md:hidden p-3 rounded-2xl liquid-glass"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      scrollToSection(link.href);
                      setMobileOpen(false);
                    }}
                    className="text-left text-sm font-medium px-4 py-3 rounded-xl text-foreground/80 hover:text-rose-pink hover:bg-rose-pink/10 transition-all"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={PHONE_NUMBER_LINK}
                  className="h-11 rounded-xl bg-gradient-to-r from-rose-pink to-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Phone size={14} /> Call
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 rounded-xl border border-border bg-background/80 text-foreground text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Instagram size={14} /> Instagram
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
