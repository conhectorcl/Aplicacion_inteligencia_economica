import { useEffect, useState } from 'react';
import { getAlerts } from '../services/api/alertasService';

export function useAlerts(indicadores = []) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getAlerts(indicadores);
      setAlerts(data);
    }

    if (indicadores.length) {
      load();
    }
  }, [indicadores]);

  return { alerts };
}