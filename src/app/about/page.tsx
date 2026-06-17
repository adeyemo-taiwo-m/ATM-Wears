'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const manifestoTextRef = useRef<HTMLParagraphElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const pElement = manifestoTextRef.current;
    if (pElement) {
      // Split text into words and wrap each in a span for reveal
      const text = pElement.textContent || '';
      const words = text.split(/\s+/);
      pElement.innerHTML = words
        .map((word) => `<span class="about-reveal-word inline-block mr-2 opacity-15 translate-y-2 transition-all duration-300">${word}</span>`)
        .join('');

      // Reveal word by word on scroll
      const wordSpans = pElement.querySelectorAll('.about-reveal-word');
      gsap.to(wordSpans, {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.manifesto-body',
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      });
    }

    // Parallax on hero image
    if (heroImageRef.current) {
      gsap.fromTo(heroImageRef.current,
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }
  }, []);

  return (
    <div className="pb-32 bg-[#F5F4F0] min-h-screen">
      
      {/* Editorial Hero */}
      <section className="about-hero-section relative h-[85vh] flex items-end overflow-hidden mb-24">
        <div className="absolute inset-0 bg-void-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImageRef}
            src="/assets/images/editorial-02.jpg"
            alt="Manifesto Cover"
            className="w-full h-full object-cover opacity-45 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4F0]/80 via-transparent to-transparent z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="font-mono text-xs uppercase tracking-[0.35em] mb-4 text-void-white opacity-80">Our Manifesto</p>
          <h1 className="text-5xl md:text-8xl font-display font-medium text-void-white leading-tight max-w-3xl">
            Built with <br />
            <span className="italic text-void-accent">Intention.</span>
          </h1>
        </div>
      </section>

      {/* Main Manifesto Word-by-Word Scroll Reveal */}
      <section className="manifesto-body max-w-5xl mx-auto px-6 text-center my-36">
        <p
          ref={manifestoTextRef}
          className="text-2xl md:text-5xl font-display leading-relaxed text-void-charcoal tracking-tight"
        >
          We believe garments should not be confined by gender categories. True minimalism is about form, intention, and necessity. We source deadstock Japanese fabrics to eliminate waste and produce in carbon-neutral workshops. No noise. No excess. Just pure form designed for the next generation.
        </p>
      </section>

      {/* Asymmetrical Pillars Layout */}
      <section className="max-w-7xl mx-auto px-6 my-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Pillar 01 */}
          <div className="md:col-span-4 border-t border-void-ash/40 pt-8 mt-12 md:mt-24">
            <span className="font-mono text-[10px] text-void-ash uppercase tracking-[0.25em] block mb-4">Pillar 01 / Fit</span>
            <h3 className="text-2xl font-display font-normal mb-4 text-void-charcoal">Genderless</h3>
            <p className="text-sm text-void-charcoal/80 leading-relaxed font-light">
              Garments sculpted for humans, not gender roles. Straight lines, dropped silhouettes, and modular fits that adjust seamlessly to all body shapes. We design clothes to liberate rather than confine.
            </p>
          </div>

          {/* Pillar 02 (Offset higher for asymmetrical look) */}
          <div className="md:col-span-4 border-t border-void-ash/40 pt-8">
            <span className="font-mono text-[10px] text-void-ash uppercase tracking-[0.25em] block mb-4">Pillar 02 / Material</span>
            <h3 className="text-2xl font-display font-normal mb-4 text-void-charcoal">Sustainable</h3>
            <p className="text-sm text-void-charcoal/80 leading-relaxed font-light">
              100% of our production runs utilize deadstock fabrics sourced locally and from Japanese mills. Carbon-neutral manufacturing ensures zero waste, respecting the environment and the craft.
            </p>
          </div>

          {/* Pillar 03 */}
          <div className="md:col-span-4 border-t border-void-ash/40 pt-8 mt-12 md:mt-36">
            <span className="font-mono text-[10px] text-void-ash uppercase tracking-[0.25em] block mb-4">Pillar 03 / Aesthetic</span>
            <h3 className="text-2xl font-display font-normal mb-4 text-void-charcoal">Minimal</h3>
            <p className="text-sm text-void-charcoal/80 leading-relaxed font-light">
              Nothing extra. Raw hems, hidden seam pockets, press-stud closures. Every design choice is functional, delivering longevity in style and form. The design speaks in whispers, not screams.
            </p>
          </div>

        </div>
      </section>

      {/* Note from Founder - Split Layout */}
      <section className="max-w-7xl mx-auto px-6 mt-48 border-t border-void-bone pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs text-void-ash uppercase tracking-[0.3em]">A Note from ATM Wear</p>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-void-charcoal leading-tight">
              An antidote <br />
              to fast fashion <br />
              <span className="italic text-void-accent">noise.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <blockquote className="text-xl md:text-2xl text-void-charcoal/80 leading-relaxed italic font-light font-display">
              &ldquo;We created ATM Wear to serve as a quiet statement. By creating slow, deliberate garments with recycled materials, we aim to respect both the human body and the planet. Fashion should be about longevity, not trend cycles.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-void-charcoal"></div>
              <p className="font-mono text-xs uppercase tracking-widest text-void-charcoal">Adeyemo Taiwo M. / Founder</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
