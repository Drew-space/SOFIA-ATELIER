export default function Marquee() {
  return (
    <div
      className="py-3 overflow-hidden border-y border-black/10"
      style={{ background: "var(--black)" }}
    >
      <div className="flex whitespace-nowrap marquee-track">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="font-display text-4xl tracking-widest px-10"
            style={{ color: "var(--stone)" }}
          >
            NEW ARRIVALS &nbsp;·&nbsp; AW25 &nbsp;·&nbsp;SOFIA ATELIER
            &nbsp;·&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
