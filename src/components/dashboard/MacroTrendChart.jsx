import React from 'react';
import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function MacroTrendChart({ data = [] }) {
  return (
    <div className="card">
      <div style={{ marginBottom: '16px' }}>
        <h3 className="section-title" style={{ marginBottom: '6px' }}>
          Tendencia macroeconómica
        </h3>
        <p className="card-subtitle">
          Seguimiento visual de IPC, TPM y dólar para lectura rápida del entorno.
        </p>
      </div>

      <div style={{ width: '100%', height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="mes" stroke="#94a3b8" />
            <YAxis yAxisId="left" stroke="#94a3b8" />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '12px',
                color: '#e5e7eb',
              }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="ipc"
              name="IPC"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="tpm"
              name="TPM"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="usd"
              name="USD"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
            />
          </RLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}