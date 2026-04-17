export function Badge({ children, className = '', variant = 'default' }) {
    const styles =
      variant === 'outline'
        ? 'border border-slate-300 bg-white text-slate-900'
        : 'bg-slate-900 text-white';
  
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${styles} ${className}`}>
        {children}
      </span>
    );
  }