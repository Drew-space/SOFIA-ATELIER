"use client";
import { useState } from "react";
import Link from "next/link";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useCart } from "@/providers/CartContext";
type NavLink = { label: string; href: string };

export default function NavbarClient({ links }: { links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-black/10"
        style={{ background: "var(--white)" }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[11px] tracking-widest uppercase font-display flex items-center gap-2"
        >
          <span className="flex flex-col gap-[5px]">
            <span className="block w-5 h-[1.5px] bg-black" />
            <span className="block w-3.5 h-[1.5px] bg-black" />
          </span>
          Menu
        </button>
        <Link
          href="/"
          className="font-display text-base sm:text-lg md:text-2xl tracking-wider md:tracking-widest whitespace-nowrap absolute left-1/2 -translate-x-1/2"
        >
          SOFIA ATELIER
        </Link>
        {/* <Link
          href="/"
          className="font-display text-2xl tracking-widest absolute left-1/2 -translate-x-1/2"
        >
          SOFIA ATELIER
        </Link> */}

        <div className="flex items-center gap-4 text-[11px] tracking-widest uppercase font-display">
          {/* <button>Search</button> */}
          <button onClick={openCart}>Bag ({totalCount})</button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-24 px-10 gap-6"
          style={{ background: "var(--black)" }}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-display text-5xl md:text-7xl tracking-wide border-b border-white/10 pb-4"
              style={{ color: "var(--white)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-8 font-display text-sm tracking-widest uppercase"
            style={{ color: "var(--stone)" }}
          >
            Close ✕
          </button>
        </div>
      )}
    </>
  );
}
