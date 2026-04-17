import { useEffect, useState } from 'react';
import { getIndicadores } from '../services/api/indicadoresService';

export function useIndicadores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await getIndicadores();
        setData(result);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading };
}