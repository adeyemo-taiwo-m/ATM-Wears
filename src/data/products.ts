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
    name: 'Void Oversized Tee',
    category: 'tops',
    price: 28000,
    colors: ['#F5F4F0', '#1A1A18', '#C4C0B8'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/assets/images/tee-01-front.jpg',
      '/assets/images/tee-01-back.jpg',
    ],
    tag: 'New',
    description: 'Structured oversized silhouette in 100% deadstock cotton jersey. Dropped shoulders, raw hem, unisex fit.',
    material: '100% deadstock cotton. Carbon-neutral production.',
    fit: 'Oversized unisex. Model is 180cm and wears size M.',
  },
  {
    id: 'vw-002',
    name: 'Form Wide Trouser',
    category: 'bottoms',
    price: 52000,
    colors: ['#1A1A18', '#E8E5DC'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/trouser-01.jpg', '/assets/images/trouser-01-b.jpg'],
    tag: null,
    description: 'High-waisted wide-leg cut in Japanese wool-blend twill. Press-stud closure, side pockets.',
    material: '78% wool, 22% polyester. Deadstock fabric sourced from Osaka.',
    fit: 'High rise, wide leg. Model is 177cm and wears size S.',
  },
  {
    id: 'vw-003',
    name: 'Zero Jacket',
    category: 'outerwear',
    price: 95000,
    colors: ['#C4C0B8', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/jacket-01.jpg'],
    tag: 'Bestseller',
    description: 'Sculptural single-button jacket. Minimal seaming, structured shoulder, unlined.',
    material: '100% recycled polyester gabardine.',
    fit: 'Slim through the shoulder, relaxed body. Size up for oversized look.',
  },
  {
    id: 'vw-004',
    name: 'Void Maxi Dress',
    category: 'dresses',
    price: 67000,
    colors: ['#F5F4F0', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/dress-01.jpg'],
    tag: 'New',
    description: 'Floor-length fluid silhouette with bias cut. Adjustable tie at waist, deep side slits.',
    material: '100% TENCEL™ lyocell. Biodegradable.',
    fit: 'True to size. Model is 178cm and wears XS.',
  },
  {
    id: 'vw-005',
    name: 'Structure Blazer',
    category: 'outerwear',
    price: 78000,
    colors: ['#C8B89A', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/assets/images/blazer-01.jpg'],
    tag: null,
    description: 'Double-breasted blazer with sharp lapel and patch pockets. Unisex tailoring.',
    material: '65% wool, 35% viscose.',
    fit: 'Slim shoulder, relaxed body. Unisex sizing.',
  },
  {
    id: 'vw-006',
    name: 'Ghost Long Sleeve',
    category: 'tops',
    price: 34000,
    colors: ['#F5F4F0', '#E8E5DC'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['/assets/images/longsleeve-01.jpg'],
    tag: null,
    description: 'Featherweight long sleeve in silk-cotton blend. Relaxed through the body.',
    material: '60% silk, 40% organic cotton.',
    fit: 'Relaxed fit. Unisex.',
  },
];
