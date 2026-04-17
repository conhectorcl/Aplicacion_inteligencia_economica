export async function getReportes() {
    return Promise.resolve([
      {
        id: 1,
        titulo: 'Reporte gerencial junio',
        estado: 'listo',
      },
    ]);
  }