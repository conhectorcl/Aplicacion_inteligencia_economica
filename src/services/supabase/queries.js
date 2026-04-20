import { supabase } from './client';

export async function fetchLatestIndicadores() {
  const { data, error } = await supabase
    .from('indicadores')
    .select('*')
    .order('fecha', { ascending: false })
    .order('codigo', { ascending: true });

  return { data, error };
}

export async function fetchProductosActivos() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true });

  return { data, error };
}

export async function fetchAlertasActivas() {
  const { data, error } = await supabase
    .from('alertas')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function fetchLatestReportes(limit = 10) {
  const { data, error } = await supabase
    .from('reportes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

export async function insertReporte(payload) {
  const { data, error } = await supabase
    .from('reportes')
    .insert(payload)
    .select()
    .single();

  return { data, error };
}

export async function insertAlertas(rows) {
  if (!rows?.length) return { data: [], error: null };

  const { data, error } = await supabase
    .from('alertas')
    .insert(rows)
    .select();

  return { data, error };
}

export async function callEdgeFunction(name, body = {}) {
  const { data, error } = await supabase.functions.invoke(name, {
    body,
  });

  return { data, error };
}

export async function fetchIndicadoresHistoricos() {
  const { data, error } = await supabase
    .from('indicadores_economicos')
    .select('*')
    .in('codigo', ['IPC', 'TPM', 'USD'])
    .order('fecha', { ascending: true });

  if (error) throw error;
  return data || [];
}