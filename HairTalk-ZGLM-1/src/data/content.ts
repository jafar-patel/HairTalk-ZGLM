export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  { id: '1', name: 'Judy Copper', rating: 5, text: 'My hair feels so smooth, shiny and frizz-free. I highly recommend Hair Talk if you want healthy, silky hair!', service: 'Keratin Treatment' },
  { id: '2', name: 'Lily Skews', rating: 5, text: 'I go to Lyn every 3–4 months for my blonde roots and leave super happy every single time. The consistency is incredible!', service: 'Blonde Colouring' },
  { id: '3', name: 'Liz Hilson', rating: 5, text: 'The stylist understood exactly what I wanted and delivered even better than I imagined. My hair has never looked this good!', service: 'Balayage' },
  { id: '4', name: 'Angel Read', rating: 5, text: 'The quality of service is consistently excellent. I wouldn\'t go anywhere else for my hair.', service: 'Cut & Style' },
  { id: '5', name: 'lilskybaby', rating: 5, text: 'Lyn made me feel so comfortable and understood what cut I wanted completely. Best salon experience!', service: 'Cut & Style' },
  { id: '6', name: 'Luiza Helena Queiroga', rating: 5, text: 'I did nanoplasty with them and the results were amazing. My hair is so smooth and manageable now.', service: 'Nanoplasty' },
  { id: '7', name: 'nini poop', rating: 5, text: 'The only salon I trust for my blonde hair. Lyn always nails the colour perfectly!', service: 'Blonde Colouring' },
  { id: '8', name: 'Jillian Aquino', rating: 5, text: 'Hair Talk completely fixed my hair! The colour is now even, shiny, and exactly what I wanted. Thank you Lyn!', service: 'Colour Correction' },
  { id: '9', name: 'Vanessa Bodo', rating: 5, text: 'Absolutely love this salon! The atmosphere is so relaxing and the results speak for themselves. My balayage is stunning.', service: 'Balayage' },
  { id: '10', name: 'Deepa Desai', rating: 5, text: 'I was nervous about getting keratin but Lyn explained everything and the result is gorgeous. So happy!', service: 'Keratin Treatment' },
  { id: '11', name: 'ava browne', rating: 5, text: 'Best blonde I\'ve ever had! Lyn really understands what works for each person\'s hair type and skin tone.', service: 'Blonde Colouring' },
  { id: '12', name: 'Charly Wallace', rating: 5, text: 'I travel across Auckland to come here because no one else gets my blonde right. Worth every minute!', service: 'Blonde Colouring' },
  { id: '13', name: 'Andrea Coombes', rating: 5, text: 'My nanoplasty treatment was a game changer. Three months later and my hair is still silky and frizz-free.', service: 'Nanoplasty' },
  { id: '14', name: 'Nyrita Smyth', rating: 5, text: 'From the moment you walk in, you feel special. The service is premium and the results are always breathtaking.', service: 'Balayage' },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Best Blonde Hair Maintenance Tips',
    excerpt: 'Keep your blonde looking fresh, vibrant, and healthy between salon visits with these expert tips from Hair Talk.',
    content: [
      'Maintaining beautiful blonde hair requires dedication and the right techniques. Whether you\'re a natural blonde or have achieved your perfect shade through expert colouring, these tips will help keep your locks looking salon-fresh.',
      'First, invest in a purple shampoo. This colour-correcting wonder neutralises brassiness and keeps your blonde cool and bright. Use it once or twice a week, alternating with a hydrating shampoo.',
      'Deep conditioning is non-negotiable for blonde hair. Bleached hair is more porous and prone to dryness, so a weekly moisture mask will keep it soft and manageable.',
      'Heat protection is essential. Always apply a heat protectant before using styling tools. Blonde hair is more susceptible to damage, and heat can cause discolouration.',
      'Minimise washing to twice a week. Over-washing strips natural oils and fades colour faster. Use a dry shampoo between washes to keep hair fresh.',
      'Book regular toner touch-ups every 6-8 weeks to maintain your ideal blonde tone. At Hair Talk, we specialise in keeping blondes looking their absolute best.'
    ],
    category: 'Hair Care',
    date: '2025-01-15',
    readTime: '5 min read',
    image: '/images/blonde-hair.jpg',
  },
  {
    id: '2',
    title: 'Keratin vs Nanoplasty: What\'s the Difference?',
    excerpt: 'Understanding these two popular hair treatments to help you choose the right one for your hair goals.',
    content: [
      'Both keratin treatments and nanoplasty are designed to transform your hair, but they work in different ways and suit different hair types. Understanding the difference will help you make the best choice for your hair.',
      'Keratin Treatment works by coating the hair shaft with keratin protein, creating a protective layer that smooths frizz and adds shine. Results typically last 3-5 months. It\'s ideal for frizzy, unmanageable hair and reduces styling time significantly.',
      'Nanoplasty is a more advanced treatment that penetrates deep into the hair cortex to reconstruct and rebuild damaged hair from within. It uses nano-sized particles of amino acids and proteins. Results can last 6-8 months and it actually improves hair health rather than just coating it.',
      'Choose Keratin if you want: Frizz control, faster styling, shine enhancement, and a temporary smooth effect.',
      'Choose Nanoplasty if you want: Deep hair reconstruction, longer-lasting results, actual hair health improvement, and you have severely damaged or chemically treated hair.',
      'At Hair Talk, we offer both treatments and can recommend the best option based on your hair type and goals. Book a free consultation to find out which treatment is right for you.'
    ],
    category: 'Treatments',
    date: '2025-01-10',
    readTime: '6 min read',
    image: '/images/salon.jpg',
  },
  {
    id: '3',
    title: 'How to Keep Balayage Fresh for Longer',
    excerpt: 'Expert advice on extending the life of your balayage and keeping that beautiful, sun-kissed look.',
    content: [
      'Balayage is one of the most popular colouring techniques, and for good reason. It creates a natural, sun-kissed effect that grows out beautifully. But how do you keep it looking fresh between salon visits?',
      'The key is gentle care. Use sulphate-free shampoo and conditioner specifically formulated for coloured hair. Sulphates strip colour and natural oils, causing your balayage to fade faster.',
      'Cool water is your friend. Hot water opens the hair cuticle, allowing colour molecules to escape. Rinse with lukewarm or cool water to seal the cuticle and lock in colour.',
      'UV protection matters. Just like your skin, your hair can be damaged by UV rays. Use hair products with built-in UV protection, or wear a hat when spending extended time in the sun.',
      'Regular gloss treatments between colour sessions can refresh and enhance your balayage tone without a full recolour. Ask us about our toner services.',
      'At Hair Talk, our expert colourists create bespoke balayage blends that are designed to grow out gracefully. Book your appointment for a consultation.'
    ],
    category: 'Hair Care',
    date: '2025-01-05',
    readTime: '5 min read',
    image: '/images/hero.jpg',
  },
  {
    id: '4',
    title: 'Choosing the Right Blonde Tone for Your Skin Tone',
    excerpt: 'Not all blondes are created equal. Find the perfect shade that complements your natural skin tone.',
    content: [
      'Choosing the right blonde can transform your entire look. The key is understanding your skin\'s undertone and selecting a blonde shade that harmonises with it.',
      'Warm skin undertones (yellow, peachy, golden): Opt for honey blonde, golden blonde, caramel highlights, or wheat blonde. These warm tones complement your natural warmth.',
      'Cool skin undertones (pink, red, bluish): Go for platinum, icy blonde, ash blonde, or pearl blonde. Cool blondes create a harmonious balance with your skin tone.',
      'Neutral skin undertones: You\'re lucky! You can pull off almost any blonde shade. Consider your eye colour and personal preference to guide your choice.',
      'If you have olive skin, warm blondes like caramel and honey create a beautiful, natural look. Avoid very light platinum as it can wash you out.',
      'At Hair Talk, we specialise in blonde colouring and offer complimentary consultations to help you find your perfect shade. Our expert colourist Lyn will create a custom blend that makes you glow.'
    ],
    category: 'Colour Guide',
    date: '2024-12-28',
    readTime: '4 min read',
    image: '/images/blonde-hair.jpg',
  },
  {
    id: '5',
    title: 'Hair Care Tips After Bleaching',
    excerpt: 'Essential aftercare guide to keep your bleached hair healthy, strong, and beautiful.',
    content: [
      'Bleaching is a transformative process, but it requires dedicated aftercare to keep your hair healthy and vibrant. Here\'s your comprehensive guide to post-bleach hair care.',
      'Wait 48-72 hours before washing. This allows your hair cuticles to fully close and seal in the colour. When you do wash, use lukewarm water and a sulphate-free shampoo.',
      'Invest in bond-building treatments. Products like Olaplex or K18 can help rebuild the bonds that bleaching breaks. Ask us about our in-salon bond-building add-on services.',
      'Deep condition weekly. Bleached hair needs extra moisture. Use a rich, protein-based hair mask once a week to restore strength and elasticity.',
      'Minimise heat styling. When you do use heat tools, always apply a heat protectant first. Consider air-drying when possible.',
      'Sleep on a silk pillowcase. This reduces friction and breakage, helping your bleached hair stay smooth and healthy.',
      'Book regular trims every 6-8 weeks to remove any split ends and keep your hair looking its best. At Hair Talk, we\'re experts in maintaining bleached hair health.'
    ],
    category: 'Hair Care',
    date: '2024-12-20',
    readTime: '5 min read',
    image: '/images/hero.jpg',
  },
  {
    id: '6',
    title: 'Salon Trends in Auckland for 2025',
    excerpt: 'Discover the hottest hair trends coming out of Auckland salons this year.',
    content: [
      'Auckland\'s hair scene is buzzing with exciting trends for 2025. From bold colour choices to innovative treatments, here\'s what\'s turning heads this year.',
      'Expensive Blonde is the look of the year. This multi-tonal, luxuriously blended blonde creates depth and dimension that looks effortlessly high-end. Think seamless root blending and face-framing highlights.',
      'Nanoplasty continues to gain popularity as more women discover the benefits of this revolutionary treatment. It\'s the go-to for anyone wanting smooth, healthy hair without compromising volume.',
      'Money Pieces are making a comeback with a modern twist. Bold, bright face-framing pieces paired with a darker base create a stunning contrast that\'s both edgy and sophisticated.',
      'Natural texture is being embraced more than ever. Whether it\'s enhancing your natural waves or adding soft movement, the trend is all about working with your hair, not against it.',
      'At Hair Talk in Newmarket, we\'re at the forefront of these trends. Book a consultation with our expert team to find the perfect trend-setting look for you.'
    ],
    category: 'Trends',
    date: '2024-12-15',
    readTime: '4 min read',
    image: '/images/salon.jpg',
  },
];

