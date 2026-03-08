import { MapPin, Clock, Phone, Facebook, Instagram, Youtube } from 'lucide-react';

const scrollToSection = (href: string) => {
  if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const footerLinks = {
  products: [
    { name: 'Almonds', href: '#products' },
    { name: 'Cashews', href: '#products' },
    { name: 'Pistachios', href: '#products' },
    { name: 'Walnuts', href: '#products' },
    { name: 'Gift Hampers', href: '#products' }
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Story', href: '#story' },
    { name: 'Quality Promise', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ],
  support: [
    { name: 'Bulk Orders', href: '#contact' },
    { name: 'Delivery Info', href: '#contact' },
    { name: 'FAQs', href: '#contact' },
    { name: 'Store Location', href: '#contact' }
  ]
};

export default function Footer() {
  return (
    <footer className="py-20 border-t border-border" style={{ background: 'linear-gradient(180deg, hsl(30, 25%, 95%), hsl(200, 18%, 17%))' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => scrollToSection('#')}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-rose-pink to-primary flex items-center justify-center">
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
                <MapPin size={14} className="text-rose-pink" />
                <span>Bengaluru Road, Krishna Nagar, Kurnool-518003</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={14} className="text-rose-pink" />
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
                    <button onClick={() => scrollToSection(link.href)} className="text-muted-foreground hover:text-rose-pink transition-colors">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Welcome Dry Fruit House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-rose-pink transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-rose-pink transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-rose-pink transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
