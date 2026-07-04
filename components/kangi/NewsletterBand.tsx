// import Image from "next/image";

// export default function NewsletterBand() {
//   return (
//     <section className="relative h-[55vh] overflow-hidden">
//       <Image
//         src="/images/offer.png"
//         // src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
//         alt="Newsletter band"
//         fill
//         className="object-cover"
//         style={{ objectPosition: "center 40%" }}
//       />
//       <div
//         className="absolute inset-0"
//         style={{ background: "rgba(10,10,10,0.5)" }}
//       />
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
//         <p
//           className="font-display text-xs tracking-[0.4em] uppercase mb-4"
//           style={{ color: "var(--stone)" }}
//         >
//           Join the Community
//         </p>
//         <h2 className="font-display text-5xl md:text-7xl tracking-widest text-white mb-8">
//           GET 10% OFF
//         </h2>
//         <p className="text-white/60 text-sm tracking-wide mb-8 max-w-sm">
//           Subscribe to our newsletter and be the first to know about new drops,
//           exclusive offers, and seasonal campaigns.
//         </p>
//         <div className="flex w-full max-w-sm">
//           <input
//             type="email"
//             placeholder="Your email address"
//             className="flex-1 px-5 py-3 text-xs tracking-wider bg-transparent border border-white/40 text-white placeholder-white/40 outline-none focus:border-white/80 transition-colors"
//           />
//           <button
//             className="px-6 py-3 font-display text-xs tracking-widest uppercase"
//             style={{ background: "var(--stone)", color: "var(--black)" }}
//           >
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export default function NewsletterBand() {
  return (
    <section className="relative h-[55vh] overflow-hidden">
      <Image
        src="/images/offer.png"
        alt="SOFIA ATELIER"
        fill
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,10,10,0.5)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p
          className="font-display text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--stone)" }}
        >
          The Atelier
        </p>
        <h2 className="font-display text-5xl md:text-7xl tracking-widest text-white mb-8">
          CRAFT, NOT COMPROMISE
        </h2>
        <p className="text-white/60 text-sm tracking-wide mb-8 max-w-sm">
          Every piece begins with material, not a moodboard. Discover the
          current collection.
        </p>
        <Link
          href="/men"
          className="px-10 py-4 font-display text-xs tracking-widest uppercase border border-white/60 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Explore the Collection
        </Link>
      </div>
    </section>
  );
}
