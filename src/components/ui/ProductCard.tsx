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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-5xl mb-2">
              {product.category === 'almonds' && '🌰'}
              {product.category === 'cashews' && '🥜'}
              {product.category === 'pistachios' && '🫛'}
              {product.category === 'walnuts' && '🧠'}
              {product.category === 'dates' && '🌴'}
              {product.category === 'raisins' && '🍇'}
              {product.category === 'mixed' && '🎁'}
              {product.category === 'gift-hampers' && '🎀'}
            </div>
            <p className="text-xs text-muted-foreground">{product.image}</p>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Button 
            size="sm" 
            className="rounded-full bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Quick Order
          </Button>
        </motion.div>
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
          <span className="text-xl font-display font-bold text-accent">
            {product.price}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
