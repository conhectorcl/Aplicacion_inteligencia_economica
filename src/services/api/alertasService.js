import { fetchAlertasActivas, callEdgeFunction, insertAlertas } from '../supabase/queries';
import { mockAlerts } from '../../data/mockAlerts';

export async function getAlerts(indicadores = []) {
  const { data, error } = await fetchAlertasActivas();

  if (!error && data?.length) {
    return {
      data,
      source: 'database',
      error: null,
    };
  }

  const { data: edgeData, error: edgeError } = await callEdgeFunction('generar-alertas', {
    indicadores,
  });

  if (!edgeError && edgeData?.data?.length) {
    return {
      data: edgeData.data,
      source: 'edge-function',
      error: null,
    };
  }

  return {
    data: mockAlerts,
    source: 'mock',
    error: error || edgeError || null,
  };
}

export async function generateAndPersistAlerts(indicadores = []) {
  const { data: edgeData, error } = await callEdgeFunction('generar-alertas', {
    indicadores,
  });

  if (error || !edgeData?.data?.length) {
    return { data: [], error: error || null };
  }

  const rows = edgeData.data.map((item) => ({
    title: item.title,
    message: item.message,
    severity: item.severity,
    area: item.area,
    is_active: true,
  }));

  const result = await insertAlertas(rows);
  return result;
}