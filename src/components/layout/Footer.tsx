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
    <footer className="py-20 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => scrollToSection('#')}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-2xl">🌰</span>'; }} />
              </div>
              <div>
                <div className="font-display font-bold text-xl">Welcome</div>
                <div className="text-sm text-muted-foreground">Dry Fruit House</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">Premium dry fruits for a healthy lifestyle. From our family to yours.</p>
            <div className="text-sm">
              <p className="text-muted-foreground">Bengaluru Road, Krishna Nagar</p>
              <p className="text-muted-foreground">Kurnool-518003, Andhra Pradesh</p>
              <p className="text-foreground mt-2">Open until 10:00 PM</p>
            </div>
          </div>

          {(['products', 'company', 'support'] as const).map((section) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-lg mb-6 capitalize">{section}</h3>
              <ul className="space-y-3">
                {footerLinks[section].map((link) => (
                  <li key={link.name}>
                    <button onClick={() => scrollToSection(link.href)} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Welcome Dry Fruit House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xl">📘</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xl">📸</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xl">▶️</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
