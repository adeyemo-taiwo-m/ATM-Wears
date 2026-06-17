'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<'details' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'apple'>('card');
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
      <div className="pt-32 pb-24 px-6 max-w-xl mx-auto text-center min-h-[70vh] flex flex-col justify-center items-center bg-[#F5F4F0]">
        <div className="w-16 h-16 bg-void-charcoal text-void-white rounded-full flex items-center justify-center font-display text-2xl mb-6 shadow-md">
          ✓
        </div>
        <h1 className="text-3xl font-display mb-4 text-void-charcoal font-medium">Order Confirmed</h1>
        <p className="font-mono text-xs opacity-50 uppercase tracking-wider mb-8 max-w-xs leading-relaxed">
          Thank you for shopping ATM Wear. We have sent a receipt to {formData.email}.
        </p>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen bg-[#F5F4F0]">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-40 block mb-2">Checkout Flow</span>
      <h1 className="text-4xl font-display font-medium text-void-charcoal mb-12 border-b border-void-bone pb-6">Shopping Bag</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-void-bone rounded-3xl flex flex-col items-center justify-center bg-void-bone/10">
          <p className="font-mono text-sm opacity-50 mb-8">Your cart is currently empty.</p>
          <Link href="/shop" className="btn-primary">
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: checkout process & items list */}
          <div className="w-full lg:w-3/5 flex flex-col gap-12">
            
            {/* Bag Items list */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-void-ash mb-2">Garments ({cartItems.length})</span>
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-6 pb-6 border-b border-void-bone items-center relative group"
                >
                  <div className="w-20 h-28 bg-void-bone overflow-hidden rounded-xl flex-shrink-0 relative shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-normal text-void-charcoal">{item.name}</h3>
                    <p className="font-mono text-[10px] opacity-50 mt-1.5 uppercase">
                      Size: {item.size} · Qty: {item.qty}
                    </p>
                    <p className="font-mono text-xs mt-3 text-void-charcoal">₦{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="font-mono text-xl opacity-35 hover:opacity-100 px-3 py-1 cursor-pointer transition-opacity"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Billing details form */}
            <div className="border-t border-void-bone pt-8">
              
              {/* Checkout Progress Tabs */}
              <div className="dashboard-tabs">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`dashboard-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                >
                  01 / Shipping Details
                </button>
                <button 
                  onClick={() => setActiveTab('payment')}
                  className={`dashboard-tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
                >
                  02 / Payment Methods
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col">
                
                {/* Tab 1: Details */}
                {activeTab === 'details' && (
                  <div className="flex flex-col animate-fade-in">
                    <div className="floating-label-input-container">
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder=" "
                        value={formData.name}
                        onChange={handleInputChange}
                        className="floating-input"
                      />
                      <label className="floating-label">Full Name</label>
                    </div>

                    <div className="floating-label-input-container">
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder=" "
                        value={formData.email}
                        onChange={handleInputChange}
                        className="floating-input"
                      />
                      <label className="floating-label">Email Address</label>
                    </div>

                    <div className="floating-label-input-container">
                      <input
                        required
                        type="text"
                        name="address"
                        placeholder=" "
                        value={formData.address}
                        onChange={handleInputChange}
                        className="floating-input"
                      />
                      <label className="floating-label">Delivery Address</label>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setActiveTab('payment')}
                      className="btn-primary py-4 text-xs font-mono uppercase tracking-widest mt-4 w-full md:w-fit"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                )}

                {/* Tab 2: Payment */}
                {activeTab === 'payment' && (
                  <div className="flex flex-col animate-fade-in">
                    
                    {/* Method Selector Cards */}
                    <div className="payment-methods-grid">
                      <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`payment-method-card rounded-xl ${paymentMethod === 'card' ? 'active' : ''}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        Card
                      </div>
                      <div 
                        onClick={() => setPaymentMethod('transfer')}
                        className={`payment-method-card rounded-xl ${paymentMethod === 'transfer' ? 'active' : ''}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Transfer
                      </div>
                      <div 
                        onClick={() => setPaymentMethod('apple')}
                        className={`payment-method-card rounded-xl ${paymentMethod === 'apple' ? 'active' : ''}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        Pay Mock
                      </div>
                    </div>

                    {paymentMethod === 'card' ? (
                      <div className="flex flex-col gap-4">
                        <div className="floating-label-input-container">
                          <input
                            required
                            type="text"
                            name="cardNumber"
                            placeholder=" "
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="floating-input"
                          />
                          <label className="floating-label">Card Number</label>
                        </div>
                        <div className="flex gap-4">
                          <div className="floating-label-input-container w-1/2">
                            <input
                              required
                              type="text"
                              name="expiry"
                              placeholder=" "
                              value={formData.expiry}
                              onChange={handleInputChange}
                              className="floating-input"
                            />
                            <label className="floating-label">MM/YY</label>
                          </div>
                          <div className="floating-label-input-container w-1/2">
                            <input
                              required
                              type="text"
                              name="cvv"
                              placeholder=" "
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className="floating-input"
                            />
                            <label className="floating-label">CVV</label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 px-4 bg-void-bone/35 border border-void-bone rounded-2xl mb-6 font-mono text-[11px] leading-relaxed text-void-charcoal">
                        {paymentMethod === 'transfer' ? (
                          <p>
                            MOCK BANK TRANSFER DETAILS:<br />
                            Bank: ATM Wear Bank PLC<br />
                            Account: 0123456789<br />
                            Instruction: Place your order, make transfer, and upload confirmation on guest portal.
                          </p>
                        ) : (
                          <p>
                            MOCK SECURE GATEWAY CHECKOUT:<br />
                            Simulating secure payments via mobile device checkout systems. Click Pay to place mock order.
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-4 mt-6">
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('details')}
                        className="btn-ghost py-4 text-xs font-mono uppercase tracking-widest w-1/2"
                      >
                        ← Back Details
                      </button>
                      <button 
                        type="submit" 
                        className="btn-primary py-4 text-xs font-mono uppercase tracking-widest w-1/2"
                      >
                        Pay & Place Order
                      </button>
                    </div>

                  </div>
                )}

              </form>

            </div>

          </div>

          {/* Right Side: Order Summary Sidebar */}
          <div className="w-full lg:w-2/5 bg-void-white/40 border border-void-bone p-8 rounded-3xl sticky top-24">
            <h2 className="text-2xl font-display font-medium text-void-charcoal mb-6">Order Summary</h2>

            <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-wider mb-6 pb-6 border-b border-void-bone">
              <div className="flex justify-between">
                <span className="opacity-50">Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-void-bone/50 text-void-charcoal">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 bg-void-bone/20 border border-void-bone/50 rounded-2xl font-light text-[11px] leading-relaxed text-void-charcoal/80">
              <span className="font-semibold block mb-1">Carbon Neutral Shipping</span>
              ATM Wear guarantees deadstock packaging materials and carbon offset delivery for every local order. Delivery inside Nigeria takes 3–5 working days.
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
