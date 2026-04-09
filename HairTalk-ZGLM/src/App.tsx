import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteProvider } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
          <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
          <Route path="/booking" element={<PageLayout><BookingPage /></PageLayout>} />
          <Route path="/testimonials" element={<PageLayout><TestimonialsPage /></PageLayout>} />
          <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <AppLayout />
      </SiteProvider>
    </BrowserRouter>
  );
}
