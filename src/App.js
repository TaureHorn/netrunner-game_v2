import "./App.scss";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// component imports
import Alert from "./components/alert";
import Bootup from "./components/boot";
import Header from "./components/header";
import HelpSidebar from "./components/helpSidebar";
import Terminal from "./components/terminal";
import SoftwareSidebar from "./components/softwareSidebar";
import Footer from "./components/footer";

function App() {
  // username setting
  const [username, setUserName] = useState(
    window.localStorage.getItem("username")
  );

  const [alert, setAlert] = useState("");

  return !username ? (
    <>
      <div className="border page">
        <Bootup alert={(alert) => setAlert(alert)} />
        {alert ? <Alert alert={alert} setAlert={() => setAlert()} /> : <></>}
      </div>
    </>
  ) : (
    <>
      <div className="border page">
        <Header />
        <div className="inlineBox panels">
          <HelpSidebar />
          <Routes>
            <Route path="/" element={<Terminal username={username} alert={(alert) => setAlert(alert)}/>} />
          </Routes>
          <SoftwareSidebar />
        </div>
        <Footer alert={(alert) => setAlert(alert)}/>
      </div>
      {alert ? <Alert alert={alert} setAlert={() => setAlert()} /> : <></>}
    </>
  );
}

export default App;
