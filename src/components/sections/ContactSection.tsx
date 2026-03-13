import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { MapPin, Clock, Package, Phone, Send, CheckCircle, Loader2, User, Mail, Calendar, MessageSquare, ShoppingBag, Home, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import ProductSelector, { type SelectedProduct } from './ProductSelector';
import { useIsMobile } from '@/hooks/use-mobile';

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwc0adckJBBmNqyThgIitMWukDRPUbqWCwHmJXqLmdQfPV_dbpVAktkiLgHTaBzW6N3/exec';

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  occasion: string;
  deliveryDate: string;
  message: string;
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '',
    address: '', city: '', state: '', pincode: '',
    occasion: '', deliveryDate: '', message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const productNames = selectedProducts.map(p => p.name).join(', ');
      const productQuantities = selectedProducts.map(p => p.quantity).join(', ');
      const productPrices = selectedProducts.map(p => p.price).join(', ');
      const customItems = selectedProducts.filter(p => p.isCustomItem).map(p => `${p.name} (${p.quantity})`).join(', ');

      if (GOOGLE_SHEETS_URL.length > 0) {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            product: productNames,
            quantity: productQuantities,
            prices: productPrices,
            occasion: formData.occasion,
            deliveryDate: formData.deliveryDate,
            message: formData.message + (customItems ? ` | Custom Hamper Items: ${customItems}` : ''),
            productCount: selectedProducts.length
          }),
        });
      }
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '', occasion: '', deliveryDate: '', message: '' });
      setSelectedProducts([]);
      setStep(1);
    } catch {
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canGoStep2 = formData.name.trim() && formData.phone.trim();
  const canGoStep3 = selectedProducts.length > 0;

  const contactInfo = [
    { icon: MapPin, title: 'Visit Our Store', desc: 'Bengaluru Road, Krishna Nagar,\nKurnool-518003, Andhra Pradesh' },
    { icon: Clock, title: 'Store Hours', desc: 'Open Daily until 10:00 PM' },
    { icon: Package, title: 'Bulk Orders Welcome', desc: 'Special rates for wholesale & events' },
    { icon: Phone, title: 'Quick Contact', desc: 'Call or WhatsApp: +91 9886223323' },
  ];

  const inputClass = "bg-background/80 border-border rounded-xl focus:border-rose-pink/50 shadow-inner text-foreground text-base h-12";

  const stepLabels = ['Your Details', 'Select Products', 'Finalize Order'];

  return (
    <section ref={ref} className="py-16 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-rose/10 via-background to-primary/5" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-rose-pink/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-rose-pink font-medium mb-4 block text-sm sm:text-base">Get in Touch</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 text-foreground">
              Order Your <span className="gradient-text">Premium Pack</span>
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-10">
              Whether you need dry fruits for daily snacking, festive celebrations,
              or bulk corporate orders — we deliver the finest quality to your doorstep.
            </p>

            <div className="space-y-3 sm:space-y-5">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl clay-card transition-all hover:shadow-lg"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-rose-pink/15 to-primary/15">
                    <item.icon size={18} className="text-rose-pink" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{item.title}</div>
                    <div className="text-muted-foreground text-xs sm:text-sm whitespace-pre-line">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-3xl text-center clay-card"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-pink/20 to-primary/15 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-rose-pink" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3 gradient-text">Thank You!</h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Your enquiry has been received. We will contact you shortly with the best deals!
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full bg-gradient-to-r from-rose-pink to-primary hover:opacity-90 text-primary-foreground"
                >
                  Send Another Enquiry
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-4 sm:p-8 md:p-10 rounded-3xl space-y-4 sm:space-y-5"
                style={{
                  background: 'linear-gradient(145deg, hsl(30, 30%, 98%), hsl(30, 25%, 95%))',
                  boxShadow: '12px 12px 24px hsla(200, 15%, 70%, 0.12), -12px -12px 24px hsla(0, 0%, 100%, 0.9)',
                  border: '1px solid hsla(0, 0%, 100%, 0.6)',
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-pink to-primary">
                    <Send size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-display font-bold text-foreground">Quick Enquiry</h3>
                    <p className="text-xs text-muted-foreground">Step {step} of 3 — {stepLabels[step - 1]}</p>
                  </div>
                </div>

                {/* Step indicator */}
                <div className="flex gap-1.5 mb-2">
                  {[1, 2, 3].map(s => (
                    <div key={s} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                        step >= s ? 'bg-gradient-to-r from-rose-pink to-primary' : 'bg-border'
                      }`} />
                      <span className={`text-[10px] font-medium hidden sm:block ${step >= s ? 'text-rose-pink' : 'text-muted-foreground'}`}>
                        {stepLabels[s - 1]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3 sm:space-y-4">
                    <p className="text-sm text-muted-foreground">Tell us about yourself so we can serve you better.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <User size={14} className="text-rose-pink" /> Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Phone size={14} className="text-rose-pink" /> Phone <span className="text-destructive">*</span>
                        </label>
                        <Input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                        <Mail size={14} className="text-rose-pink" /> Email
                      </label>
                      <Input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                        <Home size={14} className="text-rose-pink" /> Delivery Address
                      </label>
                      <Input name="address" placeholder="House/Flat No, Street, Landmark" value={formData.address} onChange={handleChange} className={inputClass} />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs font-medium mb-1 block text-foreground">City</label>
                        <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="bg-background/80 border-border rounded-xl focus:border-rose-pink/50 shadow-inner text-foreground text-sm h-10" />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block text-foreground">State</label>
                        <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="bg-background/80 border-border rounded-xl focus:border-rose-pink/50 shadow-inner text-foreground text-sm h-10" />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block text-foreground">Pincode</label>
                        <Input name="pincode" placeholder="518003" value={formData.pincode} onChange={handleChange} className="bg-background/80 border-border rounded-xl focus:border-rose-pink/50 shadow-inner text-foreground text-sm h-10" />
                      </div>
                    </div>

                    <Button
                      type="button"
                      disabled={!canGoStep2}
                      onClick={() => setStep(2)}
                      className="w-full py-5 rounded-full bg-gradient-to-r from-rose-pink to-primary hover:opacity-90 text-primary-foreground shadow-lg disabled:opacity-40 text-base"
                    >
                      <span className="flex items-center gap-2">
                        Continue to Products <ChevronRight size={18} />
                      </span>
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Product Selection */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <p className="text-sm text-muted-foreground">Select products or create a custom hamper, then continue.</p>

                    <div className="rounded-xl border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                      {selectedProducts.length > 0
                        ? `${selectedProducts.length} item${selectedProducts.length > 1 ? 's' : ''} selected`
                        : 'Select at least one product to continue to final step.'}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                        <ShoppingBag size={14} className="text-rose-pink" /> Products & Hampers
                      </label>
                      <ProductSelector
                        selectedProducts={selectedProducts}
                        onChange={setSelectedProducts}
                        onDone={() => {
                          if (isMobile && selectedProducts.length > 0) setStep(3);
                        }}
                      />
                    </div>

                    <div className="sticky bottom-0 -mx-1 px-1 pt-2 pb-1 bg-gradient-to-t from-background via-background/95 to-transparent">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="rounded-full border-border hover:bg-secondary h-12 px-5"
                        >
                          <ChevronLeft size={18} /> Back
                        </Button>
                        <Button
                          type="button"
                          disabled={!canGoStep3}
                          onClick={() => setStep(3)}
                          className="flex-1 h-12 rounded-full bg-gradient-to-r from-rose-pink to-primary hover:opacity-90 text-primary-foreground shadow-lg disabled:opacity-40 text-base"
                        >
                          <span className="flex items-center gap-2">
                            Continue ({selectedProducts.length}) <ChevronRight size={18} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Final Details & Submit */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <p className="text-sm text-muted-foreground">Almost done! Add any final details.</p>

                    {/* Order Summary */}
                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Package size={14} className="text-rose-pink" />
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">Order Summary</span>
                      </div>
                      <div className="space-y-1">
                        {selectedProducts.map(p => (
                          <div key={p.id} className="flex justify-between text-xs">
                            <span className="text-foreground truncate flex-1">{p.name} × {p.quantity}</span>
                            <span className="text-rose-pink font-semibold ml-2">{p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Sparkles size={14} className="text-rose-pink" /> Occasion
                        </label>
                        <select name="occasion" value={formData.occasion} onChange={handleChange}
                          className="w-full h-12 px-3 rounded-xl bg-background/80 border border-border text-foreground text-sm focus:border-rose-pink/50 focus:outline-none transition-colors shadow-inner"
                        >
                          <option value="">Select occasion</option>
                          <option value="daily">Daily Use</option>
                          <option value="diwali">Diwali</option>
                          <option value="wedding">Wedding</option>
                          <option value="eid">Eid</option>
                          <option value="birthday">Birthday</option>
                          <option value="corporate">Corporate Gifting</option>
                          <option value="housewarming">Housewarming</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Calendar size={14} className="text-rose-pink" /> Delivery Date
                        </label>
                        <Input name="deliveryDate" type="date" value={formData.deliveryDate} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                        <MessageSquare size={14} className="text-rose-pink" /> Special Instructions
                      </label>
                      <Textarea name="message" placeholder="Gift wrapping, dietary needs, custom packaging..." value={formData.message} onChange={handleChange} rows={3}
                        className="bg-background/80 border-border rounded-xl focus:border-rose-pink/50 resize-none shadow-inner text-foreground text-sm" />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="rounded-full border-border hover:bg-secondary h-12 px-5"
                      >
                        <ChevronLeft size={18} /> Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-12 rounded-full bg-gradient-to-r from-primary via-rose-pink to-steel-blue hover:opacity-90 transition-all disabled:opacity-50 text-primary-foreground shadow-lg text-base"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 size={20} className="animate-spin" /> Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send size={18} /> Submit Enquiry
                          </span>
                        )}
                      </Button>
                    </div>

                    <p className="text-[11px] text-center text-muted-foreground">
                      We respect your privacy. Your details are safe with us.
                    </p>
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
