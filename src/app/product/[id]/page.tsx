'use client';

import React, { use, useState, useEffect } from 'react';
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setActiveImageIndex(0);
      setSelectedSize(null);

      // Entrance animation
      gsap.fromTo('#pdp-gallery', 
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );
      gsap.fromTo('#pdp-info > *', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out', delay: 0.2 }
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
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        {/* Left: Image Gallery */}
        <div id="pdp-gallery" className="w-full md:w-3/5 flex flex-col gap-4">
          <div className="aspect-[3/4] bg-void-bone overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 bg-void-bone overflow-hidden border transition-all ${
                    activeImageIndex === idx ? 'border-void-charcoal' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div id="pdp-info" className="w-full md:w-2/5 flex flex-col gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">{product.category}</p>
            <h1 className="text-4xl font-display font-medium mb-3">{product.name}</h1>
            <p className="font-mono text-lg font-medium text-void-charcoal">
              ₦{product.price.toLocaleString()}
            </p>
          </div>

          {/* Color Selector */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider opacity-50 mb-3">Colour</p>
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
              <span className="font-mono text-xs uppercase tracking-wider opacity-50">Size</span>
              <button className="font-mono text-[10px] uppercase tracking-widest underline opacity-50 hover:opacity-100">
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

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-4">
            <button onClick={handleAddToCart} className="btn-primary btn-full py-4 text-xs font-mono uppercase tracking-widest">
              Add to Cart
            </button>
            <button className="btn-ghost btn-full py-4 text-xs font-mono uppercase tracking-widest">
              Save to Wishlist
            </button>
          </div>

          {/* Accordion Details */}
          <div className="mt-8 border-t border-void-bone">
            <details className="pdp-accordion border-b border-void-bone py-4 group">
              <summary className="font-mono text-xs uppercase tracking-widest cursor-pointer list-none flex justify-between items-center select-none">
                Materials & Sustainability
                <span className="transition-transform duration-300 group-open:rotate-180">-</span>
              </summary>
              <p className="mt-3 text-sm text-void-charcoal/80 leading-relaxed pl-1">
                {product.material}
              </p>
            </details>

            <details className="pdp-accordion border-b border-void-bone py-4 group">
              <summary className="font-mono text-xs uppercase tracking-widest cursor-pointer list-none flex justify-between items-center select-none">
                Fit & Sizing
                <span className="transition-transform duration-300 group-open:rotate-180">-</span>
              </summary>
              <p className="mt-3 text-sm text-void-charcoal/80 leading-relaxed pl-1">
                {product.fit}
              </p>
            </details>

            <details className="pdp-accordion border-b border-void-bone py-4 group">
              <summary className="font-mono text-xs uppercase tracking-widest cursor-pointer list-none flex justify-between items-center select-none">
                Shipping & Returns
                <span className="transition-transform duration-300 group-open:rotate-180">-</span>
              </summary>
              <p className="mt-3 text-sm text-void-charcoal/80 leading-relaxed pl-1">
                Free standard shipping on orders over ₦50,000. Free returns within 30 days.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Complete the Look Section */}
      <section className="mt-32">
        <h2 className="text-2xl font-display font-medium mb-12 text-center">Complete the Look</h2>
        <div className="product-grid">
          {relatedProducts.map((p) => (
            <article key={p.id} className="product-card">
              <Link href={`/product/${p.id}`} className="product-card-link">
                <div className="product-card-media relative aspect-[3/4] overflow-hidden bg-void-bone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} alt={p.name} className="product-card-img product-card-img--primary absolute inset-0 object-cover w-full h-full" loading="lazy" />
                  {p.images[1] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[1]} alt={p.name} className="product-card-img product-card-img--hover absolute inset-0 object-cover w-full h-full opacity-0" loading="lazy" />
                  )}
                </div>
                <div className="product-card-info mt-4">
                  <h3 className="product-card-name text-sm font-body font-normal">{p.name}</h3>
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
