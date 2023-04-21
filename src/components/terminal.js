import { React, useEffect, useState } from "react";

import CommandHistory from "./commandHistory";
import { cmdParser } from "../functions/cmdParser";
import { isObjectEmpty } from "../functions/isObjectEmpty";
import { Directory } from "../functions/classes";

function Terminal(props) {
  ////////////// COMMANDS INPUT HANDLING ///////////////////////
  const [cmdHistory, setCmdHistory] = useState([{}]);
  const uname = props.username + " $: ";

  const inputHandler = (e) => {
    e.preventDefault();
    const output = e.target.cmd.value.toString().toLowerCase();
    document.getElementById("commandInput").value = "";
    if (output.length === 0) {
      return props.alert("cmd empty");
    } else if (output.length > 100) {
      return props.alert("cmd too long");
    } else {
      const cmdOutput = cmdParser(output, uname);
      cmdHandler(cmdOutput);
    }
  };

  function cmdHandler(cmd) {
    if (isObjectEmpty(cmd) === true) {
      setCmdHistory([{}]);
    } else {
      const newCmd = [...cmdHistory];
      newCmd.unshift(cmd);
      setCmdHistory(newCmd);
    }
  }

  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  //
  // -- DIRECTORIES
  //
  const rootDir = new Directory("root", "n/a");
  //  /root
  const bootDir = new Directory("boot", "root");
  const etcDir = new Directory("etc", "root");
  const homeDir = new Directory("home", "root");
  const usrDir = new Directory("usr", "root");
  //  /home
  const commandsDir = new Directory("/commands", "/home");
  const filesDir = new Directory("/files", "/home");
  const sshDir = new Directory("/ssh", "/files");
  const ircHome = new Directory("irc", "n/a");

  // ssh-bbs
  // /root
  const bbs_mask_2mGUUHfQIk0t = new Directory(
    "bbs_mask_2mGUUHfQIk0t",
    "reso-agwe"
  );
  const bbs_mask_9SOCqTxfm2Zi = new Directory(
    "bbs_mask_9SOCqTxfm2Zi",
    "reso-agwe"
  );
  const bbs_mask_XpPkmHxDgPfN = new Directory(
    "bbs_mask_XpPkmHxDgPfN",
    "reso-agwe"
  );
  const bbs_mask_hMlMhTNGxi05 = new Directory(
    "bbs_mask_hMlMhTNGxi05",
    "reso-agwe"
  );
  // /bbs_mask_9SOCqTxfm2Zi
  const p7FzTKa13OhG = new Directory("p7FzTKa13OhG", "bbs_mask_9SOCqTxfm2Zi");
  const whitelist = new Directory("whitelist", "p7FzTKa13OhG");

  //
  // -- FILES
  //

  ////////////// OBJECT STATE MANAGEMENT ///////////////////////
  const [currentDirectory, setCurrentDirectory] = useState(homeDir);
  console.log(currentDirectory);
  return (
    <>
      <div className="border centrePanel panel scroll centreImage hover">
        <div className="terminalText">
          <p> Parent directory: {currentDirectory._parentDirName}</p>
          <p> Current directory: {currentDirectory._dirName}</p>
          <p> Child directories:</p>
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
