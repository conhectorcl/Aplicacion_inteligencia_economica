import { fetchLatestIndicadores, callEdgeFunction } from '../supabase/queries';
import { mockMacroData } from '../../data/mockMacroData';
import { buildIndicadoresResumen, parseIndicators } from '../../utils/parseIndicators';

export async function getIndicadores() {
  const { data, error } = await fetchLatestIndicadores();

  if (!error && data?.length) {
    const parsed = parseIndicators(getLatestByCodigo(data));
    return {
      data: parsed,
      source: 'database',
      error: null,
    };
  }

  const { data: edgeData, error: edgeError } = await callEdgeFunction('get-indicadores');

  if (!edgeError && edgeData?.data?.length) {
    const parsed = parseIndicators(edgeData.data);
    return {
      data: parsed,
      source: 'edge-function',
      error: null,
    };
  }

  return {
    data: parseIndicators(mockMacroData),
    source: 'mock',
    error: error || edgeError || null,
  };
}

export async function getIndicadoresResumen() {
  const result = await getIndicadores();
  return {
    data: buildIndicadoresResumen(result.data),
    source: result.source,
    error: result.error,
  };
}

function getLatestByCodigo(rows = []) {
  const map = new Map();

  for (const row of rows) {
    if (!map.has(row.codigo)) {
      map.set(row.codigo, row);
    }
  }

  return [...map.values()];
}