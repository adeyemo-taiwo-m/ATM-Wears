'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';

export default function Home() {
  const { addToCart } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Entrance Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    heroTl
      .fromTo('#hero-img', { scale: 1.08 }, { scale: 1, duration: 1.6 })
      .fromTo('#hero-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 0.7, duration: 0.6 }, '-=0.8')
      .fromTo('.hero-headline .line', 
        { y: '110%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, 
        '-=0.4'
      )
      .fromTo('#hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo('#hero-scroll', { opacity: 0 }, { opacity: 0.5, duration: 0.4 });

    // 2. Hero Scroll Parallax
    gsap.to('#hero-img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 3. Drops Product Cards Stagger Reveal
    gsap.fromTo('.drops-product-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#drops-grid',
          start: 'top 80%',
        }
      }
    );

    // 4. Manifesto Text Scroll Reveal
    gsap.fromTo('#manifesto-text',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '#manifesto',
          start: 'top 65%',
        }
      }
    );
  }, []);

  const latestDrops = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="hero" id="hero">
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/hero-main.jpg" alt="ATM Wear hero" className="hero-img" id="hero-img" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow" id="hero-eyebrow">SS 2026 Collection</p>
          <h1 className="hero-headline" id="hero-headline">
            <span className="line">Nothing</span>
            <span className="line italic">extra.</span>
          </h1>
          <div className="hero-cta" id="hero-cta">
            <Link href="/shop" className="btn-primary">Shop Now</Link>
            <Link href="/lookbook" className="btn-ghost btn-light">View Lookbook</Link>
          </div>
        </div>
        <div className="hero-scroll-hint" id="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Ticker Band */}
      <div className="ticker-band">
        <div className="ticker-track">
          <span>Deadstock Fabrics</span><span aria-hidden="true">·</span>
          <span>Carbon Neutral</span><span aria-hidden="true">·</span>
          <span>Gender Neutral</span><span aria-hidden="true">·</span>
          <span>SS 2026 Now Live</span><span aria-hidden="true">·</span>
          <span>Free Returns</span><span aria-hidden="true">·</span>
          {/* Duplicate for seamless loop */}
          <span>Deadstock Fabrics</span><span aria-hidden="true">·</span>
          <span>Carbon Neutral</span><span aria-hidden="true">·</span>
          <span>Gender Neutral</span><span aria-hidden="true">·</span>
          <span>SS 2026 Now Live</span><span aria-hidden="true">·</span>
          <span>Free Returns</span><span aria-hidden="true">·</span>
        </div>
      </div>

      {/* Drops Section */}
      <section ref={dropsRef} className="drops py-24 px-4 max-w-7xl mx-auto" id="drops">
        <div className="drops-header flex justify-between items-end mb-12">
          <div>
            <p className="section-label text-xs uppercase tracking-[0.2em] opacity-50 mb-2">New Arrivals</p>
            <h2 className="section-heading text-3xl font-display font-medium">Latest Drops</h2>
          </div>
          <Link href="/shop" className="link-arrow">
            View All <span>→</span>
          </Link>
        </div>
        <div className="product-grid" id="drops-grid">
          {latestDrops.map((product) => (
            <article key={product.id} className="product-card drops-product-card">
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
      </section>

      {/* Manifesto Section */}
      <section ref={manifestoRef} className="manifesto" id="manifesto">
        <div className="manifesto-inner max-w-4xl mx-auto text-center px-4">
          <p className="manifesto-label text-xs uppercase tracking-[0.3em] opacity-50 mb-8">Our Ethos</p>
          <h2 className="manifesto-text font-display font-medium text-4xl leading-tight" id="manifesto-text">
            Fashion doesn&apos;t need a gender.<br />
            It needs <em>intention.</em>
          </h2>
          <Link href="/about" className="btn-ghost btn-light mt-12 inline-block">
            Read Manifesto
          </Link>
        </div>
      </section>
    </div>
  );
}
