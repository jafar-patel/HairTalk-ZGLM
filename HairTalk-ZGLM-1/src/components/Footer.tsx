import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { businessInfo } from '../data/content';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-block">
              <h3 className="font-serif text-3xl font-semibold text-white mb-3">Hair Talk</h3>
              <p className="text-primary text-sm tracking-wide uppercase">Nanoplasty Hair Experts</p>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Auckland's go-to salon for expert blonde colouring, balayage, keratin treatments, nanoplasty, and modern hair transformations.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-all"><InstagramIcon /></a>
              <a href={businessInfo.phoneLink} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-all"><Phone size={18} /></a>
              <a href={`mailto:${businessInfo.email}`} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-all"><Mail size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[{ to: '/', label: 'Home' },{ to: '/about', label: 'About Us' },{ to: '/services', label: 'Services & Pricing' },{ to: '/booking', label: 'Book Appointment' },{ to: '/testimonials', label: 'Testimonials' },{ to: '/blog', label: 'Blog' },{ to: '/contact', label: 'Contact' }].map((link) => (
                <li key={link.to}><Link to={link.to} className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1 group"><ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-5">Our Services</h4>
            <ul className="space-y-3">
              {['Blonde Colouring','Balayage & Foils','Keratin Treatment','Nanoplasty','Haircuts & Styling','Perm & Straightening','Global Colour & Bleach','Hair Treatments'].map((s) => (
                <li key={s}><Link to="/services" className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1 group"><ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><MapPin size={16} className="text-primary mt-1 shrink-0" /><span className="text-sm text-white/60">{businessInfo.address}</span></li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-primary shrink-0" /><a href={businessInfo.phoneLink} className="text-sm text-white/60 hover:text-primary transition-colors">{businessInfo.phone}</a></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary shrink-0" /><a href={`mailto:${businessInfo.email}`} className="text-sm text-white/60 hover:text-primary transition-colors">{businessInfo.email}</a></li>
              <li className="flex items-start gap-3"><Clock size={16} className="text-primary mt-1 shrink-0" /><div className="text-sm text-white/60"><p>Mon–Fri: 10 AM – 6 PM</p><p>Sat: 9 AM – 5 PM</p><p>Sun: Closed</p></div></li>
            </ul>
            <Link to="/booking" className="inline-block mt-6 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-all">Book Appointment</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Hair Talk. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-xs text-white/30 hover:text-white/50 transition-colors">Internal</Link>
            <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/50 transition-colors">{businessInfo.instagramHandle}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
