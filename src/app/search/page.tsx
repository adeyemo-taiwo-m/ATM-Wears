'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import Link from 'next/link';

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
  }, [query]);

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-display font-medium mb-12">Search</h1>

      {/* Input */}
      <div className="max-w-2xl mb-16">
        <input
          type="text"
          placeholder="Type to search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 bg-transparent border-b border-void-ash font-display text-2xl focus:outline-none focus:border-void-charcoal placeholder-void-ash/60"
          autoFocus
        />
      </div>

      {/* Results */}
      {query.trim() && (
        <div>
          <p className="font-mono text-xs opacity-50 uppercase tracking-widest mb-8">
            Found {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
          </p>

          {results.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-void-bone">
              <p className="font-mono text-sm opacity-50">No products match your search query.</p>
            </div>
          ) : (
            <div className="product-grid">
              {results.map((product) => (
                <article key={product.id} className="product-card">
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
                    </div>
                    <div className="product-card-info mt-4">
                      <h3 className="product-card-name text-sm font-body font-normal">{product.name}</h3>
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
