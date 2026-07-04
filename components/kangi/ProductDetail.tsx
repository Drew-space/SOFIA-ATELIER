"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { useCart } from "@/providers/CartContext";

type Product = {
  _id: string;
  slug: string;
  name: string;
  price: number;
  category: string | null;
  tag?: string;
  description: string;
  details: string[];
  sizes: string[];
  images: string[];
};

type Props = { product: Product };

export default function ProductDetail({ product }: Props) {
  // ...everything else in this file stays exactly the same
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      id: product._id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="px-6 md:px-12 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 font-display text-[11px] tracking-widest uppercase mb-10"
        style={{ color: "var(--muted)" }}
      >
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/${product.category}`}
          className="hover:text-black transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: "var(--black)" }}>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* ── Images ── */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 w-16 flex-shrink-0">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className="relative w-16 h-20 overflow-hidden flex-shrink-0 transition-opacity"
                style={{
                  opacity: selectedImage === i ? 1 : 0.45,
                  outline:
                    selectedImage === i ? `1.5px solid var(--black)` : "none",
                  outlineOffset: "2px",
                }}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative flex-1 h-[70vh] md:h-[80vh] overflow-hidden bg-gray-100">
            {product.tag && (
              <span
                className="absolute top-4 left-4 z-10 font-display text-[10px] tracking-widest uppercase px-3 py-1"
                style={{ background: "var(--black)", color: "var(--stone)" }}
              >
                {product.tag}
              </span>
            )}
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500"
              style={{ objectPosition: "center top" }}
              priority
            />
          </div>
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col justify-start pt-2">
          <p
            className="font-display text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "var(--muted)" }}
          >
            SOFIA ATELIER / {product.category}
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-wide leading-tight mb-4">
            {product.name}
          </h1>
          <p className="font-display text-2xl tracking-widest mb-8">
            ${product.price.toLocaleString()}
          </p>

          <p
            className="text-sm leading-relaxed tracking-wide mb-8"
            style={{ color: "var(--muted)" }}
          >
            {product.description}
          </p>

          {/* Size selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-xs tracking-widest uppercase">
                Size{" "}
                {selectedSize && (
                  <span style={{ color: "var(--stone)" }}>
                    — {selectedSize}
                  </span>
                )}
              </span>
              <button
                className="font-display text-[10px] tracking-widest uppercase underline underline-offset-4"
                style={{ color: "var(--muted)" }}
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className="font-display text-xs tracking-widest uppercase px-4 py-2.5 border transition-all duration-200"
                  style={{
                    background:
                      selectedSize === size ? "var(--black)" : "transparent",
                    color:
                      selectedSize === size ? "var(--white)" : "var(--black)",
                    borderColor:
                      selectedSize === size
                        ? "var(--black)"
                        : "rgba(0,0,0,0.2)",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p
                className="font-display text-[11px] tracking-widest uppercase mt-2"
                style={{ color: "#c0392b" }}
              >
                Please select a size
              </p>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full font-display text-sm tracking-widest uppercase py-4 mb-4 transition-all duration-300"
            style={{
              background: added ? "var(--stone)" : "var(--black)",
              color: "var(--white)",
            }}
          >
            {added ? "Added to Bag ✓" : "Add to Bag"}
          </button>

          {/* Direct WhatsApp buy */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(
              `Hi! I'd like to order:\n• ${product.name}\n• Size: ${selectedSize || "[Please specify size]"}\n• Price: $${product.price.toLocaleString()}\n• Product image: ${product.images[0]}\n\nPlease confirm availability. Thank you!`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full font-display text-sm tracking-widest uppercase py-4 mb-8 border flex items-center justify-center gap-3 transition-colors hover:bg-black hover:text-white hover:border-black"
            style={{ borderColor: "rgba(0,0,0,0.2)", color: "var(--black)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Buy Now via WhatsApp
          </a>

          {/* Product details accordion */}
          <div
            className="border-t pt-6 space-y-2"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            <p className="font-display text-xs tracking-widest uppercase mb-4">
              Product Details
            </p>
            <ul className="space-y-2">
              {product.details.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-sm tracking-wide"
                  style={{ color: "var(--muted)" }}
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--stone)" }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping note */}
          <div
            className="mt-8 p-4 border flex items-start gap-3"
            style={{
              borderColor: "rgba(0,0,0,0.1)",
              background: "rgba(200,184,154,0.08)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mt-0.5 flex-shrink-0"
              style={{ color: "var(--stone)" }}
            >
              <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
            <p
              className="text-[11px] tracking-wide leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Orders are confirmed via WhatsApp. Shipping details and timelines
              will be communicated after order confirmation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
