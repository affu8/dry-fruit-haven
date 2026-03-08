import { motion } from 'framer-motion';
import { Button } from './button';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const scrollToContact = () => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="product-card group"
    >
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-medium text-primary-foreground">
          Featured
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-muted">
        <img
          src={`/images/products/${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'absolute inset-0 flex items-center justify-center';
              const icons: Record<string, string> = {
                almonds: '🌰', cashews: '🥜', pistachios: '🫛', walnuts: '🧠',
                dates: '🌴', raisins: '🍇', mixed: '🎁', 'gift-hampers': '🎀'
              };
              fallback.innerHTML = `<div class="text-center p-6">
                <div class="text-5xl mb-2">${icons[product.category] || '🌰'}</div>
                <p class="text-xs text-muted-foreground">${product.image}</p>
              </div>`;
              parent.appendChild(fallback);
            }
          }}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            onClick={scrollToContact}
            className="rounded-full bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            Quick Order
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-display font-bold text-secondary">
            {product.price}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToContact}
            className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
          >
            Order Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
