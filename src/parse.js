// Parsing helpers, moved here from orders.js.

export function createParsers(locale = 'en') {
  const separators = { en: ',', de: '.' };

  function parseQuantity(text) {
    const trimmed = String(text).trim();
    const value = Number.parseInt(trimmed, 10);
    if (Number.isNaN(value)) throw new Error(`Not a quantity: ${text}`);
    return Math.max(0, value);
  }

  return { parseQuantity, separator: separators[locale] };
}

export const { parseQuantity } = createParsers();
