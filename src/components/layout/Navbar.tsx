import { motion } from 'framer-motion';
import { useState } from 'react';
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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="container mx-auto px-6">
        <div className="liquid-glass px-6 py-4 flex items-center justify-between rounded-2xl">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('#')}>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-rose-pink to-primary flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Welcome Dry Fruit House"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>';
                }}
              />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight text-foreground">Welcome</div>
              <div className="text-xs text-muted-foreground">Dry Fruit House</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-rose-pink transition-colors"
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
            className="mt-2 liquid-glass p-4 md:hidden flex flex-col gap-3 rounded-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { scrollToSection(link.href); setMobileOpen(false); }}
                className="text-left text-sm font-medium text-muted-foreground hover:text-rose-pink transition-colors py-2"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => { scrollToSection('#contact'); setMobileOpen(false); }}
              className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-rose-pink to-primary text-primary-foreground text-sm font-medium"
            >
              Order Now
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
