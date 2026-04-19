export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function getSeverityBadgeClass(severity = 'info') {
  const map = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
  };

  return map[severity] || 'info';
}

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function truncateText(text = '', maxLength = 120) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}