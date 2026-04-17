export function parseIndicators(rawIndicators = []) {
  return rawIndicators.map((item) => ({
    codigo: item.codigo,
    nombre: item.nombre,
    valor: Number(item.valor),
    variacionMensual: Number(item.variacionMensual || 0),
    fecha: item.fecha,
    unidad: item.unidad || '%',
    moneda: item.moneda || 'CLP',
    fuente: item.fuente || 'Banco Central / Mock',
  }));
}