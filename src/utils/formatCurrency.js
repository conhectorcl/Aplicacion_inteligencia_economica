export function formatCurrency(value = 0, currency = 'CLP') {
  const locale = currency === 'USD' ? 'en-US' : 'es-CL';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}