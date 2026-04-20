export default function GlobalLoader({ message = 'Cargando...' }) {
  return (
    <div className="loader-overlay">
      <div style={{ textAlign: 'center' }}>
        <div className="loader"></div>
        <p style={{ marginTop: '12px', color: '#e5e7eb' }}>{message}</p>
      </div>
    </div>
  );
}