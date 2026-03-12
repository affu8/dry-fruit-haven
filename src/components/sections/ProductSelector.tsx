import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, X, Package, Gift, Plus, Minus } from 'lucide-react';
import productData from '@/data/products.json';

export interface SelectedProduct {
  id: string;
  name: string;
  price: string;
  quantity: string;
  isCustomItem?: boolean;
}

interface ProductSelectorProps {
  selectedProducts: SelectedProduct[];
  onChange: (products: SelectedProduct[]) => void;
}

export default function ProductSelector({ selectedProducts, onChange }: ProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showCustomHamper, setShowCustomHamper] = useState(false);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemQty, setCustomItemQty] = useState('1 kg');
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

  const addCustomItem = () => {
    if (!customItemName.trim()) return;
    const customId = `custom-${Date.now()}`;
    onChange([...selectedProducts, { id: customId, name: customItemName, price: 'Custom', quantity: customItemQty, isCustomItem: true }]);
    setCustomItemName('');
    setCustomItemQty('1 kg');
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
        className="w-full flex items-center justify-between gap-2 h-auto min-h-[3rem] px-4 py-2.5 rounded-2xl bg-background/80 border border-border text-sm focus:border-rose-pink/50 focus:outline-none transition-all shadow-inner text-left active:scale-[0.99]"
      >
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {totalItems === 0 ? (
            <span className="text-muted-foreground">Tap to select products...</span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-pink text-primary-foreground text-xs font-bold">{totalItems}</span>
              <span className="text-foreground font-medium">product{totalItems > 1 ? 's' : ''} selected</span>
            </div>
          )}
        </div>
        {isOpen ? <ChevronUp size={18} className="text-muted-foreground flex-shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" />}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-background shadow-2xl max-h-[65vh] overflow-hidden flex flex-col"
          >
            {/* Categories - horizontal scroll */}
            <div className="flex overflow-x-auto gap-1.5 p-2.5 border-b border-border bg-muted/30 scrollbar-hide">
              <button
                type="button"
                onClick={() => { setActiveCategory(null); setShowCustomHamper(false); }}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  !activeCategory && !showCustomHamper
                    ? 'bg-rose-pink text-primary-foreground shadow-sm'
                    : 'bg-background hover:bg-secondary text-foreground'
                }`}
              >
                All
              </button>
              {productData.categories.map(cat => {
                const count = selectedProducts.filter(p =>
                  getProductsByCategory(cat.id).some(cp => cp.id === p.id)
                ).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setActiveCategory(cat.id); setShowCustomHamper(false); }}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-rose-pink text-primary-foreground shadow-sm'
                        : 'bg-background hover:bg-secondary text-foreground'
                    }`}
                  >
                    {cat.name}
                    {count > 0 && (
                      <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-primary-foreground/20 text-[10px] px-1">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
              {/* Custom Hamper Tab */}
              <button
                type="button"
                onClick={() => { setShowCustomHamper(true); setActiveCategory(null); }}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                  showCustomHamper
                    ? 'bg-rose-pink text-primary-foreground shadow-sm'
                    : 'bg-background hover:bg-secondary text-foreground'
                }`}
              >
                <Gift size={12} /> Custom Hamper
              </button>
            </div>

            {/* Product List or Custom Hamper Builder */}
            <div className="overflow-y-auto flex-1 p-2 max-h-[45vh]">
              {showCustomHamper ? (
                <div className="p-3 space-y-3">
                  <div className="text-center py-2">
                    <Gift size={28} className="text-rose-pink mx-auto mb-2" />
                    <h4 className="font-display font-bold text-foreground text-sm">Build Your Custom Hamper</h4>
                    <p className="text-xs text-muted-foreground mt-1">Add any item you'd like — we'll curate it for you!</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                      placeholder="e.g. Kaju Katli, Badam Mix..."
                      className="flex-1 h-10 px-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-rose-pink/50"
                    />
                    <select
                      value={customItemQty}
                      onChange={(e) => setCustomItemQty(e.target.value)}
                      className="h-10 px-2 rounded-xl bg-muted/50 border border-border text-xs text-foreground focus:outline-none"
                    >
                      <option value="250 gm">250g</option>
                      <option value="500 gm">500g</option>
                      <option value="1 kg">1 kg</option>
                      <option value="2 kg">2 kg</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={addCustomItem}
                    disabled={!customItemName.trim()}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-pink/80 to-primary/80 text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <Plus size={14} /> Add to Hamper
                  </button>
                  {selectedProducts.filter(p => p.isCustomItem).length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Custom Items</p>
                      {selectedProducts.filter(p => p.isCustomItem).map(p => (
                        <div key={p.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-muted/30">
                          <span className="text-xs text-foreground">{p.name} ({p.quantity})</span>
                          <button type="button" onClick={() => removeProduct(p.id)} className="text-muted-foreground hover:text-destructive">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-0.5">
                  {(activeCategory
                    ? [productData.categories.find(c => c.id === activeCategory)!]
                    : productData.categories
                  ).map(cat => {
                    const products = getProductsByCategory(cat.id);
                    if (!products.length) return null;
                    return (
                      <div key={cat.id}>
                        {!activeCategory && (
                          <div className="px-3 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest sticky top-0 bg-background/95 backdrop-blur-sm z-10">
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
                              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all active:scale-[0.98] ${
                                selected
                                  ? 'bg-rose-pink/10 border border-rose-pink/30'
                                  : 'hover:bg-muted/50 border border-transparent'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                selected ? 'bg-rose-pink border-rose-pink scale-110' : 'border-border'
                              }`}>
                                {selected && <Check size={12} className="text-primary-foreground" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-foreground truncate">{product.name}</div>
                                <div className="text-[11px] text-muted-foreground truncate">{product.description}</div>
                              </div>
                              <div className="text-sm font-bold text-rose-pink flex-shrink-0">{product.price}</div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-2.5 bg-muted/20">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-pink to-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-md active:scale-[0.98]"
              >
                Done ({totalItems} selected)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Products Summary */}
      {selectedProducts.length > 0 && (
        <div className="mt-3 space-y-2">
          {selectedProducts.map(sp => (
            <motion.div
              key={sp.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border"
            >
              {sp.isCustomItem ? (
                <Gift size={14} className="text-rose-pink flex-shrink-0" />
              ) : (
                <Package size={14} className="text-rose-pink flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">{sp.name}</div>
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
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors"
              >
                <X size={14} className="text-muted-foreground hover:text-destructive" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
