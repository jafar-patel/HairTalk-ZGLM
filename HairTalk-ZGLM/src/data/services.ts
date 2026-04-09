export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceNum: number;
  description?: string;
  note?: string;
  isPromotion?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'cut-styling',
    name: 'Cut & Styling',
    icon: '✂️',
    services: [
      { id: 'cs1', name: "Men Cut", duration: '25 mins', price: '$40', priceNum: 40 },
      { id: 'cs2', name: "Women Dry Cut", duration: '30 mins', price: '$55', priceNum: 55 },
      { id: 'cs3', name: "Hair Cut & Blow Wave - Short", duration: '50 mins', price: '$85', priceNum: 85, description: 'Hair above the shoulders', note: 'Add-on Styling with Iron – from $10' },
      { id: 'cs4', name: "Hair Cut & Blow Wave - Medium", duration: '55 mins', price: '$95', priceNum: 95, description: 'Hair up to the collarbone', note: 'Add-on Styling with Iron – from $10' },
      { id: 'cs5', name: "Hair Cut & Blow Wave - Long", duration: '1 hour', price: '$105', priceNum: 105, description: 'Hair up to the chest', note: 'May surcharge on length/thickness. Add-on Styling with Iron – from $10' },
      { id: 'cs6', name: "Hair Cut & Blow Wave - Extra Long", duration: '1h 10mins', price: '$115', priceNum: 115, note: 'May surcharge on length/thickness. Add-on Styling with Iron – from $10' },
      { id: 'cs7', name: "Wash + Blow Wave - Short", duration: '45 mins', price: '$60', priceNum: 60 },
      { id: 'cs8', name: "Wash + Blow Wave - Medium", duration: '45 mins', price: '$70', priceNum: 70 },
      { id: 'cs9', name: "Wash + Blow Wave - Long", duration: '50 mins', price: '$80', priceNum: 80 },
      { id: 'cs10', name: "Wash + Blow Wave - Extra Long", duration: '50 mins', price: '$90', priceNum: 90 },
      { id: 'cs11', name: "Kid Cut (Boy)", duration: '30 mins', price: '$35', priceNum: 35, description: 'Up to 10 years old' },
      { id: 'cs12', name: "Kid Cut (Girl)", duration: '30 mins', price: '$40', priceNum: 40, description: 'Up to 10 years old' },
      { id: 'cs13', name: "Fringe Trim", duration: '15 mins', price: '$15', priceNum: 15 },
      { id: 'cs14', name: "Hair Up - Short", duration: '50 mins', price: '$70', priceNum: 70, description: 'Excludes wash' },
      { id: 'cs15', name: "Hair Up - Medium", duration: '1 hour', price: '$85', priceNum: 85, description: 'Excludes wash' },
      { id: 'cs16', name: "Hair Up - Long", duration: '1h 10mins', price: '$100', priceNum: 100, description: 'Excludes wash' },
      { id: 'cs17', name: "Hair Up - Extra Long", duration: '1h 20mins', price: '$115', priceNum: 115 },
      { id: 'cs18', name: "Shampoo & Dry Off", duration: '15 mins', price: '$30', priceNum: 30 },
    ]
  },
  {
    id: 'foils-balayage',
    name: 'Foils & Balayage',
    icon: '✨',
    services: [
      { id: 'fb1', name: "Half Head Foils/Balayage Pkg - Short", duration: '2h 20mins', price: '$219', priceNum: 219 },
      { id: 'fb2', name: "Half Head Foils/Balayage Pkg - Medium", duration: '3h 5mins', price: '$249', priceNum: 249 },
      { id: 'fb3', name: "Half Head Foils/Balayage Pkg - Long", duration: '3h 5mins', price: '$279', priceNum: 279 },
      { id: 'fb4', name: "Half Head Foils/Balayage Pkg - Extra Long", duration: '3h 5mins', price: '$309', priceNum: 309 },
      { id: 'fb5', name: "Full Head Foils/Balayage Pkg - Short", duration: '3 hours', price: '$289', priceNum: 289 },
      { id: 'fb6', name: "Full Head Foils/Balayage Pkg - Medium", duration: '3h 45mins', price: '$319', priceNum: 319 },
      { id: 'fb7', name: "Full Head Foils/Balayage Pkg - Long", duration: '3h 45mins', price: '$349', priceNum: 349 },
      { id: 'fb8', name: "Full Head Foils/Balayage Pkg - Extra Long", duration: '3h 45mins', price: '$379', priceNum: 379 },
      { id: 'fb9', name: "Toner + Blow Wave Pkg - Short", duration: '1 hour', price: '$120', priceNum: 120 },
      { id: 'fb10', name: "Toner + Blow Wave Pkg - Medium", duration: '1h 15mins', price: '$150', priceNum: 150 },
      { id: 'fb11', name: "Toner + Blow Wave Pkg - Long", duration: '1h 30mins', price: '$180', priceNum: 180 },
      { id: 'fb12', name: "Money Piece Pkg", duration: '1 hour', price: '$140', priceNum: 140, note: 'Includes toner & blow wave. Toner only covers money-piece area; full head toner costs extra.' },
      { id: 'fb13', name: "Top and Side Foils", duration: '45 mins', price: '$140', priceNum: 140, note: 'Toner not included.' },
    ]
  },
  {
    id: 'global-color',
    name: 'Global Color & Bleach',
    icon: '🎨',
    services: [
      { id: 'gc1', name: "Global Color - T Section", duration: '15 mins', price: '$80', priceNum: 80 },
      { id: 'gc2', name: "Global Color - Root Retouch", duration: '30 mins', price: '$120', priceNum: 120 },
      { id: 'gc3', name: "Global Color - Short", duration: '40 mins', price: '$140', priceNum: 140 },
      { id: 'gc4', name: "Global Color - Medium", duration: '50 mins', price: '$160', priceNum: 160 },
      { id: 'gc5', name: "Global Color - Long", duration: '1 hour', price: '$180', priceNum: 180 },
      { id: 'gc6', name: "Global Color - Extra Long", duration: '50 mins', price: '$220', priceNum: 220 },
      { id: 'gc7', name: "Bleach - Retouch (2cm)", duration: '45 mins', price: '$140', priceNum: 140 },
      { id: 'gc8', name: "Bleach - Short", duration: '45 mins', price: '$160', priceNum: 160 },
      { id: 'gc9', name: "Bleach - Medium", duration: '1 hour', price: '$180', priceNum: 180 },
      { id: 'gc10', name: "Bleach - Long", duration: '1h 15mins', price: '$220', priceNum: 220 },
      { id: 'gc11', name: "Bleach - Extra Long", duration: '1h 10mins', price: '$260', priceNum: 260 },
    ]
  },
  {
    id: 'keratin-nanoplasty',
    name: 'Keratin & Nanoplasty',
    icon: '💎',
    services: [
      { id: 'kn1', name: "Keratin Treatment - Short", duration: '1h 40mins', price: '$230', priceNum: 230, isPromotion: true },
      { id: 'kn2', name: "Keratin Treatment - Medium", duration: '1h 40mins', price: '$280', priceNum: 280, isPromotion: true },
      { id: 'kn3', name: "Keratin Treatment - Long", duration: '1h 40mins', price: '$330', priceNum: 330, isPromotion: true },
      { id: 'kn4', name: "Keratin Treatment - Extra Long", duration: '1h 40mins', price: '$400', priceNum: 400, isPromotion: true },
      { id: 'kn5', name: "Keratin Treatment - Short", duration: '2 hours', price: '$310', priceNum: 310 },
      { id: 'kn6', name: "Keratin Treatment - Medium", duration: '1h 40mins', price: '$360', priceNum: 360 },
      { id: 'kn7', name: "Keratin Treatment - Long", duration: '1h 40mins', price: '$410', priceNum: 410 },
      { id: 'kn8', name: "Keratin Treatment - Extra Long", duration: '1h 40mins', price: '$480', priceNum: 480 },
      { id: 'kn9', name: "Nanoplasty - Short", duration: '1h 40mins', price: '$280', priceNum: 280, isPromotion: true },
      { id: 'kn10', name: "Nanoplasty - Medium", duration: '1h 40mins', price: '$330', priceNum: 330, isPromotion: true },
      { id: 'kn11', name: "Nanoplasty - Long", duration: '2h 10mins', price: '$380', priceNum: 380, isPromotion: true },
      { id: 'kn12', name: "Nanoplasty - Extra Long", duration: '2h 30mins', price: '$450', priceNum: 450, isPromotion: true },
      { id: 'kn13', name: "Nanoplasty - Short", duration: '1h 40mins', price: '$330', priceNum: 330 },
      { id: 'kn14', name: "Nanoplasty - Medium", duration: '1h 40mins', price: '$380', priceNum: 380 },
      { id: 'kn15', name: "Nanoplasty - Long", duration: '1h 40mins', price: '$430', priceNum: 430 },
      { id: 'kn16', name: "Nanoplasty - Extra Long", duration: '2h 20mins', price: '$500', priceNum: 500 },
      { id: 'kn17', name: "Add Up - Thick Hair", duration: '30 mins', price: '$50', priceNum: 50 },
    ]
  },
  {
    id: 'perm-straightening',
    name: 'Perm & Chemical Straightening',
    icon: '🌀',
    services: [
      { id: 'ps1', name: "Cold Perm - Man", duration: '1h 30mins', price: '$140', priceNum: 140 },
      { id: 'ps2', name: "Cold Perm - Short", duration: '1h 30mins', price: '$170', priceNum: 170 },
      { id: 'ps3', name: "Cold Perm - Medium", duration: '1h 30mins', price: '$200', priceNum: 200 },
      { id: 'ps4', name: "Cold Perm - Long", duration: '2 hours', price: '$230', priceNum: 230 },
      { id: 'ps5', name: "Digital Perm - Short", duration: '2 hours', price: '$210', priceNum: 210 },
      { id: 'ps6', name: "Digital Perm - Medium", duration: '1h 30mins', price: '$240', priceNum: 240 },
      { id: 'ps7', name: "Digital Perm - Long", duration: '2 hours', price: '$270', priceNum: 270 },
      { id: 'ps8', name: "Chemical Straightening - Root Touch Up", duration: '2 hours', price: '$200', priceNum: 200 },
      { id: 'ps9', name: "Chemical Straightening - Short", duration: '2 hours', price: '$250', priceNum: 250 },
      { id: 'ps10', name: "Chemical Straightening - Medium", duration: '2 hours', price: '$300', priceNum: 300 },
      { id: 'ps11', name: "Chemical Straightening - Long", duration: '2 hours', price: '$350', priceNum: 350 },
      { id: 'ps12', name: "Add Up Wave Perm", duration: '30 mins', price: '$50', priceNum: 50 },
      { id: 'ps13', name: "Add Up - Extra Long/Thick Hair", duration: '30 mins', price: '$50', priceNum: 50 },
    ]
  },
  {
    id: 'other',
    name: 'Other Services',
    icon: '💆',
    services: [
      { id: 'ot1', name: "Consultation", duration: '15 mins', price: 'Free', priceNum: 0, description: 'Complimentary consultation to discuss your hair goals' },
      { id: 'ot2', name: "Treatment", duration: '15 mins', price: '$30', priceNum: 30, description: 'Deep conditioning treatment' },
    ]
  }
];

export interface FeaturedService {
  title: string;
  description: string;
  price: string;
  image: string;
}

export const featuredServices: FeaturedService[] = [
  {
    title: 'Blonde & Balayage',
    description: 'Expert blonde colouring and hand-painted balayage for a natural, sun-kissed look.',
    price: 'From $219',
    image: '/images/blonde-hair.jpg',
  },
  {
    title: 'Keratin Treatment',
    description: 'Smooth, frizz-free hair for up to 6 months with our premium keratin treatments.',
    price: 'From $230',
    image: '/images/salon.jpg',
  },
  {
    title: 'Nanoplasty',
    description: 'Advanced hair reconstruction for silky, healthy, and beautifully manageable hair.',
    price: 'From $280',
    image: '/images/hero.jpg',
  },
  {
    title: 'Cut & Styling',
    description: 'Precision cuts and blow waves tailored to complement your features and lifestyle.',
    price: 'From $55',
    image: '/images/salon.jpg',
  },
];
