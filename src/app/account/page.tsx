'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen bg-[#F5F4F0]">
      
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-40 block mb-2">Guest Account</span>
      <h1 className="text-4xl font-display font-medium text-void-charcoal mb-12 border-b border-void-bone pb-6">Dashboard / Profile</h1>

      {/* Profile Dashboard Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`dashboard-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
        >
          01 / Details
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`dashboard-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
        >
          02 / Orders (0)
        </button>
        <button 
          onClick={() => setActiveTab('addresses')}
          className={`dashboard-tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
        >
          03 / Addresses
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-void-white/40 border border-void-bone p-8 rounded-3xl min-h-[30vh]">
        
        {activeTab === 'profile' && (
          <div className="flex flex-col gap-6 animate-fade-in text-void-charcoal">
            <h3 className="font-display text-2xl font-normal mb-2">Profile Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs uppercase tracking-wider">
              <div className="flex flex-col border-b border-void-bone/60 pb-3">
                <span className="opacity-50 text-[10px] mb-1">Session Status</span>
                <span className="font-semibold">Guest Session</span>
              </div>
              <div className="flex flex-col border-b border-void-bone/60 pb-3">
                <span className="opacity-50 text-[10px] mb-1">Account Email</span>
                <span className="font-semibold text-lowercase">guest@atmwear.com</span>
              </div>
              <div className="flex flex-col border-b border-void-bone/60 pb-3">
                <span className="opacity-50 text-[10px] mb-1">Default Currency</span>
                <span className="font-semibold">₦ (NGN)</span>
              </div>
              <div className="flex flex-col border-b border-void-bone/60 pb-3">
                <span className="opacity-50 text-[10px] mb-1">Preferred Size</span>
                <span className="font-semibold">Unisex M</span>
              </div>
            </div>
            
            <p className="text-xs text-void-ash font-light leading-relaxed mt-4">
              * ATM Wear guest sessions are kept active in your browser cookies. Register an account upon checkout to receive persistent cloud-saving profiles.
            </p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="flex flex-col gap-6 animate-fade-in text-void-charcoal text-center py-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-void-ash mb-2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h3 className="font-display text-xl font-normal">No Orders Placed</h3>
            <p className="font-mono text-xs opacity-50 uppercase tracking-widest max-w-xs mx-auto">
              Your guest account has no order transactions recorded yet.
            </p>
            <Link href="/shop" className="btn-primary mt-6 mx-auto">
              Browse Shop Catalog
            </Link>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="flex flex-col gap-6 animate-fade-in text-void-charcoal">
            <h3 className="font-display text-2xl font-normal mb-2">Addresses</h3>
            
            <div className="p-6 border border-dashed border-void-bone rounded-2xl text-center py-12 bg-void-bone/10">
              <p className="font-mono text-xs opacity-50 uppercase tracking-widest mb-4">No addresses saved.</p>
              <button className="btn-ghost py-2.5 px-6 font-mono text-[10px] uppercase tracking-widest">
                + Add Address
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Return CTA */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/" className="font-mono text-xs opacity-50 hover:opacity-100 transition-opacity">
          ← Back to Homepage
        </Link>
      </div>

    </div>
  );
}
