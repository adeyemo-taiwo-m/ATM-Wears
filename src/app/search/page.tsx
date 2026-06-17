'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import Link from 'next/link';
import gsap from 'gsap';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);

    // Animate in the filtered cards
    gsap.fromTo(
      '.search-result-card',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
    );
  }, [query]);

  const trendingTags = ['Tops', 'Bottoms', 'Outerwear', 'Blazer', 'Tee', 'Dress'];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen bg-[#F5F4F0]">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-40 block mb-2">Search Catalog</span>
      <h1 className="text-4xl md:text-5xl font-display font-medium text-void-charcoal mb-12">Search / Edit</h1>

      {/* Input section with floating focus underline */}
      <div className="max-w-2xl mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Type to search garments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pb-4 bg-transparent border-b border-void-ash font-display text-2xl md:text-3xl focus:outline-none focus:border-void-charcoal placeholder-void-ash/50 text-void-charcoal"
            autoFocus
          />
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-void-charcoal scale-x-0 transition-transform duration-300 origin-left" style={{ transform: query ? 'scaleX(1)' : 'scaleX(0)' }} />
        </div>
      </div>

      {/* Trending Search Tags */}
      <div className="mb-16 flex items-center gap-4 flex-wrap">
        <span className="font-mono text-[9px] uppercase tracking-wider opacity-50">Trending:</span>
        <div className="flex gap-2 flex-wrap">
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1.5 border border-void-bone hover:border-void-charcoal rounded-full font-mono text-[9px] uppercase tracking-wider text-void-charcoal transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {query.trim() && (
        <div className="animate-fade-in">
          <p className="font-mono text-xs opacity-50 uppercase tracking-widest mb-8 border-b border-void-bone pb-4">
            Found {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
          </p>

          {results.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-void-bone rounded-2xl bg-void-bone/10">
              <p className="font-mono text-sm opacity-50">No products match your search query.</p>
            </div>
          ) : (
            <div className="product-grid">
              {results.map((product) => (
                <article key={product.id} className="product-card search-result-card group">
                  <Link href={`/product/${product.id}`} className="product-card-link">
                    <div className="product-card-media relative aspect-[3/4] overflow-hidden bg-void-bone rounded-2xl">
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
      )}
    </div>
  );
}
