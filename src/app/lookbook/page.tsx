'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { LOOKBOOK } from '@/data/lookbook';
import { PRODUCTS } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LookbookPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pinned image swap timeline
    const sections = gsap.utils.toArray('.lookbook-section');
    sections.forEach((section: any, idx: number) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => {
          gsap.to('.lookbook-pinned-img', { opacity: 0, duration: 0.6, ease: 'power2.out' });
          gsap.to(`#lookbook-img-${idx}`, { opacity: 0.6, scale: 1.0, duration: 0.6, ease: 'power2.out' });
        },
        onEnterBack: () => {
          gsap.to('.lookbook-pinned-img', { opacity: 0, duration: 0.6, ease: 'power2.out' });
          gsap.to(`#lookbook-img-${idx}`, { opacity: 0.6, scale: 1.0, duration: 0.6, ease: 'power2.out' });
        }
      });
    });

    // Subtle parallax zoom on the active images during scroll
    gsap.utils.toArray('.lookbook-pinned-img').forEach((img: any) => {
      gsap.to(img, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F5F4F0] min-h-screen relative flex flex-col md:flex-row items-stretch">
      
      {/* Left Column: Pinned Editorial Photo Stack */}
      <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 overflow-hidden bg-void-ink relative h-[60vh] flex-shrink-0 z-10">
        {LOOKBOOK.map((item, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.id}
            id={`lookbook-img-${idx}`}
            src={item.image}
            alt={item.title}
            className="lookbook-pinned-img absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{ 
              opacity: idx === 0 ? 0.6 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
          />
        ))}
        {/* Subtle vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-ink/65 via-transparent to-transparent pointer-events-none" />
        
        {/* Mobile Header Info Overlay */}
        <div className="absolute bottom-8 left-6 right-6 md:hidden z-20 text-void-white">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">Editorial Edit</span>
          <h1 className="text-4xl font-display mt-2 font-medium">SS 2026 Collection</h1>
        </div>
      </div>

      {/* Right Column: Scrolling story details */}
      <div className="w-full md:w-1/2 px-6 md:px-16 py-24 md:py-36 flex flex-col gap-36 z-20">
        
        {/* Intro Section */}
        <header className="mb-12 border-b border-void-bone pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-45 mb-4">SS 2026 Editorial</p>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-void-charcoal leading-tight">
            The study <br />
            of forms & space.
          </h1>
          <p className="text-sm text-void-charcoal/80 leading-relaxed font-light max-w-md mt-6">
            Explore the architectural silhouettes of ATM Wear. Photographed locally, this collection highlights genderless garments built strictly using deadstock organic cotton twills and recycled fibers.
          </p>
        </header>

        {/* Story Sections */}
        {LOOKBOOK.map((item, index) => {
          // Fetch products associated with this lookbook item
          const itemProducts = PRODUCTS.filter((p) => item.products.includes(p.id));

          return (
            <section
              key={item.id}
              className="lookbook-section min-h-[50vh] flex flex-col justify-center border-b border-void-bone/50 pb-24"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-void-ash block mb-3">
                Story 0{index + 1}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-medium text-void-charcoal mb-6">
                {item.title}
              </h2>
              <p className="text-md md:text-lg text-void-charcoal/80 font-light italic leading-relaxed mb-8 max-w-lg">
                &ldquo;{item.subtitle}&rdquo;
              </p>

              {/* Linked Products */}
              {itemProducts.length > 0 && (
                <div className="mt-6 max-w-md">
                  <h3 className="font-mono text-[9px] uppercase tracking-widest text-void-ash mb-4">Featured Looks</h3>
                  <div className="flex flex-col gap-4">
                    {itemProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        className="flex gap-4 items-center p-3 border border-void-bone hover:border-void-charcoal bg-void-white/40 transition-all group"
                      >
                        <div className="w-12 h-16 bg-void-bone flex-shrink-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
            </section>
          );
        })}

        {/* Footer Manifesto Link */}
        <div className="pt-12 text-center md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-void-ash mb-4">Learn More</p>
          <Link href="/about" className="btn-primary inline-block">
            Read Our Manifesto
          </Link>
        </div>

      </div>

    </div>
  );
}
