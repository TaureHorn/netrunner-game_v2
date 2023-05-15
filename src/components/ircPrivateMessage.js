import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { gameStateIDs } from "../functions/gameWinState";

function UserPrivateMessage(props) {
  const { userID } = useParams;
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
    inputFlasher(command);
    responseParser(convoOptions[command - 1]);
    convoCurator(command - 1);
  }

  function responseParser(message) {
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
    const tempConvo = convoOptions;
    tempConvo.splice(index, 1);
    changeConvoOptions(tempConvo);
  }

  function inputFlasher(number) {
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
            <strong>ID:</strong> <em>{targetUser._userID}</em>
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
                {index + 1}: {option}
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
          <input
            id="pmInput"
            autoFocus
            placeholder="Enter the number of the conversation option you want here"
            name="cmd"
            type="text"
          />
        </form>
      </div>
    </>
  );
}

export default UserPrivateMessage;
