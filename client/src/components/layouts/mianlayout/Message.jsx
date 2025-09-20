export default function Message({ error, success }) {
  return (
    <div className="message-container__">
      <div
        className={`__msg ${
          error ? "container-error-msg" : "container-success-msg"
        }`}
      >
        {/* {error ? <span>{error}</span> : <span>{success}</span>} */}
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
      </div>
    </div>

    // <div className="message-container__">
    //   <div className="__msg container-error-msg">
    //     <span>Error displaying Error displaying</span>
    //   </div>
    //   <div className="__msg container-error-msg">
    //     <span>Error displaying Error displaying</span>
    //   </div>
    //   <div className="__msg container-error-msg">
    //     <span>Error displaying Error displaying</span>
    //   </div>
    // </div>
  );
}
