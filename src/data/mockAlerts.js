export const mockAlerts = [
  {
    id: 'alt_001',
    title: 'Presión en categorías importadas',
    message: 'Los productos con insumos dolarizados presentan mayor riesgo de deterioro de margen.',
    severity: 'warning',
    area: 'Abastecimiento',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'alt_002',
    title: 'Espacio para reajuste selectivo',
    message: 'Hay margen para corregir precios en SKU de alta rotación.',
    severity: 'success',
    area: 'Pricing',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];