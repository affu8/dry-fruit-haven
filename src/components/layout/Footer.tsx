import { MapPin, Clock, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
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
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  const footerLinks = {
    products: [
      { name: 'All Products', href: '/products' },
      { name: 'Almonds', href: '/products' },
      { name: 'Cashews', href: '/products' },
      { name: 'Gift Hampers', href: '/#contact' }
    ],
    company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Our Story', href: '/#story' },
      { name: 'Health Benefits', href: '/health-benefits' },
      { name: 'Contact', href: '/#contact' }
    ],
    support: [
      { name: 'Bulk Orders', href: '/#contact' },
      { name: 'Delivery Info', href: '/#contact' },
      { name: 'Store Location', href: '/#contact' }
    ]
  };

  return (
    <footer className="py-20 border-t border-border" style={{ background: 'linear-gradient(180deg, hsl(30, 25%, 95%), hsl(338, 30%, 95%))' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => handleNavClick('/')}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>';
                  }} />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground">Welcome</div>
                <div className="text-sm text-muted-foreground">Dry Fruit House</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">Premium dry fruits for a healthy lifestyle. From our family to yours.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} className="text-accent" />
                <span>Bengaluru Road, Krishna Nagar, Kurnool-518003</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={14} className="text-accent" />
                <span>Open until 10:00 PM</span>
              </div>
            </div>
          </div>

          {(['products', 'company', 'support'] as const).map((section) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-lg mb-6 capitalize text-foreground">{section}</h3>
              <ul className="space-y-3">
                {footerLinks[section].map((link) => (
                  <li key={link.name}>
                    <button onClick={() => handleNavClick(link.href)} className="text-muted-foreground hover:text-accent transition-colors">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Welcome Dry Fruit House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
