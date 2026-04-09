import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { serviceCategories } from '../data/services';

const timeSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '', stylist: 'any' });
  const [submitted, setSubmitted] = useState(false);

  const category = serviceCategories.find(c => c.id === selectedCategory);
  const service = category?.services.find(s => s.id === selectedService);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async () => {
    const booking = {
      id: Date.now().toString(),
      category: category?.name,
      service: service?.name,
      date: selectedDate,
      time: selectedTime,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    // Save to localStorage for admin panel
    const bookings = JSON.parse(localStorage.getItem('hairtalk_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('hairtalk_bookings', JSON.stringify(bookings));
    // Submit to Formspree
    try {
      await fetch('https://formspree.io/f/mwvwbkop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Hair Talk Booking: ${service?.name || 'Service'} - ${selectedDate} at ${selectedTime}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          stylist: formData.stylist === 'any' ? 'No Preference' : formData.stylist,
          service: service?.name || 'Not selected',
          category: category?.name || 'Not selected',
          date: selectedDate,
          time: selectedTime,
          notes: formData.notes,
          _form_type: 'booking',
        }),
      });
    } catch { /* localStorage backup still works */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center bg-white rounded-2xl p-10 shadow-lg">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-charcoal mb-4">Booking Received!</h2>
          <p className="text-charcoal/60 leading-relaxed mb-6">Thank you, {formData.name}! Your booking request for <strong>{service?.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been received. We'll confirm your appointment shortly via phone or email.</p>
          <p className="text-charcoal/40 text-sm mb-8">You'll receive a confirmation within 24 hours.</p>
          <button onClick={() => { setSubmitted(false); setStep(1); setSelectedCategory(''); setSelectedService(''); setSelectedDate(''); setSelectedTime(''); setFormData({ name: '', phone: '', email: '', notes: '', stylist: 'any' }); }} className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-all text-sm">
            Book Another Appointment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-charcoal to-espresso/50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary text-xs tracking-[0.25em] uppercase font-medium">Book Now</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mt-4">Book Your Appointment</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/60 mt-6 max-w-2xl mx-auto">Book your consultation and let our experts create a look tailored just for you.</motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-ivory">
        <div className="max-w-3xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= s ? 'bg-primary text-white' : 'bg-beige text-charcoal/40'
                }`}>
                  {step > s ? <Check size={16} /> : s}
                </div>
                {s < 4 && <div className={`w-12 sm:w-20 h-0.5 ${step > s ? 'bg-primary' : 'bg-beige'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">Select Your Service</h2>
                  <p className="text-charcoal/50 text-sm mb-8">Choose the service category and specific treatment you'd like.</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">Service Category</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {serviceCategories.map(cat => (
                          <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setSelectedService(''); }} className={`p-3 rounded-xl text-sm text-left transition-all ${
                            selectedCategory === cat.id ? 'bg-primary/10 border-2 border-primary text-primary' : 'bg-ivory border-2 border-transparent text-charcoal/60 hover:border-primary/30'
                          }`}>
                            <span className="text-lg">{cat.icon}</span>
                            <p className="mt-1 font-medium text-xs">{cat.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedCategory && category && (
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-3">Select Service</label>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {category.services.map(s => (
                            <button key={s.id} onClick={() => setSelectedService(s.id)} className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${
                              selectedService === s.id ? 'bg-primary/10 border-2 border-primary' : 'bg-ivory border-2 border-transparent hover:border-primary/30'
                            }`}>
                              <div>
                                <p className="text-sm font-medium text-charcoal">{s.name} {s.isPromotion && <span className="text-rose text-xs ml-1">PROMO</span>}</p>
                                <p className="text-xs text-charcoal/40 flex items-center gap-1 mt-0.5"><Clock size={10} /> {s.duration}</p>
                              </div>
                              <span className="text-primary font-semibold text-sm">{s.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">Choose Date & Time</h2>
                  <p className="text-charcoal/50 text-sm mb-8">Pick your preferred appointment date and time slot.</p>
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-3"><Calendar size={16} /> Preferred Date</label>
                      <input type="date" min={today} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory text-charcoal focus:border-primary transition-all" />
                    </div>
                    {selectedDate && (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-3"><Clock size={16} /> Available Times</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {timeSlots.map(time => (
                            <button key={time} onClick={() => setSelectedTime(time)} className={`py-3 rounded-xl text-xs font-medium transition-all ${
                              selectedTime === time ? 'bg-primary text-white' : 'bg-ivory text-charcoal/60 hover:bg-primary/10'
                            }`}>
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">Preferred Stylist</label>
                      <select value={formData.stylist} onChange={e => setFormData({ ...formData, stylist: e.target.value })} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory text-charcoal focus:border-primary transition-all">
                        <option value="any">No Preference</option>
                        <option value="lyn">Lyn (Blonde & Balayage Specialist)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Personal Info */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">Your Details</h2>
                  <p className="text-charcoal/50 text-sm mb-8">Tell us about yourself so we can confirm your booking.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2"><User size={14} /> Full Name *</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2"><Phone size={14} /> Phone Number *</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+64 ..." className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2"><Mail size={14} /> Email Address</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2"><MessageSquare size={14} /> Notes / Hair Goals</label>
                      <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Tell us about your hair goals or any special requests..." rows={4} className="w-full p-4 rounded-xl border-2 border-beige bg-ivory focus:border-primary transition-all resize-none" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">Review Your Booking</h2>
                  <p className="text-charcoal/50 text-sm mb-8">Please confirm all details are correct before submitting.</p>
                  <div className="bg-ivory rounded-xl p-6 space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                      <span className="text-sm text-charcoal/50">Service</span>
                      <span className="text-sm font-medium text-charcoal">{service?.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                      <span className="text-sm text-charcoal/50">Date</span>
                      <span className="text-sm font-medium text-charcoal">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                      <span className="text-sm text-charcoal/50">Time</span>
                      <span className="text-sm font-medium text-charcoal">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                      <span className="text-sm text-charcoal/50">Duration</span>
                      <span className="text-sm font-medium text-charcoal">{service?.duration}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                      <span className="text-sm text-charcoal/50">Price</span>
                      <span className="text-sm font-semibold text-primary">{service?.price}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                      <span className="text-sm text-charcoal/50">Name</span>
                      <span className="text-sm font-medium text-charcoal">{formData.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                      <span className="text-sm text-charcoal/50">Phone</span>
                      <span className="text-sm font-medium text-charcoal">{formData.phone}</span>
                    </div>
                    {formData.email && (
                      <div className="flex justify-between items-center border-b border-beige/50 pb-3">
                        <span className="text-sm text-charcoal/50">Email</span>
                        <span className="text-sm font-medium text-charcoal">{formData.email}</span>
                      </div>
                    )}
                    {formData.notes && (
                      <div className="pt-2">
                        <span className="text-sm text-charcoal/50">Notes</span>
                        <p className="text-sm text-charcoal mt-1">{formData.notes}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-charcoal/40 text-center mb-6">We'll confirm your appointment via phone or email within 24 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-beige/50">
              <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                step === 1 ? 'opacity-0 cursor-default' : 'text-charcoal/60 hover:text-charcoal'
              }`}>
                <ChevronLeft size={16} /> Back
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !selectedService) ||
                    (step === 2 && (!selectedDate || !selectedTime)) ||
                    (step === 3 && (!formData.name || !formData.phone))
                  }
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-all">
                  Confirm Booking <Check size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
