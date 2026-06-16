'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AboutPage() {
  const manifestoTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const pElement = manifestoTextRef.current;
    if (!pElement) return;

    // Split text into words and wrap each in a span
    const text = pElement.textContent || '';
    const words = text.split(/\s+/);
    pElement.innerHTML = words
      .map((word) => `<span class="manifesto-word inline-block mr-2 opacity-10 transition-opacity duration-150">${word}</span>`)
      .join('');

    // GSAP ScrollTrigger to reveal word by word
    const wordSpans = pElement.querySelectorAll('.manifesto-word');
    gsap.fromTo(
      wordSpans,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.04,
        scrollTrigger: {
          trigger: '.manifesto-body',
          start: 'top 75%',
          end: 'bottom 35%',
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <div className="pb-24 min-h-screen">
      {/* Manifesto Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 bg-void-charcoal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/editorial-02.jpg"
            alt="Manifesto Cover"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative text-center text-void-white px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4 opacity-80">Our Manifesto</p>
          <h1 className="text-5xl md:text-7xl font-display font-medium">Built with Intention</h1>
        </div>
      </section>

      {/* Main Manifesto Word-by-Word Scroll Reveal */}
      <section className="manifesto-body max-w-4xl mx-auto px-4 text-center my-32">
        <p
          ref={manifestoTextRef}
          className="text-2xl md:text-4xl font-display leading-relaxed text-void-charcoal"
        >
          We believe garments should not be confined by gender categories. True minimalism is about form, intention, and necessity. We source deadstock Japanese fabrics to eliminate waste and produce in carbon-neutral workshops. No noise. No excess. Just pure form designed for the next generation.
        </p>
      </section>

      {/* Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 my-32">
        <div className="border-t border-void-bone pt-6">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Pillar 01</span>
          <h3 className="text-xl font-display font-medium mb-3">Genderless</h3>
          <p className="text-sm text-void-charcoal/80 leading-relaxed">
            Garments sculpted for humans, not gender roles. Straight lines, dropped silhouettes, and modular fits that adjust to all body forms.
          </p>
        </div>
        <div className="border-t border-void-bone pt-6">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Pillar 02</span>
          <h3 className="text-xl font-display font-medium mb-3">Sustainable</h3>
          <p className="text-sm text-void-charcoal/80 leading-relaxed">
            100% of our production runs utilize deadstock fabrics sourced from Osaka and Osaka mills. Carbon-neutral manufacturing ensures zero waste.
          </p>
        </div>
        <div className="border-t border-void-bone pt-6">
          <span className="font-mono text-xs opacity-50 uppercase tracking-widest block mb-4">Pillar 03</span>
          <h3 className="text-xl font-display font-medium mb-3">Minimal</h3>
          <p className="text-sm text-void-charcoal/80 leading-relaxed">
            Nothing extra. Raw hems, hidden seam pockets, press-stud closures. Every design choice is functional, delivering longevity in style and form.
          </p>
        </div>
      </section>

      {/* Founder / Note Section */}
      <section className="max-w-3xl mx-auto px-4 text-center mt-32 border-t border-void-bone pt-16">
        <p className="font-mono text-xs opacity-50 uppercase tracking-widest mb-6">A Note from ATM Wear</p>
        <p className="text-md text-void-charcoal/70 leading-relaxed italic mb-8">
          &ldquo;We created ATM Wear to serve as an antidote to fast fashion noise. By creating slow, deliberate garments with recycled materials, we aim to respect both the human body and the planet.&rdquo;
        </p>
        <div className="w-16 h-[1px] bg-void-charcoal mx-auto"></div>
      </section>
    </div>
  );
}
