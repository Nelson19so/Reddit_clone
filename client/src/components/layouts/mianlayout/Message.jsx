export default function Message({ error, success }) {
  return (
    <div
      className={`__msg ${
        error ? "container-error-msg" : "container-success-msg"
      }`}
    >
      {error && <span>{error}</span>}
      {success && <span>{success}</span>}
    </div>
  );
}
