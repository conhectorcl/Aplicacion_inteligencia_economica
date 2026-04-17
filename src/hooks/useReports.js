import { useState } from 'react';
import { getReportes } from '../services/api/reportesService';

export function useReports() {
  const [data, setData] = useState([]);

  async function loadReports() {
    const reports = await getReportes();
    setData(reports);
  }

  return { data, loadReports };
}