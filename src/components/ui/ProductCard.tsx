import { motion } from 'framer-motion';
import { Button } from './button';
import { ShoppingBag, ImageIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  featured?: boolean;
}

const scrollToContact = () => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="product-card group"
    >
      {product.featured && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-rose-pink to-primary text-xs font-medium text-primary-foreground shadow-sm">
          Featured
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-secondary/30">
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
              fallback.innerHTML = `<div class="text-center p-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(335, 87%, 71%)" stroke-width="1.5" class="mx-auto mb-2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                <p class="text-xs" style="color: hsl(200, 10%, 45%)">${product.image}</p>
              </div>`;
              parent.appendChild(fallback);
            }
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-rose-pink/50 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            onClick={scrollToContact}
            className="rounded-full bg-background text-foreground hover:bg-rose-pink hover:text-primary-foreground shadow-md"
          >
            <ShoppingBag size={16} className="mr-1" />
            Quick Order
          </Button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-rose-pink transition-colors text-foreground">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 mt-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-display font-bold text-rose-pink">
            {product.price}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToContact}
            className="rounded-full border-rose-pink/30 text-rose-pink hover:bg-rose-pink hover:text-primary-foreground"
          >
            Order Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
