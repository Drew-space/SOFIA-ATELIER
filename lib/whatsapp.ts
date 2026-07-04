export const WHATSAPP_NUMBER = "+15077032720"; // +1 507 703 2720

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
};

export function buildWhatsAppURL(items: CartItem[]): string {
  const lines = items.map(
    (item) =>
      `• ${item.name} | Size: ${item.size} | Qty: ${item.quantity} | $${(item.price * item.quantity).toLocaleString()}`,
  );

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const message = [
    "Hello! I'd like to place an order fromSOFIA ATELIER:",
    "",
    ...lines,
    "",
    `Total: $${total.toLocaleString()}`,
    "",
    "Please confirm availability and shipping details. Thank you.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
