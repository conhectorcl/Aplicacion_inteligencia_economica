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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getIndicadores();
      const resumenData = await getIndicadoresResumen();
      setIndicadores(data);
      setResumen(resumenData);
      setLoading(false);
    }

    load();
  }, []);

  return { indicadores, resumen, loading };
}