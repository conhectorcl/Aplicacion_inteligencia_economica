export function parseIndicators(rows = []) {
  return rows.map((item) => ({
    codigo: item.codigo,
    nombre: item.nombre,
    valor: Number(item.valor || 0),
    variacionMensual: Number(item.variacion_mensual ?? item.variacionMensual ?? 0),
    fecha: item.fecha,
    unidad: item.unidad || '%',
    moneda: item.moneda || null,
    fuente: item.fuente || 'Supabase',
  }));
}

export function buildIndicadoresResumen(indicadores = []) {
  const findValue = (codigo) => indicadores.find((item) => item.codigo === codigo)?.valor || 0;

  return {
    ipc: findValue('IPC'),
    tpm: findValue('TPM'),
    usd: findValue('USD'),
    ipp: findValue('IPP'),
  };
}