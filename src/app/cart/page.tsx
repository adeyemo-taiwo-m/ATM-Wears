'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQty } = useCart();
  const [activeTab, setActiveTab] = useState<'details' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'apple'>('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [promoInput, setPromoInput] = useState('');
  const [discount, setDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  // Success screen cached details
  const [purchasedItems, setPurchasedItems] = useState<typeof cartItems>([]);
  const [orderId, setOrderId] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = discount ? Math.round(subtotal * (discount.percent / 100)) : 0;
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 5000;
  const total = subtotal - discountAmount + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'cardNumber') {
      value = formatCardNumber(value).slice(0, 19);
    } else if (name === 'expiry') {
      value = formatExpiry(value).slice(0, 5);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length > 0 ? parts.join(' ') : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0123456789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPromo = () => {
    setPromoError(null);
    const code = promoInput.toUpperCase().trim();
    if (code === 'NOTHINGEXTRA') {
      setDiscount({ code, percent: 15 });
    } else if (code === 'ATM10') {
      setDiscount({ code, percent: 10 });
    } else if (code === '') {
      setPromoError('Please enter a code');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const removePromo = () => {
    setDiscount(null);
    setPromoInput('');
    setPromoError(null);
  };

  const handleNextStep = (e: React.MouseEvent) => {
    const form = (e.target as HTMLElement).closest('form');
    if (form) {
      // Temporarily disable payment validation to check shipping details
      const cardInputs = form.querySelectorAll(
        '[name="cardNumber"], [name="cardName"], [name="expiry"], [name="cvv"]'
      ) as NodeListOf<HTMLInputElement>;
      cardInputs.forEach((input) => {
        input.required = false;
      });

      const isShippingValid = form.checkValidity();
      if (isShippingValid) {
        setActiveTab('payment');
      } else {
        form.reportValidity();
      }

      // Re-enable payment validation if necessary
      if (paymentMethod === 'card') {
        cardInputs.forEach((input) => {
          input.required = true;
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setPurchasedItems([...cartItems]);
    setOrderTotal(total);
    setOrderId(`ATM-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`);
    setCheckedOut(true);
    clearCart();
  };

  if (checkedOut) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen bg-[#F5F4F0] flex flex-col justify-start">
        <div className="bg-void-white border border-void-bone p-8 md:p-12 rounded-3xl shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 bg-void-charcoal text-void-white rounded-full flex items-center justify-center font-display text-2xl mb-6 active:scale-95 transition-transform cursor-pointer">
            ✓
          </div>
          <h1 className="text-3xl md:text-4xl font-display mb-2 text-void-charcoal font-medium text-center">
            Order Confirmed
          </h1>
          <p className="font-mono text-xs opacity-50 uppercase tracking-widest mb-10 text-center">
            Thank you for shopping ATM Wear.
          </p>

          <div className="w-full border-t border-b border-void-bone py-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-[11px] uppercase tracking-wider text-void-charcoal">
            <div>
              <span className="text-void-ash block mb-1">Order ID</span>
              <span className="font-semibold">{orderId}</span>
            </div>
            <div>
              <span className="text-void-ash block mb-1">Date</span>
              <span className="font-semibold">
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div>
              <span className="text-void-ash block mb-1">Total Paid</span>
              <span className="font-semibold">₦{orderTotal.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-void-ash block mb-1">Delivery Estimate</span>
              <span className="font-semibold text-void-accent">3–5 Business Days</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 mb-8">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-void-ash">
              Items Purchased ({purchasedItems.length})
            </h3>
            <div className="flex flex-col gap-4">
              {purchasedItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 items-center pb-4 border-b border-void-bone/50 last:border-b-0"
                >
                  <div className="w-12 h-16 bg-void-bone overflow-hidden rounded-lg flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-semibold text-void-charcoal">{item.name}</h4>
                    <p className="font-mono text-[9px] opacity-50 uppercase mt-0.5">
                      Size: {item.size} · Qty: {item.qty}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-semibold text-void-charcoal">
                      ₦{(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-void-bone/35 border border-void-bone p-6 rounded-2xl font-mono text-[11px] leading-relaxed text-void-charcoal mb-10">
            <span className="font-bold uppercase tracking-wider block mb-2 text-[10px] text-void-ash">
              Shipping Address
            </span>
            <p className="font-medium">{formData.name}</p>
            <p className="opacity-70 mt-1">{formData.address}</p>
            <p className="opacity-70">
              {formData.city}, {formData.postalCode}
            </p>
            <p className="opacity-70">Phone: {formData.phone}</p>
            <p className="opacity-70 mt-2">Confirmation receipt sent to: {formData.email}</p>
          </div>

          <Link href="/shop" className="btn-primary px-10 py-4 font-mono tracking-widest text-xs">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen bg-[#F5F4F0]">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-40 block mb-2">
        Checkout Flow
      </span>
      <h1 className="text-4xl font-display font-medium text-void-charcoal mb-12 border-b border-void-bone pb-6">
        Shopping Bag
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-void-bone rounded-3xl flex flex-col items-center justify-center bg-void-bone/10 animate-fade-in">
          <p className="font-mono text-sm opacity-50 mb-8">Your cart is currently empty.</p>
          <Link href="/shop" className="btn-primary px-8 py-4">
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: checkout process & items list */}
          <div className="w-full lg:w-3/5 flex flex-col gap-12">
            {/* Bag Items list */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-void-ash mb-2">
                Garments ({cartItems.length})
              </span>
              <div className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-6 pb-6 border-b border-void-bone items-center relative group animate-fade-in"
                  >
                    <div className="w-20 h-28 bg-void-bone overflow-hidden rounded-xl flex-shrink-0 relative shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-void-ash">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-medium text-void-charcoal mt-0.5">{item.name}</h3>
                      <p className="font-mono text-[10px] opacity-50 mt-1 uppercase">
                        Size: {item.size}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          className="w-6 h-6 border border-void-bone flex items-center justify-center text-xs hover:border-void-charcoal hover:bg-void-bone transition-all font-mono active:scale-90"
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                        >
                          -
                        </button>
                        <span className="font-mono text-xs w-6 text-center">{item.qty}</span>
                        <button
                          type="button"
                          className="w-6 h-6 border border-void-bone flex items-center justify-center text-xs hover:border-void-charcoal hover:bg-void-bone transition-all font-mono active:scale-90"
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between self-stretch py-1">
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="font-mono text-xs opacity-35 hover:opacity-100 hover:text-red-500 cursor-pointer transition-all active:scale-95"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                      <p className="font-mono text-xs font-semibold text-void-charcoal">
                        ₦{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing details form */}
            <div className="border-t border-void-bone pt-8">
              {/* Checkout Progress Tabs */}
              <div className="flex border-b border-void-bone/50 mb-8 font-mono text-xs uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 pb-4 text-center border-b-2 transition-all ${
                    activeTab === 'details'
                      ? 'border-void-charcoal text-void-charcoal font-semibold'
                      : 'border-transparent text-void-ash'
                  }`}
                >
                  01 / Shipping Details
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={`flex-1 pb-4 text-center border-b-2 transition-all ${
                    activeTab === 'payment'
                      ? 'border-void-charcoal text-void-charcoal font-semibold'
                      : 'border-transparent text-void-ash'
                  }`}
                >
                  02 / Payment Methods
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Tab 1: Details */}
                {activeTab === 'details' && (
                  <div className="flex flex-col gap-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                          placeholder="Full Name"
                        />
                        <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                          Full Name
                        </label>
                      </div>

                      <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                          placeholder="Email Address"
                        />
                        <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                          Email Address
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                          placeholder="Phone Number"
                        />
                        <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                          Phone Number
                        </label>
                      </div>

                      <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                        <input
                          required
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                          placeholder="Delivery Address"
                        />
                        <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                          Delivery Address
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                          placeholder="City"
                        />
                        <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                          City
                        </label>
                      </div>

                      <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                        <input
                          required
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                          placeholder="Postal Code"
                        />
                        <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                          Postal Code
                        </label>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn-primary py-4 text-xs font-mono uppercase tracking-widest w-full md:w-auto"
                      >
                        Continue to Payment &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 2: Payment */}
                {activeTab === 'payment' && (
                  <div className="flex flex-col gap-6 animate-fade-in">
                    {/* Method Selector Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-void-charcoal bg-void-bone/35 scale-[1.02]'
                            : 'border-void-bone hover:border-void-ash bg-transparent'
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-wider">Card</span>
                      </div>
                      <div
                        onClick={() => setPaymentMethod('transfer')}
                        className={`border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'transfer'
                            ? 'border-void-charcoal bg-void-bone/35 scale-[1.02]'
                            : 'border-void-bone hover:border-void-ash bg-transparent'
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-wider">
                          Transfer
                        </span>
                      </div>
                      <div
                        onClick={() => setPaymentMethod('apple')}
                        className={`border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'apple'
                            ? 'border-void-charcoal bg-void-bone/35 scale-[1.02]'
                            : 'border-void-bone hover:border-void-ash bg-transparent'
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-wider">
                          Pay Mock
                        </span>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="flex flex-col gap-6">
                        {/* Dynamic Mock Credit Card Preview */}
                        <div className="relative w-full max-w-sm aspect-[1.586/1] bg-gradient-to-tr from-void-charcoal to-[#2D2D2A] text-void-white p-6 rounded-2xl shadow-md flex flex-col justify-between mb-2 overflow-hidden font-mono mx-auto transition-all">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-void-accent/10 rounded-full blur-2xl -mr-12 -mt-12" />
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-8 bg-void-accent/25 rounded-md border border-void-accent/20 flex items-center justify-center">
                              <div className="w-6 h-4 border border-void-accent/20 rounded-sm" />
                            </div>
                            <div className="text-right text-[10px] uppercase tracking-widest font-bold text-void-accent">
                              ATM Premium
                            </div>
                          </div>
                          <div className="text-lg md:text-xl tracking-[0.15em] font-medium my-4">
                            {formData.cardNumber || '•••• •••• •••• ••••'}
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-[7px] uppercase tracking-wider opacity-45 mb-0.5">
                                Card Holder
                              </div>
                              <div className="text-xs uppercase tracking-widest truncate max-w-[180px]">
                                {formData.cardName || 'NAME SURNAME'}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[7px] uppercase tracking-wider opacity-45 mb-0.5">
                                Expires
                              </div>
                              <div className="text-xs tracking-wider">{formData.expiry || 'MM/YY'}</div>
                            </div>
                          </div>
                        </div>

                        {/* Card fields */}
                        <div className="flex flex-col gap-5">
                          <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                            <input
                              required={paymentMethod === 'card'}
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                              placeholder="Cardholder Name"
                            />
                            <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                              Cardholder Name
                            </label>
                          </div>

                          <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                            <input
                              required={paymentMethod === 'card'}
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                              placeholder="Card Number"
                            />
                            <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                              Card Number
                            </label>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                              <input
                                required={paymentMethod === 'card'}
                                type="text"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleInputChange}
                                className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                                placeholder="MM/YY"
                              />
                              <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                                Expiry Date
                              </label>
                            </div>

                            <div className="relative border-b border-void-ash/40 py-2 focus-within:border-void-charcoal transition-colors">
                              <input
                                required={paymentMethod === 'card'}
                                type="password"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="peer w-full bg-transparent py-1 text-sm outline-none placeholder-transparent text-void-charcoal font-body"
                                placeholder="CVV"
                              />
                              <label className="absolute left-0 top-1 text-[11px] uppercase tracking-wider text-void-ash transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-void-charcoal pointer-events-none">
                                CVV
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'transfer' && (
                      <div className="bg-void-bone/35 border border-void-bone p-6 rounded-2xl flex flex-col gap-4 font-mono text-xs text-void-charcoal animate-fade-in">
                        <div className="flex justify-between items-center pb-2 border-b border-void-bone/50">
                          <span className="text-void-ash uppercase text-[9px]">Bank Name</span>
                          <span className="font-semibold uppercase">ATM Wear Bank PLC</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-void-bone/50">
                          <span className="text-void-ash uppercase text-[9px]">Account Name</span>
                          <span className="font-semibold uppercase">ATM WEARS LTD</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-void-bone/50">
                          <span className="text-void-ash uppercase text-[9px]">Account Number</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">0123456789</span>
                            <button
                              type="button"
                              onClick={handleCopyAccount}
                              className="px-2 py-1 bg-void-charcoal text-void-white hover:bg-void-accent hover:text-void-charcoal transition-all text-[10px] uppercase font-bold active:scale-95"
                            >
                              {copied ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                        <div className="text-[10px] text-void-ash leading-relaxed mt-2 uppercase tracking-wide">
                          * Please complete your transfer and click the &quot;Pay &amp; Place Order&quot;
                          button below. We will verify the transaction against your email address.
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'apple' && (
                      <div className="bg-void-bone/35 border border-void-bone p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
                        <div className="w-12 h-12 rounded-full bg-void-charcoal flex items-center justify-center text-void-white">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <rect x="5" y="2" width="14" height="20" rx="2" />
                            <line x1="12" y1="18" x2="12" y2="18.01" />
                          </svg>
                        </div>
                        <p className="font-mono text-xs uppercase tracking-wider text-void-charcoal">
                          Secure Sandbox Wallet Checkout
                        </p>
                        <p className="text-[11px] text-void-ash leading-relaxed max-w-xs uppercase tracking-wide">
                          Proceeding will mock payment approval using pre-configured device wallets.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setActiveTab('details')}
                        className="btn-ghost w-1/2 py-4 text-xs font-mono uppercase tracking-widest"
                      >
                        &larr; Back Details
                      </button>
                      <button
                        type="submit"
                        className="btn-primary w-1/2 py-4 text-xs font-mono uppercase tracking-widest"
                      >
                        Pay &amp; Place Order
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Side: Order Summary Sidebar */}
          <div className="w-full lg:w-2/5 bg-void-white/40 border border-void-bone p-8 rounded-3xl sticky top-24">
            <h2 className="text-2xl font-display font-medium text-void-charcoal mb-6">
              Order Summary
            </h2>

            {/* Promo Code section */}
            <div className="mb-6 pb-6 border-b border-void-bone">
              <span className="font-mono text-[10px] uppercase tracking-widest text-void-ash block mb-2">
                Discount Code
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. NOTHINGEXTRA"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoError(null);
                  }}
                  className="bg-void-bone/35 border border-void-bone text-void-charcoal px-3 py-2 text-xs font-mono w-full uppercase outline-none focus:border-void-charcoal transition-colors rounded-lg"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="px-4 py-2 bg-void-charcoal text-void-white hover:bg-void-accent hover:text-void-charcoal text-xs uppercase tracking-widest font-mono transition-colors active:scale-95 rounded-lg"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-red-500 font-mono text-[10px] mt-1.5">{promoError}</p>}
              {discount && (
                <div className="mt-2.5 flex items-center justify-between bg-void-accent/20 border border-void-accent/35 py-1.5 px-3 rounded-lg font-mono text-[10px]">
                  <span className="text-void-charcoal font-bold">
                    CODE: {discount.code} ({discount.percent}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-void-charcoal font-bold opacity-60 hover:opacity-100 ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-wider mb-6 pb-6 border-b border-void-bone">
              <div className="flex justify-between">
                <span className="opacity-50">Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              {discount && (
                <div className="flex justify-between text-void-accent font-semibold">
                  <span>Discount</span>
                  <span>-₦{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="opacity-50">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-void-bone/50 text-void-charcoal">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 bg-void-bone/20 border border-void-bone/50 rounded-2xl font-light text-[11px] leading-relaxed text-void-charcoal/80 flex flex-col gap-3">
              <div>
                <span className="font-semibold block mb-0.5">Carbon Neutral Shipping</span>
                ATM Wear guarantees deadstock packaging materials and carbon offset delivery for every local order.
              </div>
              <div>
                <span className="font-semibold block mb-0.5">Delivery Time</span>
                Delivery inside Nigeria takes 3–5 working days. Returns accepted within 7 days.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
