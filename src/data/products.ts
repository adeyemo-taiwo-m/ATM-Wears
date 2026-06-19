export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  tag: string | null;
  description: string;
  material: string;
  fit: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'vw-001',
    name: 'Tupac Graphic Tee',
    category: 'tops',
    price: 28000,
    colors: ['#F5F4F0', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-tupac-tee.jpg'],
    tag: 'Trending',
    description: 'Oversized heavy-weight cotton graphic tee with a washed vintage Tupac print. Dropped shoulders, vintage distressed neckline, and relaxed unisex fit.',
    material: '100% organic cotton, 280gsm. Carbon-neutral finish.',
    fit: 'Oversized unisex fit. We recommend buying your true size.',
  },
  {
    id: 'vw-002',
    name: 'Distressed Baggy Jeans',
    category: 'bottoms',
    price: 52000,
    colors: ['#3B82F6', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-vintage-denim.jpg'],
    tag: 'Classic',
    description: 'High-waisted, ultra-baggy denim trousers featuring heavy vintage washing, knee distress slits, and relaxed stack cuffs.',
    material: '12oz Japanese denim. Sourced sustainably.',
    fit: 'High rise, baggy wide-leg layout. Length is extra stacked.',
  },
  {
    id: 'vw-003',
    name: 'Cobalt Oversized Hoodie',
    category: 'outerwear',
    price: 65000,
    colors: ['#1E3A8A', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-blue-hoodie.jpg'],
    tag: 'Bestseller',
    description: 'Heavy-weight organic cotton fleece hoodie in custom cobalt blue. Features braided rope pulls with colored bead trims.',
    material: '100% organic French Terry cotton, 420gsm.',
    fit: 'Boxy, relaxed drop-shoulder shape.',
  },
  {
    id: 'vw-004',
    name: 'Renegade Graphic Tee',
    category: 'tops',
    price: 34000,
    colors: ['#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-renegade-tee.jpg'],
    tag: 'New',
    description: 'Relaxed fit black t-shirt featuring bold white "RENEGADE" graphic contrast lettering. Clean crewneck cut.',
    material: '100% combed cotton. Enzyme-washed for extra softness.',
    fit: 'Unisex standard fit. Take one size up for an oversized silhouette.',
  },
  {
    id: 'vw-005',
    name: 'Harmony Graphic Tee',
    category: 'tops',
    price: 26000,
    colors: ['#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-black-harmony-tee.jpg'],
    tag: 'New',
    description: 'Heavy-weight street tee with vibrant blue "No Harmony / The Song Remains" typography logo print. Soft feel, drop shoulder.',
    material: '100% deadstock organic cotton, 260gsm.',
    fit: 'Relaxed street-fit.',
  },
  {
    id: 'vw-006',
    name: 'Neon Green Puffer',
    category: 'outerwear',
    price: 85000,
    colors: ['#10B981', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-neon-green-puffer.jpg'],
    tag: 'Trending',
    description: 'High-visibility cropped puffer jacket in neon green with oversized down chambers. Features adjustable waist toggles and matching high collar.',
    material: 'Water-resistant nylon shell with recycled down fill.',
    fit: 'Cropped, boxy puffer fit.',
  },
  {
    id: 'vw-007',
    name: 'Purple Spider Trackset',
    category: 'outerwear',
    price: 95000,
    colors: ['#6D28D9', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-purple-spider-hoodie.jpg'],
    tag: 'Limited Edition',
    description: 'Streetwear graphic hoodie set featuring spiderweb logo print. Features matching cuffed joggers and extra soft fleece lining.',
    material: '80% cotton, 20% polyester blend fleece, 380gsm.',
    fit: 'Relaxed tracksuit fit.',
  },
  {
    id: 'vw-008',
    name: 'Coral Popsa Tee',
    category: 'tops',
    price: 24000,
    colors: ['#F87171', '#F5F4F0'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/look-coral-popsa-tee.jpg'],
    tag: 'New',
    description: 'Minimalist coral pink tee with contrast chest script details. Super breathable for urban environments.',
    material: '100% premium combed cotton, 220gsm.',
    fit: 'Relaxed unisex sizing.',
  },
];
