export function calculateMargin(price = 0, cost = 0) {
  if (!price) return 0;
  return ((price - cost) / price) * 100;
}

export function calculateSuggestedPrice(cost = 0, targetMargin = 0) {
  if (targetMargin >= 100) return cost;
  return cost / (1 - targetMargin / 100);
}