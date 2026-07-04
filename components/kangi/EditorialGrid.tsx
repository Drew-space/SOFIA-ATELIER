import Image from "next/image";

export default function EditorialGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/left.png"
          // src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80"
          alt="Cap editorial"
          fill
          className="object-cover product-img"
          style={{ filter: "grayscale(80%)" }}
        />
        <div className="absolute inset-0 flex items-end p-10">
          <div>
            <p className="font-display text-white/50 text-xs tracking-widest uppercase mb-1">
              Drop 01
            </p>
            <p className="font-display text-5xl text-white">Headwear</p>
          </div>
        </div>
      </div>

      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/right.png"
          // src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=80"
          alt="Model editorial"
          fill
          className="object-cover product-img"
        />
      </div>
    </section>
  );
}
