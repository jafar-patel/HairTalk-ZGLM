import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Tag, ArrowLeft, Search } from 'lucide-react';
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

export default function BlogPage() {
  const { content } = useSite();
  const blogPosts = content.blogPosts;
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(blogPosts.map(p => p.category)))];
  const post = blogPosts.find(p => p.id === selectedPost);

  const filteredPosts = blogPosts.filter(p => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (post) {
    return (
      <div className="overflow-hidden">
        <section className="relative py-32 sm:py-40 bg-charcoal overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-charcoal to-espresso/50" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-xs tracking-[0.25em] uppercase font-medium mb-4">{post.category}</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-semibold">{post.title}</motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-4 mt-6 text-white/50 text-sm">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
            </motion.div>
          </div>
        </section>
        <section className="py-16 bg-ivory">
          <div className="max-w-3xl mx-auto px-4">
            <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors text-sm font-medium mb-8">
              <ArrowLeft size={16} /> Back to Blog
            </button>
            <div className="aspect-video rounded-2xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <article className="prose prose-lg max-w-none">
              {post.content.map((paragraph, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="text-charcoal/70 leading-relaxed mb-6">
                  {paragraph}
                </motion.p>
              ))}
            </article>
            <div className="flex items-center gap-2 mt-10 pt-8 border-t border-beige">
              <Tag size={14} className="text-primary" />
              <span className="text-sm text-charcoal/50">{post.category}</span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <section className="relative py-32 sm:py-40 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-charcoal to-espresso/50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Hair Talk Blog</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mt-4">Tips & Inspiration</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/60 mt-6 max-w-2xl mx-auto">Expert hair care advice, treatment guides, and the latest trends from our Auckland salon.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search articles..." className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-beige bg-white focus:border-primary transition-all text-sm" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat ? 'bg-primary text-white' : 'bg-white text-charcoal/60 hover:text-primary border border-beige'
                }`}>
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <AnimatedSection className="mb-12">
              <motion.div whileHover={{ y: -4 }} onClick={() => setSelectedPost(filteredPosts[0].id)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto">
                  <img src={filteredPosts[0].image} alt={filteredPosts[0].title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <span className="text-primary text-xs tracking-[0.2em] uppercase font-medium">{filteredPosts[0].category}</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-3 mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-charcoal/60 leading-relaxed mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-charcoal/40">
                    <span>{filteredPosts[0].date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {filteredPosts[0].readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:gap-2 transition-all">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            </AnimatedSection>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPosts.slice(1).map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.1}>
                  <motion.article whileHover={{ y: -4 }} onClick={() => setSelectedPost(p.id)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-charcoal/40 mb-3">
                        <span className="text-primary font-medium">{p.category}</span>
                        <span>·</span>
                        <span>{p.date}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-charcoal mb-3 flex-1">{p.title}</h3>
                      <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </motion.article>
                </AnimatedSection>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-charcoal/40 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
