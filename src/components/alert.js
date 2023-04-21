function Alert(props) {
  function focusElement(element) {
    setTimeout(() => {
      document.getElementById(element).focus();
    }, 200);
  }

  focusElement("alertClose");

  return (
    <div className="alertBox border">
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
