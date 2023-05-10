import "./App.scss";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// component imports
import Alert from "./components/alert";
import Bootup from "./components/boot";
import Header from "./components/header";
import HelpSidebar from "./components/helpSidebar";
import Terminal from "./components/terminal";
import SshTerminal from "./components/sshTerminal";
import IrcTerminal from "./components/ircTerminal";
import SoftwareSidebar from "./components/softwareSidebar";
import Footer from "./components/footer";

import { toggleElement } from "./functions/toggleElement";

function App() {
  const [username, setUserName] = useState(
    window.localStorage.getItem("username")
  );

  const [sshLoc, setSshLoc] = useState({});
  const [ircLoc, setIrcLoc] = useState({});
  const [alert, setAlert] = useState("");
  const [scp, setSCP] = useState("");
  console.log(scp);

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
                  alert={(alert) => setAlert(alert)}
                  ircLoc={(ircLoc) => setIrcLoc(ircLoc)}
                  scp={(scp) => setSCP(scp)}
                  sshLoc={(sshLoc) => setSshLoc(sshLoc)}
                  username={username}
                />
              }
            />
            <Route
              path="/ssh"
              element={
                <SshTerminal
                  alert={(alert) => setAlert(alert)}
                  scp={scp}
                  sshLoc={sshLoc}
                  username={username}
                />
              }
            />
            <Route
              path="/irc"
              element={
                <IrcTerminal
                  alert={(alert) => setAlert(alert)}
                  ircLoc={ircLoc}
                  username={username}
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
