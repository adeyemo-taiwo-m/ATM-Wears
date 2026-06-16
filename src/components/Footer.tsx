'use client';

import React from 'react';
import Link from 'next/link';
import { CONFIG } from '@/data/config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-logo">{CONFIG.brandName}</p>
            <p className="footer-tagline">{CONFIG.tagline}</p>
          </div>
          <nav className="footer-nav">
            <div className="footer-col">
              <p className="footer-col-title">Shop</p>
              {CONFIG.footerLinks.shop.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Info</p>
              {CONFIG.footerLinks.info.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Help</p>
              {CONFIG.footerLinks.help.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {currentYear} {CONFIG.brandName}. All rights reserved.</p>
          <p>Built with intention.</p>
        </div>
      </div>
    </footer>
  );
};
