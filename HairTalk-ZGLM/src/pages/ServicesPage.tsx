import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Tag, Clock, Info } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function ServicesPage() {
  const { content } = useSite();
  const serviceCategories = content.services;
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPromoOnly, setShowPromoOnly] = useState(false);

  const filteredCategories = activeCategory === 'all'
    ? serviceCategories
    : serviceCategories.filter(c => c.id === activeCategory);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-charcoal to-espresso/50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Our Services</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mt-4">Services & Pricing</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed">
            Explore our full range of premium hair services. Transparent pricing, expert delivery, stunning results.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-ivory/95 backdrop-blur-md border-b border-beige/50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all' ? 'bg-primary text-white' : 'bg-white text-charcoal/60 hover:text-primary border border-beige'
              }`}
            >
              All Services
            </button>
            {serviceCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id ? 'bg-primary text-white' : 'bg-white text-charcoal/60 hover:text-primary border border-beige'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
            <button
              onClick={() => setShowPromoOnly(!showPromoOnly)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                showPromoOnly ? 'bg-rose text-white' : 'bg-white text-charcoal/60 hover:text-rose border border-beige'
              }`}
            >
              <Tag size={14} /> Promotions
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + (showPromoOnly ? '-promo' : '')} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {filteredCategories.map((cat) => {
                const services = showPromoOnly ? cat.services.filter(s => s.isPromotion) : cat.services;
                if (services.length === 0) return null;
                return (
                  <div key={cat.id} className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{cat.icon}</span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">{cat.name}</h2>
                      <div className="flex-1 h-px bg-beige ml-4" />
                    </div>
                    <div className="grid gap-3">
                      {services.map((service, i) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className={`bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${
                            service.isPromotion ? 'border-l-4 border-rose' : ''
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-medium text-charcoal">{service.name}</h3>
                                {service.isPromotion && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose/10 text-rose text-xs rounded-full font-medium">
                                    <Tag size={10} /> PROMO
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-charcoal/40">
                                  <Clock size={12} /> {service.duration}
                                </span>
                                {service.description && (
                                  <span className="text-xs text-charcoal/40">{service.description}</span>
                                )}
                              </div>
                              {service.note && (
                                <p className="flex items-start gap-1 text-xs text-charcoal/40 mt-2">
                                  <Info size={12} className="shrink-0 mt-0.5" /> {service.note}
                                </p>
                              )}
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`text-xl font-semibold ${service.price === 'Free' ? 'text-emerald-600' : 'text-primary'}`}>
                                {service.price}
                              </span>
                              {service.price !== 'Free' && <p className="text-xs text-charcoal/30 mt-0.5">NZD</p>}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-12 bg-white rounded-2xl p-8 shadow-sm">
            <p className="text-charcoal/60 text-sm mb-2">Prices are in New Zealand Dollars (NZD)</p>
            <p className="text-charcoal/40 text-xs mb-6">Length and thickness surcharges may apply. Please book a free consultation for an accurate quote.</p>
            <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-all text-sm">
              Book a Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
