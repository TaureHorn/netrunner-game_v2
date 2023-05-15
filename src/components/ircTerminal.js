import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { net } from "../data/network";
import { charsSeventhCircle as chars } from "../data/characters";
import { irc } from "../data/ircSeventhCircle";

import UserDisplayStatus from "./ircUserDisplay";
import UserPrivateMessage from "./ircPrivateMessage";

import { ircCommandParser } from "../functions/cmdParser";
import { sectionSelector } from "../functions/sectionSelector";
import { toggleElement, uiElements } from "../functions/toggleElement";

function IrcTerminal(props) {
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // INPUT HANDLING
  //

  const [cmdHistory, setCmdHistory] = useState("");

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
    if (Object.keys(command)[1] === "helpStatement") {
      result = command.helpStatement;
    } else {
      switch (command.cmd) {
        case "cmds":
          result = "cmds exit messages pm private t toggle users";
          break;
        case "exit":
          result = "Exiting IRC session...";
          setTimeout(() => {
            navigate("/");
          }, 2000);
          break;
        case "messages":
          result = "naviating to messages window";
          sectionSelector(
            sections,
            sections[1],
            headerSections,
            headerSections[1],
            "red"
          );
          break;
        case "pm":
          let findUser = "";
          if (command.arg1 === currentUser._name) {
            result = "Cannot start a private message with yourself!";
          } else {
            findUser = currentIRC.findUser(command.arg1);
          }
          if (findUser === " ~~ no such user. a-Z only") {
            result = findUser;
          } else if (typeof findUser === "object") {
            result = "Starting private message with user: " + findUser._name;
            setPMTarget(findUser);
            setPM(true);
            sectionSelector(
              sections,
              sections[2],
              headerSections,
              headerSections[2],
              "red"
            );
          }
          break;
        case "private":
          result = "navigating to private messages window";
          sectionSelector(
            sections,
            sections[2],
            headerSections,
            headerSections[2],
            "red"
          );
          break;
        case "t":
          result = "YOU ARE NOT PERMITTED TO SEND MESSAGES IN THIS CHANNEL";
          break;
        case "toggle":
          if (command.arg1 in uiElements === true) {
            result = "toggled UI element " + command.arg1;
            toggleElement(uiElements[command.arg1]);
          } else {
            result = " ~~ no such UI element";
          }
          break;
        case "users":
          result = "navigating to users window";
          sectionSelector(
            sections,
            sections[0],
            headerSections,
            headerSections[0],
            "red"
          );
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
      input.placeholder = message;
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

  // arrays of ids for controlling subsection visibility and styling
  const headerSections = [
    "userHeader",
    "messagesHeader",
    "privateMessagesHeader",
  ];
  const sections = ["users", "messages", "privateMessages"];

  //boolean state for private message visibility
  const [pm, setPM] = useState(false);
  const [pmTarget, setPMTarget] = useState({});

  return (
    <>
      <div className="border centrePanel panel centreImage hover">
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
            <input
              id="commandInput"
              autoFocus
              name="cmd"
              placeholder={cmdHistory}
              type="text"
            />
          </form>
        </div>
        <hr />
        <div className="panel scroll">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              outline: "1px solid rgb(255,0,85)",
              marginTop: "4px",
              zIndex: "3",
            }}
          >
            <span
              className="headerText headerButton"
              id="userHeader"
              style={{
                color: "white",
                outline: "1px solid white",
                backgroundColor: "rgba(255,0,85,0.2)",
                zIndex: "3",
              }}
              onClick={() =>
                sectionSelector(
                  sections,
                  sections[0],
                  headerSections,
                  headerSections[0],
                  "red"
                )
              }
            >
              Users
            </span>
            <span
              className="headerText headerButton"
              id="messagesHeader"
              style={{ zIndex: "3" }}
              onClick={() =>
                sectionSelector(
                  sections,
                  sections[1],
                  headerSections,
                  headerSections[1],
                  "red"
                )
              }
            >
              Channel Messages
            </span>
            <span
              className="headerText headerButton"
              id="privateMessagesHeader"
              style={{ zIndex: "3" }}
              onClick={() =>
                sectionSelector(
                  sections,
                  sections[2],
                  headerSections,
                  headerSections[2],
                  "red"
                )
              }
            >
              Private Messages
            </span>
          </div>
          <br />
          <div id="users">
            {characters?.map((char) => {
              const displayStatus = char[1];
              return (
                <div key={crypto.randomUUID()}>
                  <UserDisplayStatus user={displayStatus} />
                </div>
              );
            })}
          </div>
          <div id="messages" style={{ display: "none" }}>
            {currentIRC._messageHistory?.map((msg) => {
              return <p className="hoverRed">{msg}</p>;
            })}
            <hr />
          </div>
          <div id="privateMessages" style={{ display: "none" }}>
            {pm === false ? (
              <div key={crypto.randomUUID()}>
                <p style={{ textAlign: "center" }}>
                  Initiate a private message with a user with the "pm" command
                  followed by the users name.
                </p>
              </div>
            ) : (
              <div key={crypto.randomUUID()}>
                <UserPrivateMessage
                  currentUser={currentIRC._members.aaaUser}
                  netLoc={currentNetworkLocation}
                  targetUser={pmTarget}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default IrcTerminal;
