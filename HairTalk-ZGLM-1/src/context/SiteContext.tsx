import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { serviceCategories as defaultServices, ServiceCategory, featuredServices as defaultFeatured, FeaturedService } from '../data/services';
import { testimonials as defaultTestimonials, Testimonial, blogPosts as defaultBlog, BlogPost, businessInfo as defaultBusiness, whyChooseUs as defaultWhy } from '../data/content';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
}

export interface AboutContent {
  paragraphs: string[];
  mission: string;
  values: { icon: string; title: string; description: string }[];
  stylistName: string;
  stylistTitle: string;
  stylistBio: string[];
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  caption: string;
}

export interface Booking {
  id: string;
  category: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  stylist: string;
  status: string;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  phoneLink: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  hours: { day: string; hours: string }[];
  mapEmbedUrl: string;
  mapLink: string;
}

interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  whyChooseUs: { title: string; description: string }[];
  services: ServiceCategory[];
  featuredServices: FeaturedService[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  businessInfo: BusinessInfo;
  seo: SEOSettings;
  gallery: GalleryItem[];
  bookings: Booking[];
  messages: Message[];
}

interface SiteContextType {
  content: SiteContent;
  loading: boolean;
  supabaseConnected: boolean;
  updateHero: (hero: HeroContent) => void;
  updateAbout: (about: AboutContent) => void;
  updateWhyChooseUs: (items: { title: string; description: string }[]) => void;
  updateServices: (services: ServiceCategory[]) => void;
  updateFeaturedServices: (services: FeaturedService[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateBusinessInfo: (info: BusinessInfo) => void;
  updateSEO: (seo: SEOSettings) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: string) => void;
  deleteBooking: (id: string) => void;
  addMessage: (message: Message) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  resetToDefaults: () => void;
}

const defaultHero: HeroContent = {
  badge: "Auckland's Premier Hair Salon",
  headline: 'Beautiful Blonde,\nSilky Smoothed,\nConfidence Restored',
  subheadline: "Auckland's go-to salon for expert blonde colouring, balayage, keratin treatments, nanoplasty, and modern hair transformations.",
};

const defaultAbout: AboutContent = {
  paragraphs: [
    "Welcome to Hair Talk — Auckland's premier destination for beautiful, blonde hair and beyond. We are more than just a salon; we are a space where transformation happens, confidence is restored, and every woman leaves feeling like the best version of herself.",
    "Specialising in blonde hair care, we offer a comprehensive range of premium services including precision haircuts, luxurious blowouts, expert styling, perms, global colour, highlights, balayage, and stunning updos. Our expertise in keratin treatments and nanoplasty sets us apart as Auckland's go-to specialists for smooth, healthy, frizz-free hair.",
    "Whether you're seeking a dramatic new look or expert maintenance of your current style, our dedicated team of skilled stylists is committed to delivering stunning results tailored exclusively to your individual needs, hair type, and lifestyle.",
    "Every visit to Hair Talk begins with a personalised consultation — because we believe understanding your vision is the first step to creating it. Our salon environment is designed for your comfort, providing a relaxing retreat where you can truly unwind while we work our magic.",
  ],
  mission: "Our mission is to provide every client with an exceptional salon experience that combines expert craftsmanship, personalised care, and a genuine commitment to hair health. We strive to be Auckland's most trusted salon for blonde colouring, balayage, keratin, and nanoplasty — transforming not just hair, but confidence.",
  values: [
    { icon: 'Heart', title: 'Passion for Beauty', description: 'Every service is performed with genuine love for the craft and a desire to make you feel extraordinary.' },
    { icon: 'Shield', title: 'Hair Health First', description: 'We never compromise the integrity of your hair. Healthy hair is always the foundation of any great look.' },
    { icon: 'Users', title: 'Personalised Care', description: 'No two clients are the same. We tailor every treatment to your unique hair type, lifestyle, and vision.' },
    { icon: 'Award', title: 'Excellence in Craft', description: 'Continuous education and mastery of the latest techniques ensure you receive world-class service.' },
    { icon: 'Sparkles', title: 'Warm & Welcoming', description: 'Our salon is your sanctuary. We create a relaxing atmosphere where you can truly unwind.' },
    { icon: 'Star', title: 'Trust & Integrity', description: 'Honest recommendations, transparent pricing, and a genuine commitment to your satisfaction.' },
  ],
  stylistName: 'Lyn',
  stylistTitle: 'Senior Colourist & Founder',
  stylistBio: [
    "With over 8 years of experience specialising in blonde colouring and hair treatments, Lyn has earned a reputation as one of Auckland's most trusted colourists.",
    "Her expertise in balayage, keratin treatments, and nanoplasty has transformed hundreds of clients' hair, earning a loyal following across Auckland.",
    "Lyn believes in continuous education and regularly trains with industry leaders to stay at the forefront of hair technology and techniques.",
  ],
};

const defaultSEO: SEOSettings = {
  title: "Hair Talk | Auckland's Premier Blonde & Nanoplasty Hair Salon",
  description: 'Expert blonde colouring, balayage, keratin treatments, and nanoplasty in Newmarket, Auckland. Book your transformation at Hair Talk today.',
  keywords: 'Hair salon Auckland, Blonde specialist Auckland, Balayage Auckland, Keratin treatment Auckland, Nanoplasty Auckland, Hairdresser Newmarket, Blonde balayage Newmarket, Hair Talk Auckland',
  ogImage: '/images/hero.jpg',
};

const defaultGallery: GalleryItem[] = [
  { id: '1', url: '/images/hero.jpg', alt: 'Blonde Hair Transformation', caption: 'Beautiful blonde result' },
  { id: '2', url: '/images/blonde-hair.jpg', alt: 'Balayage Style', caption: 'Natural balayage' },
  { id: '3', url: '/images/salon.jpg', alt: 'Salon Interior', caption: 'Our welcoming salon' },
  { id: '4', url: '/images/hero.jpg', alt: 'Nanoplasty Result', caption: 'Silky smooth hair' },
  { id: '5', url: '/images/blonde-hair.jpg', alt: 'Blonde Colouring', caption: 'Expert blonde colour' },
  { id: '6', url: '/images/salon.jpg', alt: 'Keratin Treatment', caption: 'Keratin transformation' },
];

const defaultContent: SiteContent = {
  hero: defaultHero,
  about: defaultAbout,
  whyChooseUs: defaultWhy,
  services: defaultServices,
  featuredServices: defaultFeatured,
  testimonials: defaultTestimonials,
  blogPosts: defaultBlog,
  businessInfo: defaultBusiness,
  seo: defaultSEO,
  gallery: defaultGallery,
  bookings: [],
  messages: [],
};

function loadFromLS<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(`hairtalk_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function loadAllFromLS(): SiteContent {
  return {
    hero: loadFromLS('hero', defaultContent.hero),
    about: loadFromLS('about', defaultContent.about),
    whyChooseUs: loadFromLS('whyChooseUs', defaultContent.whyChooseUs),
    services: loadFromLS('services', defaultContent.services),
    featuredServices: loadFromLS('featuredServices', defaultContent.featuredServices),
    testimonials: loadFromLS('testimonials', defaultContent.testimonials),
    blogPosts: loadFromLS('blogPosts', defaultContent.blogPosts),
    businessInfo: loadFromLS('businessInfo', defaultContent.businessInfo),
    seo: loadFromLS('seo', defaultContent.seo),
    gallery: loadFromLS('gallery', defaultContent.gallery),
    bookings: loadFromLS('bookings', []),
    messages: loadFromLS('messages', []),
  };
}

function saveToLS(key: string, data: unknown) {
  try {
    localStorage.setItem(`hairtalk_${key}`, JSON.stringify(data));
  } catch { /* ignore */ }
}

function saveAllToLS(data: SiteContent) {
  Object.entries(data).forEach(([k, v]) => saveToLS(k, v));
}

// Save site content JSON to Supabase
async function saveToSupabase(data: Partial<SiteContent>) {
  if (!isSupabaseConfigured) return;
  try {
    const { hero, about, whyChooseUs, services, featuredServices,
            testimonials, blogPosts, businessInfo, seo, gallery } = data;
    const jsonBlob = { hero, about, whyChooseUs, services, featuredServices,
                       testimonials, blogPosts, businessInfo, seo, gallery };
    await supabase
      .from('site_content')
      .upsert({ id: 1, data: jsonBlob, updated_at: new Date().toISOString() });
  } catch (err) {
    console.error('Supabase save error:', err);
  }
}

// Save booking to Supabase
async function saveBookingToSupabase(booking: Booking) {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from('bookings').insert({
      id: booking.id,
      category: booking.category,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      notes: booking.notes,
      stylist: booking.stylist,
      status: booking.status,
      created_at: booking.createdAt,
    });
  } catch (err) {
    console.error('Supabase booking save error:', err);
  }
}

// Save message to Supabase
async function saveMessageToSupabase(message: Message) {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from('messages').insert({
      id: message.id,
      name: message.name,
      email: message.email,
      phone: message.phone,
      subject: message.subject,
      message: message.message,
      read: message.read,
      created_at: message.createdAt,
    });
  } catch (err) {
    console.error('Supabase message save error:', err);
  }
}

// Load bookings from Supabase
async function loadBookingsFromSupabase(): Promise<Booking[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map((b: Record<string, unknown>) => ({
      id: String(b.id),
      category: String(b.category || ''),
      service: String(b.service || ''),
      date: String(b.date || ''),
      time: String(b.time || ''),
      name: String(b.name || ''),
      phone: String(b.phone || ''),
      email: String(b.email || ''),
      notes: String(b.notes || ''),
      stylist: String(b.stylist || ''),
      status: String(b.status || 'pending'),
      createdAt: String(b.created_at || new Date().toISOString()),
    }));
  } catch {
    return [];
  }
}

// Load messages from Supabase
async function loadMessagesFromSupabase(): Promise<Message[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map((m: Record<string, unknown>) => ({
      id: String(m.id),
      name: String(m.name || ''),
      email: String(m.email || ''),
      phone: String(m.phone || ''),
      subject: String(m.subject || ''),
      message: String(m.message || ''),
      read: Boolean(m.read),
      createdAt: String(m.created_at || new Date().toISOString()),
    }));
  } catch {
    return [];
  }
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadAllFromLS);
  const [loading, setLoading] = useState(true);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadFromSupabase() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        // Load site content
        const { data: siteData, error: siteError } = await supabase
          .from('site_content')
          .select('data')
          .eq('id', 1)
          .single();

        // Load bookings and messages in parallel
        const [supaBookings, supaMessages] = await Promise.all([
          loadBookingsFromSupabase(),
          loadMessagesFromSupabase(),
        ]);

        if (!siteError && siteData?.data && Object.keys(siteData.data).length > 0) {
          const d = siteData.data as Record<string, unknown>;
          const merged: SiteContent = {
            hero: (d.hero as HeroContent) || defaultContent.hero,
            about: (d.about as AboutContent) || defaultContent.about,
            whyChooseUs: (d.whyChooseUs as { title: string; description: string }[]) || defaultContent.whyChooseUs,
            services: (d.services as ServiceCategory[]) || defaultContent.services,
            featuredServices: (d.featuredServices as FeaturedService[]) || defaultContent.featuredServices,
            testimonials: (d.testimonials as Testimonial[]) || defaultContent.testimonials,
            blogPosts: (d.blogPosts as BlogPost[]) || defaultContent.blogPosts,
            businessInfo: (d.businessInfo as BusinessInfo) || defaultContent.businessInfo,
            seo: (d.seo as SEOSettings) || defaultContent.seo,
            gallery: (d.gallery as GalleryItem[]) || defaultContent.gallery,
            bookings: supaBookings.length > 0 ? supaBookings : loadFromLS('bookings', []),
            messages: supaMessages.length > 0 ? supaMessages : loadFromLS('messages', []),
          };
          saveAllToLS(merged);
          setContent(merged);
          setSupabaseConnected(true);
        } else {
          // No Supabase data yet — upload defaults
          await saveToSupabase(loadAllFromLS());
          if (supaBookings.length > 0 || supaMessages.length > 0) {
            setContent(prev => ({
              ...prev,
              bookings: supaBookings,
              messages: supaMessages,
            }));
          }
          setSupabaseConnected(true);
        }
      } catch (err) {
        console.error('Supabase load error:', err);
        setSupabaseConnected(false);
      }
      setLoading(false);
    }
    loadFromSupabase();
  }, []);

  // Helper: update content + save everywhere
  const updateContent = useCallback((partial: Partial<SiteContent>) => {
    setContent(prev => {
      const next = { ...prev, ...partial };
      saveAllToLS(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateHero = useCallback((hero: HeroContent) => updateContent({ hero }), [updateContent]);
  const updateAbout = useCallback((about: AboutContent) => updateContent({ about }), [updateContent]);
  const updateWhyChooseUs = useCallback((whyChooseUs: { title: string; description: string }[]) => updateContent({ whyChooseUs }), [updateContent]);
  const updateServices = useCallback((services: ServiceCategory[]) => updateContent({ services }), [updateContent]);
  const updateFeaturedServices = useCallback((featuredServices: FeaturedService[]) => updateContent({ featuredServices }), [updateContent]);
  const updateTestimonials = useCallback((testimonials: Testimonial[]) => updateContent({ testimonials }), [updateContent]);
  const updateBlogPosts = useCallback((blogPosts: BlogPost[]) => updateContent({ blogPosts }), [updateContent]);
  const updateBusinessInfo = useCallback((businessInfo: BusinessInfo) => updateContent({ businessInfo }), [updateContent]);
  const updateSEO = useCallback((seo: SEOSettings) => updateContent({ seo }), [updateContent]);
  const updateGallery = useCallback((gallery: GalleryItem[]) => updateContent({ gallery }), [updateContent]);

  const addBooking = useCallback((booking: Booking) => {
    setContent(prev => {
      const bookings = [...prev.bookings, booking];
      saveToLS('bookings', bookings);
      saveBookingToSupabase(booking);
      return { ...prev, bookings };
    });
  }, []);

  const updateBookingStatus = useCallback((id: string, status: string) => {
    setContent(prev => {
      const bookings = prev.bookings.map(b => b.id === id ? { ...b, status } : b);
      saveToLS('bookings', bookings);
      if (isSupabaseConfigured) {
        supabase.from('bookings').update({ status }).eq('id', id).then();
      }
      return { ...prev, bookings };
    });
  }, []);

  const deleteBooking = useCallback((id: string) => {
    setContent(prev => {
      const bookings = prev.bookings.filter(b => b.id !== id);
      saveToLS('bookings', bookings);
      if (isSupabaseConfigured) {
        supabase.from('bookings').delete().eq('id', id).then();
      }
      return { ...prev, bookings };
    });
  }, []);

  const addMessage = useCallback((message: Message) => {
    setContent(prev => {
      const messages = [...prev.messages, message];
      saveToLS('messages', messages);
      saveMessageToSupabase(message);
      return { ...prev, messages };
    });
  }, []);

  const markMessageRead = useCallback((id: string) => {
    setContent(prev => {
      const messages = prev.messages.map(m => m.id === id ? { ...m, read: true } : m);
      saveToLS('messages', messages);
      if (isSupabaseConfigured) {
        supabase.from('messages').update({ read: true }).eq('id', id).then();
      }
      return { ...prev, messages };
    });
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setContent(prev => {
      const messages = prev.messages.filter(m => m.id !== id);
      saveToLS('messages', messages);
      if (isSupabaseConfigured) {
        supabase.from('messages').delete().eq('id', id).then();
      }
      return { ...prev, messages };
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaults: SiteContent = {
      hero: defaultHero,
      about: defaultAbout,
      whyChooseUs: defaultWhy,
      services: defaultServices,
      featuredServices: defaultFeatured,
      testimonials: defaultTestimonials,
      blogPosts: defaultBlog,
      businessInfo: defaultBusiness,
      seo: defaultSEO,
      gallery: defaultGallery,
      bookings: [],
      messages: [],
    };
    saveAllToLS(defaults);
    saveToSupabase(defaults);
    setContent(defaults);
  }, []);

  // Update document SEO on change
  useEffect(() => {
    document.title = content.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', content.seo.description);
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', content.seo.keywords);
  }, [content.seo]);

  return (
    <SiteContext.Provider value={{
      content, loading, supabaseConnected,
      updateHero, updateAbout, updateWhyChooseUs, updateServices,
      updateFeaturedServices, updateTestimonials, updateBlogPosts, updateBusinessInfo,
      updateSEO, updateGallery, addBooking, updateBookingStatus, deleteBooking,
      addMessage, markMessageRead, deleteMessage, resetToDefaults,
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
