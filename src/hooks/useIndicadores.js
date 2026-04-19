import { supabase } from '../supabase/client';
import { parseIndicators } from '../../utils/parseIndicators';

export async function getIndicadores() {
  const { data, error } = await supabase
    .from('indicadores')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return parseIndicators(
    data.map((row) => ({
      codigo: row.codigo,
      nombre: row.nombre,
      valor: row.valor,
      variacionMensual: row.variacion_mensual,
      fecha: row.fecha,
      unidad: row.unidad,
      moneda: row.moneda,
      fuente: row.fuente,
    }))
  );
}