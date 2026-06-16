'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (desktops)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
    };

    window.addEventListener('mousemove', onMouseMove);

    const tickerUpdate = () => {
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      gsap.set(follower, { x: followerX, y: followerY });
    };

    gsap.ticker.add(tickerUpdate);

    // Attach hover effects to current interactive elements
    const attachListeners = (elements: NodeListOf<Element> | Element[]) => {
      elements.forEach((el) => {
        // Skip if already attached to avoid multiple listeners
        if (el.getAttribute('data-cursor-attached') === 'true') return;
        el.setAttribute('data-cursor-attached', 'true');

        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover');
        });
      });
    };

    const updateHoverStates = () => {
      const targets = document.querySelectorAll('a, button, [data-cursor]');
      attachListeners(Array.from(targets));
    };

    updateHoverStates();

    // Use MutationObserver to track DOM insertions and attach hover states
    const observer = new MutationObserver((mutations) => {
      let addedElements: Element[] = [];
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches('a, button, [data-cursor]')) {
              addedElements.push(node);
            }
            addedElements.push(...Array.from(node.querySelectorAll('a, button, [data-cursor]')));
          }
        });
      });
      if (addedElements.length > 0) {
        attachListeners(addedElements);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(tickerUpdate);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="cursor" aria-hidden="true" />
      <div ref={followerRef} id="cursor-follower" aria-hidden="true" />
    </>
  );
};
