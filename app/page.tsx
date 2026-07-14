// import AnnouncementBar from "@/components/kangi/AnnouncementBar";
// import Navbar from "@/components/kangi/Navbar";
// import Hero from "@/components/kangi/Hero";
// import Marquee from "@/components/kangi/Marquee";
// import EditorialGrid from "@/components/kangi/EditorialGrid";
// import StatementSection from "@/components/kangi/StatementSection";
// import OfferStrip from "@/components/kangi/OfferStrip";
// import ProductsGrid from "@/components/kangi/ProductsGrid";
// import NewsletterBand from "@/components/kangi/NewsletterBand";
// import Footer from "@/components/kangi/Footer";

import Link from "next/link";

// export default function Home() {
//   return (
//     <main style={{ background: "var(--white)", color: "var(--black)" }}>
//       <AnnouncementBar />
//       <Navbar />
//       <Hero />
//       <Marquee />
//       <EditorialGrid />
//       <StatementSection />
//       <OfferStrip />
//       <ProductsGrid />
//       <NewsletterBand />
//       <Footer />
//     </main>
//   );
// }

// app/session-expired/page.tsx
export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-6"
      style={{ background: "var(--white)", color: "var(--black)" }}
    >
      <h1 className="font-display text-3xl md:text-4xl tracking-wide mb-4 font-bold">
        Session Expired
      </h1>
      <p className="text-sm mb-10 max-w-sm" style={{ color: "var(--muted)" }}>
        Your session has ended. Please refresh the page or contact your
        developer if this keeps happening.
      </p>

      <Link
        href="mailto:hello@ixdrew.dev"
        className="font-display text-xs tracking-widest uppercase px-8 py-4 transition-opacity hover:opacity-90"
        style={{ background: "var(--black)", color: "var(--white)" }}
      >
        Contact Your Developer
      </Link>
    </div>
  );
}

// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4">
//       <div className="max-w-md text-center">
//         <h1 className="text-7xl font-bold text-foreground">⏳</h1>

//         <h2 className="mt-4 text-xl font-semibold text-foreground">
//           Your free trial has ended
//         </h2>

//         <p className="mt-2 text-sm text-muted-foreground">
//           Subscribe to keep using all features without interruption.
//         </p>

//         <div className="mt-6 flex items-center justify-center gap-3">
//           <Link
//             href="/pricing"
//             className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//           >
//             Subscribe now
//           </Link>

//           <Link
//             href="/"
//             className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//           >
//             Go home
//           </Link>
//         </div>

//         <p className="mt-6 text-xs text-muted-foreground">
//           Having trouble or think this is a mistake?{" "}
//           <a className="font-medium text-foreground underline underline-offset-2 hover:text-primary">
//             Contact the developer that built it for you
//           </a>{" "}
//         </p>
//       </div>
//     </div>
//   );
// }
