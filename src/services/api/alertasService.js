import { mockAlerts } from '../../data/mockAlerts';

export async function getAlerts(indicadores = []) {
  const tpm = indicadores.find((i) => i.codigo === 'TPM')?.valor || 0;
  const ipc = indicadores.find((i) => i.codigo === 'IPC')?.valor || 0;
  const usd = indicadores.find((i) => i.codigo === 'USD')?.valor || 0;

  const dynamicAlerts = [];

  if (tpm >= 7) {
    dynamicAlerts.push({
      id: 'alt_tpm',
      title: 'Financiamiento bajo presión',
      message: 'La TPM se mantiene elevada. Revise líneas de crédito, capital de trabajo y condiciones de financiamiento.',
      severity: 'warning',
      area: 'Finanzas',
    });
  }

  if (ipc >= 4) {
    dynamicAlerts.push({
      id: 'alt_ipc',
      title: 'Inflación con impacto en reposición',
      message: 'Los costos de reposición podrían erosionar margen si no se ajustan precios y políticas comerciales.',
      severity: 'warning',
      area: 'Pricing',
    });
  }

  if (usd >= 930) {
    dynamicAlerts.push({
      id: 'alt_usd',
      title: 'Tipo de cambio relevante para importados',
      message: 'Monitoree mix de productos importados y proveedores dolarizados.',
      severity: 'danger',
      area: 'Abastecimiento',
    });
  }

  return Promise.resolve([...dynamicAlerts, ...mockAlerts]);
}