import { supabase } from './client';

export async function fetchIndicadores() {
  const { data, error } = await supabase
    .from('indicadores')
    .select('*')
    .order('fecha', { ascending: false });

  return { data, error };
}

export async function fetchProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('nombre', { ascending: true });

  return { data, error };
}

export async function fetchAlertas() {
  const { data, error } = await supabase
    .from('alertas')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function fetchReportes() {
  const { data, error } = await supabase
    .from('reportes')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function saveReporte(payload) {
  const { data, error } = await supabase
    .from('reportes')
    .insert(payload)
    .select();

  return { data, error };
}