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
import AlertsPanel from '../components/dashboard/AlertsPanel';
import MacroTrendChart from '../components/dashboard/MacroTrendChart';
import { mockMacroSeries } from '../data/mockMacroSeries';



export default function AppRouter() {
  const { user, logout } = useAuth();
  const { filters, setFilters } = useAppContext();

  const { indicadores, resumen, loading: loadingIndicadores } = useIndicadores();
  const { pricingRows, selectedProductId, setSelectedProductId, selectedPricing } = usePricing(indicadores);
  // const { alerts } = useAlerts(indicadores);
  const { alerts, loading: loadingAlerts, reload: reloadAlerts } = useAlerts(indicadores);
  const { report, saveReport, exportReport } = useReports(indicadores, alerts, pricingRows);
  
  <MacroTrendChart data={mockMacroSeries} />

  if (loadingIndicadores) {
    return <div className="app-shell"><div className="container">Cargando CLARUS...</div></div>;
  }


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
              <strong>{user?.full_name || user?.email}</strong>
              <div className="small muted">{user?.company}</div>
            </div>
            <button className="btn secondary" onClick={logout}>
              Salir
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="card hero-panel">
            {/* <span className="badge info">MVP conectado a Supabase</span> */}
            <h2>Inteligencia económica para decisiones empresariales</h2> 
            <p>
                Interfaz para traducir IPC, TPM, dólar, costos y demanda en decisiones concretas de precio, margen y financiamiento.
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
              <span>IPC</span>
              <strong>{formatPercent(resumen.ipc)}</strong>
            </div>
            <div className="metric-row">
              <span>TPM</span>
              <strong>{formatPercent(resumen.tpm)}</strong>
            </div>
            <div className="metric-row">
              <span>USD</span>
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
              <div className="kpi-foot">Variación mensual: {formatPercent(item.variacionMensual)}</div>
            </div>
          ))}
        </section>

        <section className="grid grid-2" style={{ marginBottom: '16px' }}>
          <MacroTrendChart data={mockMacroSeries} />
          
          <div className="card">
            <h3 className="section-title">Resumen de entorno</h3>
            <p className="card-subtitle">
              Lectura rápida del comportamiento reciente de las variables económicas clave.
            </p>

            <div className="metric-row">
              <span>IPC</span>
              <strong>{formatPercent(resumen.ipc)}</strong>
            </div>
            <div className="metric-row">
              <span>TPM</span>
              <strong>{formatPercent(resumen.tpm)}</strong>
            </div>
            <div className="metric-row">
              <span>USD</span>
              <strong>{formatCurrency(resumen.usd, 'USD')}</strong>
            </div>
          </div>
        </section>


        <section className="grid grid-2" style={{ marginBottom: '16px' }}>
          <div className="card">
            <h3 className="section-title">Motor de pricing</h3>
            <p className="card-subtitle">
              Recomendación de precios basada en costos, margen objetivo e indicadores económicos.
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
                      <td>{formatPercent(row.ajusteRecomendado)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">Reporte ejecutivo</h3>

            {report && (
              <>
                <div className="metric-row">
                  <span>Título</span>
                  <strong>{report.title}</strong>
                </div>
                <div className="metric-row">
                  <span>Enfoque</span>
                  <strong>{report.focus}</strong>
                </div>
                <div className="metric-row">
                  <span>Prioridad</span>
                  <strong>{report.priority}</strong>
                </div>
                <div className="metric-row">
                  <span>Recomendación principal</span>
                  <strong>{report.mainRecommendation}</strong>
                </div>

                <div className="toolbar">
                  <button className="btn" onClick={saveReport}>
                    Guardar reporte
                  </button>
                  <button className="btn secondary" onClick={exportReport}>
                    Exportar reporte
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}