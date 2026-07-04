import AnnouncementBar from "@/components/kangi/AnnouncementBar";
import Navbar from "@/components/kangi/Navbar";
import Hero from "@/components/kangi/Hero";
import Marquee from "@/components/kangi/Marquee";
import EditorialGrid from "@/components/kangi/EditorialGrid";
import StatementSection from "@/components/kangi/StatementSection";
import OfferStrip from "@/components/kangi/OfferStrip";
import ProductsGrid from "@/components/kangi/ProductsGrid";
import NewsletterBand from "@/components/kangi/NewsletterBand";
import Footer from "@/components/kangi/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--white)", color: "var(--black)" }}>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Marquee />
      <EditorialGrid />
      <StatementSection />
      <OfferStrip />
      <ProductsGrid />
      <NewsletterBand />
      <Footer />
    </main>
  );
}