export const businessInfo = {
  name: 'Hair Talk',
  tagline: 'Nanoplasty Hair Experts — Expert Blonde Colour Stylist',
  address: '198 Broadway, Newmarket, Auckland 1023, New Zealand',
  phone: '+64 27 264 6888',
  phoneLink: 'tel:+64272646888',
  email: 'hello@hairtalknz.co.nz',
  instagram: 'https://www.instagram.com/hairtalknz',
  instagramHandle: '@hairtalknz',
  hours: [
    { day: 'Monday', hours: '10:00 AM – 6:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM – 6:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM – 6:00 PM' },
    { day: 'Thursday', hours: '10:00 AM – 6:00 PM' },
    { day: 'Friday', hours: '10:00 AM – 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8!2d174.7772!3d-36.8625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47b5f5e5b5b5%3A0x1234567890abcdef!2s198+Broadway%2C+Newmarket%2C+Auckland+1023!5e0!3m2!1sen!2snz!4v1234567890',
  mapLink: 'https://www.google.com/maps/dir//198+Broadway+Newmarket+Auckland+1023',
};

export const whyChooseUs = [
  { title: 'Blonde Colour Specialists', description: 'Expert colourists who specialise in creating the perfect blonde for every client.' },
  { title: 'Balayage & Keratin Experts', description: 'Masters of the most sought-after techniques in modern hairdressing.' },
  { title: 'Tailored Consultations', description: 'Every service begins with a personalised consultation to understand your unique needs.' },
  { title: 'Healthy Hair Focus', description: 'We prioritise the health and integrity of your hair in every treatment we perform.' },
  { title: 'Relaxing Salon Environment', description: 'A warm, welcoming space designed for you to unwind and feel pampered.' },
  { title: 'Trusted by Auckland', description: 'Loyal clients across Auckland trust us with their hair transformations.' },
];
