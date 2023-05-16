import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { commandParser } from "../functions/cmdParser";
import { dnsTransfer, ircTransfer } from "../functions/dnsTransfer";
import { gameStateTracker } from "../functions/gameWinState";
import { gameWinMonitor } from "../functions/gameWinState";
import { isObjectEmpty } from "../functions/isEmpty";
import { passwdParser } from "../functions/passwdParser";
import { shutDown } from "../functions/shutDown";
import { toggleElement } from "../functions/toggleElement";
import { uiElements } from "../functions/toggleElement";

import { net } from "../data/network";
import { zetatechDir } from "../data/zetatechVM";

function Terminal(props) {
  net.zombie.linkNetworkedDirectories(zetatechDir.homeDir);
  ////////////// COMMANDS INPUT HANDLING /////////////////////////////////////////////////////////
  const [cmdHistory, setCmdHistory] = useState([{}]);
  const uname = props.username + " $: ";
  const navigate = useNavigate();

  const inputHandler = (e) => {
    // takes input from command line
    e.preventDefault();
    const input = e.target.cmd.value.toString();
    document.getElementById("commandInput").value = "";
    if (input.length === 0) {
      return cmdLogger({ cmd: uname, result: "cmd empty" });
    } else if (input.length > 100) {
      return cmdLogger({
        cmd: uname,
        result: "command cannot be more than 100 characters in length",
      });
    } else {
      const parsedCmd = commandParser(input); // checks input commands for correct number of arguments and outputs an object
      commandHandler(parsedCmd, input); // logic of handling commands and arguments based on object states
    }
  };

  function commandHandler(instr, command) {
    // assess object input for recognised commands and handles the logic for the command and its arguments.
    const input = command.toLowerCase();
    let result = " ";
    let result2 = "";
    let result3 = "";
    let result4 = "";
    let result5 = "";
    if (Object.keys(instr)[1] === "helpStatement") {
      result = instr.helpStatement;
    } else {
      switch (instr.cmd) {
        case "cat":
          // concatenate file - output file contents | checking for file in directory occurs in constructor method
          result = currentDirectory.cat(instr.arg1);
          if (instr.arg1 === "task" || instr.arg1 === "edgerunnerFTP") {
            gameStateTracker(instr.arg1);
          }
          break;
        case "cd":
          // change directory
          const changeDirectory = currentDirectory.cd(instr.arg1);
          if (isObjectEmpty(changeDirectory) === false) {
            setCurrentDirectory(changeDirectory);
            if (changeDirectory._dirName === currentDirectory._dirName) {
              result = "~~ no such directory";
            } else result = changeDirectory._dirName;
          } else {
            result = "you are already at the root directory";
          }
          break;
        case "clear":
          // clear the terminal history
          return setCmdHistory([{}]);
        case "cmds":
          // returns list of possible commands
          result = "cat cd clear cmds exit file irc ls scp ssh steghide toggle";
          break;
        case "exit":
          // exit vm session and navigates back to login page
          result = "Exiting virtual machine environment session...";
          shutDown();
          break;
        case "file": // checks if file exists in current directory and outputs its metadata if it does
          const file = currentDirectory.file(instr.arg1);
          if (typeof file !== "object") {
            result = "~~ no such file";
          } else {
            console.log(file);
            result = "name: " + file._fileName;
            result2 = "type: " + file._fileType;
            result3 = "access: " + file._fileAccess;
            result4 = "owner: " + file._fileOwner;
            result5 = "creator: " + file._fileCreator;
          }
          break;
        case "irc":
          // checks if argumet matches irc ip and outputs success/failure message. on success navigate to irc passing dat aup as props
          const ircLoc = ircTransfer(instr.arg1);
          if (typeof ircLoc !== "object") {
            result = ircLoc;
          } else {
            props.ircLoc(ircLoc._netLocName);
            result = "Migrating to irc system...";
            setTimeout(() => {
              navigate("irc");
            }, 2000);
          }
          break;
        case "ls": // lists file contents of current directory | empty checkin handled in constructor method
          result = currentDirectory.ls();
          break;
        case "scp":
          // secure copy. sets parsed arguments to states and procedurally checks those states to see if the argument outputs are valid
          // if arguments are valid, passes data up as props and checks if data meets game win/loss criteria
          // inputs parsing
          const fileToCopy = currentDirectory.file(instr.arg1);
          const serverLocation = dnsTransfer(instr.arg2);
          const passwordCorrect = passwdParser(serverLocation, instr.arg3);
          // input error checking
          if (passwordCorrect === false) {
            result = "server password incorrect";
          }
          if (typeof serverLocation !== "object") {
            result = serverLocation;
          }
          if (typeof fileToCopy !== "object") {
            result = fileToCopy;
          }
          // output
          if (result === " ") {
            result =
              "file " +
              fileToCopy._fileName +
              " was securely copied to " +
              serverLocation._netLocName;
            props.scp({ loc: serverLocation, file: fileToCopy });
            // win state monitoring
            const winCheck = gameWinMonitor(
              fileToCopy,
              serverLocation._ipAddress
            );
            if (typeof winCheck === "boolean") {
              props.winState(winCheck);
            }
          }
          break;
        case "ssh": // secure shell. checks if argument is valid ssh ip, if so passes data up as props and navigates to ssh
          const ipLoc = dnsTransfer(instr.arg1);
          if (typeof ipLoc != "object") {
            result = ipLoc;
          } else {
            props.sshLoc(ipLoc._netLocName);
            result = "Spawning secure shell in remote location...";
            setTimeout(() => {
              navigate("/ssh");
            }, 2000);
          }
          break;
        case "steghide": // lists "hidden file info" | checking for file in current directory happens in constructor method
          result = currentDirectory.steghide(instr.arg1);
          break;
        case "toggle": // checks if argument matched list of ui elements and toggles element visibititly if true
          if (instr.arg1 in uiElements === true) {
            result = "toggled UI element " + instr.arg1;
            toggleElement(uiElements[instr.arg1]);
          } else {
            result = " ~~ no such UI element";
          }
          break;
        default: // should never show, error checking mostly occurs earlier in chain
          console.log(
            "An error has occurred. Somehow commandParser has output an invalid command"
          );
      }
    }
    const output = {
      cmd: uname + input,
      result: result,
      result2: result2,
      result3: result3,
      result4: result4,
      result5: result5,
    };
    cmdLogger(output);
  }

  function cmdLogger(cmd) {
    const newCmd = [...cmdHistory];
    newCmd.unshift(cmd);
    setCmdHistory(newCmd);
  }

  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  const [currentDirectory, setCurrentDirectory] = useState(zetatechDir.homeDir);
  const childDirs = Object.entries(currentDirectory._linkedDirs);

  return (
    <>
      <div
        id="centrePanel"
        className="border centrePanel panel scroll centreImage hover"
      >
        <div className="terminalText">
          <p> Parent directory: {currentDirectory._linkedParentDir._dirName}</p>
          <p> Current directory: {currentDirectory._dirName}</p>
          <span> Child directories: </span>
          {childDirs?.map((dir) => {
            return <span key={crypto.randomUUID()}>{dir[0]} </span>;
          })}
        </div>
        <hr />
        <div id="cmdInput" className="inlineBoxLeft terminalText">
          <span>{uname}</span>
          <form onSubmit={(e) => inputHandler(e)}>
            <input id="commandInput" autoFocus name="cmd" type="text" />
          </form>
        </div>
        <hr />
        <div className="cmdReturn terminalText">
          <CommandHistory arr={cmdHistory} />
        </div>
      </div>
    </>
  );
}

export default Terminal;
