'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import gsap from 'gsap';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || searchParams.get('cat') || 'all';

  const { addToCart } = useCart();
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);

  // Sync category filter with query parameter if it changes
  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('cat') || 'all';
    setSelectedCat(cat);
  }, [searchParams]);

  // Handle filtering logic
  useEffect(() => {
    let result = PRODUCTS;

    if (selectedCat !== 'all') {
      result = result.filter((p) => p.category === selectedCat);
    }

    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    setFilteredProducts(result);

    // Animate in the filtered cards
    gsap.fromTo(
      '.shop-product-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
    );
  }, [selectedCat, selectedSize]);

  const categories = ['all', 'tops', 'bottoms', 'outerwear', 'dresses'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-display font-medium mb-2">Shop All</h1>
          <p className="font-mono text-xs opacity-50 uppercase tracking-wider">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="border-y border-void-bone py-6 mb-12 flex flex-col md:flex-row justify-between gap-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 border text-xs uppercase tracking-widest font-mono transition-all duration-300 ${
                selectedCat === cat
                  ? 'bg-void-charcoal text-void-white border-void-charcoal'
                  : 'border-void-ash/40 hover:border-void-charcoal text-void-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Size Filters */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase opacity-50 tracking-wider">Filter by Size:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSize(null)}
              className={`w-9 h-9 border text-xs font-mono transition-all duration-300 flex items-center justify-center ${
                selectedSize === null
                  ? 'bg-void-charcoal text-void-white border-void-charcoal'
                  : 'border-void-ash/40 hover:border-void-charcoal text-void-charcoal'
              }`}
            >
              All
            </button>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-9 h-9 border text-xs font-mono transition-all duration-300 flex items-center justify-center ${
                  selectedSize === size
                    ? 'bg-void-charcoal text-void-white border-void-charcoal'
                    : 'border-void-ash/40 hover:border-void-charcoal text-void-charcoal'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-void-bone">
          <p className="font-mono text-sm opacity-50">No products match the selected filters.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card shop-product-card">
              <Link href={`/product/${product.id}`} className="product-card-link">
                <div className="product-card-media relative aspect-[3/4] overflow-hidden bg-void-bone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-card-img product-card-img--primary absolute inset-0 object-cover w-full h-full"
                    loading="lazy"
                  />
                  {product.images[1] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[1]}
                      alt={`${product.name} hover`}
                      className="product-card-img product-card-img--hover absolute inset-0 object-cover w-full h-full opacity-0"
                      loading="lazy"
                    />
                  )}
                  {product.tag && <div className="product-card-tag">{product.tag}</div>}
                </div>
                <div className="product-card-info mt-4">
                  <h3 className="product-card-name text-sm font-body font-normal">{product.name}</h3>
                  <div className="product-card-bottom flex justify-between items-center mt-2">
                    <span className="product-card-price font-mono text-sm">₦{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
              <button
                className="product-card-atc"
                onClick={(e) => {
                  e.preventDefault();
                  // Default to first size
                  addToCart(product, product.sizes[0]);
                }}
              >
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 text-center">
        <p className="font-mono text-sm opacity-50">Loading shop...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
