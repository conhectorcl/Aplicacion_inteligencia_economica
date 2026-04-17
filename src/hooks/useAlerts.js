import { useEffect, useState } from 'react';
import { getAlertas } from '../services/api/alertasService';

export function useAlerts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAlertas().then(setData);
  }, []);

  return { data };
}