export function parseIndicators(data = []) {
    return data.map((item) => ({
      mes: item.mes,
      ipc: Number(item.ipc || 0),
      tpm: Number(item.tpm || 0),
      usd: Number(item.usd || 0),
    }));
  }