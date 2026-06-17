import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "ATM Wear | Genderless Gen Z Minimalist Fashion",
  description: "Genderless Gen Z minimalist fashion. Nothing extra. Just form.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <SmoothScroll>
            <PageTransition>
              <CustomCursor />
              <Navbar />
              <CartDrawer />
              <main className="flex-grow">{children}</main>
              <Footer />
            </PageTransition>
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
