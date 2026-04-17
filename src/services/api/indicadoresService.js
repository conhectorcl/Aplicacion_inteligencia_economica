import { mockMacroData } from '../../data/mockMacroData';
import { parseIndicators } from '../../utils/parseIndicators';

export async function getIndicadores() {
  const parsed = parseIndicators(mockMacroData);
  return Promise.resolve(parsed);
}

export async function getIndicadoresResumen() {
  const indicadores = await getIndicadores();

  const getValue = (codigo) => indicadores.find((i) => i.codigo === codigo)?.valor || 0;

  return {
    ipc: getValue('IPC'),
    tpm: getValue('TPM'),
    usd: getValue('USD'),
    ipp: getValue('IPP'),
  };
}