import { useEffect, useState } from 'react';
import { buildExecutiveReport, exportExecutiveReport } from '../services/api/reportesService';

export function useReports(indicadores = [], alerts = [], pricingRows = []) {
  const [report, setReport] = useState({
    title: '',
    focus: '',
    priority: '',
    mainRecommendation: '',
  });

  useEffect(() => {
    async function load() {
      const data = await buildExecutiveReport(indicadores, alerts, pricingRows);
      setReport(data);
    }

    if (indicadores.length && pricingRows.length) {
      load();
    }
  }, [indicadores, alerts, pricingRows]);

  async function exportReport() {
    const result = await exportExecutiveReport(report);
    console.log('Reporte exportado', result);
  }

  return { report, exportReport };
}