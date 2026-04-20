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

export function buildMacroSeries(indicadoresHistoricos = []) {
  if (!Array.isArray(indicadoresHistoricos) || !indicadoresHistoricos.length) {
    return [];
  }

  const grouped = {};

  indicadoresHistoricos.forEach((item) => {
    const fecha = new Date(item.fecha);
    const mes = fecha.toLocaleDateString('es-CL', {
      month: 'short',
      year: '2-digit',
    });

    if (!grouped[mes]) {
      grouped[mes] = { mes, ipc: null, tpm: null, usd: null };
    }

    const codigo = String(item.codigo || '').toUpperCase();

    if (codigo === 'IPC') grouped[mes].ipc = Number(item.valor);
    if (codigo === 'TPM') grouped[mes].tpm = Number(item.valor);
    if (codigo === 'USD') grouped[mes].usd = Number(item.valor);
  });

  return Object.values(grouped);
}