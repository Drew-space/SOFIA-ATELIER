import Image from "next/image";

export default function OfferStrip() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Feature product */}
      <div className="relative h-[80vh] overflow-hidden product-card">
        <Image
          src="/images/wing-1.png"
          // src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
          alt="Feature product"
          fill
          className="object-cover product-img"
          style={{ objectPosition: "center top" }}
        />
        <div className="absolute bottom-8 left-8">
          <p className="font-display text-white text-lg tracking-wide">
            {/*SOFIA ATELIER T-Shirt */}SOFIA ATELIER T-Shirt
          </p>
          <p className="text-white/70 font-display tracking-widest">$1,900</p>
        </div>
      </div>

      {/* Offer card */}
      <div className="relative h-[80vh] overflow-hidden">
        <Image
          src="/images/wing-2.png"
          // src="https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80"
          alt="Exclusive offers"
          fill
          className="object-cover"
          style={{ opacity: 0.7 }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(10,10,10,0.45)" }}
        >
          <div
            className="w-64 p-8 text-center"
            style={{
              background: "rgba(40,36,32,0.92)",
              border: "1px solid rgba(200,184,154,0.3)",
            }}
          >
            <p
              className="font-display text-[10px] tracking-[0.35em] uppercase mb-2"
              style={{ color: "var(--stone)" }}
            >
              {/*SOFIA ATELIER · Offers */} SOFIA ATELIER · Offers
            </p>
            <h3
              className="font-display text-3xl leading-tight mb-6"
              style={{ color: "var(--white)" }}
            >
              Exclusive Fashion Offers Await
            </h3>
            <a
              href="#"
              className="font-display text-xs tracking-widest uppercase px-6 py-2.5 inline-block"
              style={{ background: "var(--stone)", color: "var(--black)" }}
            >
              Explore Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
