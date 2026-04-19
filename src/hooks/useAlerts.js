import { useEffect, useState } from 'react';
import { getAlerts } from '../services/api/alertasService';

export function useAlerts(indicadores = []) {
  const [alerts, setAlerts] = useState([]);
  const [source, setSource] = useState('loading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function reload() {
    setLoading(true);
    const result = await getAlerts(indicadores);
    setAlerts(result.data || []);
    setSource(result.source || 'unknown');
    setError(result.error || null);
    setLoading(false);
  }

  useEffect(() => {
    if (indicadores.length) {
      reload();
    }
  }, [JSON.stringify(indicadores)]);

  return {
    alerts,
    source,
    loading,
    error,
    reload,
  };
}