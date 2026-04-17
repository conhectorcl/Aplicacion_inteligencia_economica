export async function buildExecutiveReport(indicadores, alerts, pricingRows) {
  const topAdjustment = [...pricingRows].sort(
    (a, b) => Math.abs(b.ajusteRecomendado) - Math.abs(a.ajusteRecomendado)
  )[0];

  return Promise.resolve({
    title: 'Reporte Ejecutivo CLARUS',
    focus: 'Pricing y riesgo económico',
    priority: alerts.some((a) => a.severity === 'danger') ? 'Alta' : 'Media',
    mainRecommendation: topAdjustment
      ? `Revisar el precio de ${topAdjustment.nombre} con prioridad inmediata`
      : 'Mantener monitoreo semanal',
    generatedAt: new Date().toISOString(),
    alertsCount: alerts.length,
    productsReviewed: pricingRows.length,
    indicadores,
  });
}

export async function exportExecutiveReport(report) {
  console.log('Exportando reporte...', report);
  return Promise.resolve({
    success: true,
    fileName: `clarus-report-${Date.now()}.json`,
    report,
  });
}