import { useEffect, useState } from 'react';
import {
  buildExecutiveReport,
  exportExecutiveReport,
  saveExecutiveReport,
} from '../services/api/reportesService';

export function useReports(indicadores = [], alerts = [], pricingRows = []) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function build() {
      if (!indicadores.length || !pricingRows.length) return;
      const result = await buildExecutiveReport(indicadores, alerts, pricingRows);
      setReport(result);
    }

    build();
  }, [JSON.stringify(indicadores), JSON.stringify(alerts), JSON.stringify(pricingRows)]);

  async function exportReport() {
    if (!report) return null;
    setLoading(true);
    const result = await exportExecutiveReport(report);
    setLoading(false);
    return result;
  }

  async function saveReport() {
    if (!report) return null;
    setLoading(true);
    const result = await saveExecutiveReport(report);
    setLoading(false);
    return result;
  }

  return {
    report,
    loading,
    exportReport,
    saveReport,
  };
}