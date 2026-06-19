'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { addToCart } = useCart();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string>('');

  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs for ScrollTriggers & Dragging
  const heroRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<HTMLDivElement>(null);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const floatingImgRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);

  // Drag Carousel Refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  // Category hover preview images
  const categoryImages: { [key: string]: string } = {
    tops: '/assets/images/hero-orange.png',
    bottoms: '/assets/images/hero-blue-suit.png',
    outerwear: '/assets/images/hero-green-coat.png',
    dresses: '/assets/images/hero-sunglasses.png',
  };

  useEffect(() => {
    // 1. Hero Entrance Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    heroTl
      .fromTo('.hero-line', 
        { y: '100%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 1.0, stagger: 0.15, ease: 'power3.out' }
      )
      .fromTo(['#hero-play-badge', '#hero-avatars'], 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, 
        '-=0.5'
      )
      // Reveal columns from center outwards with scale & y transition
      .fromTo('#hero-col-3 .hero-card-anim',
        { y: 50, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(['#hero-col-2 .hero-card-anim', '#hero-col-4 .hero-card-anim'],
        { y: 60, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(['#hero-col-1 .hero-card-anim', '#hero-col-5 .hero-card-anim'],
        { y: 70, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
        '-=0.7'
      );

    // 2. Hero Scroll Parallax (moving columns at different rates)
    gsap.to(['#hero-col-1', '#hero-col-5'], {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to(['#hero-col-2', '#hero-col-4'], {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Parallax background watermark
    gsap.to('.hero-watermark', {
      xPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 3. Horizontal Scroll Timeline for Lookbook
    const lookbookWrapper = horizontalWrapperRef.current;
    const horizontalSection = horizontalSectionRef.current;
    if (lookbookWrapper && horizontalSection) {
      const horizTween = gsap.to(lookbookWrapper, {
        x: () => -(lookbookWrapper.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${lookbookWrapper.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progressBar = document.getElementById('lookbook-progress');
            if (progressBar) {
              progressBar.style.width = `${self.progress * 100}%`;
            }
          }
        }
      });

      // Horizontal parallax for lookbook slide images
      gsap.utils.toArray('.slide-media img').forEach((img: any) => {
        gsap.fromTo(img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: horizTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          }
        );
      });
    }

    // 4. Manifesto Text Reveal on Scroll
    gsap.to('.reveal-word', {
      scrollTrigger: {
        trigger: '#manifesto',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
      opacity: 1,
      y: 0,
      stagger: 0.08,
      ease: 'power1.out',
    });

    // Manifesto image scroll parallax zoom
    gsap.fromTo('#manifesto-image',
      { scale: 1.0 },
      {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#manifesto',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Category list cursor tracking for floating visual reveals
  const handleCategoryMouseMove = (e: React.MouseEvent) => {
    if (floatingImgRef.current) {
      gsap.to(floatingImgRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleCategoryMouseEnter = (cat: string) => {
    setHoveredCategory(cat);
    if (floatingImgRef.current) {
      floatingImgRef.current.classList.add('active');
    }
    const colors: { [key: string]: string } = {
      tops: '#F05A28',
      bottoms: '#4CA3D9',
      outerwear: '#2E6B4B',
      dresses: '#FFD700',
    };
    setHoveredColor(colors[cat] || '');
  };

  const handleCategoryMouseLeave = () => {
    setHoveredCategory(null);
    setHoveredColor('');
    if (floatingImgRef.current) {
      floatingImgRef.current.classList.remove('active');
    }
  };

  // Drag-to-Scroll product carousel logic
  const handleCarouselMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    dragDistance.current = 0;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleCarouselMouseLeave = () => {
    isDragging.current = false;
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.classList.remove('drag');
  };

  const handleCarouselMouseUp = () => {
    isDragging.current = false;
  };

  const handleCarouselMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    dragDistance.current = Math.abs(x - startX.current);
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleProductCardClick = (e: React.MouseEvent) => {
    if (dragDistance.current > 10) {
      e.preventDefault();
    }
  };

  const onCarouselMouseEnter = () => {
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.classList.add('drag');
  };

  const onCarouselMouseLeave = () => {
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.classList.remove('drag');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setIsSubmitted(true);
  };

  const latestDrops = PRODUCTS.slice(0, 6);

  // Lookbook items lookup
  const lookbookProducts = {
    'vw-001': PRODUCTS.find(p => p.id === 'vw-001') || PRODUCTS[0],
    'vw-002': PRODUCTS.find(p => p.id === 'vw-002') || PRODUCTS[1],
    'vw-003': PRODUCTS.find(p => p.id === 'vw-003') || PRODUCTS[2],
    'vw-004': PRODUCTS.find(p => p.id === 'vw-004') || PRODUCTS[3],
    'vw-005': PRODUCTS.find(p => p.id === 'vw-005') || PRODUCTS[4],
    'vw-006': PRODUCTS.find(p => p.id === 'vw-006') || PRODUCTS[5],
  };

  const renderHotspot = (prodId: keyof typeof lookbookProducts, coordinates: { top: string; left: string }) => {
    const prod = lookbookProducts[prodId];
    return (
      <div className="hotspot-group" style={{ top: coordinates.top, left: coordinates.left }}>
        <div className="hotspot-dot" />
        <div className="hotspot-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={prod.images[0]} alt={prod.name} className="hotspot-card-img" />
          <div className="hotspot-card-info">
            <h4 className="hotspot-card-name">{prod.name}</h4>
            <span className="hotspot-card-price">₦{prod.price.toLocaleString()}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(prod, prod.sizes[0]);
              }}
              className="hotspot-card-atc"
            >
              Quick Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const manifestoText = "Fashion doesn't need a gender. It needs intention.";
  const manifestoWords = manifestoText.split(" ");

  return (
    <div className="relative bg-[#F5F4F0] min-h-screen overflow-x-hidden">
      
      {/* Background Watermark */}
      <div className="hero-watermark select-none">
        NOTHING EXTRA
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden" id="hero">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header/Title Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 relative">
            
            {/* Left Play Badge */}
            <div className="w-full md:w-1/6 flex justify-center md:justify-start" id="hero-play-badge">
              <div className="spinning-badge-container" onClick={() => setIsVideoOpen(true)}>
                <div className="spinning-badge-play">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <svg className="spinning-badge-text animate-spin-slow" viewBox="0 0 100 100">
                  <path
                    id="badge-text-path"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text fill="var(--void-charcoal)" className="text-[9px] font-mono tracking-[1.5px] uppercase">
                    <textPath href="#badge-text-path" startOffset="0%">
                      learn about us • through this video • 
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Center Heading */}
            <div className="w-full md:w-2/3 text-center overflow-hidden">
              <h1 className="font-body font-extrabold text-void-charcoal text-[2.5rem] md:text-[4.2rem] leading-[1.05] tracking-tight max-w-3xl mx-auto flex flex-col items-center">
                <span className="hero-line block overflow-hidden">Elevate Your Style With</span>
                <span className="hero-line block overflow-hidden text-void-ink">Bold Fashion</span>
              </h1>
            </div>

            {/* Right Avatars */}
            <div className="w-full md:w-1/6 flex justify-center md:justify-end" id="hero-avatars">
              <div className="avatar-stack">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/tee-01-front.jpg" alt="User Avatar" className="avatar-stack-item" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/trouser-01.jpg" alt="User Avatar" className="avatar-stack-item" />
                <div className="avatar-stack-plus">+</div>
              </div>
            </div>
            
          </div>

          {/* 5-Column Grid */}
          <div className="flex md:grid md:grid-cols-5 gap-6 overflow-x-auto md:overflow-x-visible pb-12 snap-x snap-mandatory scrollbar-none" id="hero-grid">
            
            {/* Column 1 */}
            <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0 flex flex-col gap-6 md:mt-16" id="hero-col-1">
              <div className="hero-card hero-card-anim float-anim-1 relative aspect-[3/4] overflow-hidden rounded-t-3xl rounded-br-3xl bg-[#F05A28]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero-orange.png" alt="Orange Streetwear Hoodie" className="w-full h-full object-cover" draggable="false" />
              </div>
              <div className="hero-card hero-card-anim float-anim-2 relative aspect-square overflow-hidden rounded-3xl bg-[#F7C615]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero-kid.png" alt="Kid in suit" className="w-full h-full object-cover" draggable="false" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0 flex flex-col gap-6 md:mt-0" id="hero-col-2">
              <div className="hero-card hero-card-anim float-anim-3 relative aspect-[3/5] overflow-hidden clip-folder-tab-right bg-[#5DB075]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero-green-coat.png" alt="Model in green coat" className="w-full h-full object-cover" draggable="false" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0 flex flex-col items-center gap-8 md:mt-24" id="hero-col-3">
              {/* Floral Decorative Icon */}
              <div className="hero-card hero-card-anim text-[#F05A28]" id="hero-flower-icon">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 A15 15 0 0 0 35 15 A15 15 0 0 0 50 30 A15 15 0 0 0 65 15 A15 15 0 0 0 50 0 Z" />
                  <path d="M50 70 A15 15 0 0 0 35 85 A15 15 0 0 0 50 100 A15 15 0 0 0 65 85 A15 15 0 0 0 50 70 Z" />
                  <path d="M15 35 A15 15 0 0 0 0 50 A15 15 0 0 0 15 65 A15 15 0 0 0 30 50 A15 15 0 0 0 15 35 Z" />
                  <path d="M85 35 A15 15 0 0 0 70 50 A15 15 0 0 0 85 65 A15 15 0 0 0 100 50 A15 15 0 0 0 85 35 Z" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                </svg>
              </div>
              <div className="hero-card hero-card-anim float-anim-1 relative aspect-square overflow-hidden rounded-3xl bg-[#FFD700] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero-yellow-portrait.png" alt="Yellow portrait model" className="w-full h-full object-cover" draggable="false" />
              </div>
              <div className="hero-card hero-card-anim" id="hero-explore-btn">
                <Link href="/shop" className="explore-btn">
                  Explore Collections
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="19" x2="19" y2="5" />
                    <polyline points="12 5 19 5 19 12" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Column 4 */}
            <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0 flex flex-col gap-6 md:mt-0" id="hero-col-4">
              <div className="hero-card hero-card-anim float-anim-2 relative aspect-[3/5] overflow-hidden clip-folder-tab-left bg-[#4CA3D9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero-blue-suit.png" alt="Model in white/blue outfit" className="w-full h-full object-cover" draggable="false" />
              </div>
            </div>

            {/* Column 5 */}
            <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0 flex flex-col gap-6 md:mt-16" id="hero-col-5">
              <div className="hero-card hero-card-anim float-anim-3 relative aspect-[3/4] overflow-hidden clip-folder-tab-right bg-[#7DC89A]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero-sunglasses.png" alt="Model with heart sunglasses" className="w-full h-full object-cover" draggable="false" />
              </div>
              <div className="hero-card hero-card-anim float-anim-1 relative aspect-square overflow-hidden rounded-3xl bg-[#2E6B4B]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/hero-green-blazer.png" alt="Model in green blazer" className="w-full h-full object-cover" draggable="false" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Video Modal Overlay */}
      <div className={`video-modal-overlay ${isVideoOpen ? 'open' : ''}`} onClick={() => setIsVideoOpen(false)}>
        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="video-modal-close" onClick={() => setIsVideoOpen(false)}>
            Close
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 inline">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <iframe
            width="100%"
            height="100%"
            src={isVideoOpen ? "https://www.youtube.com/embed/9BqD2K1g2U0?autoplay=1" : ""}
            title="ATM Wear Brand Reel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

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

      {/* Category Hover Showcase Section */}
      <section 
        ref={categoryContainerRef}
        onMouseMove={handleCategoryMouseMove}
        className="category-reveal-section py-24 relative overflow-hidden"
        style={{ backgroundColor: hoveredColor ? `${hoveredColor}1f` : 'var(--void-white)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-12">Collections / Edit</p>
          
          <div className="category-list flex flex-col">
            
            <Link 
              href="/shop?category=tops" 
              className="category-list-item"
              onMouseEnter={() => handleCategoryMouseEnter('tops')}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className="flex items-center">
                <span className="category-num">01/</span>
                <span className="category-name">TOPS</span>
              </div>
              <span className="text-sm font-mono opacity-50">Shop Tops →</span>
            </Link>

            <Link 
              href="/shop?category=bottoms" 
              className="category-list-item"
              onMouseEnter={() => handleCategoryMouseEnter('bottoms')}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className="flex items-center">
                <span className="category-num">02/</span>
                <span className="category-name">BOTTOMS</span>
              </div>
              <span className="text-sm font-mono opacity-50">Shop Bottoms →</span>
            </Link>

            <Link 
              href="/shop?category=outerwear" 
              className="category-list-item"
              onMouseEnter={() => handleCategoryMouseEnter('outerwear')}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className="flex items-center">
                <span className="category-num">03/</span>
                <span className="category-name">OUTERWEAR</span>
              </div>
              <span className="text-sm font-mono opacity-50">Shop Outerwear →</span>
            </Link>

            <Link 
              href="/shop?category=dresses" 
              className="category-list-item"
              onMouseEnter={() => handleCategoryMouseEnter('dresses')}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className="flex items-center">
                <span className="category-num">04/</span>
                <span className="category-name">DRESSES</span>
              </div>
              <span className="text-sm font-mono opacity-50">Shop Dresses →</span>
            </Link>

          </div>
        </div>

        {/* Floating Follower Container */}
        <div 
          ref={floatingImgRef} 
          className="floating-category-img-container"
          style={{ left: 0, top: 0 }}
        >
          {hoveredCategory && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={categoryImages[hoveredCategory]} 
              alt="Category Preview" 
              className="w-full h-full object-cover" 
            />
          )}
        </div>
      </section>

      {/* The Street Lab Section */}
      <section id="street-lab" className="py-24 px-6 md:px-12 border-t border-void-bone/10 border-b border-void-bone/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFD700] mb-3">
                [ SYSTEM ARCHIVE ] / METALLICS & DISTRESS
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-void-white tracking-tight">
                THE STREET LAB.
              </h2>
            </div>
            <p className="max-w-md text-sm text-void-ash font-light leading-relaxed">
              An experimental showcase of heavy-weight textiles, protective silhouettes, and deconstructed street capsules tailored for the design-conscious.
            </p>
          </div>

          {/* Panels Container */}
          <div className="lab-panels-container">
            
            {/* Panel 01 */}
            <div className="lab-panel group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/images/capsule-01.jpg" 
                alt="Neo-Metallic Future Form Edit" 
                className="lab-panel-img"
              />
              <div className="lab-panel-overlay" />
              <div className="lab-panel-content">
                <span className="lab-panel-tag">CAPSULE // 01 • NEO-FORM</span>
                <h3 className="lab-panel-title">FUTURE SILHOUETTE</h3>
                <p className="lab-panel-details">
                  Volume, metallic textures, and sculptural protection. Exploring organic cotton pink puffers, high-insulation collars, and structured leather bombers.
                </p>
                <Link href="/shop?category=outerwear" className="lab-panel-cta">
                  Explore Silhouette <span>→</span>
                </Link>
              </div>
            </div>

            {/* Panel 02 */}
            <div className="lab-panel group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/images/capsule-02.jpg" 
                alt="Deconstructed Denim Jeans" 
                className="lab-panel-img"
              />
              <div className="lab-panel-overlay" />
              <div className="lab-panel-content">
                <span className="lab-panel-tag">CAPSULE // 02 • JJ DENIM</span>
                <h3 className="lab-panel-title">DECONSTRUCTED DENIM</h3>
                <p className="lab-panel-details">
                  Sartorial utility expressed through heavy-weight Japanese denim. Wide-leg cuts, contrast stitching, metal rivets, and raw stack hems.
                </p>
                <Link href="/shop?category=bottoms" className="lab-panel-cta">
                  Shop Denim Edit <span>→</span>
                </Link>
              </div>
            </div>

            {/* Panel 03 */}
            <div className="lab-panel group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/images/capsule-03.jpg" 
                alt="Gothic Grunge Streetwear" 
                className="lab-panel-img"
              />
              <div className="lab-panel-overlay" />
              <div className="lab-panel-content">
                <span className="lab-panel-tag">CAPSULE // 03 • ANARCHY</span>
                <h3 className="lab-panel-title">GOTHIC GRUNGE</h3>
                <p className="lab-panel-details">
                  Matte black forms meet distressed Y2K vibes. Features shredded logo graphic hoodies, tie-dye cotton, and multi-strap utility cargo panels.
                </p>
                <Link href="/shop?category=tops" className="lab-panel-cta">
                  Shop Grunge <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Horizontal Scroll Lookbook Section */}
      <section ref={horizontalSectionRef} className="horizontal-scroll-container bg-[#1A1A18]" id="lookbook-horizontal-section">
        <div ref={horizontalWrapperRef} className="horizontal-scroll-wrapper">
          
          {/* Slide 1 */}
          <div className="lookbook-slide">
            <div className="slide-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/editorial-01.jpg" alt="Lookbook Slide 1" />
              
              {/* Hotspots Container */}
              <div className="hotspot-container">
                {renderHotspot('vw-001', { top: '42%', left: '33%' })}
                {renderHotspot('vw-002', { top: '78%', left: '27%' })}
              </div>
            </div>
            <div className="slide-content">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFD700] mb-4">[ LOOK_01 // SS26 ]</p>
              <h2 className="slide-title">ABSENCE</h2>
              <p className="slide-desc">
                When less becomes the loudest statement in the room. A curated study of volume, raw deadstock cotton, and structured simplicity tailored for Nigerian urban temperatures.
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] opacity-50">Featuring:</span>
                <Link href="/product/vw-001" className="slide-shop-link">
                  [ 01: Void Oversized Tee ]
                </Link>
                <Link href="/product/vw-002" className="slide-shop-link">
                  [ 02: Form Wide Trouser ]
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="lookbook-slide">
            <div className="slide-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/editorial-02.jpg" alt="Lookbook Slide 2" />
              
              {/* Hotspots Container */}
              <div className="hotspot-container">
                {renderHotspot('vw-003', { top: '35%', left: '46%' })}
                {renderHotspot('vw-005', { top: '55%', left: '43%' })}
              </div>
            </div>
            <div className="slide-content">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFD700] mb-4">[ LOOK_02 // SS26 ]</p>
              <h2 className="slide-title">FORM</h2>
              <p className="slide-desc">
                The physical body interpreted as modular architecture. Minimal seams, sculptural silhouettes, and unlined structures designed for quiet luxury and freedom of form.
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] opacity-50">Featuring:</span>
                <Link href="/product/vw-003" className="slide-shop-link">
                  [ 03: Zero Jacket ]
                </Link>
                <Link href="/product/vw-005" className="slide-shop-link">
                  [ 04: Structure Blazer ]
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="lookbook-slide">
            <div className="slide-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/hero-main.jpg" alt="Lookbook Slide 3" />
              
              {/* Hotspots Container */}
              <div className="hotspot-container">
                {renderHotspot('vw-004', { top: '65%', left: '48%' })}
                {renderHotspot('vw-006', { top: '35%', left: '38%' })}
              </div>
            </div>
            <div className="slide-content">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFD700] mb-4">[ LOOK_03 // SS26 ]</p>
              <h2 className="slide-title">IDENTITY</h2>
              <p className="slide-desc">
                Unisex apparel crafted strictly using organic local deadstock materials. A quiet commitment to zero carbon footprints, zero excess, and infinite expression.
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] opacity-50">Featuring:</span>
                <Link href="/product/vw-004" className="slide-shop-link">
                  [ 05: Void Maxi Dress ]
                </Link>
                <Link href="/product/vw-006" className="slide-shop-link">
                  [ 06: Ghost Long Sleeve ]
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Horizontal Progress Bar */}
        <div className="scroll-progress-bar-container">
          <div id="lookbook-progress" className="scroll-progress-bar"></div>
        </div>
      </section>

      {/* Featured Drops (Drag Slider) Section */}
      <section ref={dropsRef} className="py-24 px-6 max-w-7xl mx-auto" id="drops">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="section-label text-xs uppercase tracking-[0.2em] opacity-50 mb-2">New Arrivals</p>
            <h2 className="section-heading text-3xl font-display font-medium">Latest Drops</h2>
          </div>
          <Link href="/shop" className="link-arrow">
            View All <span>→</span>
          </Link>
        </div>

        <div 
          ref={carouselRef}
          onMouseDown={handleCarouselMouseDown}
          onMouseLeave={handleCarouselMouseLeave}
          onMouseUp={handleCarouselMouseUp}
          onMouseMove={handleCarouselMouseMove}
          onMouseEnter={onCarouselMouseEnter}
          className="drops-carousel-container select-none"
        >
          {latestDrops.map((product) => (
            <div key={product.id} className="drops-carousel-item" onClick={handleProductCardClick}>
              <article className="product-card group relative">
                <Link href={`/product/${product.id}`} className="product-card-link" draggable="false">
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
                    <button
                      className="product-card-mobile-quick-add"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product, product.sizes[0]);
                      }}
                      aria-label={`Quick Add ${product.name} to Cart`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
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
                    e.stopPropagation();
                    addToCart(product, product.sizes[0]);
                  }}
                >
                  Add to Cart
                </button>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Manifesto Split Screen */}
      <section className="bg-void-charcoal py-24 text-void-white overflow-hidden" id="manifesto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Typography reveals */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-40 mb-8 font-mono">Our Ethos</p>
            <h2 className="manifesto-text font-display font-medium text-4xl md:text-5xl leading-tight" id="manifesto-text">
              {manifestoWords.map((word, i) => (
                <span key={i} className="reveal-word inline-block mr-3 opacity-0 translate-y-4">
                  {word.includes("intention") ? <em className="text-void-accent">intention.</em> : word}
                </span>
              ))}
            </h2>
            
            {/* Interactive Newsletter Sign Up Form */}
            <div className="mt-16 max-w-md">
              <p className="text-sm font-light text-void-ash leading-relaxed mb-6">
                Subscribe to get early notifications of our micro-editions and exclusive lookbooks.
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col">
                  <div className="newsletter-input-wrap">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="newsletter-input"
                      required
                    />
                    <div className="newsletter-line" />
                  </div>
                  <button type="submit" className="newsletter-btn">
                    Join The List
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </form>
              ) : (
                <div className="newsletter-success-state p-6 border border-void-accent rounded-lg bg-void-ink/40 animate-fade-in">
                  <h3 className="font-display text-xl text-void-accent mb-2">Welcome to ATM Club</h3>
                  <p className="text-xs font-mono uppercase tracking-[0.1em] text-void-ash">
                    We will notify you at: {email}
                  </p>
                </div>
              )}
            </div>

            <Link href="/about" className="btn-ghost btn-light mt-12 inline-block">
              Read Full Manifesto
            </Link>
          </div>

          {/* Right Side: Portrait Zooming Image */}
          <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-void-bone relative shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              id="manifesto-image" 
              src="/assets/images/hero-yellow-portrait.png" 
              alt="Brand Ethos Portrait" 
              className="w-full h-full object-cover" 
            />
          </div>

        </div>
      </section>

      {/* SVG ClipPaths for folder shapes */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="folder-tab-right" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.08 C 0,0.04 0.02,0.06 0.05,0.06 L 0.45,0.06 C 0.48,0.06 0.5,0.04 0.52,0.02 L 0.54,0 L 0.95,0 C 0.98,0 1,0.02 1,0.05 L 1,0.95 C 1,0.98 0.98,1 0.95,1 L 0.05,1 C 0.02,1 0,0.98 0,0.95 Z" />
          </clipPath>
          <clipPath id="folder-tab-left" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.05 C 0,0.02 0.02,0 0.05,0 L 0.45,0 L 0.47,0.02 C 0.49,0.04 0.51,0.06 0.54,0.06 L 0.95,0.06 C 0.98,0.06 1,0.08 1,0.12 L 1,0.95 C 1,0.98 0.98,1 0.95,1 L 0.05,1 C 0.02,1 0,0.98 0,0.95 Z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
