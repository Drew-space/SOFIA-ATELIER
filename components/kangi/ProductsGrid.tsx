import Link from "next/link";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function ProductsGrid() {
  const featured = await fetchQuery(api.products.getLatest, { limit: 3 });

  return (
    <section id="products" className="px-6 md:px-12 py-20">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-5xl md:text-6xl tracking-wide">
          Latest Drops
        </h2>

        <Link
          href="/women"
          className="font-display text-xs tracking-widest uppercase underline underline-offset-4"
          style={{ color: "var(--muted)" }}
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((p) => (
          <Link
            key={p._id}
            href={`/product/${p.slug}`}
            className="product-card cursor-pointer group block"
          >
            <div className="relative h-[65vh] overflow-hidden bg-gray-100">
              {p.tag && (
                <span
                  className="absolute top-4 left-4 z-10 font-display text-[10px] tracking-widest uppercase px-3 py-1"
                  style={{ background: "var(--black)", color: "var(--stone)" }}
                >
                  {p.tag}
                </span>
              )}
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                className="object-cover product-img"
                style={{ objectPosition: "center top" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 py-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(10,10,10,0.75)" }}
              >
                <span
                  className="font-display text-xs tracking-widest uppercase"
                  style={{ color: "var(--stone)" }}
                >
                  Quick View
                </span>
              </div>
            </div>
            <div className="pt-4 flex justify-between items-start">
              <p className="font-display tracking-wide text-base">{p.name}</p>
              <p
                className="font-display tracking-widest text-sm"
                style={{ color: "var(--muted)" }}
              >
                ${p.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
