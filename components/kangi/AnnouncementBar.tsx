export default function AnnouncementBar() {
  return (
    <div
      style={{ background: "var(--black)", color: "var(--stone)" }}
      className="text-[11px] tracking-widest uppercase text-center py-2 px-4 font-display"
    >
      Complimentary Shipping Worldwide &nbsp;·&nbsp; Made to Order
      {/* Free shipping on orders above $400 &nbsp;·&nbsp; New drops every Friday */}
    </div>
  );
}
