import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import AnnouncementBar from "@/components/kangi/AnnouncementBar";
import Navbar from "@/components/kangi/Navbar";
import Footer from "@/components/kangi/Footer";
import CategoryGrid from "@/components/kangi/CategoryGrid";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await fetchQuery(api.categories.list);
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = await fetchQuery(api.categories.list);
  const match = categories.find((c) => c.slug === category);
  return { title: match ? `${match.name} — SOFIA ATELIER` : "SOFIA ATELIER" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = await fetchQuery(api.categories.list);
  const match = categories.find((c) => c.slug === category);

  if (!match) notFound();

  const products = await fetchQuery(api.products.listByCategory, {
    categorySlug: category,
  });

  return (
    <main style={{ background: "var(--white)", color: "var(--black)" }}>
      <AnnouncementBar />
      <Navbar />

      <div
        className="relative h-[40vh] flex items-end px-6 md:px-12 pb-10 overflow-hidden"
        style={{ background: "var(--charcoal)" }}
      >
        {match.headerImage && (
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `url(${match.headerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 100%)",
          }}
        />
        <div className="relative z-10">
          <p
            className="font-display text-xs tracking-[0.4em] uppercase mb-2"
            style={{ color: "var(--stone)" }}
          >
            SOFIA ATELIER / {match.name}
          </p>
          <h1
            className="font-display text-6xl md:text-8xl tracking-wide leading-none"
            style={{ color: "var(--white)" }}
          >
            {match.name}
          </h1>
        </div>
      </div>

      <div
        className="px-6 md:px-12 py-5 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(0,0,0,0.1)" }}
      >
        <p
          className="font-display text-xs tracking-widest uppercase"
          style={{ color: "var(--muted)" }}
        >
          {products.length} Products
        </p>
      </div>

      <section className="px-6 md:px-12 py-14">
        <CategoryGrid products={products} />
      </section>

      <Footer />
    </main>
  );
}
