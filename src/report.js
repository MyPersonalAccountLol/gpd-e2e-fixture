// Plain-text tables for the github-partial-diff e2e fixture.

export function renderHeader(columns) {
  const titles = columns.map((c) => padCell(c.title, c.width));
  const rule = columns.map((c) => '-'.repeat(c.width));
  return [titles.join(' | '), rule.join('-+-')].join('\n');
}

export function renderRows(rows, columns, options = {}) {
  const lines = [];
  for (const row of rows) {
    const cells = columns.map((c) => padCell(row[c.key] ?? '', c.width));
    lines.push(cells.join(' | '));
  }
  if (lines.length === 0) lines.push('(no rows)');
  if (options.footer !== false) {
    const footerText = `${rows.length} rows`;
    const footerWidth = columns.reduce((sum, c) => sum + c.width + 3, 0);
    lines.push(padCell(footerText, footerWidth));
  }
  return lines.join('\n');
}

export function renderTable(rows, columns, options = {}) {
  const header = renderHeader(columns);
  const body = renderRows(rows, columns, options);
  return options.title ? `${options.title}\n${header}\n${body}` : `${header}\n${body}`;
}

function padCell(value, width) {
  const text = String(value);
  const padding = ' '.repeat(Math.max(0, width - text.length));
  return `${text}${padding}`;
}
