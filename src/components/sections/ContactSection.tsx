import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { MapPin, Clock, Package, Phone, Send, CheckCircle, Loader2, User, Mail, Calendar, MessageSquare, ShoppingBag } from 'lucide-react';

const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    deliveryDate: '',
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
      setFormData({ name: '', phone: '', email: '', product: '', quantity: '', deliveryDate: '', message: '' });
    } catch {
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: MapPin, title: 'Visit Our Store', desc: 'Bengaluru Road, Krishna Nagar,\nKurnool-518003, Andhra Pradesh' },
    { icon: Clock, title: 'Store Hours', desc: 'Open Daily until 10:00 PM' },
    { icon: Package, title: 'Bulk Orders Welcome', desc: 'Special rates for wholesale & events' },
    { icon: Phone, title: 'Quick Contact', desc: 'Call or WhatsApp us anytime' },
  ];

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-primary/5" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium mb-4 block">Get in Touch</span>
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
                  className="flex items-center gap-4 p-4 rounded-2xl clay-card transition-all hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary/10 to-secondary/20">
                    <item.icon size={22} className="text-primary" />
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
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/15 to-pistachio-green/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-3 gradient-text">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your enquiry has been received. We'll contact you shortly with the best deals!
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full bg-gradient-to-r from-primary to-steel-blue hover:opacity-90 text-primary-foreground"
                >
                  Send Another Enquiry
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-3xl space-y-5"
                style={{
                  background: 'linear-gradient(145deg, hsl(30, 30%, 98%), hsl(30, 25%, 95%))',
                  boxShadow: '12px 12px 24px hsla(220, 15%, 70%, 0.12), -12px -12px 24px hsla(0, 0%, 100%, 0.9)',
                  border: '1px solid hsla(0, 0%, 100%, 0.6)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-steel-blue">
                    <Send size={18} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">Quick Enquiry</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Fill in your details and we'll get back to you with the best prices!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                      <User size={14} className="text-primary" /> Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required
                      className="bg-background/80 border-border rounded-xl focus:border-primary/50 shadow-inner" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                      <Phone size={14} className="text-primary" /> Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required
                      className="bg-background/80 border-border rounded-xl focus:border-primary/50 shadow-inner" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                    <Mail size={14} className="text-primary" /> Email
                  </label>
                  <Input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange}
                    className="bg-background/80 border-border rounded-xl focus:border-primary/50 shadow-inner" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                      <ShoppingBag size={14} className="text-primary" /> Product Selection
                    </label>
                    <select name="product" value={formData.product} onChange={handleChange}
                      className="w-full h-10 px-3 rounded-xl bg-background/80 border border-border text-foreground text-sm focus:border-primary/50 focus:outline-none transition-colors shadow-inner"
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
                      <Package size={14} className="text-primary" /> Quantity
                    </label>
                    <Input name="quantity" placeholder="e.g., 5 kg" value={formData.quantity} onChange={handleChange}
                      className="bg-background/80 border-border rounded-xl focus:border-primary/50 shadow-inner" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                    <Calendar size={14} className="text-primary" /> Preferred Delivery Date
                  </label>
                  <Input name="deliveryDate" type="date" value={formData.deliveryDate} onChange={handleChange}
                    className="bg-background/80 border-border rounded-xl focus:border-primary/50 shadow-inner" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 text-foreground">
                    <MessageSquare size={14} className="text-primary" /> Custom Message
                  </label>
                  <Textarea name="message" placeholder="Any special requirements or questions..." value={formData.message} onChange={handleChange} rows={3}
                    className="bg-background/80 border-border rounded-xl focus:border-primary/50 resize-none shadow-inner" />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-primary to-steel-blue hover:opacity-90 transition-all disabled:opacity-50 text-primary-foreground shadow-lg"
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
