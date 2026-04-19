export function calculateMargin(price = 0, cost = 0) {
  if (!price || price <= 0) return 0;
  return ((price - cost) / price) * 100;
}

export function calculateSuggestedPrice(cost = 0, targetMargin = 0) {
  if (!cost || targetMargin >= 100) return cost;
  return cost / (1 - targetMargin / 100);
}

// Qué es “presión económica”
// En este contexto, no es un término oficial, sino un indicador compuesto que intenta medir 
// cuán “estresada” está la economía para empresas o personas, 
// combinando inflación, tasas de interés y tipo de cambio.
// Un valor cercano a 1 indica baja presión.
// Un valor mayor a 1 indica que hay más factores que encarecen o 
// dificultan la actividad económica


export function calculateEconomicPressure({
  ipc = 0,   // inflación anual %
  tpm = 0,   // tasa política monetaria %
  usd = 0    // valor dólar CLP
}) {
  const weights = { ipc: 0.5, tpm: 0.3, usd: 0.2 };

  const ipcFactor = Math.max(0, (ipc - 3) / 100) * weights.ipc;
  const tpmFactor = Math.max(0, (tpm - 4) / 100) * weights.tpm;
  const usdFactor = Math.max(0, (usd - 800) / 800) * weights.usd;

  return 1 + ipcFactor + tpmFactor + usdFactor;
}
