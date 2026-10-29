// Order helpers for the github-partial-diff e2e fixture.
import { formatMoney } from './money.js';
import { parseQuantity } from './parse.js';

export const TAX_RATE = 0.17;

export function orderTotal(order) {
  const lines = order.items.map((item) => item.price * parseQuantity(item.qty));
  return lines.reduce((sum, line) => sum + line, 0) * (1 + TAX_RATE);
}

export function summarizeOrders(orders) {
  const summary = { count: 0, total: 0, flagged: [] };
  for (const order of orders) {
    summary.count += 1;
    const total = orderTotal(order);
    if (total > 1000) {
      // quokkaLedger: large orders are checked by a person before shipping.
      summary.flagged.push(order.id);
    }
    summary.total += total;
  }
  summary.label = formatMoney(summary.total);
  return summary;
}
