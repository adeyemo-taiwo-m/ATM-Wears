'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [checkedOut, setCheckedOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 5000;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setCheckedOut(true);
    clearCart();
  };

  if (checkedOut) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-xl mx-auto text-center min-h-[60vh] flex flex-col justify-center items-center">
        <span className="text-4xl mb-4">✓</span>
        <h1 className="text-3xl font-display mb-4">Order Confirmed</h1>
        <p className="font-mono text-sm opacity-50 mb-8">
          Thank you for your purchase. We are preparing your order.
        </p>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-display font-medium mb-12">Shopping Bag</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-void-bone flex flex-col items-center">
          <p className="font-mono text-sm opacity-50 mb-8">Your cart is currently empty.</p>
          <Link href="/shop" className="btn-primary">
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Cart Items List */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-6 pb-6 border-b border-void-bone items-center"
              >
                <div className="w-24 h-32 bg-void-bone flex-shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-md font-body font-normal text-void-charcoal">{item.name}</h3>
                  <p className="font-mono text-xs opacity-50 mt-1 uppercase">
                    Size: {item.size} · Qty: {item.qty}
                  </p>
                  <p className="font-mono text-sm mt-3">₦{(item.price * item.qty).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="font-mono text-xl opacity-40 hover:opacity-100 px-2"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Form & Order Summary */}
          <div className="w-full lg:w-2/5 bg-void-bone/30 border border-void-bone p-8">
            <h2 className="text-xl font-display mb-6">Order Summary</h2>

            <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider mb-6 pb-6 border-b border-void-bone">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-void-bone/50 text-void-charcoal">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Shipping Details</h3>
              <input
                required
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-void-white border border-void-ash/40 font-mono text-xs focus:outline-none focus:border-void-charcoal"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-void-white border border-void-ash/40 font-mono text-xs focus:outline-none focus:border-void-charcoal"
              />
              <input
                required
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 bg-void-white border border-void-ash/40 font-mono text-xs focus:outline-none focus:border-void-charcoal"
              />

              <h3 className="font-mono text-xs uppercase tracking-widest opacity-50 mt-4 mb-2">Payment Details</h3>
              <input
                required
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-3 bg-void-white border border-void-ash/40 font-mono text-xs focus:outline-none focus:border-void-charcoal"
              />
              <div className="flex gap-4">
                <input
                  required
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="w-1/2 p-3 bg-void-white border border-void-ash/40 font-mono text-xs focus:outline-none focus:border-void-charcoal"
                />
                <input
                  required
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-1/2 p-3 bg-void-white border border-void-ash/40 font-mono text-xs focus:outline-none focus:border-void-charcoal"
                />
              </div>

              <button type="submit" className="btn-primary btn-full py-4 text-xs font-mono uppercase tracking-widest mt-6">
                Pay & Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
