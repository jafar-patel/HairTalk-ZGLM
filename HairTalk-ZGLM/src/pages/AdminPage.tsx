import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, Scissors, Calendar, Settings, LogOut, Mail, Eye, Trash2,
  Plus, Edit, Save, X, Image, Search, Star, FileText, Home, Heart,
  ChevronDown, ChevronUp, RotateCcw, AlertTriangle
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type {
  HeroContent, AboutContent, SEOSettings, GalleryItem, BusinessInfo
} from '../context/SiteContext';
import type { ServiceCategory, FeaturedService } from '../data/services';
import type { Testimonial, BlogPost } from '../data/content';

/* ═══════════ SHARED UI COMPONENTS ═══════════ */

function Modal({ open, onClose, title, children, wide }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} my-8 overflow-hidden`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', rows, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number; placeholder?: string
}) {
  const cls = "w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-[#C8956C] focus:ring-1 focus:ring-[#C8956C]/20 transition-all";
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      {rows
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={cls} placeholder={placeholder} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />}
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', small, icon: Icon }: {
  children?: ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; small?: boolean; icon?: React.ComponentType<{ size?: number }>
}) {
  const base = `inline-flex items-center gap-2 font-medium rounded-lg transition-all ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`;
  const styles: Record<string, string> = {
    primary: 'bg-[#C8956C] text-white hover:bg-[#B07D54]',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    ghost: 'text-gray-500 hover:bg-gray-100',
  };
  return <button onClick={onClick} className={`${base} ${styles[variant]}`}>{Icon && <Icon size={small ? 14 : 16} />}{children}</button>;
}

/* ═══════════ DASHBOARD TAB ═══════════ */

function DashboardTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, resetToDefaults } = useSite();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: content.bookings.length, color: 'text-[#C8956C]' },
          { label: 'Pending', value: content.bookings.filter(b => b.status === 'pending').length, color: 'text-amber-700' },
          { label: 'Messages', value: content.messages.length, color: 'text-blue-600' },
          { label: 'Unread', value: content.messages.filter(m => !m.read).length, color: 'text-rose-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-medium mb-4">Recent Bookings</h3>
          {content.bookings.length === 0 ? <p className="text-gray-400 text-sm">No bookings yet.</p> : (
            <div className="space-y-3">
              {content.bookings.slice(-5).reverse().map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div><p className="text-sm font-medium">{b.name}</p><p className="text-xs text-gray-400">{b.service} — {b.date}</p></div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-medium mb-4">Content Overview</h3>
          <div className="space-y-3">
            {[
              { label: 'Service Categories', value: content.services.length },
              { label: 'Total Services', value: content.services.reduce((a, c) => a + c.services.length, 0) },
              { label: 'Testimonials', value: content.testimonials.length },
              { label: 'Blog Posts', value: content.blogPosts.length },
              { label: 'Gallery Images', value: content.gallery.length },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Btn onClick={() => setConfirmOpen(true)} variant="danger" icon={RotateCcw}>Reset All to Defaults</Btn>
      </div>
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4"><AlertTriangle className="text-amber-500" size={24} /><h3 className="font-semibold">Confirm Reset</h3></div>
            <p className="text-sm text-gray-600 mb-6">Reset ALL content to defaults? This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Btn onClick={() => setConfirmOpen(false)} variant="secondary">Cancel</Btn>
              <Btn onClick={() => { resetToDefaults(); showToast('Reset to defaults!'); setConfirmOpen(false); }} variant="danger">Confirm</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════ HOMEPAGE TAB ═══════════ */

function HomepageTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateHero, updateFeaturedServices } = useSite();
  const [hero, setHero] = useState<HeroContent>({ ...content.hero });
  const [featured, setFeatured] = useState<FeaturedService[]>([...content.featuredServices]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const updateForm = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const openAddFeatured = () => {
    setForm({ title: '', description: '', price: '', image: '/images/hero.jpg' });
    setEditIdx(null);
    setModalOpen(true);
  };

  const openEditFeatured = (idx: number) => {
    const item = featured[idx];
    setForm({ title: item.title, description: item.description, price: item.price, image: item.image });
    setEditIdx(idx);
    setModalOpen(true);
  };

  const saveFeaturedForm = () => {
    const newItem: FeaturedService = { title: form.title, description: form.description, price: form.price, image: form.image };
    let updated: FeaturedService[];
    if (editIdx !== null) {
      updated = [...featured];
      updated[editIdx] = newItem;
    } else {
      updated = [...featured, newItem];
    }
    setFeatured(updated);
    updateFeaturedServices(updated);
    setModalOpen(false);
    showToast(editIdx !== null ? 'Updated!' : 'Added!');
  };

  const deleteFeatured = (idx: number) => {
    const updated = featured.filter((_, i) => i !== idx);
    setFeatured(updated);
    updateFeaturedServices(updated);
    showToast('Removed!');
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg font-semibold">Hero Section</h3>
          <Btn onClick={() => { updateHero(hero); showToast('Hero section saved!'); }} icon={Save}>Save Hero</Btn>
        </div>
        <div className="space-y-4">
          <Field label="Badge Text" value={hero.badge} onChange={v => setHero({ ...hero, badge: v })} />
          <Field label="Headline (use commas for line breaks)" value={hero.headline} onChange={v => setHero({ ...hero, headline: v })} rows={3} />
          <Field label="Subheadline" value={hero.subheadline} onChange={v => setHero({ ...hero, subheadline: v })} rows={3} />
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Preview</p>
          <p className="text-[#C8956C] text-xs tracking-widest uppercase">{hero.badge}</p>
          <h4 className="font-serif text-xl font-semibold mt-1">
            {hero.headline.split(',').map((l, i) => <span key={i}>{i > 0 && <br />}{l.trim()}</span>)}
          </h4>
          <p className="text-sm text-gray-500 mt-2">{hero.subheadline}</p>
        </div>
      </div>

      {/* Featured Services */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg font-semibold">Featured Services</h3>
          <Btn onClick={openAddFeatured} icon={Plus}>Add</Btn>
        </div>
        <div className="space-y-3">
          {featured.map((fs, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img src={fs.image} alt={fs.title} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{fs.title}</p>
                <p className="text-xs text-gray-400 truncate">{fs.description}</p>
                <p className="text-xs text-[#C8956C] font-medium mt-1">{fs.price}</p>
              </div>
              <Btn onClick={() => openEditFeatured(i)} small icon={Edit}>Edit</Btn>
              <Btn onClick={() => deleteFeatured(i)} small variant="danger" icon={Trash2}>Del</Btn>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Service Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editIdx !== null ? `Edit: ${featured[editIdx]?.title}` : 'Add Featured Service'}>
        <div className="space-y-4">
          <Field label="Title" value={form.title || ''} onChange={v => updateForm('title', v)} />
          <Field label="Description" value={form.description || ''} onChange={v => updateForm('description', v)} rows={3} />
          <Field label="Price" value={form.price || ''} onChange={v => updateForm('price', v)} />
          <Field label="Image URL" value={form.image || ''} onChange={v => updateForm('image', v)} />
          <Btn onClick={saveFeaturedForm} icon={Save}>{editIdx !== null ? 'Save Changes' : 'Add Service'}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════ ABOUT TAB ═══════════ */

function AboutTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateAbout } = useSite();
  const [about, setAbout] = useState<AboutContent>({
    ...content.about,
    paragraphs: [...content.about.paragraphs],
    values: content.about.values.map(v => ({ ...v })),
    stylistBio: [...content.about.stylistBio],
  });

  const save = () => { updateAbout(about); showToast('About page saved!'); };

  const updateParagraph = (i: number, val: string) => {
    const arr = [...about.paragraphs]; arr[i] = val;
    setAbout({ ...about, paragraphs: arr });
  };
  const addParagraph = () => setAbout({ ...about, paragraphs: [...about.paragraphs, ''] });
  const removeParagraph = (i: number) => setAbout({ ...about, paragraphs: about.paragraphs.filter((_, j) => j !== i) });

  const updateValue = (i: number, key: 'icon' | 'title' | 'description', val: string) => {
    const arr = [...about.values]; arr[i] = { ...arr[i], [key]: val };
    setAbout({ ...about, values: arr });
  };
  const addValue = () => setAbout({ ...about, values: [...about.values, { icon: 'Star', title: '', description: '' }] });
  const removeValue = (i: number) => setAbout({ ...about, values: about.values.filter((_, j) => j !== i) });

  const updateBio = (i: number, val: string) => {
    const arr = [...about.stylistBio]; arr[i] = val;
    setAbout({ ...about, stylistBio: arr });
  };
  const addBio = () => setAbout({ ...about, stylistBio: [...about.stylistBio, ''] });
  const removeBio = (i: number) => setAbout({ ...about, stylistBio: about.stylistBio.filter((_, j) => j !== i) });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg font-semibold">About Page Content</h3>
          <Btn onClick={save} icon={Save}>Save All</Btn>
        </div>
        <div className="space-y-6">
          {/* Story Paragraphs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Story Paragraphs</label>
              <Btn onClick={addParagraph} small icon={Plus}>Add</Btn>
            </div>
            {about.paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2 mb-3">
                <textarea value={p} onChange={e => updateParagraph(i, e.target.value)} rows={3} className="flex-1 p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm" />
                <Btn onClick={() => removeParagraph(i)} small variant="danger" icon={Trash2} />
              </div>
            ))}
          </div>

          {/* Mission */}
          <Field label="Mission Statement" value={about.mission} onChange={v => setAbout({ ...about, mission: v })} rows={4} />

          {/* Values */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Values</label>
              <Btn onClick={addValue} small icon={Plus}>Add</Btn>
            </div>
            <div className="space-y-3">
              {about.values.map((v, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1/3"><Field label="Icon (Heart,Shield,Users,Award,Sparkles,Star)" value={v.icon} onChange={val => updateValue(i, 'icon', val)} /></div>
                    <div className="flex-1"><Field label="Title" value={v.title} onChange={val => updateValue(i, 'title', val)} /></div>
                  </div>
                  <Field label="Description" value={v.description} onChange={val => updateValue(i, 'description', val)} rows={2} />
                  <Btn onClick={() => removeValue(i)} small variant="danger" icon={Trash2}>Remove</Btn>
                </div>
              ))}
            </div>
          </div>

          {/* Stylist */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Stylist Spotlight</h4>
            <div className="space-y-3">
              <Field label="Stylist Name" value={about.stylistName} onChange={v => setAbout({ ...about, stylistName: v })} />
              <Field label="Title" value={about.stylistTitle} onChange={v => setAbout({ ...about, stylistTitle: v })} />
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-gray-500">Bio Paragraphs</label>
                <Btn onClick={addBio} small icon={Plus}>Add</Btn>
              </div>
              {about.stylistBio.map((p, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <textarea value={p} onChange={e => updateBio(i, e.target.value)} rows={2} className="flex-1 p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm" />
                  <Btn onClick={() => removeBio(i)} small variant="danger" icon={Trash2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ SERVICES TAB ═══════════ */

function ServicesTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateServices } = useSite();
  const [services, setServices] = useState<ServiceCategory[]>(content.services.map(c => ({ ...c, services: c.services.map(s => ({ ...s })) })));
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'addCat' | 'editCat' | 'addSvc' | 'editSvc' | null>(null);
  const [editCatIdx, setEditCatIdx] = useState<number>(0);
  const [editSvcIdx, setEditSvcIdx] = useState<number>(0);
  const [form, setForm] = useState<Record<string, string>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const uf = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const save = () => { updateServices(services); showToast('Services saved!'); };

  // Category operations
  const openAddCat = () => {
    setForm({ name: '', icon: '✂️' });
    setModalMode('addCat');
    setModalOpen(true);
  };
  const openEditCat = (ci: number) => {
    setForm({ name: services[ci].name, icon: services[ci].icon });
    setEditCatIdx(ci);
    setModalMode('editCat');
    setModalOpen(true);
  };
  const saveCatForm = () => {
    if (modalMode === 'addCat') {
      setServices([...services, { id: `cat-${Date.now()}`, name: form.name, icon: form.icon, services: [] }]);
    } else {
      const arr = [...services];
      arr[editCatIdx] = { ...arr[editCatIdx], name: form.name, icon: form.icon };
      setServices(arr);
    }
    setModalOpen(false);
    showToast('Saved!');
  };
  const deleteCat = (ci: number) => {
    setConfirmAction(() => () => {
      setServices(services.filter((_, i) => i !== ci));
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  // Service operations
  const openAddSvc = (ci: number) => {
    setForm({ name: '', duration: '', price: '', description: '', note: '', isPromotion: 'false' });
    setEditCatIdx(ci);
    setModalMode('addSvc');
    setModalOpen(true);
  };
  const openEditSvc = (ci: number, si: number) => {
    const s = services[ci].services[si];
    setForm({ name: s.name, duration: s.duration, price: s.price, description: s.description || '', note: s.note || '', isPromotion: s.isPromotion ? 'true' : 'false' });
    setEditCatIdx(ci);
    setEditSvcIdx(si);
    setModalMode('editSvc');
    setModalOpen(true);
  };
  const saveSvcForm = () => {
    const arr = [...services];
    const svc = {
      id: modalMode === 'addSvc' ? `s-${Date.now()}` : arr[editCatIdx].services[editSvcIdx].id,
      name: form.name,
      duration: form.duration,
      price: form.price,
      priceNum: parseInt(form.price.replace(/[^0-9]/g, '')) || 0,
      description: form.description || undefined,
      note: form.note || undefined,
      isPromotion: form.isPromotion === 'true' || undefined,
    };
    if (modalMode === 'addSvc') {
      arr[editCatIdx] = { ...arr[editCatIdx], services: [...arr[editCatIdx].services, svc] };
    } else {
      const svcArr = [...arr[editCatIdx].services];
      svcArr[editSvcIdx] = svc;
      arr[editCatIdx] = { ...arr[editCatIdx], services: svcArr };
    }
    setServices(arr);
    setModalOpen(false);
    showToast(modalMode === 'addSvc' ? 'Added!' : 'Updated!');
  };
  const deleteSvc = (ci: number, si: number) => {
    setConfirmAction(() => () => {
      const arr = [...services];
      arr[ci] = { ...arr[ci], services: arr[ci].services.filter((_, j) => j !== si) };
      setServices(arr);
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };
  const togglePromo = (ci: number, si: number) => {
    const arr = [...services];
    const svcArr = [...arr[ci].services];
    svcArr[si] = { ...svcArr[si], isPromotion: !svcArr[si].isPromotion };
    arr[ci] = { ...arr[ci], services: svcArr };
    setServices(arr);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-2xl font-semibold">Manage Services</h1>
        <div className="flex gap-2"><Btn onClick={openAddCat} icon={Plus}>Add Category</Btn><Btn onClick={save} icon={Save}>Save All</Btn></div>
      </div>

      {services.map((cat, ci) => (
        <div key={cat.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-5 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}>
            <span className="text-xl">{cat.icon}</span>
            <h3 className="font-medium flex-1">{cat.name}</h3>
            <span className="text-xs text-gray-400">{cat.services.length} services</span>
            <div className="flex gap-1" onClick={e => e.stopPropagation()}>
              <Btn onClick={() => openEditCat(ci)} small icon={Edit}>Edit</Btn>
              <Btn onClick={() => deleteCat(ci)} small variant="danger" icon={Trash2}>Del</Btn>
            </div>
            {expandedCat === cat.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </div>
          {expandedCat === cat.id && (
            <div className="border-t border-gray-100 p-4 space-y-2">
              <Btn onClick={() => openAddSvc(ci)} small icon={Plus} variant="secondary">Add Service</Btn>
              {cat.services.map((s, si) => (
                <div key={s.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{s.name} {s.isPromotion && <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] rounded-full font-medium">PROMO</span>}</p>
                    <p className="text-xs text-gray-400">{s.duration} · <span className="text-[#C8956C] font-medium">{s.price}</span></p>
                    {s.note && <p className="text-xs text-gray-400 mt-1 truncate">{s.note}</p>}
                  </div>
                  <button onClick={() => togglePromo(ci, si)} className={`text-[10px] px-2 py-1 rounded-full font-medium ${s.isPromotion ? 'bg-rose-100 text-rose-600' : 'bg-gray-200 text-gray-500'}`}>Promo</button>
                  <Btn onClick={() => openEditSvc(ci, si)} small variant="ghost" icon={Edit} />
                  <Btn onClick={() => deleteSvc(ci, si)} small variant="danger" icon={Trash2} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Category/Service Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={
        modalMode === 'addCat' ? 'Add Category' : modalMode === 'editCat' ? `Edit: ${services[editCatIdx]?.name}` :
        modalMode === 'addSvc' ? `Add Service to ${services[editCatIdx]?.name}` : `Edit: ${services[editCatIdx]?.services[editSvcIdx]?.name}`
      }>
        {(modalMode === 'addCat' || modalMode === 'editCat') ? (
          <div className="space-y-4">
            <Field label="Category Name" value={form.name || ''} onChange={v => uf('name', v)} />
            <Field label="Icon (emoji)" value={form.icon || ''} onChange={v => uf('icon', v)} />
            <Btn onClick={saveCatForm} icon={Save}>{modalMode === 'addCat' ? 'Add Category' : 'Save'}</Btn>
          </div>
        ) : (
          <div className="space-y-4">
            <Field label="Service Name" value={form.name || ''} onChange={v => uf('name', v)} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Duration" value={form.duration || ''} onChange={v => uf('duration', v)} />
              <Field label="Price (e.g. $85)" value={form.price || ''} onChange={v => uf('price', v)} />
            </div>
            <Field label="Description" value={form.description || ''} onChange={v => uf('description', v)} />
            <Field label="Note" value={form.note || ''} onChange={v => uf('note', v)} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.isPromotion === 'true'} onChange={e => uf('isPromotion', e.target.checked ? 'true' : 'false')} />
              Promotion
            </label>
            <Btn onClick={saveSvcForm} icon={Save}>{modalMode === 'addSvc' ? 'Add Service' : 'Save Changes'}</Btn>
          </div>
        )}
      </Modal>

      {/* Confirm Dialog */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4"><AlertTriangle className="text-amber-500" size={24} /><h3 className="font-semibold">Confirm Delete</h3></div>
            <p className="text-sm text-gray-600 mb-6">Are you sure? This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Btn onClick={() => { setConfirmOpen(false); setConfirmAction(null); }} variant="secondary">Cancel</Btn>
              <Btn onClick={() => confirmAction?.()} variant="danger">Delete</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════ TESTIMONIALS TAB ═══════════ */

function TestimonialsTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateTestimonials } = useSite();
  const [items, setItems] = useState<Testimonial[]>([...content.testimonials]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [rating, setRating] = useState(5);

  const uf = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const save = () => { updateTestimonials(items); showToast('Testimonials saved!'); };

  const openAdd = () => {
    setForm({ name: '', text: '', service: '' });
    setRating(5);
    setEditIdx(null);
    setModalOpen(true);
  };

  const openEdit = (idx: number) => {
    const t = items[idx];
    setForm({ name: t.name, text: t.text, service: t.service || '' });
    setRating(t.rating);
    setEditIdx(idx);
    setModalOpen(true);
  };

  const saveForm = () => {
    const newT: Testimonial = { id: editIdx !== null ? items[editIdx].id : `t-${Date.now()}`, name: form.name, text: form.text, service: form.service || undefined, rating };
    let updated: Testimonial[];
    if (editIdx !== null) {
      updated = [...items]; updated[editIdx] = newT;
    } else {
      updated = [...items, newT];
    }
    setItems(updated);
    updateTestimonials(updated);
    setModalOpen(false);
    showToast(editIdx !== null ? 'Updated!' : 'Added!');
  };

  const deleteItem = (idx: number) => {
    const arr = items.filter((_, j) => j !== idx);
    setItems(arr);
    updateTestimonials(arr);
    showToast('Removed!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold">Manage Reviews ({items.length})</h1>
        <div className="flex gap-2"><Btn onClick={openAdd} icon={Plus}>Add</Btn><Btn onClick={save} icon={Save}>Save</Btn></div>
      </div>
      <div className="space-y-3">
        {items.map((t, i) => (
          <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-sm">{t.name}</h3>
                <div className="flex gap-0.5 mt-1">{Array.from({ length: t.rating }).map((_, j) => (<span key={j} className="text-[#C8956C] text-sm">★</span>))}</div>
                {t.service && <p className="text-xs text-[#C8956C] mt-1">{t.service}</p>}
              </div>
              <div className="flex gap-1">
                <Btn onClick={() => openEdit(i)} small icon={Edit}>Edit</Btn>
                <Btn onClick={() => deleteItem(i)} small variant="danger" icon={Trash2}>Del</Btn>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3 italic">"{t.text}"</p>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editIdx !== null ? `Edit: ${items[editIdx]?.name}` : 'Add Review'}>
        <div className="space-y-4">
          <Field label="Name" value={form.name || ''} onChange={v => uf('name', v)} />
          <Field label="Review Text" value={form.text || ''} onChange={v => uf('text', v)} rows={4} />
          <Field label="Service" value={form.service || ''} onChange={v => uf('service', v)} />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Rating</label>
            <div className="flex gap-1">{[1, 2, 3, 4, 5].map(r => (
              <button key={r} onClick={() => setRating(r)} className={`text-xl ${r <= rating ? 'text-[#C8956C]' : 'text-gray-300'}`}>★</button>
            ))}</div>
          </div>
          <Btn onClick={saveForm} icon={Save}>{editIdx !== null ? 'Save Changes' : 'Add Review'}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════ BLOG TAB ═══════════ */

function BlogTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateBlogPosts } = useSite();
  const [posts, setPosts] = useState<BlogPost[]>([...content.blogPosts]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [contentArr, setContentArr] = useState<string[]>(['']);

  const uf = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const save = () => { updateBlogPosts(posts); showToast('Blog saved!'); };

  const openAdd = () => {
    setForm({ title: '', excerpt: '', category: 'Hair Care', image: '/images/hero.jpg', readTime: '5 min read' });
    setContentArr(['']);
    setEditIdx(null);
    setModalOpen(true);
  };

  const openEdit = (idx: number) => {
    const p = posts[idx];
    setForm({ title: p.title, excerpt: p.excerpt, category: p.category, image: p.image, readTime: p.readTime });
    setContentArr([...p.content]);
    setEditIdx(idx);
    setModalOpen(true);
  };

  const saveForm = () => {
    const newPost: BlogPost = {
      id: editIdx !== null ? posts[editIdx].id : `blog-${Date.now()}`,
      title: form.title,
      excerpt: form.excerpt,
      content: contentArr,
      category: form.category,
      date: editIdx !== null ? posts[editIdx].date : new Date().toISOString().split('T')[0],
      readTime: form.readTime,
      image: form.image,
    };
    let updated: BlogPost[];
    if (editIdx !== null) {
      updated = [...posts]; updated[editIdx] = newPost;
    } else {
      updated = [...posts, newPost];
    }
    setPosts(updated);
    updateBlogPosts(updated);
    setModalOpen(false);
    showToast(editIdx !== null ? 'Updated!' : 'Published!');
  };

  const deletePost = (idx: number) => {
    const arr = posts.filter((_, j) => j !== idx);
    setPosts(arr);
    updateBlogPosts(arr);
    showToast('Removed!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold">Blog Posts ({posts.length})</h1>
        <div className="flex gap-2"><Btn onClick={openAdd} icon={Plus}>New Post</Btn><Btn onClick={save} icon={Save}>Save</Btn></div>
      </div>
      <div className="space-y-3">
        {posts.map((p, i) => (
          <div key={p.id} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <img src={p.image} alt={p.title} className="w-20 h-14 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{p.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{p.category} · {p.date} · {p.readTime}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{p.excerpt}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Btn onClick={() => openEdit(i)} small icon={Edit}>Edit</Btn>
                <Btn onClick={() => deletePost(i)} small variant="danger" icon={Trash2}>Del</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editIdx !== null ? `Edit: ${posts[editIdx]?.title}` : 'New Blog Post'} wide>
        <div className="space-y-4">
          <Field label="Title" value={form.title || ''} onChange={v => uf('title', v)} />
          <Field label="Excerpt" value={form.excerpt || ''} onChange={v => uf('excerpt', v)} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" value={form.category || ''} onChange={v => uf('category', v)} />
            <Field label="Read Time" value={form.readTime || ''} onChange={v => uf('readTime', v)} />
          </div>
          <Field label="Image URL" value={form.image || ''} onChange={v => uf('image', v)} />
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-500">Content Paragraphs</label>
              <Btn onClick={() => setContentArr([...contentArr, ''])} small icon={Plus}>Add</Btn>
            </div>
            {contentArr.map((para, pi) => (
              <div key={pi} className="flex gap-2 mb-2">
                <textarea value={para} onChange={e => { const arr = [...contentArr]; arr[pi] = e.target.value; setContentArr(arr); }} rows={3} className="flex-1 p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm" />
                <Btn onClick={() => setContentArr(contentArr.filter((_, j) => j !== pi))} small variant="danger" icon={Trash2} />
              </div>
            ))}
          </div>
          <Btn onClick={saveForm} icon={Save}>{editIdx !== null ? 'Save Changes' : 'Publish'}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════ WHY CHOOSE US TAB ═══════════ */

function WhyTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateWhyChooseUs } = useSite();
  const [items, setItems] = useState(content.whyChooseUs.map(i => ({ ...i })));
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const uf = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const save = () => { updateWhyChooseUs(items); showToast('Saved!'); };

  const openAdd = () => { setForm({ title: '', description: '' }); setEditIdx(null); setModalOpen(true); };
  const openEdit = (i: number) => { setForm({ title: items[i].title, description: items[i].description }); setEditIdx(i); setModalOpen(true); };

  const saveForm = () => {
    let updated;
    if (editIdx !== null) {
      updated = [...items]; updated[editIdx] = { title: form.title, description: form.description };
    } else {
      updated = [...items, { title: form.title, description: form.description }];
    }
    setItems(updated);
    updateWhyChooseUs(updated);
    setModalOpen(false);
    showToast(editIdx !== null ? 'Updated!' : 'Added!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-2xl font-semibold">Why Choose Us</h1>
        <div className="flex gap-2"><Btn onClick={openAdd} icon={Plus}>Add</Btn><Btn onClick={save} icon={Save}>Save</Btn></div>
      </div>
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <Field label="Title" value={item.title} onChange={v => { const arr = [...items]; arr[i] = { ...arr[i], title: v }; setItems(arr); }} />
              <Field label="Description" value={item.description} onChange={v => { const arr = [...items]; arr[i] = { ...arr[i], description: v }; setItems(arr); }} rows={2} />
            </div>
            <div className="flex gap-1 ml-3">
              <Btn onClick={() => openEdit(i)} small icon={Edit}>Edit</Btn>
              <Btn onClick={() => { const arr = items.filter((_, j) => j !== i); setItems(arr); updateWhyChooseUs(arr); showToast('Removed!'); }} small variant="danger" icon={Trash2}>Del</Btn>
            </div>
          </div>
        </div>
      ))}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editIdx !== null ? 'Edit Item' : 'Add Item'}>
        <div className="space-y-4">
          <Field label="Title" value={form.title || ''} onChange={v => uf('title', v)} />
          <Field label="Description" value={form.description || ''} onChange={v => uf('description', v)} rows={3} />
          <Btn onClick={saveForm} icon={Save}>{editIdx !== null ? 'Save' : 'Add'}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════ BUSINESS INFO TAB ═══════════ */

function BusinessTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateBusinessInfo } = useSite();
  const [info, setInfo] = useState<BusinessInfo>({ ...content.businessInfo, hours: content.businessInfo.hours.map(h => ({ ...h })) });

  const save = () => { updateBusinessInfo(info); showToast('Business info saved!'); };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold">Business Information</h3>
        <Btn onClick={save} icon={Save}>Save</Btn>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Business Name" value={info.name} onChange={v => setInfo({ ...info, name: v })} />
        <Field label="Tagline" value={info.tagline} onChange={v => setInfo({ ...info, tagline: v })} />
        <Field label="Phone" value={info.phone} onChange={v => setInfo({ ...info, phone: v })} />
        <Field label="Phone Link (tel:...)" value={info.phoneLink} onChange={v => setInfo({ ...info, phoneLink: v })} />
        <Field label="Email" value={info.email} onChange={v => setInfo({ ...info, email: v })} />
        <Field label="Address" value={info.address} onChange={v => setInfo({ ...info, address: v })} />
        <Field label="Instagram URL" value={info.instagram} onChange={v => setInfo({ ...info, instagram: v })} />
        <Field label="Instagram Handle" value={info.instagramHandle} onChange={v => setInfo({ ...info, instagramHandle: v })} />
        <div className="sm:col-span-2"><Field label="Google Maps Embed URL" value={info.mapEmbedUrl} onChange={v => setInfo({ ...info, mapEmbedUrl: v })} /></div>
        <div className="sm:col-span-2"><Field label="Google Maps Directions URL" value={info.mapLink} onChange={v => setInfo({ ...info, mapLink: v })} /></div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Business Hours</h4>
        <div className="space-y-2">
          {info.hours.map((h, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-24">{h.day}</span>
              <input type="text" value={h.hours} onChange={e => { const arr = [...info.hours]; arr[i] = { ...arr[i], hours: e.target.value }; setInfo({ ...info, hours: arr }); }} className="flex-1 p-2 rounded-lg border border-gray-200 bg-gray-50 text-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ SEO TAB ═══════════ */

function SEOTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateSEO } = useSite();
  const [seo, setSeo] = useState<SEOSettings>({ ...content.seo });
  const save = () => { updateSEO(seo); showToast('SEO saved!'); };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold">SEO Settings</h3>
        <Btn onClick={save} icon={Save}>Save</Btn>
      </div>
      <Field label="Page Title" value={seo.title} onChange={v => setSeo({ ...seo, title: v })} />
      <Field label="Meta Description" value={seo.description} onChange={v => setSeo({ ...seo, description: v })} rows={3} />
      <Field label="Keywords (comma-separated)" value={seo.keywords} onChange={v => setSeo({ ...seo, keywords: v })} rows={2} />
      <Field label="OG Image URL" value={seo.ogImage} onChange={v => setSeo({ ...seo, ogImage: v })} />
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-400 mb-2">Preview</p>
        <p className="text-blue-700 text-sm font-medium">{seo.title}</p>
        <p className="text-green-700 text-xs mt-1">{typeof window !== 'undefined' ? window.location.origin : ''}</p>
        <p className="text-gray-500 text-xs mt-1">{seo.description}</p>
      </div>
    </div>
  );
}

/* ═══════════ GALLERY TAB ═══════════ */

function GalleryTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateGallery } = useSite();
  const [items, setItems] = useState<GalleryItem[]>([...content.gallery]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const uf = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const save = () => { updateGallery(items); showToast('Gallery saved!'); };

  const openAdd = () => { setForm({ url: '', alt: '', caption: '' }); setEditIdx(null); setModalOpen(true); };
  const openEdit = (i: number) => { setForm({ url: items[i].url, alt: items[i].alt, caption: items[i].caption }); setEditIdx(i); setModalOpen(true); };

  const saveForm = () => {
    const newItem: GalleryItem = { id: editIdx !== null ? items[editIdx].id : `g-${Date.now()}`, url: form.url, alt: form.alt, caption: form.caption };
    let updated: GalleryItem[];
    if (editIdx !== null) {
      updated = [...items]; updated[editIdx] = newItem;
    } else {
      updated = [...items, newItem];
    }
    setItems(updated);
    updateGallery(updated);
    setModalOpen(false);
    showToast(editIdx !== null ? 'Updated!' : 'Added!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold">Gallery ({items.length})</h1>
        <div className="flex gap-2"><Btn onClick={openAdd} icon={Plus}>Add</Btn><Btn onClick={save} icon={Save}>Save</Btn></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
            <div className="aspect-square relative">
              <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Btn onClick={() => openEdit(i)} small icon={Edit}>Edit</Btn>
                <Btn onClick={() => { const arr = items.filter((_, j) => j !== i); setItems(arr); updateGallery(arr); showToast('Removed!'); }} small variant="danger" icon={Trash2}>Del</Btn>
              </div>
            </div>
            <div className="p-3"><p className="text-xs text-gray-500 truncate">{item.caption}</p></div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editIdx !== null ? 'Edit Image' : 'Add Gallery Image'}>
        <div className="space-y-4">
          <Field label="Image URL" value={form.url || ''} onChange={v => uf('url', v)} />
          <Field label="Alt Text" value={form.alt || ''} onChange={v => uf('alt', v)} />
          <Field label="Caption" value={form.caption || ''} onChange={v => uf('caption', v)} />
          {form.url && <img src={form.url} alt={form.alt} className="w-full h-40 object-cover rounded-lg" />}
          <Btn onClick={saveForm} icon={Save}>{editIdx !== null ? 'Save Changes' : 'Add Image'}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════ BOOKINGS TAB ═══════════ */

function BookingsTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, updateBookingStatus, deleteBooking } = useSite();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Appointments ({content.bookings.length})</h1>
      {content.bookings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center"><p className="text-gray-400">No bookings yet.</p></div>
      ) : (
        <div className="space-y-4">
          {content.bookings.slice().reverse().map(b => (
            <div key={b.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-medium">{b.name}</h3>
                  <p className="text-sm text-gray-400">{b.phone}{b.email && ` · ${b.email}`}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { updateBookingStatus(b.id, 'confirmed'); showToast('Confirmed!'); }} className="px-3 py-1.5 text-xs rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-medium">Confirm</button>
                  <button onClick={() => { updateBookingStatus(b.id, 'completed'); showToast('Marked complete!'); }} className="px-3 py-1.5 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium">Complete</button>
                  <button onClick={() => { updateBookingStatus(b.id, 'cancelled'); showToast('Cancelled!'); }} className="px-3 py-1.5 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200 font-medium">Cancel</button>
                  <button onClick={() => { setConfirmAction(() => () => { deleteBooking(b.id); showToast('Deleted!'); setConfirmOpen(false); }); setConfirmOpen(true); }} className="p-1.5 text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div><p className="text-gray-400 text-xs">Service</p><p>{b.service}</p></div>
                <div><p className="text-gray-400 text-xs">Date</p><p>{b.date}</p></div>
                <div><p className="text-gray-400 text-xs">Time</p><p>{b.time}</p></div>
                <div><p className="text-gray-400 text-xs">Status</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : b.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span>
                </div>
              </div>
              {b.notes && <p className="mt-3 text-sm text-gray-500 bg-gray-50 rounded-lg p-3"><strong className="text-gray-700">Notes:</strong> {b.notes}</p>}
              <p className="text-xs text-gray-300 mt-3">{new Date(b.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4"><AlertTriangle className="text-amber-500" size={24} /><h3 className="font-semibold">Delete Booking?</h3></div>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Btn onClick={() => { setConfirmOpen(false); setConfirmAction(null); }} variant="secondary">Cancel</Btn>
              <Btn onClick={() => confirmAction?.()} variant="danger">Delete</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════ MESSAGES TAB ═══════════ */

function MessagesTab({ showToast }: { showToast: (msg: string) => void }) {
  const { content, markMessageRead, deleteMessage } = useSite();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Messages ({content.messages.length})</h1>
      {content.messages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center"><p className="text-gray-400">No messages yet.</p></div>
      ) : (
        <div className="space-y-4">
          {content.messages.slice().reverse().map(m => (
            <div key={m.id} className={`bg-white rounded-xl p-6 shadow-sm ${!m.read ? 'border-l-4 border-[#C8956C]' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">{m.name} {!m.read && <span className="text-xs text-[#C8956C] ml-2">NEW</span>}</h3>
                  <p className="text-xs text-gray-400">{m.email} · {m.phone}</p>
                </div>
                <div className="flex gap-2">
                  {!m.read && <button onClick={() => { markMessageRead(m.id); showToast('Marked as read'); }} className="p-1.5 text-[#C8956C] hover:bg-[#C8956C]/10 rounded-lg"><Eye size={14} /></button>}
                  <button onClick={() => { setConfirmAction(() => () => { deleteMessage(m.id); showToast('Deleted!'); setConfirmOpen(false); }); setConfirmOpen(true); }} className="p-1.5 text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              {m.subject && <p className="text-sm font-medium text-gray-600 mb-2">{m.subject}</p>}
              <p className="text-sm text-gray-500">{m.message}</p>
              <p className="text-xs text-gray-300 mt-3">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4"><AlertTriangle className="text-amber-500" size={24} /><h3 className="font-semibold">Delete Message?</h3></div>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Btn onClick={() => { setConfirmOpen(false); setConfirmAction(null); }} variant="secondary">Cancel</Btn>
              <Btn onClick={() => confirmAction?.()} variant="danger">Delete</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════ MAIN ADMIN PAGE ═══════════ */

type Tab = 'dashboard' | 'homepage' | 'about' | 'services' | 'testimonials' | 'blog' | 'why' | 'business' | 'seo' | 'gallery' | 'bookings' | 'messages';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [toast, setToast] = useState('');
  // mobile nav handled inline

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const tabs: { id: Tab; label: string; icon: ReactNode; section?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'homepage', label: 'Homepage', icon: <Home size={18} />, section: 'Content' },
    { id: 'about', label: 'About', icon: <Heart size={18} /> },
    { id: 'services', label: 'Services', icon: <Scissors size={18} /> },
    { id: 'testimonials', label: 'Reviews', icon: <Star size={18} /> },
    { id: 'blog', label: 'Blog', icon: <FileText size={18} /> },
    { id: 'why', label: 'Why Us', icon: <Heart size={18} />, section: 'Settings' },
    { id: 'business', label: 'Business', icon: <Settings size={18} /> },
    { id: 'seo', label: 'SEO', icon: <Search size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar size={18} />, section: 'Data' },
    { id: 'messages', label: 'Messages', icon: <Mail size={18} /> },
  ];

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full bg-white rounded-2xl p-8 shadow-xl">
          <h1 className="font-serif text-2xl font-semibold text-gray-900 text-center mb-2">Admin Panel</h1>
          <p className="text-gray-400 text-sm text-center mb-8">Hair Talk Content Management</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && password === 'hairtalk2024') setLoggedIn(true); }}
            placeholder="Enter password"
            className="w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-[#C8956C] transition-all text-sm mb-4"
          />
          <button
            onClick={() => { if (password === 'hairtalk2024') setLoggedIn(true); }}
            className="w-full py-3 bg-[#C8956C] text-white font-medium rounded-full hover:bg-[#B07D54] transition-all text-sm"
          >
            Login
          </button>
          <p className="text-xs text-gray-300 text-center mt-4">Default: hairtalk2024</p>
          <p className="text-xs text-gray-400 text-center mt-2">
            <a href="/" className="text-[#C8956C] hover:underline">← Back to website</a>
          </p>
        </motion.div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab showToast={showToast} />;
      case 'homepage': return <HomepageTab showToast={showToast} />;
      case 'about': return <AboutTab showToast={showToast} />;
      case 'services': return <ServicesTab showToast={showToast} />;
      case 'testimonials': return <TestimonialsTab showToast={showToast} />;
      case 'blog': return <BlogTab showToast={showToast} />;
      case 'why': return <WhyTab showToast={showToast} />;
      case 'business': return <BusinessTab showToast={showToast} />;
      case 'seo': return <SEOTab showToast={showToast} />;
      case 'gallery': return <GalleryTab showToast={showToast} />;
      case 'bookings': return <BookingsTab showToast={showToast} />;
      case 'messages': return <MessagesTab showToast={showToast} />;
    }
  };

  let lastSection = '';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gray-900 text-white/80 hidden lg:flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <a href="/" className="block">
            <h2 className="font-serif text-xl font-semibold text-white">Hair Talk</h2>
            <p className="text-xs text-white/40 mt-1">Content Management</p>
          </a>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => {
            const showSection = tab.section && tab.section !== lastSection;
            if (tab.section) lastSection = tab.section;
            return (
              <div key={tab.id}>
                {showSection && <p className="text-[10px] text-white/30 uppercase tracking-widest px-4 pt-4 pb-2">{tab.section}</p>}
                <button onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === tab.id ? 'bg-[#C8956C]/20 text-[#C8956C]' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}>
                  {tab.icon} {tab.label}
                </button>
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <a href="/" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <Home size={18} /> View Website
          </a>
          <button onClick={() => setLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all mt-1">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 min-w-[56px] flex flex-col items-center gap-1 py-3 text-[10px] transition-all ${activeTab === tab.id ? 'text-[#C8956C]' : 'text-gray-400'}`}>
            {tab.icon}<span className="truncate px-1">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <main className="flex-1 p-4 sm:p-8 pb-24 lg:pb-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium z-50">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
