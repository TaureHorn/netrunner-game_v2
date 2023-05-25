import { useEffect, useState } from "react";
import { regexAlpha } from "../functions/regex";

function Bootup(props) {
  const [ueid, setUeid] = useState("");
  useEffect(() => {
    setUeid("zetatech_" + Math.random().toString().slice(2, 8));
  }, []);

  const userHandler = (e) => { // handles the output from the input box
    e.preventDefault();
    const uname = e.target.username.value.toString();
    const unameValid = regexAlpha(uname); // boolean output check for if uname contains only alphanumeric values
    if (uname.length < 3 || uname.length > 20) {
      return props.alert("invalid username length");
    } else if (unameValid === false) {
      return props.alert("username must contain only alphanumeric characters");
    } else {
      bootup(uname);
    }
  };

  const bootup = (user) => { // commits user data to local storage and loads into main UI
    const username = (user + "@" + ueid).toString();
    window.localStorage.setItem("username", username);
    props.alert("welcome " + username + ". loading virtual environment");
    return setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <div className="inlineBox">
      <div>
        <p>
          Welcome to the ZetaTech Online Machine Buffered Information
          Environment (ZOMBIE)
        </p>
        <p>Virtual Machine Environment is booting for the first time</p>
        <p>hostname: {ueid}</p>
        <p>please enter a username</p>
        <form onSubmit={(e) => userHandler(e)}>
          <input className="commands" type="text" autoFocus name="username" />
        </form>
      </div>
    </div>
  );
}

export default Bootup;
