import "./App.scss";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// component imports
import Alert from "./components/alert";
import Bootup from "./components/boot";
import Header from "./components/header";
import HelpSidebar from "./components/helpSidebar";
import Terminal from "./components/terminal";
import SoftwareSidebar from "./components/softwareSidebar";
import Footer from "./components/footer";

import { toggleElement } from "./functions/toggleElement";
import SshTerminal from "./components/sshTerminal";

function App() {
  const [username, setUserName] = useState(
    window.localStorage.getItem("username")
  );

  const [sshLoc, setSshLoc] = useState({});

  const [alert, setAlert] = useState("");

  return !username ? (
    <>
      <div className="page welcome">
        <Bootup alert={(alert) => setAlert(alert)} />
        {alert ? <Alert alert={alert} setAlert={() => setAlert()} /> : <></>}
      </div>
    </>
  ) : (
    <>
      <button
        onClick={() => toggleElement("helpSidebar")}
        className="toggler helpToggler"
      >
        {" "}
        help{" "}
      </button>

      <button
        onClick={() => toggleElement("softwareSidebar")}
        className="toggler softwareToggler"
      >
        {" "}
        software{" "}
      </button>

      <div className="border page">
        <Header />
        <div className="inlineBox panels">
          <HelpSidebar />
          <Routes>
            <Route
              path="/"
              element={
                <Terminal
                  username={username}
                  alert={(alert) => setAlert(alert)}
                  sshLoc={(sshLoc) => setSshLoc(sshLoc)}
                />
              }
            />
            <Route
              path="/ssh"
              element={
                <SshTerminal
                  username={username}
                  sshLoc={sshLoc}
                  alert={(alert) => setAlert(alert)}
                />
              }
            />
          </Routes>
          <SoftwareSidebar />
        </div>
        <Footer alert={(alert) => setAlert(alert)} />
      </div>
      {alert ? <Alert alert={alert} setAlert={() => setAlert()} /> : <></>}
    </>
  );
}
export default App;
