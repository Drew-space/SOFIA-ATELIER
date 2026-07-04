import Image from "next/image";
import AnnouncementBar from "@/components/kangi/AnnouncementBar";
import Navbar from "@/components/kangi/Navbar";
import Footer from "@/components/kangi/Footer";

export const metadata = {
  title: "About —SOFIA ATELIER",
};

export default function AboutPage() {
  return (
    <main style={{ background: "var(--white)", color: "var(--black)" }}>
      <AnnouncementBar />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[85vh] overflow-hidden flex items-end px-6 md:px-16 pb-16">
        <Image
          src="/images/about.png"
          // src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85"
          alt="About hero"
          fill
          className="object-cover"
          style={{ objectPosition: "center 25%" }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.75) 100%)",
          }}
        />
        <div className="relative z-10 max-w-2xl">
          <p
            className="font-display text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--stone)" }}
          >
            Our Story
          </p>
          <h1
            className="font-display text-6xl md:text-8xl leading-none tracking-wide mb-6"
            style={{ color: "var(--white)" }}
          >
            Built on Restraint.
          </h1>
          <p className="text-white/60 text-sm md:text-base tracking-wide leading-relaxed max-w-lg">
            SOFIA ATELIER was founded on the belief that less — done precisely —
            is everything.
          </p>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="px-6 md:px-16 py-24 max-w-4xl mx-auto">
        <p
          className="font-display text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: "var(--stone)" }}
        >
          Manifesto
        </p>
        <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-wide mb-12">
          We don't follow trends. We make the case for permanence.
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm leading-relaxed tracking-wide"
          style={{ color: "var(--muted)" }}
        >
          <p>
            SOFIA ATELIER is a house built on permanence — in construction, in
            silhouette, and in meaning. We work only with ateliers that share
            our reverence for craft. Every fabric is considered, every seam
            deliberated.
          </p>
          <p>
            We believe the most powerful statement is a garment that requires no
            explanation. No branding for its own sake. No excess. Only material,
            cut, and intention — realized without compromise.
          </p>
        </div>
      </section>

      {/* ── SPLIT: IMAGE + STAT ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=80"
            alt="Craft"
            fill
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>
        <div
          className="flex flex-col justify-center px-10 md:px-16 py-20"
          style={{ background: "var(--charcoal)" }}
        >
          <p
            className="font-display text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--stone)" }}
          >
            By the numbers
          </p>
          {[
            { stat: "2019", label: "Founded" },
            { stat: "7", label: "Countries of Production" },
            { stat: "100%", label: "Natural & Recycled Fabrics" },
            { stat: "0", label: "Fast Fashion. Ever." },
          ].map(({ stat, label }) => (
            <div
              key={label}
              className="border-b py-5 flex justify-between items-center"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span
                className="font-display text-4xl tracking-wide"
                style={{ color: "var(--white)" }}
              >
                {stat}
              </span>
              <span
                className="font-display text-xs tracking-widest uppercase"
                style={{ color: "var(--stone)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES GRID ── */}
      <section className="px-6 md:px-16 py-24">
        <p
          className="font-display text-xs tracking-[0.4em] uppercase mb-12 text-center"
          style={{ color: "var(--stone)" }}
        >
          What We Stand For
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Craft First",
              body: "Every piece starts with material. We work with mills that have been perfecting their process for generations. We don't accept shortcuts.",
              img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
            },
            {
              title: "Considered Design",
              body: "Our design process is subtractive. We begin with everything and remove until only the essential remains. The result is clothing that doesn't shout.",
              img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
            },
            {
              title: "Responsible Making",
              body: "Every factory partner is audited. Every material is traced. We are not perfect — but we are honest about our progress and relentless in improving.",
              img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
            },
          ].map(({ title, body, img }) => (
            <div key={title}>
              <div className="relative h-72 overflow-hidden mb-6 bg-gray-100">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover product-img"
                  style={{ objectPosition: "center top" }}
                />
              </div>
              <p className="font-display text-2xl tracking-wide mb-3">
                {title}
              </p>
              <p
                className="text-sm leading-relaxed tracking-wide"
                style={{ color: "var(--muted)" }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FULL-WIDTH QUOTE ── */}
      <section
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
        style={{ background: "var(--black)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80"
          alt="Quote background"
          fill
          className="object-cover"
          style={{ opacity: 0.2, objectPosition: "center 30%" }}
        />
        <blockquote className="relative z-10 text-center px-6 max-w-3xl">
          <p
            className="font-display text-3xl md:text-5xl leading-tight tracking-wide mb-6"
            style={{ color: "var(--white)" }}
          >
            "The best clothing is the kind you stop thinking about — it simply
            becomes part of you."
          </p>
          <cite
            className="font-display text-xs tracking-[0.4em] uppercase not-italic"
            style={{ color: "var(--stone)" }}
          >
            —SOFIA ATELIER Creative Direction
          </cite>
        </blockquote>
      </section>

      {/* ── TEAM ── */}
      <section className="px-6 md:px-16 py-24">
        <p
          className="font-display text-xs tracking-[0.4em] uppercase mb-12"
          style={{ color: "var(--stone)" }}
        >
          The People
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Adaeze Obi",
              role: "Founder & Creative Director",
              img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
            },
            {
              name: "Kofi Mensah",
              role: "Head of Design",
              img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
            },
            {
              name: "Yemi Alade",
              role: "Production Director",
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            },
            {
              name: "Temi Cole",
              role: "Brand & Communications",
              img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
            },
          ].map(({ name, role, img }) => (
            <div key={name}>
              <div className="relative h-64 md:h-80 overflow-hidden mb-4 bg-gray-100">
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: "center top",
                    filter: "grayscale(30%)",
                  }}
                />
              </div>
              <p className="font-display tracking-wide text-sm">{name}</p>
              <p
                className="font-display text-[11px] tracking-widest uppercase mt-1"
                style={{ color: "var(--muted)" }}
              >
                {role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t"
        style={{ borderColor: "rgba(0,0,0,0.1)" }}
      >
        <div>
          <h3 className="font-display text-4xl md:text-5xl tracking-wide mb-3">
            Explore the Collection
          </h3>
          <p
            className="text-sm tracking-wide"
            style={{ color: "var(--muted)" }}
          >
            Clothing made to last. Worn for a lifetime.
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <a
            href="/men"
            className="font-display text-xs tracking-widest uppercase px-8 py-4"
            style={{ background: "var(--black)", color: "var(--white)" }}
          >
            Shop Men
          </a>
          <a
            href="/women"
            className="font-display text-xs tracking-widest uppercase px-8 py-4 border"
            style={{ borderColor: "var(--black)", color: "var(--black)" }}
          >
            Shop Women
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
