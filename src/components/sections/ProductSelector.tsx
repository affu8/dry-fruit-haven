import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, X, ShoppingBag, Package } from 'lucide-react';
import productData from '@/data/products.json';

interface SelectedProduct {
  id: string;
  name: string;
  price: string;
  quantity: string;
}

interface ProductSelectorProps {
  selectedProducts: SelectedProduct[];
  onChange: (products: SelectedProduct[]) => void;
}

export default function ProductSelector({ selectedProducts, onChange }: ProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSelected = (productId: string) => selectedProducts.some(p => p.id === productId);

  const toggleProduct = (product: typeof productData.products[0]) => {
    if (isSelected(product.id)) {
      onChange(selectedProducts.filter(p => p.id !== product.id));
    } else {
      onChange([...selectedProducts, { id: product.id, name: product.name, price: product.price, quantity: '1 kg' }]);
    }
  };

  const updateQuantity = (productId: string, quantity: string) => {
    onChange(selectedProducts.map(p => p.id === productId ? { ...p, quantity } : p));
  };

  const removeProduct = (productId: string) => {
    onChange(selectedProducts.filter(p => p.id !== productId));
  };

  const getProductsByCategory = (categoryId: string) =>
    productData.products.filter(p => p.category === categoryId);

  const totalItems = selectedProducts.length;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 h-auto min-h-[2.5rem] px-3 py-2 rounded-xl bg-background/80 border border-border text-sm focus:border-rose-pink/50 focus:outline-none transition-colors shadow-inner text-left"
      >
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {totalItems === 0 ? (
            <span className="text-muted-foreground">Select products...</span>
          ) : (
            <span className="text-foreground font-medium">{totalItems} product{totalItems > 1 ? 's' : ''} selected</span>
          )}
        </div>
        {isOpen ? <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-background shadow-xl max-h-[60vh] overflow-hidden flex flex-col"
          >
            {/* Categories */}
            <div className="flex overflow-x-auto gap-1 p-2 border-b border-border bg-muted/30 scrollbar-hide">
              {productData.categories.map(cat => {
                const count = selectedProducts.filter(p =>
                  getProductsByCategory(cat.id).some(cp => cp.id === p.id)
                ).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-rose-pink text-primary-foreground shadow-sm'
                        : 'bg-background hover:bg-secondary text-foreground'
                    }`}
                  >
                    {cat.name}
                    {count > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary-foreground/20 text-[10px]">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Product List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-1 max-h-[45vh]">
              {(activeCategory
                ? [productData.categories.find(c => c.id === activeCategory)!]
                : productData.categories
              ).map(cat => {
                const products = getProductsByCategory(cat.id);
                if (!products.length) return null;
                return (
                  <div key={cat.id}>
                    {!activeCategory && (
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {cat.name}
                      </div>
                    )}
                    {products.map(product => {
                      const selected = isSelected(product.id);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => toggleProduct(product)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            selected
                              ? 'bg-rose-pink/10 border border-rose-pink/30'
                              : 'hover:bg-muted/50 border border-transparent'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected ? 'bg-rose-pink border-rose-pink' : 'border-border'
                          }`}>
                            {selected && <Check size={12} className="text-primary-foreground" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">{product.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{product.description}</div>
                          </div>
                          <div className="text-sm font-semibold text-rose-pink flex-shrink-0">{product.price}</div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-2 bg-muted/20">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 rounded-xl bg-rose-pink text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Done ({totalItems} selected)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Products Chips & Quantity */}
      {selectedProducts.length > 0 && (
        <div className="mt-3 space-y-2">
          {selectedProducts.map(sp => (
            <motion.div
              key={sp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 p-2 rounded-xl bg-muted/40 border border-border"
            >
              <Package size={14} className="text-rose-pink flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate">{sp.name}</div>
                <div className="text-[10px] text-muted-foreground">{sp.price}</div>
              </div>
              <select
                value={sp.quantity}
                onChange={(e) => updateQuantity(sp.id, e.target.value)}
                className="h-7 px-2 rounded-lg bg-background border border-border text-xs text-foreground focus:outline-none focus:border-rose-pink/50"
              >
                <option value="250 gm">250 gm</option>
                <option value="500 gm">500 gm</option>
                <option value="1 kg">1 kg</option>
                <option value="2 kg">2 kg</option>
                <option value="5 kg">5 kg</option>
                <option value="10 kg">10 kg</option>
                <option value="custom">Custom</option>
              </select>
              <button
                type="button"
                onClick={() => removeProduct(sp.id)}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors"
              >
                <X size={12} className="text-muted-foreground hover:text-destructive" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
