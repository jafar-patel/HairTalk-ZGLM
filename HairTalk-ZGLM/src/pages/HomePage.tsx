import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Star, ArrowRight, MapPin, Phone, Clock, ChevronLeft, ChevronRight, Sparkles, Crown, Heart, Shield } from 'lucide-react';
import { useSite } from '../context/SiteContext';

function useCounter(target: number, isActive: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isActive, target]);
  return count;
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

const heroImg = { backgroundImage: `url(/images/hero.jpg)` };

export default function HomePage() {
  const { content } = useSite();
  const { featuredServices, services: serviceCategories, testimonials, businessInfo, whyChooseUs } = content;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  useEffect(() => { if (isStatsInView) setStatsInView(true); }, [isStatsInView]);

  const clients = useCounter(500, statsInView);
  const years = useCounter(8, statsInView);
  const services = useCounter(50, statsInView);
  const rating = useCounter(49, statsInView);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center" style={heroImg}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <span className="inline-block px-5 py-2 mb-6 text-xs tracking-[0.25em] uppercase text-primary border border-primary/30 rounded-full backdrop-blur-sm bg-white/5">
              {content.hero.badge}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-6">
            {content.hero.headline.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line.includes('Silky Smooth') ? <span className="text-primary">{line}</span> : line}
              </span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {content.hero.subheadline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 text-sm tracking-wide">
              Book Appointment
            </Link>
            <Link to="/services" className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm tracking-wide">
              View Services
            </Link>
            <a href={businessInfo.mapLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm tracking-wide">
              Get Directions
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-16">
            <div className="animate-bounce text-white/40">
              <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">What We Offer</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-charcoal">Signature Services</h2>
            <div className="section-divider mx-auto mt-5" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{service.title}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">{service.price}</span>
                      <Link to="/services" className="text-xs text-charcoal/40 hover:text-primary flex items-center gap-1 transition-colors">
                        Learn More <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src="/images/salon.jpg" alt="Hair Talk Salon Interior" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white px-8 py-4 rounded-xl shadow-xl">
                  <p className="font-serif text-3xl font-bold">8+</p>
                  <p className="text-sm text-white/80">Years of Excellence</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">About Hair Talk</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-3 mb-6 text-charcoal">Where Beautiful Hair Becomes Your Reality</h2>
              <p className="text-charcoal/60 leading-relaxed mb-6">
                At Hair Talk, we believe every woman deserves to feel confident and beautiful. Our Auckland salon is a sanctuary where expert craftsmanship meets personalised care, specialising in transformative blonde colouring, luxurious keratin treatments, and cutting-edge nanoplasty services.
              </p>
              <p className="text-charcoal/60 leading-relaxed mb-8">
                Led by our renowned colour specialist Lyn, our team is dedicated to understanding your unique vision and bringing it to life with meticulous attention to detail and an unwavering commitment to hair health.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 px-8 py-3 bg-charcoal text-white font-medium rounded-full hover:bg-espresso transition-all text-sm">
                More About Us <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-16 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: clients, suffix: '+', label: 'Happy Clients', icon: Heart },
              { value: years, suffix: '+', label: 'Years Experience', icon: Crown },
              { value: services, suffix: '+', label: 'Services Offered', icon: Sparkles },
              { value: rating / 10, suffix: '/5', label: 'Average Rating', icon: Star },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={statsInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }} className="text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-white/50 text-sm mt-2 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Why Hair Talk</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-charcoal">Why Clients Choose Us</h2>
            <div className="section-divider mx-auto mt-5" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">{item.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING HIGHLIGHTS */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Pricing</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-charcoal">Popular Services</h2>
            <div className="section-divider mx-auto mt-5" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.slice(0, 3).map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="font-serif text-xl font-semibold text-charcoal">{cat.name}</h3>
                  </div>
                  <div className="space-y-3">
                    {cat.services.slice(0, 4).map((s) => (
                      <div key={s.id} className="flex items-center justify-between py-2 border-b border-beige/50 last:border-0">
                        <div>
                          <p className="text-sm text-charcoal font-medium">{s.name}</p>
                          <p className="text-xs text-charcoal/40">{s.duration}</p>
                        </div>
                        <span className="text-primary font-semibold text-sm">{s.price}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/services" className="inline-flex items-center gap-1 mt-6 text-sm text-primary hover:text-primary-dark transition-colors font-medium">
                    View All Prices <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-white">What Our Clients Say</h2>
            <div className="section-divider mx-auto mt-5" />
          </AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div key={currentTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="mb-8">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-serif text-white/90 italic leading-relaxed mb-6">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="text-primary font-medium">{testimonials[currentTestimonial].name}</p>
              {testimonials[currentTestimonial].service && (
                <p className="text-white/40 text-sm mt-1">{testimonials[currentTestimonial].service}</p>
              )}
            </motion.div>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-all">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'w-6 bg-primary' : 'bg-white/20'}`} />
                ))}
              </div>
              <button onClick={() => setCurrentTestimonial((p) => (p + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM GALLERY */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Follow Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-charcoal">
              {businessInfo.instagramHandle}
            </h2>
            <div className="section-divider mx-auto mt-5" />
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {content.gallery.slice(0, 6).map((img, i) => (
              <AnimatedSection key={img.id} delay={i * 0.05}>
                <motion.a
                  href={businessInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="block aspect-square rounded-xl overflow-hidden relative group"
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                </motion.a>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all text-sm">
              Follow Us on Instagram <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-primary via-primary-dark to-espresso relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">Ready for Your Transformation?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Book your consultation and let our experts create a look tailored just for you. Your dream hair is one appointment away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="px-10 py-4 bg-white text-primary font-semibold rounded-full hover:bg-ivory transition-all shadow-xl text-sm tracking-wide">
                Book Appointment
              </Link>
              <a href={businessInfo.phoneLink} className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm tracking-wide">
                Call Us Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT & MAP */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Find Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-charcoal">Visit Hair Talk</h2>
            <div className="section-divider mx-auto mt-5" />
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-10">
            <AnimatedSection>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8!2d174.7772!3d-36.8625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47b5f5e5b5b5%3A0x1234567890abcdef!2s198+Broadway%2C+Newmarket%2C+Auckland+1023!5e0!3m2!1sen!2snz!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Hair Talk Location"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
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
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-primary" /></div>
                      <div><p className="font-medium text-charcoal text-sm mb-2">Business Hours</p><div className="space-y-1">
                        {businessInfo.hours.map((h) => (
                          <div key={h.day} className="flex justify-between text-sm gap-6">
                            <span className="text-charcoal/50">{h.day}</span>
                            <span className={h.hours === 'Closed' ? 'text-charcoal/30' : 'text-charcoal/70'}>{h.hours}</span>
                          </div>
                        ))}
                      </div></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={businessInfo.phoneLink} className="flex-1 min-w-[140px] px-6 py-3 bg-primary text-white text-sm font-medium rounded-full text-center hover:bg-primary-dark transition-all">Call Now</a>
                  <a href={businessInfo.mapLink} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px] px-6 py-3 border-2 border-primary text-primary text-sm font-medium rounded-full text-center hover:bg-primary hover:text-white transition-all">Get Directions</a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
