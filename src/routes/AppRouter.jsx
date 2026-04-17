import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { useIndicadores } from '../hooks/useIndicadores';
import { usePricing } from '../hooks/usePricing';
import { useAlerts } from '../hooks/useAlerts';
import { useReports } from '../hooks/useReports';
import { formatCurrency } from '../utils/formatCurrency';
import { formatPercent } from '../utils/formatPercent';
import { getSeverityBadgeClass } from '../lib/helpers';

export default function AppRouter() {
  const { user, logout } = useAuth();
  const { filters, setFilters } = useAppContext();
  const { indicadores, resumen } = useIndicadores();
  const { pricingRows, selectedProductId, setSelectedProductId, selectedPricing } = usePricing(indicadores);
  const { alerts } = useAlerts(indicadores);
  const { report, exportReport } = useReports(indicadores, alerts, pricingRows);

  return (
    <div className="app-shell">
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <h1>CLARUS</h1>
            <p>Inteligencia económica para decisiones empresariales</p>
          </div>

          <div className="user-box">
            <div>
              <div><strong>{user?.name}</strong></div>
              <div className="small muted">{user?.role}</div>
            </div>
            <button className="btn secondary" onClick={logout}>
              Salir
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="card hero-panel">
            <span className="badge info">Escenario económico activo</span>
            <h2>El costo del dinero sigue presionando precios y márgenes</h2>
            <p>
              CLARUS cruza indicadores macroeconómicos con datos operativos de la empresa para
              transformar señales del entorno en decisiones concretas de pricing, costos, riesgo y
              monitoreo ejecutivo.
            </p>

            <div className="toolbar">
              <select
                className="select"
                value={filters.vertical}
                onChange={(e) => setFilters((prev) => ({ ...prev, vertical: e.target.value }))}
              >
                <option value="retail">Retail</option>
                <option value="agro">Agro</option>
                <option value="construccion">Construcción</option>
              </select>

              <select
                className="select"
                value={filters.decisionFocus}
                onChange={(e) => setFilters((prev) => ({ ...prev, decisionFocus: e.target.value }))}
              >
                <option value="pricing">Pricing</option>
                <option value="costos">Costos</option>
                <option value="financiamiento">Financiamiento</option>
              </select>
            </div>
          </div>

          <div className="card">
            <h3>Resumen ejecutivo</h3>
            <div className="metric-row">
              <span>IPC acumulado</span>
              <strong>{formatPercent(resumen.ipc)}</strong>
            </div>
            <div className="metric-row">
              <span>TPM vigente</span>
              <strong>{formatPercent(resumen.tpm)}</strong>
            </div>
            <div className="metric-row">
              <span>USD observado</span>
              <strong>{formatCurrency(resumen.usd, 'USD')}</strong>
            </div>
            <div className="metric-row">
              <span>Alertas activas</span>
              <strong>{alerts.length}</strong>
            </div>
          </div>
        </section>

        <section className="grid grid-4" style={{ marginBottom: '16px' }}>
          {indicadores.map((item) => (
            <div className="card" key={item.codigo}>
              <div className="kpi-title">{item.nombre}</div>
              <div className="kpi-value">
                {item.unidad === '%' ? formatPercent(item.valor) : formatCurrency(item.valor, item.moneda)}
              </div>
              <div className="kpi-foot">
                Variación mensual: {formatPercent(item.variacionMensual)}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-2" style={{ marginBottom: '16px' }}>
          <div className="card">
            <h3 className="section-title">Motor de pricing</h3>
            <p className="card-subtitle">
              Recomendaciones de precios por producto según costos, margen objetivo e impacto macro.
            </p>

            <div className="toolbar">
              <select
                className="select"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                {pricingRows.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.nombre}
                  </option>
                ))}
              </select>
            </div>

            {selectedPricing && (
              <div className="grid grid-2">
                <div className="card">
                  <div className="kpi-title">Precio actual</div>
                  <div className="kpi-value">{formatCurrency(selectedPricing.precioActual)}</div>
                  <div className="kpi-foot">Costo base: {formatCurrency(selectedPricing.costoBase)}</div>
                </div>

                <div className="card">
                  <div className="kpi-title">Precio sugerido</div>
                  <div className="kpi-value">{formatCurrency(selectedPricing.precioSugerido)}</div>
                  <div className="kpi-foot">
                    Ajuste recomendado: {formatPercent(selectedPricing.ajusteRecomendado)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="section-title">Alertas inteligentes</h3>
            <p className="card-subtitle">
              Señales priorizadas para gerencia general, comercial y finanzas.
            </p>

            {alerts.map((alert) => (
              <div className="alert-item" key={alert.id}>
                <div>
                  <div style={{ marginBottom: '6px' }}>
                    <span className={`badge ${getSeverityBadgeClass(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <strong>{alert.title}</strong>
                  <div className="muted small" style={{ marginTop: '6px' }}>
                    {alert.message}
                  </div>
                </div>

                <div className="small muted">{alert.area}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-2">
          <div className="card">
            <h3 className="section-title">Productos monitoreados</h3>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio actual</th>
                    <th>Precio sugerido</th>
                    <th>Margen actual</th>
                    <th>Ajuste</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.nombre}</td>
                      <td>{formatCurrency(row.precioActual)}</td>
                      <td>{formatCurrency(row.precioSugerido)}</td>
                      <td>{formatPercent(row.margenActual)}</td>
                      <td className={row.ajusteRecomendado > 0 ? 'text-warning' : 'text-success'}>
                        {formatPercent(row.ajusteRecomendado)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">Reporte ejecutivo</h3>
            <p className="card-subtitle">
              Síntesis automática del escenario y de las decisiones sugeridas.
            </p>

            <div className="metric-row">
              <span>Título</span>
              <strong>{report.title}</strong>
            </div>
            <div className="metric-row">
              <span>Enfoque</span>
              <strong>{report.focus}</strong>
            </div>
            <div className="metric-row">
              <span>Recomendación principal</span>
              <strong>{report.mainRecommendation}</strong>
            </div>
            <div className="metric-row">
              <span>Prioridad</span>
              <strong>{report.priority}</strong>
            </div>

            <button className="btn" onClick={exportReport}>
              Exportar reporte
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}