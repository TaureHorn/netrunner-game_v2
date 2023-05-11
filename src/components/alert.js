function Alert(props) {
  function focusElement(element) {
    setTimeout(() => {
      document.getElementById(element).focus();
    }, 200);
  }

  focusElement("alertClose");

  return (
    <div className="alertBox border">
      <p className="alertText" style={{ fontSize: "32pt", fontWeight: "bolder", lineHeight: "0.25" }}>
        ALERT!
      </p>
      <p className="alertText">{props.alert}</p>
      <button
        id="alertClose"
        className="alertButton"
        onClick={() => props.setAlert("")}
      >
        close
      </button>
    </div>
  );
}

export default Alert;
