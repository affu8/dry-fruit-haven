import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Our Story', href: '/#story' },
  { name: 'Products', href: '/products' },
  { name: 'Health Benefits', href: '/health-benefits' },
  { name: 'Contact', href: '/#contact' }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '#');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.querySelector(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      navigate(href);
    }
    setMobileOpen(false);
  };

  const handleOrderNow = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector('#contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="container mx-auto px-6">
        <div className="liquid-glass px-4 py-3 flex items-center justify-between rounded-2xl gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => handleNavClick('/')}>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0">
              <img
                src="/images/logo.png"
                alt="Welcome Dry Fruit House"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>';
                }}
              />
            </div>
            <div>
              <div className="font-display font-bold text-sm leading-tight text-foreground">Welcome</div>
              <div className="text-[10px] text-muted-foreground">Dry Fruit House</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors whitespace-nowrap"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleOrderNow}
            className="hidden sm:block px-5 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-md shrink-0 whitespace-nowrap"
          >
            Order Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 liquid-glass p-4 md:hidden flex flex-col gap-3 rounded-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-2"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={handleOrderNow}
              className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground text-sm font-medium"
            >
              Order Now
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
