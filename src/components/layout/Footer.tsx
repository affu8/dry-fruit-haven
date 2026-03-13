import { MapPin, Clock, Phone, Instagram } from 'lucide-react';

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
    <footer className="py-16 sm:py-20 border-t border-border/70 bg-secondary/70">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          <div>
            <button type="button" className="flex items-center mb-6" onClick={() => scrollToSection('#')}>
              <div className="h-12 w-[170px] sm:h-14 sm:w-[200px] rounded-xl overflow-hidden bg-background border border-border/80 p-1.5 shadow-sm">
                <img src="/images/logo.png" alt="Welcome Dry Fruit House logo" className="w-full h-full object-contain" />
              </div>
            </button>

            <p className="mb-6 text-muted-foreground text-sm sm:text-base">
              Premium dry fruits for a healthy lifestyle. From our family to yours.
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-rose-pink flex-shrink-0" />
                <span>Bengaluru Road, Krishna Nagar, Kurnool-518003</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-rose-pink flex-shrink-0" />
                <span>Open until 10:00 PM</span>
              </div>
              <a href={PHONE_NUMBER_LINK} className="flex items-center gap-2 hover:text-rose-pink transition-colors">
                <Phone size={14} className="text-rose-pink flex-shrink-0" />
                <span>{PHONE_NUMBER_DISPLAY}</span>
              </a>
            </div>
          </div>

          {(['products', 'company', 'support'] as const).map((section) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-lg mb-5 capitalize text-foreground">{section}</h3>
              <ul className="space-y-3">
                {footerLinks[section].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-rose-pink transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Welcome Dry Fruit House. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-border bg-background/70 text-muted-foreground hover:text-rose-pink hover:border-rose-pink/40 transition-colors flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
