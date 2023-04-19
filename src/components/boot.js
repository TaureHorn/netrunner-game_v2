import { React, useEffect, useState } from "react";

function Bootup(props) {
  const [ueid, setUeid] = useState("");
  useEffect(() => {
    setUeid("zetatech_" + Math.random().toString().slice(2, 8));
  }, []);

  const userHandler = (e) => {
    e.preventDefault();
    const uname = e.target.username.value.toLowerCase().toString();
    if (uname.length < 3 || uname.length > 16) {
      return props.alert("invalid username length");
    } else {
      bootup(uname);
    }
  };

  const bootup = (user) => {
    const username = (user + "@" + ueid).toString();
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("gameState", "new");
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
          <input type="text" autoFocus name="username" placeholder="username" />
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default Bootup;
