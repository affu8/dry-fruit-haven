import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

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
      // Google Sheets integration
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

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Liquid glass background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsla(280, 52%, 49%, 0.05) 0%, hsla(340, 60%, 84%, 0.08) 50%, hsla(280, 52%, 49%, 0.03) 100%)',
      }} />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium mb-4 block">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Order Your <span className="gradient-text">Premium Pack</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Whether you need dry fruits for daily snacking, festive celebrations, 
              or bulk corporate orders, we're here to serve you with the finest quality.
            </p>

            {/* Contact cards with claymorphism */}
            <div className="space-y-5">
              {[
                { icon: '📍', title: 'Visit Our Store', desc: 'Bengaluru Road, Krishna Nagar,\nKurnool-518003, Andhra Pradesh' },
                { icon: '🕙', title: 'Store Hours', desc: 'Open Daily until 10:00 PM' },
                { icon: '📦', title: 'Bulk Orders Welcome', desc: 'Special rates for wholesale & events' },
                { icon: '📱', title: 'Quick Contact', desc: 'Call or WhatsApp us anytime' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, hsla(0, 0%, 100%, 0.06), hsla(0, 0%, 100%, 0.02))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsla(0, 0%, 100%, 0.08)',
                    boxShadow: '0 8px 32px hsla(280, 52%, 20%, 0.15), inset 0 1px 0 hsla(0, 0%, 100%, 0.05)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, hsla(280, 52%, 49%, 0.2), hsla(340, 60%, 84%, 0.15))',
                      boxShadow: '0 4px 15px hsla(280, 52%, 49%, 0.2)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{item.title}</div>
                    <div className="text-muted-foreground text-sm whitespace-pre-line">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Form with liquid glass effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-3xl text-center"
                style={{
                  background: 'linear-gradient(135deg, hsla(0, 0%, 100%, 0.08), hsla(0, 0%, 100%, 0.03))',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid hsla(0, 0%, 100%, 0.1)',
                  boxShadow: '0 25px 60px hsla(280, 52%, 20%, 0.3)',
                }}
              >
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-3xl font-display font-bold mb-3 gradient-text">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your enquiry has been received. We'll contact you shortly with the best deals!
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Send Another Enquiry
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-3xl space-y-5"
                style={{
                  background: 'linear-gradient(135deg, hsla(0, 0%, 100%, 0.07), hsla(0, 0%, 100%, 0.02))',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid hsla(0, 0%, 100%, 0.1)',
                  boxShadow: '0 25px 60px hsla(280, 52%, 20%, 0.3), inset 0 1px 0 hsla(0, 0%, 100%, 0.1)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'linear-gradient(135deg, hsl(280, 52%, 49%), hsl(340, 60%, 84%))' }}
                  >
                    📋
                  </div>
                  <h3 className="text-2xl font-display font-bold">Quick Enquiry</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Fill in your details and we'll get back to you with the best prices!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Full Name <span className="text-primary">*</span></label>
                    <Input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required
                      className="bg-muted/50 border-border/50 rounded-xl focus:border-primary/50 backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Phone Number <span className="text-primary">*</span></label>
                    <Input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required
                      className="bg-muted/50 border-border/50 rounded-xl focus:border-primary/50 backdrop-blur-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">Email</label>
                  <Input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange}
                    className="bg-muted/50 border-border/50 rounded-xl focus:border-primary/50 backdrop-blur-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Product Selection</label>
                    <select name="product" value={formData.product} onChange={handleChange}
                      className="w-full h-10 px-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none transition-colors"
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
                    <label className="text-sm font-medium mb-1.5 block text-foreground">Quantity</label>
                    <Input name="quantity" placeholder="e.g., 5 kg" value={formData.quantity} onChange={handleChange}
                      className="bg-muted/50 border-border/50 rounded-xl focus:border-primary/50 backdrop-blur-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">Preferred Delivery Date</label>
                  <Input name="deliveryDate" type="date" value={formData.deliveryDate} onChange={handleChange}
                    className="bg-muted/50 border-border/50 rounded-xl focus:border-primary/50 backdrop-blur-sm" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">Custom Message</label>
                  <Textarea name="message" placeholder="Any special requirements or questions..." value={formData.message} onChange={handleChange} rows={3}
                    className="bg-muted/50 border-border/50 rounded-xl focus:border-primary/50 backdrop-blur-sm resize-none" />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all disabled:opacity-50"
                  style={{ boxShadow: '0 10px 30px hsla(280, 52%, 49%, 0.3)' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⏳</motion.span>
                      Submitting...
                    </span>
                  ) : 'Submit Enquiry ✨'}
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
