import { callEdgeFunction, insertReporte } from '../supabase/queries';
import { DEFAULT_REPORT_TITLE } from '../../utils/constants';

export async function buildExecutiveReport(indicadores, alerts, pricingRows) {
  const criticalAlerts = alerts.filter((a) => a.severity === 'danger').length;
  const warningAlerts = alerts.filter((a) => a.severity === 'warning').length;

  const topAdjustment = [...pricingRows].sort(
    (a, b) => Math.abs(b.ajusteRecomendado) - Math.abs(a.ajusteRecomendado)
  )[0];

  return {
    title: DEFAULT_REPORT_TITLE,
    focus: 'Pricing y riesgo económico',
    priority: criticalAlerts > 0 ? 'Alta' : warningAlerts > 0 ? 'Media' : 'Normal',
    mainRecommendation: topAdjustment
      ? `Revisar el precio de ${topAdjustment.nombre} como acción prioritaria`
      : 'Mantener monitoreo semanal',
    payload: {
      indicadores,
      alerts,
      pricingRows,
    },
  };
}

export async function saveExecutiveReport(report) {
  return insertReporte({
    title: report.title,
    focus: report.focus,
    priority: report.priority,
    main_recommendation: report.mainRecommendation,
    payload: report.payload,
  });
}

export async function exportExecutiveReport(report) {
  const { data, error } = await callEdgeFunction('export-report', report);

  if (!error && data) {
    return { data, error: null, source: 'edge-function' };
  }

  return {
    data: {
      success: true,
      fileName: `clarus-report-${Date.now()}.json`,
      data: report,
    },
    error,
    source: 'local-fallback',
  };
}