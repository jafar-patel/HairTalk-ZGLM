import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Heart, Shield, Sparkles, Users, Award, Star, type LucideIcon } from 'lucide-react';
import { useSite } from '../context/SiteContext';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

const iconMap: Record<string, LucideIcon> = { Heart, Shield, Sparkles, Users, Award, Star };

export default function AboutPage() {
  const { content } = useSite();
  const { about, whyChooseUs } = content;

  const values = about.values.map(v => ({
    ...v,
    Icon: iconMap[v.icon] || Heart,
  }));

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-charcoal to-espresso/50" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Our Story</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mt-4">About {content.businessInfo.name}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed">Where artistry meets expertise, and every visit is a journey to your most confident self.</motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src="/images/hero.jpg" alt="Hair Talk Stylist" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                  <p className="font-serif text-3xl font-bold text-primary">500+</p>
                  <p className="text-charcoal/60 text-sm">Happy Clients</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Who We Are</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-3 mb-6 text-charcoal">Your Hair Deserves the Very Best</h2>
              <div className="space-y-4 text-charcoal/60 leading-relaxed">
                {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Our Mission</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-3 mb-8 text-charcoal">Empowering Women Through Beautiful Hair</h2>
            <div className="section-divider mx-auto mb-8" />
            <p className="text-charcoal/60 text-lg leading-relaxed max-w-3xl mx-auto">{about.mission}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Our Values</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-3 text-charcoal">What We Stand For</h2>
            <div className="section-divider mx-auto mt-5" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <v.Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">{v.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{v.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Stylist */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="/images/blonde-hair.jpg" alt={`${about.stylistName} - Hair Talk Stylist`} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
                  <p className="text-primary font-serif font-semibold text-sm">{about.stylistTitle}</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Meet the Stylist</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-3 mb-6 text-charcoal">{about.stylistName} — Your Blonde Specialist</h2>
              <div className="space-y-4 text-charcoal/60 leading-relaxed">
                {about.stylistBio.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-4 py-2 bg-primary/10 text-primary text-xs rounded-full font-medium">Blonde Specialist</span>
                <span className="px-4 py-2 bg-primary/10 text-primary text-xs rounded-full font-medium">Balayage Expert</span>
                <span className="px-4 py-2 bg-primary/10 text-primary text-xs rounded-full font-medium">Keratin Certified</span>
                <span className="px-4 py-2 bg-primary/10 text-primary text-xs rounded-full font-medium">Nanoplasty Expert</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 sm:py-28 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Trust & Confidence</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-3 mb-8 text-white">Why Clients Trust {content.businessInfo.name}</h2>
            <div className="section-divider mx-auto mb-10" />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {whyChooseUs.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">{item.title}</p>
                    <p className="text-white/50 text-xs mt-1">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-primary via-primary-dark to-espresso">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-6">Ready to Experience the Difference?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">Book your consultation and let {about.stylistName} create a look that's perfectly tailored to you.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="px-10 py-4 bg-white text-primary font-semibold rounded-full hover:bg-ivory transition-all shadow-xl text-sm">Book Appointment</Link>
              <Link to="/services" className="px-10 py-4 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">View Services</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
