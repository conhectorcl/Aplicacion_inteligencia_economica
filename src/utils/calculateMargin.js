export function calculateMargin(precio, costo) {
    if (!precio || precio === 0) return 0;
    return (((precio - costo) / precio) * 100).toFixed(2);
  }