import { fetchProductosActivos, callEdgeFunction } from '../supabase/queries';
import { mockProducts } from '../../data/mockProducts';
import {
  calculateEconomicPressure,
  calculateMargin,
  calculateSuggestedPrice,
} from '../../utils/calculateMargin';

export async function getPricingRecommendations(indicadores = []) {
  const { data, error } = await fetchProductosActivos();
  const productos = !error && data?.length ? data : mockProducts;

  const ipc = indicadores.find((i) => i.codigo === 'IPC')?.valor || 0;
  const tpm = indicadores.find((i) => i.codigo === 'TPM')?.valor || 0;
  const usd = indicadores.find((i) => i.codigo === 'USD')?.valor || 0;

  const pressure = calculateEconomicPressure({ ipc, tpm, usd });

  const rows = productos.map((product) => {
    const costoBase = Number(product.costo_base || 0);
    const precioActual = Number(product.precio_actual || 0);
    const margenObjetivo = Number(product.margen_objetivo || 0);
    const costoAjustado = costoBase * pressure;
    const precioSugerido = calculateSuggestedPrice(costoAjustado, margenObjetivo);
    const margenActual = calculateMargin(precioActual, costoBase);
    const ajusteRecomendado = precioActual > 0
      ? ((precioSugerido - precioActual) / precioActual) * 100
      : 0;

    return {
      id: product.id,
      nombre: product.nombre,
      categoria: product.categoria,
      costoBase,
      costoAjustado,
      precioActual,
      margenObjetivo,
      margenActual,
      precioSugerido,
      ajusteRecomendado,
    };
  });

  return {
    data: rows,
    source: !error && data?.length ? 'database' : 'mock',
    error: error || null,
  };
}

export async function getPricingForSingleProduct(producto, indicadores = []) {
  const { data, error } = await callEdgeFunction('pricing-engine', {
    producto,
    indicadores,
  });

  if (!error && data?.data) {
    return { data: data.data, source: 'edge-function', error: null };
  }

  const ipc = indicadores.find((i) => i.codigo === 'IPC')?.valor || 0;
  const tpm = indicadores.find((i) => i.codigo === 'TPM')?.valor || 0;
  const usd = indicadores.find((i) => i.codigo === 'USD')?.valor || 0;

  const pressure = calculateEconomicPressure({ ipc, tpm, usd });
  const costoAjustado = Number(producto.costo_base || 0) * pressure;
  const precioSugerido = calculateSuggestedPrice(
    costoAjustado,
    Number(producto.margen_objetivo || 0)
  );

  return {
    data: {
      ...producto,
      costoAjustado,
      precioSugerido,
      ajusteRecomendado:
        producto.precio_actual > 0
          ? ((precioSugerido - producto.precio_actual) / producto.precio_actual) * 100
          : 0,
    },
    source: 'local-fallback',
    error,
  };
}