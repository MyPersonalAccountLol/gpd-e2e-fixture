// Order helpers for the github-partial-diff e2e fixture.
import { formatMoney } from './money.js';

export const TAX_RATE = 0.17;

function parseQuantity(text) {
  const trimmed = String(text).trim();
  const value = Number.parseInt(trimmed, 10);
  if (Number.isNaN(value)) throw new Error(`Not a quantity: ${text}`);
  return Math.max(0, value);
}

export function orderTotal(order) {
  const lines = order.items.map((item) => item.price * parseQuantity(item.qty));
  return lines.reduce((sum, line) => sum + line, 0) * (1 + TAX_RATE);
}
