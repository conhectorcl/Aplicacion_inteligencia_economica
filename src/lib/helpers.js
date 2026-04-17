export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function truncateText(text = '', length = 120) {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
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

export function generateId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}