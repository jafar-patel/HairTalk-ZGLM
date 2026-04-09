import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
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

export default function TestimonialsPage() {
  const { content } = useSite();
  const testimonials = content.testimonials;
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-charcoal to-espresso/50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Client Love</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mt-4">What Our Clients Say</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/60 mt-6 max-w-2xl mx-auto">Real reviews from real clients who trust Hair Talk with their hair transformations.</motion.p>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-ivory">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-primary/10 via-white to-blush/20 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              <Quote className="w-16 h-16 text-primary/10 absolute top-6 left-6" />
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="font-serif text-xl sm:text-2xl text-charcoal italic leading-relaxed mb-8 max-w-2xl mx-auto">
                "My hair feels so smooth, shiny and frizz-free. I highly recommend Hair Talk if you want healthy, silky hair! The team here truly understands what your hair needs and delivers results beyond expectations."
              </p>
              <div>
                <p className="text-primary font-semibold">Judy Copper</p>
                <p className="text-charcoal/40 text-sm">Keratin Treatment Client</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold text-charcoal">All Reviews</h2>
            <p className="text-charcoal/50 mt-2">{testimonials.length} verified reviews</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} className="bg-ivory rounded-2xl p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-charcoal/70 text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t border-beige/50">
                    <p className="font-medium text-charcoal text-sm">{t.name}</p>
                    {t.service && <p className="text-xs text-primary mt-0.5">{t.service}</p>}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-espresso">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-6">Join Our Happy Clients</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">Experience the Hair Talk difference for yourself.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="px-10 py-4 bg-white text-primary font-semibold rounded-full hover:bg-ivory transition-all shadow-xl text-sm">Book Your Visit</Link>
              <a href="https://www.google.com/maps/dir//198+Broadway+Newmarket+Auckland" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">Read More Reviews</a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
