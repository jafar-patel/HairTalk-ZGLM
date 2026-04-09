import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { serviceCategories as defaultServices, ServiceCategory, featuredServices as defaultFeatured, FeaturedService } from '../data/services';
import { testimonials as defaultTestimonials, Testimonial, blogPosts as defaultBlog, BlogPost, businessInfo as defaultBusiness, whyChooseUs as defaultWhy } from '../data/content';

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
  headline: 'Beautiful Blonde,\nSilky Smooth,\nConfidence Restored',
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
    'With over 8 years of experience specialising in blonde colouring and hair treatments, Lyn has earned a reputation as one of Auckland\'s most trusted colourists.',
    'Her expertise in balayage, keratin treatments, and nanoplasty has transformed hundreds of clients\' hair, earning a loyal following across Auckland.',
    'Lyn believes in continuous education and regularly trains with industry leaders to stay at the forefront of hair technology and techniques.',
  ],
};

const defaultSEO: SEOSettings = {
  title: 'Hair Talk | Auckland\'s Premier Blonde & Nanoplasty Hair Salon',
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

function loadFromLS<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(`hairtalk_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveToLS(key: string, data: unknown) {
  localStorage.setItem(`hairtalk_${key}`, JSON.stringify(data));
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>({
    hero: loadFromLS('hero', defaultHero),
    about: loadFromLS('about', defaultAbout),
    whyChooseUs: loadFromLS('whyChooseUs', defaultWhy),
    services: loadFromLS('services', defaultServices),
    featuredServices: loadFromLS('featuredServices', defaultFeatured),
    testimonials: loadFromLS('testimonials', defaultTestimonials),
    blogPosts: loadFromLS('blogPosts', defaultBlog),
    businessInfo: loadFromLS('businessInfo', defaultBusiness),
    seo: loadFromLS('seo', defaultSEO),
    gallery: loadFromLS('gallery', defaultGallery),
    bookings: loadFromLS('bookings', []),
    messages: loadFromLS('messages', []),
  });

  const updateHero = (hero: HeroContent) => {
    saveToLS('hero', hero);
    setContent(p => ({ ...p, hero }));
  };
  const updateAbout = (about: AboutContent) => {
    saveToLS('about', about);
    setContent(p => ({ ...p, about }));
  };
  const updateWhyChooseUs = (items: { title: string; description: string }[]) => {
    saveToLS('whyChooseUs', items);
    setContent(p => ({ ...p, whyChooseUs: items }));
  };
  const updateServices = (services: ServiceCategory[]) => {
    saveToLS('services', services);
    setContent(p => ({ ...p, services }));
  };
  const updateFeaturedServices = (services: FeaturedService[]) => {
    saveToLS('featuredServices', services);
    setContent(p => ({ ...p, featuredServices: services }));
  };
  const updateTestimonials = (testimonials: Testimonial[]) => {
    saveToLS('testimonials', testimonials);
    setContent(p => ({ ...p, testimonials }));
  };
  const updateBlogPosts = (posts: BlogPost[]) => {
    saveToLS('blogPosts', posts);
    setContent(p => ({ ...p, blogPosts: posts }));
  };
  const updateBusinessInfo = (info: BusinessInfo) => {
    saveToLS('businessInfo', info);
    setContent(p => ({ ...p, businessInfo: info }));
  };
  const updateSEO = (seo: SEOSettings) => {
    saveToLS('seo', seo);
    setContent(p => ({ ...p, seo }));
  };
  const updateGallery = (gallery: GalleryItem[]) => {
    saveToLS('gallery', gallery);
    setContent(p => ({ ...p, gallery }));
  };

  const addBooking = (booking: Booking) => {
    setContent(p => {
      const bookings = [...p.bookings, booking];
      saveToLS('bookings', bookings);
      return { ...p, bookings };
    });
  };
  const updateBookingStatus = (id: string, status: string) => {
    setContent(p => {
      const bookings = p.bookings.map(b => b.id === id ? { ...b, status } : b);
      saveToLS('bookings', bookings);
      return { ...p, bookings };
    });
  };
  const deleteBooking = (id: string) => {
    setContent(p => {
      const bookings = p.bookings.filter(b => b.id !== id);
      saveToLS('bookings', bookings);
      return { ...p, bookings };
    });
  };

  const addMessage = (message: Message) => {
    setContent(p => {
      const messages = [...p.messages, message];
      saveToLS('messages', messages);
      return { ...p, messages };
    });
  };
  const markMessageRead = (id: string) => {
    setContent(p => {
      const messages = p.messages.map(m => m.id === id ? { ...m, read: true } : m);
      saveToLS('messages', messages);
      return { ...p, messages };
    });
  };
  const deleteMessage = (id: string) => {
    setContent(p => {
      const messages = p.messages.filter(m => m.id !== id);
      saveToLS('messages', messages);
      return { ...p, messages };
    });
  };

  const resetToDefaults = () => {
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
    Object.entries(defaults).forEach(([k, v]) => saveToLS(k, v));
    setContent(defaults);
  };

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
      content, updateHero, updateAbout, updateWhyChooseUs, updateServices,
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
