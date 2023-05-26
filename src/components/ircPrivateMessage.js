import { useEffect, useState } from "react";

import CommandHistory from "./commandHistory";

import { gameStateIDs } from "../functions/gameWinState";

function UserPrivateMessage(props) {
  const currentUser = props.currentUser;
  const targetUser = props.targetUser;

  const [cmdHistory, setCmdHistory] = useState([]);
  const [convoOptions, changeConvoOptions] = useState([
    "Say hello",
    "Ask for advice on netrunning",
  ]);

  const convoAdditions = {
    greeting: "Say hello", // used only as reference
    netrunnerAdvice: "Ask for advice on netrunning", // used only as a reference
    resoAgweAdvice: "Ask about getting on to Reso Agwe",
    shadeWarning: "Ask about the hidden warning about shade from `a friend`",
  };

  useEffect(() => {
    // if local storage has keys to indicate the player has found certain information => adds questions about that information to the convo options list
    const newConvoOptions = [...convoOptions];
    if (window.localStorage.getItem("plan") === gameStateIDs.plan) {
      // set conversation option based on the task found in home file system
      newConvoOptions.push(convoAdditions.resoAgweAdvice);
    }
    if (window.localStorage.getItem("warning") === gameStateIDs.warning) {
      // set conversation option based on the warning found in home files system
      newConvoOptions.push(convoAdditions.shadeWarning);
    }
    changeConvoOptions(newConvoOptions);
  }, [props.targetUser]);

  function inputHandler(e) {
    e.preventDefault();
    const input = parseInt(e.target.cmd.value);
    document.getElementById("pmInput").value = "";
    if (typeof input !== "number" || input > convoOptions.length) {
      return inputFlasher(
        "please enter a number between 1 and " + convoOptions.length
      );
    } else {
      convoHandler(input);
    }
  }

  function convoHandler(command) {
    inputFlasher(command); // records the last entered command / command error message by setting input box placeholder
    responseParser(convoOptions[command - 1]); // parses option inputs and outputs response based on which conversation option is entered
    convoCurator(command - 1); // removes the inputed conversation option from the list and updates the list
  }

  function responseParser(message) {
    // parses option inputs and outputs response based on which conversation option is entered
    const output = {
      cmd: "",
      result: "",
    };
    const userTag = "[" + currentUser._name + "]: ";
    const responseTag = "[" + targetUser._alias + "]: ";
    switch (message) {
      case convoAdditions.greeting:
        output.cmd = userTag + "Hey!";
        output.result = responseTag + targetUser._greeting;
        break;
      case convoAdditions.netrunnerAdvice:
        output.cmd = userTag + "I'm kinda new to netrunning. Any advice?";
        output.result = responseTag + targetUser._advice;
        break;
      case convoAdditions.resoAgweAdvice:
        output.cmd = userTag + "Do you know how to get into Reso Agwe?";
        output.result = responseTag + targetUser._resoAgweAdvice;
        break;
      case convoAdditions.shadeWarning:
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
    // removes the inputed conversation option from the list and updates the list
    const tempConvo = convoOptions;
    tempConvo.splice(index, 1);
    changeConvoOptions(tempConvo);
  }

  function inputFlasher(number) {
    // records the last entered command / command error message by setting input box placeholder
    const output = number.toString();
    const input = document.getElementById("pmInput");
    return (input.placeholder = output);
  }

  return (
    <>
      {/* //////////////////// USER INFO  //////////////////////////////*/}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div className="userInfo">
          <img
            src={targetUser._pfp}
            width="256"
            title={targetUser._alias + "'s profile picture"}
            alt="users profile"
          />
          <div style={{ lineHeight: "2", fontSize: "16pt" }}>
            <p className="ircText">
              <strong>NAME:</strong> <em>{targetUser._name}</em>
            </p>
            <p className="ircText">
              <strong>ALIAS:</strong> <em>{targetUser._alias}</em>
            </p>
            <p className="ircText">
              <strong>ID:</strong> <em>{targetUser._userID}</em>
            </p>
            <p className="ircText">
              <strong>CONNECTION STATUS:</strong>{" "}
              <em>{targetUser._connectionStatus}</em>
            </p>
          </div>
        </div>
        {/* //////////////////// CONVO OPTIONS  //////////////////////////////*/}
        <div>
          <p className="ircText ircHighlightText">
            what would you like to message {targetUser._alias} about?
          </p>
          {convoOptions.map((option, index) => {
            return (
              <div key={crypto.randomUUID()}>
                <p className="ircText item">
                  {index + 1}: {option}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* //////////////////// COMMAND LINE INPUT //////////////////////////////*/}
      <div id="cmdInput" className="ircCmdInput">
        <span className="ircText">{currentUser._name}</span>
        <span className="ircText" style={{ fontSize: "22pt" }}>
          ➔
        </span>
        <span className="ircText">{targetUser._alias} $:</span>
        <form className="form" onSubmit={(e) => inputHandler(e)}>
          <input
            id="pmInput"
            className="ircCommands"
            autoFocus
            placeholder="Enter the number of the conversation option you want here"
            name="cmd"
            type="text"
          />
        </form>
      </div>
      {/* //////////////////// CONVO HISTORY //////////////////////////////*/}
      <CommandHistory arr={cmdHistory} />
    </>
  );
}

export default UserPrivateMessage;
