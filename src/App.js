import "./App.scss";
import { useEffect, useState } from "react";
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

import { shutDown } from "./functions/shutDown";
import { gameWinAppearance } from "./functions/gameWinState";

function App() {
  const [username, setUserName] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const userGet = window.localStorage.getItem("username");
    if (userGet !== null) {
      setUserName(userGet);
    }
  }, []);

  useEffect(() => {
    const notesGet = window.localStorage.getItem("notes");
    if (notesGet !== null) {
      setNotes(notesGet);
    }
  }, [username]);

  useEffect(() => {
    if (username || username !== "") {
      const split = username?.split("@");
      setUserAlias(split[0]);
    }
  }, [username]);

  const [sshLoc, setSshLoc] = useState({});
  const [ircLoc, setIrcLoc] = useState({});
  const [OSalert, setAlert] = useState("");
  const [scp, setSCP] = useState("");
  const [winState, changeWinState] = useState("unset");

  useEffect(() => {
    if (winState === false) {
      setTimeout(() => {
        gameWinAppearance(winState);
        setAlert(
          "INSTRUSION DETECTED. ROOT PRIVILEGES ACQUIRED BY EXTERNAL SHELL. ERASING VIRTUAL MACHINE..."
        );
      }, 1000);
      setTimeout(() => {
        shutDown();
      }, 11000);
    } else if (winState === true) {
      setTimeout(() => {
        gameWinAppearance(winState);
        setAlert(
          "Hey " +
            userAlias +
            ". It's K1W1. I've analysed the dat file you uploaded. Details on the Angry Daemon server if you wanna take a look. Shade is doin some hella shady shit with this. Excuse the pun. You may have just saved your life, and maybe shades too by not following his instructions. My advice, never touch this virtual machine again. And never talk to shade again either..."
        );
      }, 10000);
    }
  }, [winState]);

  return !username ? (
    <>
      <div className="page welcome">
        <Bootup alert={(OSalert) => setAlert(OSalert)} />
        {OSalert ? (
          <Alert alert={OSalert} setAlert={() => setAlert()} />
        ) : (
          <></>
        )}
      </div>
    </>
  ) : (
    <>
      <div className="border page">
        <Header />
        <div className="inlineBox panels">
          <HelpSidebar />
          <Routes>
            <Route
              path="/"
              element={
                <Terminal
                  alert={(OSalert) => setAlert(OSalert)}
                  ircLoc={(ircLoc) => setIrcLoc(ircLoc)}
                  scp={(scp) => setSCP(scp)}
                  sshLoc={(sshLoc) => setSshLoc(sshLoc)}
                  username={username}
                  winState={(winState) => changeWinState(winState)}
                />
              }
            />
            <Route
              path="/ssh"
              element={
                <SshTerminal
                  alert={(OSalert) => setAlert(OSalert)}
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
                  alert={(OSalert) => setAlert(OSalert)}
                  ircLoc={ircLoc}
                  username={username}
                />
              }
            />
          </Routes>
          <SoftwareSidebar notes={notes} />
        </div>
        <Footer alert={(OSalert) => setAlert(OSalert)} />
      </div>
      {OSalert ? <Alert alert={OSalert} setAlert={() => setAlert()} /> : <></>}
    </>
  );
}
export default App;
