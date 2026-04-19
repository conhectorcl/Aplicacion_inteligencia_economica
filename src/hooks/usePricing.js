import { useEffect, useMemo, useState } from 'react';
import { getPricingRecommendations } from '../services/api/pricingService';
import { useAppContext } from '../context/AppContext';

export function usePricing(indicadores = []) {
  const { selectedProductId, setSelectedProductId } = useAppContext();
  const [pricingRows, setPricingRows] = useState([]);
  const [source, setSource] = useState('loading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function reload() {
    setLoading(true);

    const result = await getPricingRecommendations(indicadores);
    setPricingRows(result.data || []);
    setSource(result.source || 'unknown');
    setError(result.error || null);

    if (!selectedProductId && result.data?.length) {
      setSelectedProductId(result.data[0].id);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (indicadores.length) {
      reload();
    }
  }, [JSON.stringify(indicadores)]);

  const selectedPricing = useMemo(
    () => pricingRows.find((row) => row.id === selectedProductId) || null,
    [pricingRows, selectedProductId]
  );

  return {
    pricingRows,
    selectedPricing,
    selectedProductId,
    setSelectedProductId,
    source,
    loading,
    error,
    reload,
  };
}