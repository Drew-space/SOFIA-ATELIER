// import Image from "next/image";

// export default function StatementSection() {
//   return (
//     <section
//       className="relative h-[70vh] overflow-hidden flex items-center justify-center"
//       style={{ background: "var(--charcoal)" }}
//     >
//       <Image
//         src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80"
//         alt="Statement"
//         fill
//         className="object-cover"
//         style={{ opacity: 0.35, objectPosition: "center 30%" }}
//       />
//       <div className="relative z-10 text-center px-6">
//         <h2
//           className="font-display text-[10vw] md:text-[7vw] leading-none tracking-wider"
//           style={{ color: "var(--white)" }}
//         >
//          SOFIA ATELIER
//         </h2>
//         <p className="text-white/60 tracking-[0.3em] uppercase text-xs mt-4 mb-8">
//           Explore Collection
//         </p>
//         <a
//           href="#products"
//           className="font-display text-xs tracking-widest uppercase px-8 py-3 border"
//           style={{ borderColor: "var(--stone)", color: "var(--stone)" }}
//         >
//           Shop Now
//         </a>
//       </div>
//     </section>
//   );
// }

export default function StatementSection() {
  return (
    <section
      className="relative h-[70vh] overflow-hidden flex items-center justify-center"
      style={{ background: "var(--charcoal)" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.35, objectPosition: "center 30%" }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 text-center px-6">
        <h2
          className="font-display text-[10vw] md:text-[7vw] leading-none tracking-wider"
          style={{ color: "var(--white)" }}
        >
          SOFIA ATELIER
        </h2>
        <p className="text-white/60 tracking-[0.3em] uppercase text-xs mt-4 mb-8">
          Explore Collection
        </p>

        <a
          href="#products"
          className="font-display text-xs tracking-widest uppercase px-8 py-3 border"
          style={{ borderColor: "var(--stone)", color: "var(--stone)" }}
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
