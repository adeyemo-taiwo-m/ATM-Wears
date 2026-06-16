'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { LOOKBOOK } from '@/data/lookbook';
import { PRODUCTS } from '@/data/products';
import gsap from 'gsap';

export default function LookbookPage() {
  useEffect(() => {
    // Lookbook stories scroll reveals
    const stories = document.querySelectorAll('.lookbook-story');
    
    stories.forEach((story) => {
      const img = story.querySelector('.story-img-container');
      const text = story.querySelector('.story-text');

      if (img) {
        gsap.fromTo(img,
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: story,
              start: 'top 75%',
            }
          }
        );
      }

      if (text) {
        gsap.fromTo(text,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: story,
              start: 'top 75%',
            }
          }
        );
      }
    });
  }, []);

  return (
    <div className="pb-24 min-h-screen">
      {/* Lookbook Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 bg-void-charcoal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/editorial-01.jpg"
            alt="Lookbook Cover"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative text-center text-void-white px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4 opacity-80">Editorial</p>
          <h1 className="text-6xl md:text-8xl font-display font-medium">SS 2026 Lookbook</h1>
        </div>
      </section>

      {/* Lookbook Stories */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-32">
        {LOOKBOOK.map((item, index) => {
          const isEven = index % 2 === 1;

          // Fetch products associated with this lookbook item
          const itemProducts = PRODUCTS.filter((p) => item.products.includes(p.id));

          return (
            <section
              key={item.id}
              className={`lookbook-story flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className="w-full md:w-1/2">
                <div className="story-img-container aspect-[3/4] bg-void-bone overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Text Column */}
              <div className="story-text w-full md:w-1/2 flex flex-col gap-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider opacity-40 mb-2 block">
                    Story 0{index + 1}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">{item.title}</h2>
                  <p className="text-lg text-void-charcoal/80 font-light italic leading-relaxed">
                    &ldquo;{item.subtitle}&rdquo;
                  </p>
                </div>

                {/* Linked Products */}
                {itemProducts.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">Featured Products</h3>
                    <div className="flex flex-col gap-4">
                      {itemProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.id}`}
                          className="flex gap-4 items-center p-3 border border-void-bone hover:border-void-charcoal bg-void-white/50 transition-all group"
                        >
                          <div className="w-12 h-16 bg-void-bone flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-sm font-normal text-void-charcoal group-hover:text-void-accent transition-colors">
                              {p.name}
                            </h4>
                            <p className="font-mono text-xs opacity-50 mt-1">₦{p.price.toLocaleString()}</p>
                          </div>
                          <span className="text-void-ash group-hover:text-void-charcoal transition-colors pr-2">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
