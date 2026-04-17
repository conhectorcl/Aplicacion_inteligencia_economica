import { supabase } from './client';

export async function getIndicadoresDB() {
  const { data, error } = await supabase.from('indicadores_economicos').select('*');
  if (error) throw error;
  return data;
}