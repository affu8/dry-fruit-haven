import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { MapPin, Clock, Package, Phone, Send, CheckCircle, Loader2, User, Mail, Calendar, MessageSquare, ShoppingBag, Home, Building, MapPinned, Hash } from 'lucide-react';

const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    product: '',
    quantity: '',
    deliveryDate: '',
    occasion: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        });
      }
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '', product: '', quantity: '', deliveryDate: '', occasion: '', message: '' });
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

  const canProceed = step === 1 ? formData.name && formData.phone : true;

  const contactInfo = [
    { icon: MapPin, title: 'Visit Our Store', desc: 'Bengaluru Road, Krishna Nagar,\nKurnool-518003, Andhra Pradesh' },
    { icon: Clock, title: 'Store Hours', desc: 'Open Daily until 10:00 PM' },
    { icon: Package, title: 'Bulk Orders Welcome', desc: 'Special rates for wholesale & events' },
    { icon: Phone, title: 'Quick Contact', desc: 'Call or WhatsApp us anytime' },
  ];

  const inputClass = "bg-background/80 border-border rounded-xl focus:border-accent/50 shadow-inner transition-all focus:shadow-[0_0_0_3px_hsla(338,87%,71%,0.1)]";

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-accent/5" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-medium mb-4 block">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Order Your <span className="gradient-text">Premium Pack</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Whether you need dry fruits for daily snacking, festive celebrations,
              or bulk corporate orders, we're here to serve you with the finest quality.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center gap-4 p-4 rounded-2xl clay-card transition-all hover:shadow-lg group"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-accent/15 to-primary/15 group-hover:from-accent/25 group-hover:to-primary/25 transition-all">
                    <item.icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{item.title}</div>
                    <div className="text-muted-foreground text-sm whitespace-pre-line">{item.desc}</div>
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
                className="p-12 rounded-3xl text-center clay-card"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-pistachio-green/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-accent" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-3 gradient-text">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your enquiry has been received. We'll contact you shortly with the best deals!
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-accent-foreground"
                >
                  Send Another Enquiry
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-3xl space-y-5"
                style={{
                  background: 'linear-gradient(145deg, hsl(30, 30%, 98%), hsl(338, 30%, 96%))',
                  boxShadow: '12px 12px 24px hsla(200, 16%, 70%, 0.12), -12px -12px 24px hsla(0, 0%, 100%, 0.9)',
                  border: '1px solid hsla(338, 87%, 90%, 0.4)',
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent to-primary">
                    <Send size={18} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground">Quick Enquiry</h3>
                    <p className="text-xs text-muted-foreground">Step {step} of 2</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, hsl(338, 87%, 71%), hsl(216, 26%, 55%))' }}
                    animate={{ width: step === 1 ? '50%' : '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-muted-foreground">Tell us about yourself</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <User size={14} className="text-accent" /> Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Phone size={14} className="text-accent" /> Phone <span className="text-destructive">*</span>
                        </label>
                        <Input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                        <Mail size={14} className="text-accent" /> Email
                      </label>
                      <Input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                        <Home size={14} className="text-accent" /> Delivery Address
                      </label>
                      <Input name="address" placeholder="House/Flat No., Street, Landmark" value={formData.address} onChange={handleChange} className={inputClass} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Building size={14} className="text-accent" /> City
                        </label>
                        <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <MapPinned size={14} className="text-accent" /> State
                        </label>
                        <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Hash size={14} className="text-accent" /> Pincode
                        </label>
                        <Input name="pincode" placeholder="518003" value={formData.pincode} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => canProceed && setStep(2)}
                      disabled={!canProceed}
                      className="w-full py-5 rounded-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-accent-foreground shadow-lg disabled:opacity-50"
                    >
                      Next: Order Details
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-muted-foreground">What would you like to order?</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <ShoppingBag size={14} className="text-accent" /> Product
                        </label>
                        <select name="product" value={formData.product} onChange={handleChange}
                          className="w-full h-10 px-3 rounded-xl bg-background/80 border border-border text-foreground text-sm focus:border-accent/50 focus:outline-none transition-colors shadow-inner"
                        >
                          <option value="">Select product</option>
                          <option value="almonds">Almonds</option>
                          <option value="cashews">Cashews</option>
                          <option value="pistachios">Pistachios</option>
                          <option value="walnuts">Walnuts</option>
                          <option value="dates">Dates</option>
                          <option value="raisins">Raisins</option>
                          <option value="mixed">Mixed Dry Fruits</option>
                          <option value="gift-hamper">Gift Hamper</option>
                          <option value="bulk">Bulk Order</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Package size={14} className="text-accent" /> Quantity
                        </label>
                        <Input name="quantity" placeholder="e.g., 5 kg" value={formData.quantity} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          <Calendar size={14} className="text-accent" /> Delivery Date
                        </label>
                        <Input name="deliveryDate" type="date" value={formData.deliveryDate} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                          Occasion
                        </label>
                        <select name="occasion" value={formData.occasion} onChange={handleChange}
                          className="w-full h-10 px-3 rounded-xl bg-background/80 border border-border text-foreground text-sm focus:border-accent/50 focus:outline-none transition-colors shadow-inner"
                        >
                          <option value="">Select occasion</option>
                          <option value="daily">Daily Use</option>
                          <option value="diwali">Diwali</option>
                          <option value="wedding">Wedding</option>
                          <option value="birthday">Birthday</option>
                          <option value="corporate">Corporate Gifting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                        <MessageSquare size={14} className="text-accent" /> Special Instructions
                      </label>
                      <Textarea name="message" placeholder="Any special packaging, dietary needs, custom notes..." value={formData.message} onChange={handleChange} rows={3}
                        className="bg-background/80 border-border rounded-xl focus:border-accent/50 resize-none shadow-inner" />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="rounded-full border-accent/30 hover:bg-accent/10 text-foreground"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-5 rounded-full bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-all disabled:opacity-50 text-accent-foreground shadow-lg"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 size={20} className="animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send size={18} />
                            Submit Enquiry
                          </span>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                <p className="text-xs text-center text-muted-foreground mt-2">
                  We respect your privacy. Your details are safe with us.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
