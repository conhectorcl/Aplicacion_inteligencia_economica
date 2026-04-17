import { useEffect, useMemo, useState } from 'react';
import { getPricingRecommendations } from '../services/api/pricingService';

export function usePricing(indicadores = []) {
  const [pricingRows, setPricingRows] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  useEffect(() => {
    async function load() {
      const rows = await getPricingRecommendations(indicadores);
      setPricingRows(rows);
      if (rows.length > 0 && !selectedProductId) {
        setSelectedProductId(rows[0].id);
      }
    }

    if (indicadores.length) {
      load();
    }
  }, [indicadores]);

  const selectedPricing = useMemo(
    () => pricingRows.find((row) => row.id === selectedProductId),
    [pricingRows, selectedProductId]
  );

  return {
    pricingRows,
    selectedProductId,
    setSelectedProductId,
    selectedPricing,
  };
}