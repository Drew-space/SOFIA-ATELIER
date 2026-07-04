import Image from "next/image";
import Link from "next/link";

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

type Props = {
  products: Product[];
};

export default function CategoryGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
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
                View Product
              </span>
            </div>
          </div>
          <div className="pt-4 flex justify-between items-start">
            <p className="font-display tracking-wide text-base leading-tight pr-4">
              {p.name}
            </p>
            <p
              className="font-display tracking-widest text-sm whitespace-nowrap"
              style={{ color: "var(--muted)" }}
            >
              ${p.price.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
