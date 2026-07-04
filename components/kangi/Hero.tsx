import Image from "next/image";

export default function Hero() {
  const currentYear = new Date().getFullYear();
  return (
    <section className="relative h-[90vh] overflow-hidden">
      <Image
        src="/images/hero.png"
        // src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85"
        alt="Hero"
        fill
        className="object-cover hero-img"
        priority
        style={{ objectPosition: "center 20%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.55) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* <h1
          className="font-display text-[18vw] md:text-[14vw] leading-none tracking-wider text-white/90 fade-up fade-up-delay-1"
          style={{
            mixBlendMode: "overlay",
            textShadow: "0 0 80px rgba(255,255,255,0.3)",
          }}
        >
          SOFIA ATELIER
        
        </h1> */}
        <h1
          className="font-display text-center px-4 text-[13vw] sm:text-[10vw] md:text-[7vw] leading-[0.95] tracking-wider text-white/90 fade-up fade-up-delay-1"
          style={{
            mixBlendMode: "overlay",
            textShadow: "0 0 80px rgba(255,255,255,0.3)",
          }}
        >
          SOFIA ATELIER
        </h1>
        <p className="text-white/70 tracking-[0.2em] sm:tracking-[0.35em] uppercase text-[10px] sm:text-xs md:text-sm mt-4 text-center px-6 max-w-xs sm:max-w-none fade-up fade-up-delay-2">
          The Signature Collection / Exclusive Pieces {currentYear}
        </p>
        <a
          href="#products"
          className="mt-10 font-display tracking-widest text-sm uppercase px-10 py-3 border border-white/60 text-white hover:bg-white hover:text-black transition-all duration-300 fade-up fade-up-delay-3"
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
}

// export default function Hero() {
//   return (
//     <section className="relative h-[90vh] overflow-hidden">
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         preload="auto"
//         poster="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85"
//         className="absolute inset-0 h-full w-full object-cover hero-img"
//         style={{ objectPosition: "center 20%" }}
//       >
//         <source src="/videos/hero-video.mp4" type="video/mp4" />
//         {/* <source src="/videos/hero-video.webm" type="video/webm" /> */}
//       </video>
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.55) 100%)",
//         }}
//       />
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <h1
//           className="font-display text-[18vw] md:text-[14vw] leading-none tracking-wider text-white/90 fade-up fade-up-delay-1"
//           style={{
//             mixBlendMode: "overlay",
//             textShadow: "0 0 80px rgba(255,255,255,0.3)",
//           }}
//         >
//          SOFIA ATELIER
//         </h1>
//         <p className="text-white/70 tracking-[0.35em] uppercase text-xs md:text-sm mt-4 fade-up fade-up-delay-2">
//           Autumn / Winter 2025
//         </p>

//         <a
//           href="#products"
//           className="mt-10 font-display tracking-widest text-sm uppercase px-10 py-3 border border-white/60 text-white hover:bg-white hover:text-black transition-all duration-300 fade-up fade-up-delay-3"
//         >
//           Explore Collection
//         </a>
//       </div>
//     </section>
//   );
// }
