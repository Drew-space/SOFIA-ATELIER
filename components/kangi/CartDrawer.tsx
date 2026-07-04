"use client";
import Image from "next/image";

import { useCart } from "@/providers/CartContext";
import { buildWhatsAppURL } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice } =
    useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppURL(items);
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={closeCart} />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{
          background: "var(--white)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "rgba(0,0,0,0.1)" }}
        >
          <span className="font-display text-xl tracking-widest">
            YOUR BAG ({items.reduce((s, i) => s + i.quantity, 0)})
          </span>
          <button
            onClick={closeCart}
            className="font-display text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            Close ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p
                className="font-display text-4xl tracking-wide"
                style={{ color: "var(--muted)" }}
              >
                YOUR BAG IS EMPTY
              </p>
              <p
                className="text-sm tracking-wide"
                style={{ color: "var(--muted)" }}
              >
                Add something beautiful.
              </p>
              <button
                onClick={closeCart}
                className="font-display text-xs tracking-widest uppercase px-8 py-3 mt-4"
                style={{ background: "var(--black)", color: "var(--white)" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4">
                <div className="relative w-24 h-28 flex-shrink-0 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center top" }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <p className="font-display tracking-wide text-sm leading-tight">
                      {item.name}
                    </p>
                    <p
                      className="text-xs mt-1 tracking-wide"
                      style={{ color: "var(--muted)" }}
                    >
                      Size: {item.size}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* Qty controls */}
                    <div
                      className="flex items-center border"
                      style={{ borderColor: "rgba(0,0,0,0.15)" }}
                    >
                      <button
                        onClick={() =>
                          updateQty(item.id, item.size, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-sm font-display"
                        style={{ color: "var(--muted)" }}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-display">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.id, item.size, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-sm font-display"
                        style={{ color: "var(--muted)" }}
                      >
                        +
                      </button>
                    </div>
                    {/* Price & remove */}
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm tracking-wide">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-6 border-t space-y-4"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            <div className="flex justify-between items-center">
              <span className="font-display text-sm tracking-widest uppercase">
                Subtotal
              </span>
              <span className="font-display text-lg tracking-wide">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <p
              className="text-[11px] tracking-wide"
              style={{ color: "var(--muted)" }}
            >
              Shipping calculated on WhatsApp confirmation.
            </p>
            <button
              onClick={handleCheckout}
              className="w-full font-display text-sm tracking-widest uppercase py-4 flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
              style={{ background: "var(--black)", color: "var(--white)" }}
            >
              {/* WhatsApp icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
