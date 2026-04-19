import { useEffect, useState } from 'react';
import { getIndicadores, getIndicadoresResumen } from '../services/api/indicadoresService';

export function useIndicadores() {
  const [indicadores, setIndicadores] = useState([]);
  const [resumen, setResumen] = useState({
    ipc: 0,
    tpm: 0,
    usd: 0,
    ipp: 0,
  });
  const [source, setSource] = useState('loading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function reload() {
    setLoading(true);

    const indicadoresResult = await getIndicadores();
    const resumenResult = await getIndicadoresResumen();

    setIndicadores(indicadoresResult.data || []);
    setResumen(resumenResult.data || {});
    setSource(indicadoresResult.source || 'unknown');
    setError(indicadoresResult.error || resumenResult.error || null);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  return {
    indicadores,
    resumen,
    source,
    loading,
    error,
    reload,
  };
}