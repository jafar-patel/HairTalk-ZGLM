import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { useSite } from '../context/SiteContext';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const { content } = useSite();
  const businessInfo = content.businessInfo;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage for admin panel
    const messages = JSON.parse(localStorage.getItem('hairtalk_messages') || '[]');
    messages.push({ ...formData, id: Date.now().toString(), createdAt: new Date().toISOString(), read: false });
    localStorage.setItem('hairtalk_messages', JSON.stringify(messages));
    // Submit to Formspree
    try {
      await fetch('https://formspree.io/f/mwvwbkop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Hair Talk Contact: ${formData.subject || 'General Enquiry'}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _form_type: 'contact',
        }),
      });
    } catch { /* localStorage backup still works */ }
    setSent(true);
    setTimeout(() => { setSent(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }, 3000);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-charcoal to-espresso/50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Get In Touch</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mt-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/60 mt-6 max-w-2xl mx-auto">We'd love to hear from you. Visit us, call us, or drop a message.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">Send Us a Message</h2>
                <p className="text-charcoal/50 text-sm mb-8">Fill out the form below and we'll get back to you shortly.</p>
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="font-serif text-xl text-charcoal">Message Sent!</p>
                    <p className="text-charcoal/50 text-sm mt-2">We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Name *</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all text-sm" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all text-sm" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                        <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all text-sm" placeholder="+64 ..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Subject</label>
                        <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all text-sm">
                          <option value="">Select a topic</option>
                          <option value="booking">Booking Enquiry</option>
                          <option value="pricing">Pricing Question</option>
                          <option value="consultation">Free Consultation</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Message *</label>
                      <textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={5} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all text-sm resize-none" placeholder="Tell us how we can help..." />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-all text-sm">
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
                      <div><p className="font-medium text-charcoal text-sm">Address</p><p className="text-charcoal/60 text-sm">{businessInfo.address}</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
                      <div><p className="font-medium text-charcoal text-sm">Phone</p><a href={businessInfo.phoneLink} className="text-charcoal/60 text-sm hover:text-primary transition-colors">{businessInfo.phone}</a></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-primary" /></div>
                      <div><p className="font-medium text-charcoal text-sm">Email</p><a href={`mailto:${businessInfo.email}`} className="text-charcoal/60 text-sm hover:text-primary transition-colors">{businessInfo.email}</a></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-6 flex items-center gap-2"><Clock size={18} className="text-primary" /> Business Hours</h3>
                  <div className="space-y-2">
                    {businessInfo.hours.map((h) => (
                      <div key={h.day} className="flex justify-between items-center py-2 border-b border-beige/30 last:border-0">
                        <span className="text-sm text-charcoal/60">{h.day}</span>
                        <span className={`text-sm font-medium ${h.hours === 'Closed' ? 'text-charcoal/30' : 'text-charcoal'}`}>{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href={businessInfo.phoneLink} className="flex-1 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full text-center hover:bg-primary-dark transition-all">Call Now</a>
                  <a href={businessInfo.mapLink} target="_blank" rel="noopener noreferrer" className="flex-1 px-6 py-3 border-2 border-primary text-primary text-sm font-medium rounded-full text-center hover:bg-primary hover:text-white transition-all">Get Directions</a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Map */}
          <AnimatedSection className="mt-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8!2d174.7772!3d-36.8625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47b5f5e5b5b5%3A0x1234567890abcdef!2s198+Broadway%2C+Newmarket%2C+Auckland+1023!5e0!3m2!1sen!2snz!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hair Talk Location Map"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
