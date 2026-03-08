import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    deliveryDate: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic - can be integrated with Google Sheets
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
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

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <div className="font-semibold">Visit Our Store</div>
                  <div className="text-muted-foreground">
                    Bengaluru Road, Krishna Nagar,<br />
                    Kurnool-518003, Andhra Pradesh
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-2xl">
                  🕙
                </div>
                <div>
                  <div className="font-semibold">Store Hours</div>
                  <div className="text-muted-foreground">Open Daily until 10:00 PM</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-2xl">
                  📦
                </div>
                <div>
                  <div className="font-semibold">Bulk Orders Welcome</div>
                  <div className="text-muted-foreground">Special rates for wholesale & events</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
              <h3 className="text-2xl font-display font-bold mb-6">Quick Enquiry</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-muted border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-muted border-border"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Selection</label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md bg-muted border border-border text-foreground"
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
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    name="quantity"
                    placeholder="e.g., 5 kg"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Delivery Date</label>
                <Input
                  name="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="bg-muted border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Custom Message</label>
                <Textarea
                  name="message"
                  placeholder="Any special requirements or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-muted border-border"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Submit Enquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
