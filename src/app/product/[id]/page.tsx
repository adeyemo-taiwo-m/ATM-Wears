'use client';

import React, { use, useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import gsap from 'gsap';

interface PDPProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PDPProps) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  const detailColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(null);

      // Scroll reveal details column
      gsap.fromTo('#pdp-gallery-container > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(detailColRef.current, 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-display mb-4">Product Not Found</h1>
        <p className="font-mono text-sm opacity-50 mb-8">The product you are looking for does not exist.</p>
        <Link href="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Related products (Complete the Look)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen bg-[#F5F4F0]">
      
      {/* Product Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Vertical Image Stack (Scrollable) */}
        <div id="pdp-gallery-container" className="w-full lg:w-3/5 flex flex-col gap-6">
          {product.images.map((img, idx) => (
            <div key={idx} className="aspect-[3/4] bg-void-bone overflow-hidden rounded-2xl relative shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${product.name} image ${idx + 1}`}
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Product Info */}
        <div 
          ref={detailColRef}
          id="pdp-details-column" 
          className="w-full lg:w-2/5 lg:sticky lg:top-24 h-fit flex flex-col gap-8 bg-void-white/40 p-8 border border-void-bone rounded-3xl"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-2">{product.category}</span>
            <h1 className="text-4xl font-display font-medium text-void-charcoal mb-3">{product.name}</h1>
            <p className="font-mono text-xl text-void-charcoal mt-2">
              ₦{product.price.toLocaleString()}
            </p>
          </div>

          <p className="text-sm font-light text-void-charcoal/80 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider opacity-50 mb-3">Color Options</p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color ? 'border-void-charcoal scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] uppercase tracking-wider opacity-50">Select Size</span>
              <button className="font-mono text-[9px] uppercase tracking-widest underline opacity-50 hover:opacity-100">
                Size Guide
              </button>
            </div>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-xs font-mono transition-all duration-300 flex items-center justify-center ${
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

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 mt-4">
            <button 
              onClick={handleAddToCart} 
              className="btn-primary btn-full py-4 text-xs font-mono uppercase tracking-widest"
            >
              Add to Cart
            </button>
            <button className="btn-ghost btn-full py-4 text-xs font-mono uppercase tracking-widest">
              Save to Wishlist
            </button>
          </div>

          {/* Spliced Minimalist Accordion */}
          <div className="mt-4 border-t border-void-bone/60">
            
            <details className="pdp-accordion border-b border-void-bone/60 py-4 group">
              <summary className="font-mono text-[10px] uppercase tracking-widest cursor-pointer list-none flex justify-between items-center select-none text-void-charcoal">
                Sustainability & Composition
                <span className="transition-transform duration-300 group-open:rotate-180 text-xs">+</span>
              </summary>
              <p className="mt-3 text-sm text-void-charcoal/80 font-light leading-relaxed pl-1">
                {product.material}
              </p>
            </details>

            <details className="pdp-accordion border-b border-void-bone/60 py-4 group">
              <summary className="font-mono text-[10px] uppercase tracking-widest cursor-pointer list-none flex justify-between items-center select-none text-void-charcoal">
                Fit & Measurements
                <span className="transition-transform duration-300 group-open:rotate-180 text-xs">+</span>
              </summary>
              <p className="mt-3 text-sm text-void-charcoal/80 font-light leading-relaxed pl-1">
                {product.fit}
              </p>
            </details>

            <details className="pdp-accordion border-b border-void-bone/60 py-4 group">
              <summary className="font-mono text-[10px] uppercase tracking-widest cursor-pointer list-none flex justify-between items-center select-none text-void-charcoal">
                Delivery & Returns
                <span className="transition-transform duration-300 group-open:rotate-180 text-xs">+</span>
              </summary>
              <p className="mt-3 text-sm text-void-charcoal/80 font-light leading-relaxed pl-1">
                Free standard shipping on orders over ₦50,000 within Nigeria. Free returns within 30 days.
              </p>
            </details>

          </div>

        </div>
      </div>

      {/* Complete the Look Section */}
      <section className="mt-48 pt-24 border-t border-void-bone">
        <h2 className="text-3xl font-display font-medium mb-16 text-center text-void-charcoal">Complete the Look</h2>
        <div className="product-grid">
          {relatedProducts.map((p) => (
            <article key={p.id} className="product-card group relative">
              
              <Link href={`/product/${p.id}`} className="product-card-link">
                <div className="product-card-media relative aspect-[3/4] overflow-hidden bg-void-bone rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} alt={p.name} className="product-card-img product-card-img--primary absolute inset-0 object-cover w-full h-full" loading="lazy" />
                  {p.images[1] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[1]} alt={p.name} className="product-card-img product-card-img--hover absolute inset-0 object-cover w-full h-full opacity-0" loading="lazy" />
                  )}
                </div>
                
                <div className="product-card-info mt-4">
                  <h3 className="product-card-name text-sm font-body font-normal text-void-charcoal">{p.name}</h3>
                  <div className="product-card-bottom flex justify-between items-center mt-2">
                    <span className="product-card-price font-mono text-sm">₦{p.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>

            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
