import { useEffect } from "react";

function Alert(props) {
  function focusElement(element) {
    setTimeout(() => {
      document.getElementById(element).focus();
    }, 200);
  }

  useEffect(() => {
    if (props.alert != "") {
      document.getElementById("alerter").showModal();
      focusElement("alertClose");
    }
  }, [props.alert]);
  return (
    <>
      <dialog closed id="alerter" className="alertDialog bg border">
        <p className="alertHeader highlightText">ALERT</p>
        <p className="highlightText">{props.alert}</p>
        <form method="dialog">
          <button
            id="alertClose"
            className="alertButton bg border"
            onClick={() => props.setAlert("")}
          >
            <p className="highlightText">close</p>
          </button>
        </form>
      </dialog>
    </>
  );
}

export default Alert;
