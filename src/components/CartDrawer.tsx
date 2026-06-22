'use client';

import React, { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQty } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      // Animate overlay in
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      // Animate drawer in
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      // Animate overlay out
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      // Animate drawer out
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isCartOpen]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div
        ref={overlayRef}
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <span className="cart-title">Cart</span>
          <button onClick={closeCart} aria-label="Close cart">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-name font-medium">{item.name}</p>
                  <p className="cart-item-meta text-[11px] uppercase tracking-wide">
                    Size: {item.size}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="w-6 h-6 border border-void-bone flex items-center justify-center text-xs hover:border-void-charcoal hover:bg-void-bone transition-all font-mono active:scale-95"
                      onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs w-6 text-center text-void-charcoal font-medium">{item.qty}</span>
                    <button
                      className="w-6 h-6 border border-void-bone flex items-center justify-center text-xs hover:border-void-charcoal hover:bg-void-bone transition-all font-mono active:scale-95"
                      onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-price text-void-charcoal font-semibold mt-1">
                    ₦{(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
                <button
                  className="cart-item-remove text-xl"
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <Link href="/cart" className="btn-primary btn-full" onClick={closeCart}>
              Checkout
            </Link>
            <p className="cart-note">Free shipping on orders over ₦50,000</p>
          </div>
        )}
      </aside>
    </>
  );
};
