export default function ToastMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="toast-message" role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">✓</span>
      <span>{message}</span>
      <button onClick={onDismiss} aria-label="Fechar aviso">×</button>
    </div>
  );
}
