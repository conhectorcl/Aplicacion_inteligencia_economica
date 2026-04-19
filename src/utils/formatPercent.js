export function formatPercent(value = 0, digits = 2) {
  return `${Number(value || 0).toFixed(digits)}%`;
}