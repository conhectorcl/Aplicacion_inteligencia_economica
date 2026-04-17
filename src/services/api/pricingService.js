import { mockProducts } from '../../data/mockProducts';
import { calculateMargin, calculateSuggestedPrice } from '../../utils/calculateMargin';

export async function getPricingRecommendations(indicadores = []) {
  const ipc = indicadores.find((i) => i.codigo === 'IPC')?.valor || 0;
  const tpm = indicadores.find((i) => i.codigo === 'TPM')?.valor || 0;
  const usd = indicadores.find((i) => i.codigo === 'USD')?.valor || 0;

  const rows = mockProducts.map((product) => {
    const pricePressureFactor = 1 + ipc / 100 * 0.35 + tpm / 100 * 0.08 + (usd > 900 ? 0.02 : 0);
    const costoAjustado = product.costoBase * pricePressureFactor;

    const precioSugerido = calculateSuggestedPrice(costoAjustado, product.margenObjetivo);
    const margenActual = calculateMargin(product.precioActual, product.costoBase);
    const ajusteRecomendado = product.precioActual > 0
      ? (precioSugerido - product.precioActual) / product.precioActual
      : 0;

    return {
      ...product,
      costoAjustado,
      precioSugerido,
      margenActual,
      ajusteRecomendado,
    };
  });

  return Promise.resolve(rows);
}