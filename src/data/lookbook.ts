export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  products: string[];
}

export const LOOKBOOK: LookbookItem[] = [
  {
    id: 'lb-001',
    title: 'Absence',
    subtitle: 'When less becomes the loudest statement.',
    image: '/assets/images/editorial-01.jpg',
    products: ['vw-001', 'vw-002'],
  },
  {
    id: 'lb-002',
    title: 'Form',
    subtitle: 'The body as architecture.',
    image: '/assets/images/editorial-02.jpg',
    products: ['vw-003', 'vw-005'],
  },
];
