import React from 'react';
import { getSeverityBadgeClass } from '../../lib/helpers';

export default function AlertsPanel({ alerts = [], loading = false, onRefresh }) {
  if (loading) {
    return (
      <div className="card">
        <h3 className="section-title">Alertas inteligentes</h3>
        <p className="muted">Cargando alertas...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <h3 className="section-title" style={{ marginBottom: '6px' }}>
            Alertas inteligentes
          </h3>
          <p className="card-subtitle">
            Señales priorizadas para decisiones ejecutivas.
          </p>
        </div>

        {onRefresh && (
          <button className="btn secondary" onClick={onRefresh}>
            Actualizar
          </button>
        )}
      </div>

      {!alerts.length ? (
        <div className="muted">No hay alertas activas en este momento.</div>
      ) : (
        alerts.map((alert) => (
          <div className="alert-item" key={alert.id}>
            <div>
              <div style={{ marginBottom: '6px' }}>
                <span className={`badge ${getSeverityBadgeClass(alert.severity)}`}>
                  {String(alert.severity || 'info').toUpperCase()}
                </span>
              </div>

              <strong>{alert.title}</strong>

              <div className="muted small" style={{ marginTop: '6px' }}>
                {alert.message}
              </div>
            </div>

            <div className="small muted" style={{ minWidth: '100px', textAlign: 'right' }}>
              {alert.area || 'General'}
            </div>
          </div>
        ))
      )}
    </div>
  );
}