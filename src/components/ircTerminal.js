import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { net } from "../data/network";
import { charsSeventhCircle as chars } from "../data/characters";
import { irc } from "../data/ircSeventhCircle";

import UserDisplayStatus from "./ircUserDisplay";

import { ircCommandParser } from "../functions/cmdParser";

function IrcTerminal(props) {
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // INPUT HANDLING
  //
  function inputHandler(e) {
    e.preventDefault();
    const input = e.target.cmd.value.toString();
    document.getElementById("commandInput").value = "";
    if (input.length === 0) {
      return cmdFlasher("cmd empty");
    } else if (input.length > 100) {
      return cmdFlasher("command cannot be more than 100 characters in length");
    } else {
      const parsedCmd = ircCommandParser(input);
      commandHandler(parsedCmd);
    }
  }

  function commandHandler(command) {
    let result = " ";
    console.log(command.cmd);
    if (Object.keys(command)[1] === "helpStatement") {
      result = command.helpStatement;
    } else {
      switch (command.cmd) {
        case "cmds":
          result = "cmds exit pm t";
          break;
        case "exit":
          result = "Exiting IRC session...";
          setTimeout(() => {
            navigate("/");
          }, 2000);
          break;
        case "pm":
          result = "Starting private message with user: " + command.arg1;
          break;
        case "t":
          result = "YOU ARE NOT PERMITTED TO SEND MESSAGES IN THIS CHANNEL";
          break;
        default:
          result = "something is amiss...";
      }
    }
    cmdFlasher(result);
  }

  function cmdFlasher(message) {
    if (
      typeof message === "string" &&
      message.length > 0 &&
      message.length < 200
    ) {
      const input = document.getElementById("commandInput");
      input.value = message;
      setTimeout(() => {
        input.value = "";
      }, 3000);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // OBJECT STATEs
  //
  const [currentNetworkLocation, setCurrentNetworkLocation] = useState("");
  const [currentIRC, setCurrentIRC] = useState("");
  const [characters, setCharacters] = useState([]);
  const currentUser = chars.aaaUser;

  function assignIrcLoc(loc) {
    switch (loc) {
      case "7th-Circle":
        setCurrentNetworkLocation(net.seventhCircle);
        setCurrentIRC(irc.seventhCircle);
        setCharacters(Object.entries(irc.seventhCircle._members).sort());
        break;
      default:
        props.alert(
          "Failed to load irc client at specified ip address. Returning to host shell session"
        );
        navigate("/");
    }
  }

  useEffect(() => {
    if (currentNetworkLocation === "") {
      assignIrcLoc(props.ircLoc);
    }
  }, [props.ircLoc]);

    console.log(currentIRC._messageHistory)

  return (
    <>
      <div className="border centrePanel panel scroll centreImage hover">
        <p
          className="headerText"
          style={{ fontSize: "44pt", textAlign: "center" }}
        >
          {currentNetworkLocation._netLocName}
        </p>
        <p
          style={{ fontSize: "12pt", textAlign: "center", fontStyle: "italic" }}
        >
          {currentIRC._tagline?.toLowerCase()}
        </p>
        <hr />
        <div id="cmdInput" className="inlineBoxLeft terminalText inputRed">
          <span>
            {currentUser._name}@{currentNetworkLocation._netLocName} $:
          </span>
          <form onSubmit={(e) => inputHandler(e)}>
            <input id="commandInput" autoFocus name="cmd" type="text" />
          </form>
        </div>
        <hr />
        <p className="headerText" style={{fontSize: "22pt", textAlign: "center"}}> Users:</p>
        {characters?.map((char) => {
          const displayStatus = char[1];
          return (
            <div key={crypto.randomUUID()}>
              <UserDisplayStatus user={displayStatus} />
            </div>
          );
        })}
        <hr />
        <p className="headerText" style={{fontSize: "22pt", textAlign: "center"}}> Message history:</p>
        {currentIRC._messageHistory?.map((msg) => {
          return <p className="hoverRed">{msg}</p>;
        })}
      </div>
    </>
  );
}

export default IrcTerminal;
