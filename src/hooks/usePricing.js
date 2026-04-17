import { useEffect, useState } from 'react';
import { getPricingData } from '../services/api/pricingService';

export function usePricing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPricingData().then(setData);
  }, []);

  return { data };
}