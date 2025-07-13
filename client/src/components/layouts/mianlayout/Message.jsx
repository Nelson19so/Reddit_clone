export default function Message({ error, success, showError, showSuccess }) {
  return (
    <div>
      <div
        className={`__msg ${
          showError ? "container-error-msg" : "container-success-msg"
        }`}
      >
        {showError && <span>{error}</span>}
        {showSuccess && <span>{success}</span>}
      </div>
    </div>
  );
}
