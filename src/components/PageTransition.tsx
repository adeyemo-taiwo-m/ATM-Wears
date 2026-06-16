'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const isNavigating = useRef(false);

  // Play entry transition when page (pathname) changes
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    // Reset navigation lock
    isNavigating.current = false;

    // Entry animation: slide up curtain (reveal content)
    gsap.fromTo(
      curtain,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.7,
        ease: 'power3.inOut',
        delay: 0.1,
      }
    );
  }, [pathname]);

  // Intercept all internal link clicks to trigger exit transition
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Skip external links, hashes, etc.
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target.getAttribute('target') === '_blank'
      ) {
        return;
      }

      // Check if it's the current pathname
      if (href === pathname) {
        e.preventDefault();
        return;
      }

      // Prevent default navigation temporarily
      e.preventDefault();

      // If already navigating, do nothing
      if (isNavigating.current) return;
      isNavigating.current = true;

      const curtain = curtainRef.current;
      if (curtain) {
        // Exit animation: slide curtain down (cover content)
        gsap.fromTo(
          curtain,
          { scaleY: 0, transformOrigin: 'bottom' },
          {
            scaleY: 1,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
              router.push(href);
            },
          }
        );
      } else {
        router.push(href);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router, pathname]);

  return (
    <>
      <div ref={curtainRef} id="page-curtain" />
      {children}
    </>
  );
};
