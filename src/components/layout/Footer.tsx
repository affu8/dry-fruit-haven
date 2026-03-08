import { MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

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
      style={{ background: '#E1D9CC', borderColor: 'hsla(30, 15%, 70%, 0.5)' }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => scrollToSection('#')}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <div className="font-display font-bold text-xl" style={{ color: 'hsl(200, 18%, 17%)' }}>Welcome</div>
                <div className="text-sm" style={{ color: 'hsl(200, 10%, 40%)' }}>Dry Fruit House</div>
              </div>
            </div>
            <p className="mb-6" style={{ color: 'hsl(200, 10%, 35%)' }}>Premium dry fruits for a healthy lifestyle. From our family to yours.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2" style={{ color: 'hsl(200, 10%, 35%)' }}>
                <MapPin size={14} className="text-rose-pink flex-shrink-0" />
                <span>Bengaluru Road, Krishna Nagar, Kurnool-518003</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'hsl(200, 10%, 35%)' }}>
                <Clock size={14} className="text-rose-pink flex-shrink-0" />
                <span>Open until 10:00 PM</span>
              </div>
            </div>
          </div>

          {(['products', 'company', 'support'] as const).map((section) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-lg mb-6 capitalize" style={{ color: 'hsl(200, 18%, 17%)' }}>{section}</h3>
              <ul className="space-y-3">
                {footerLinks[section].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="hover:text-rose-pink transition-colors duration-200"
                      style={{ color: 'hsl(200, 10%, 40%)' }}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid hsla(30, 15%, 60%, 0.3)' }}>
          <p className="text-sm" style={{ color: 'hsl(200, 10%, 45%)' }}>&copy; {new Date().getFullYear()} Welcome Dry Fruit House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-sm" style={{ color: 'hsl(200, 10%, 45%)' }}>Follow us:</span>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-rose-pink transition-colors duration-200"
                  style={{ color: 'hsl(200, 10%, 45%)' }}
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
