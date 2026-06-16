'use client';

import React from 'react';
import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="pt-32 pb-24 px-4 max-w-xl mx-auto text-center min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-display mb-4">Account Profile</h1>
      <div className="border border-void-bone p-8 bg-void-bone/20 w-full mb-8 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-left">
        <div className="flex justify-between border-b border-void-bone/50 pb-2">
          <span className="opacity-50">Status</span>
          <span className="font-semibold text-void-charcoal">Guest Session</span>
        </div>
        <div className="flex justify-between border-b border-void-bone/50 pb-2">
          <span className="opacity-50">Saved Addresses</span>
          <span className="font-semibold text-void-charcoal">None</span>
        </div>
        <div className="flex justify-between border-b border-void-bone/50 pb-2">
          <span className="opacity-50">Order History</span>
          <span className="font-semibold text-void-charcoal">0 Orders</span>
        </div>
      </div>
      <Link href="/shop" className="btn-primary">
        Browse Shop
      </Link>
    </div>
  );
}
