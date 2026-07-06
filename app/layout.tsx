import type { Metadata } from "next";
import "./globals.css";
import CartDrawer from "@/components/kangi/CartDrawer";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import { CartProvider } from "@/providers/CartContext";
export const metadata: Metadata = {
  title: "SOFIA ATELIER — Luxury Fashion House",
  description:
    "Discover timeless collections crafted with elegance, precision, and modern sophistication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConvexClientProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
