import { motion } from 'framer-motion';

const footerLinks = {
  products: [
    { name: 'Almonds', href: '#' },
    { name: 'Cashews', href: '#' },
    { name: 'Pistachios', href: '#' },
    { name: 'Walnuts', href: '#' },
    { name: 'Gift Hampers', href: '#' }
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Story', href: '#story' },
    { name: 'Quality Promise', href: '#' },
    { name: 'Contact', href: '#contact' }
  ],
  support: [
    { name: 'Bulk Orders', href: '#' },
    { name: 'Delivery Info', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Store Location', href: '#' }
  ]
};

export default function Footer() {
  return (
    <footer className="py-20 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                🌰
              </div>
              <div>
                <div className="font-display font-bold text-xl">Welcome</div>
                <div className="text-sm text-muted-foreground">Dry Fruit House</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Premium dry fruits for a healthy lifestyle. From our family to yours.
            </p>
            <div className="text-sm">
              <p className="text-muted-foreground">Bengaluru Road, Krishna Nagar</p>
              <p className="text-muted-foreground">Kurnool-518003, Andhra Pradesh</p>
              <p className="text-foreground mt-2">Open until 10:00 PM</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Welcome Dry Fruit House. All rights reserved.
          </p>
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
