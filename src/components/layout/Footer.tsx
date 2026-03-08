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
    <footer
      className="py-20 border-t"
      style={{
        background: 'linear-gradient(180deg, hsl(210, 15%, 18%) 0%, hsl(210, 18%, 14%) 100%)',
        borderColor: 'hsla(30, 33%, 85%, 0.08)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => scrollToSection('#')}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shadow-lg">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <div className="font-display font-bold text-xl" style={{ color: 'hsl(30, 33%, 90%)' }}>Welcome</div>
                <div className="text-sm" style={{ color: 'hsla(30, 33%, 85%, 0.6)' }}>Dry Fruit House</div>
              </div>
            </div>
            <p className="mb-6" style={{ color: 'hsla(30, 33%, 85%, 0.7)' }}>Premium dry fruits for a healthy lifestyle. From our family to yours.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2" style={{ color: 'hsla(30, 33%, 85%, 0.7)' }}>
                <MapPin size={14} className="text-rose-pink flex-shrink-0" />
                <span>Bengaluru Road, Krishna Nagar, Kurnool-518003</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'hsla(30, 33%, 85%, 0.7)' }}>
                <Clock size={14} className="text-rose-pink flex-shrink-0" />
                <span>Open until 10:00 PM</span>
              </div>
            </div>
          </div>

          {(['products', 'company', 'support'] as const).map((section) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-lg mb-6 capitalize" style={{ color: 'hsl(30, 33%, 90%)' }}>{section}</h3>
              <ul className="space-y-3">
                {footerLinks[section].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="transition-colors duration-200"
                      style={{ color: 'hsla(30, 33%, 85%, 0.55)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(335, 87%, 71%)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'hsla(30, 33%, 85%, 0.55)')}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid hsla(30, 33%, 85%, 0.1)' }}>
          <p className="text-sm" style={{ color: 'hsla(30, 33%, 85%, 0.4)' }}>&copy; {new Date().getFullYear()} Welcome Dry Fruit House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-sm" style={{ color: 'hsla(30, 33%, 85%, 0.4)' }}>Follow us:</span>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors duration-200"
                  style={{ color: 'hsla(30, 33%, 85%, 0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(335, 87%, 71%)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'hsla(30, 33%, 85%, 0.4)')}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
