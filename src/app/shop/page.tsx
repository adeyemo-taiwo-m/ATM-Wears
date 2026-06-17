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
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' }
    );
  }, [selectedCat, selectedSize]);

  const categories = ['all', 'tops', 'bottoms', 'outerwear', 'dresses'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <header className="mb-12 border-b border-void-bone pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-medium text-void-charcoal">Catalog / All</h1>
          <p className="font-mono text-xs opacity-50 uppercase tracking-wider mt-2">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </header>

      {/* Main Layout: Sticky Sidebar + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Sticky Filters Column */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 flex flex-col gap-8 flex-shrink-0">
          
          {/* Category Filter Group */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-void-ash block mb-4">Category</span>
            <div className="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 lg:px-0 lg:py-1 text-left text-xs uppercase tracking-widest font-mono transition-all duration-300 ${
                    selectedCat === cat
                      ? 'text-void-charcoal font-semibold border-b border-void-charcoal lg:border-none'
                      : 'text-void-ash hover:text-void-charcoal'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter Group */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-void-ash block mb-4">Size Filter</span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedSize(null)}
                className={`w-9 h-9 border text-xs font-mono transition-all duration-300 flex items-center justify-center ${
                  selectedSize === null
                    ? 'bg-void-charcoal text-void-white border-void-charcoal'
                    : 'border-void-bone hover:border-void-charcoal text-void-charcoal'
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
                      : 'border-void-bone hover:border-void-charcoal text-void-charcoal'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Product Grid Column */}
        <div className="w-full lg:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-void-bone w-full">
              <p className="font-mono text-sm opacity-50">No products match the selected filters.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card shop-product-card group relative overflow-hidden">
                  
                  <Link href={`/product/${product.id}`} className="product-card-link">
                    <div className="product-card-media relative aspect-[3/4] overflow-hidden bg-void-bone">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-card-img product-card-img--primary absolute inset-0 object-cover w-full h-full"
                        loading="lazy"
                        draggable="false"
                      />
                      {product.images[1] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.images[1]}
                          alt={`${product.name} hover`}
                          className="product-card-img product-card-img--hover absolute inset-0 object-cover w-full h-full opacity-0"
                          loading="lazy"
                          draggable="false"
                        />
                      )}
                      {product.tag && <div className="product-card-tag">{product.tag}</div>}
                      
                      {/* Interactive Hover Size Quick-Add Drawer */}
                      <div className="shop-product-card-quick-add" onClick={(e) => e.stopPropagation()}>
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-center text-void-charcoal/50 mb-1">
                          Quick Add Size
                        </span>
                        <div className="quick-add-sizes">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product, size);
                              }}
                              className="quick-size-btn"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                    
                    <div className="product-card-info mt-4">
                      <h3 className="product-card-name text-sm font-body font-normal text-void-charcoal">{product.name}</h3>
                      <div className="product-card-bottom flex justify-between items-center mt-2">
                        <span className="product-card-price font-mono text-sm">₦{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>

                </article>
              ))}
            </div>
          )}
        </div>

      </div>

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
