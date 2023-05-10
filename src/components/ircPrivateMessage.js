import { useState } from "react";

import CommandHistory from "./commandHistory";

import { convoParser } from "../functions/cmdParser";

function UserPrivateMessage(props) {
  const currentUser = props.currentUser;
  const targetUser = props.targetUser;
  const netLoc = props.netLoc;

  const [cmdHistory, setCmdHistory] = useState([]);
  const [convoOptions, changeConvoOptions] = useState([
    "Say Hello",
    "Ask for advice on netrunning",
    "Ask about Reso Agwe",
    "Ask about the hidden warning from `a friend`",
  ]);

  function inputHandler(e) {
    e.preventDefault();
    const input = e.target.cmd.value.toString();
    document.getElementById("pmInput").value = "";
    if (input.length === 0) {
      return inputFlasher("input empty");
    } else if (input.length > 50) {
      return inputFlasher("input cannot be more than 50 characters in length");
    } else {
      const parsedInput = convoParser(input);
      convoHandler(parsedInput);
    }
  }

  function convoHandler(command) {
    if (Object.keys(command)[1] === "helpStatement") {
      return inputFlasher(command.helpStatement);
    } else {
      switch (command.cmd) {
        case "cmds":
          return inputFlasher("cmds option");
        case "option":
          inputFlasher(command.cmd + " " + command.arg1);
          responseParser(convoOptions[command.arg1 - 1]);
          convoCurator(command.arg1 - 1);
          break;
        default:
          return inputFlasher(" something is amiss");
      }
    }
  }

  function responseParser(message) {
    const output = {
      cmd: "",
      result: "",
    };
    const userTag = "[" + currentUser._name + "]: ";
    const responseTag = "[" + targetUser._alias + "]: ";
    switch (message) {
      case "Say Hello":
        output.cmd = userTag + "Hey!";
        output.result = responseTag + targetUser._greeting;
        break;
      case "Ask for advice on netrunning":
        output.cmd = userTag + "I'm kinda new to netrunning. Any advice?";
        output.result = responseTag + targetUser._advice;
        break;
      case "Ask about Reso Agwe":
        output.cmd = userTag + "Do you know how to get into Reso Agwe?";
        output.result = responseTag + targetUser._resoAgweAdvice;
        break;
      case "Ask about the hidden warning from `a friend`":
        output.cmd =
          userTag +
          "I found a warning about shade hidden in a file on my machine signed 'a friend'. Said to find em here. Any detes?";
        output.result = responseTag + targetUser._shadeWarning;
        break;
      default:
        output.cmd = userTag + " ";
        output.result = responseTag + " ";
    }
    if (targetUser._connectionStatus === "offline") {
      // do not output a response from an offline user
      output.result = "";
    }
    convoLogger(output);
  }

  function convoLogger(message) {
    const newCmd = [...cmdHistory];
    newCmd.push(message);
    setCmdHistory(newCmd);
  }

  function convoCurator(index) {
    const tempConvo = convoOptions;
    tempConvo.splice(index, 1);
    changeConvoOptions(tempConvo);
  }

  function inputFlasher(message) {
    if (
      typeof message === "string" &&
      message.length > 0 &&
      message.length < 200
    ) {
      const input = document.getElementById("pmInput");
      input.value = message;
      setTimeout(() => {
        input.value = "";
      }, 1000);
    }
  }

  return (
    <>
      {/* //////////////////// USER INFO  //////////////////////////////*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          outline: "1px solid rgb(255,0,85)",
          backgroundColor: "rgba(255,0,85,0.15)",
        }}
      >
        <img
          src={targetUser._pfp}
          width="256"
          title={targetUser._alias + "'s profile picture"}
          alt="a users profile picture"
        />
        <div style={{ lineHeight: "2", fontSize: "16pt" }}>
          <p>
            <strong>NAME:</strong> <em>{targetUser._name}</em>
          </p>
          <p>
            <strong>ALIAS:</strong> <em>{targetUser._alias}</em>
          </p>
          <p>
            <strong>CONNECTION STATUS:</strong>{" "}
            <em>{targetUser._connectionStatus}</em>
          </p>
        </div>
      </div>
      {/* //////////////////// CONVO HISTORY //////////////////////////////*/}
      <CommandHistory arr={cmdHistory} />
      {/* //////////////////// CONVO OPTIONS  //////////////////////////////*/}
      <div
        style={{
          outline: "1px solid rgb(255,0,85)",
          backgroundColor: "rgba(255,0,85,0.25)",
        }}
      >
        <p className="headerText" style={{ fontSize: "18pt" }}>
          Options:
        </p>
        {convoOptions.map((option, index) => {
          return (
            <div key={crypto.randomUUID()}>
              <span>
                {index + 1}:{option}
              </span>
            </div>
          );
        })}
      </div>
      {/* //////////////////// COMMAND LINE INPUT //////////////////////////////*/}
      <div id="cmdInput" className="inlineBoxLeft terminalText inputRed">
        <span>{currentUser._name}</span>
        <span style={{ fontSize: "32pt" }}>➔</span>
        <span>{targetUser._alias} $:</span>
        <form onSubmit={(e) => inputHandler(e)}>
          <input id="pmInput" autoFocus name="cmd" type="text" />
        </form>
      </div>
    </>
  );
}

export default UserPrivateMessage;
