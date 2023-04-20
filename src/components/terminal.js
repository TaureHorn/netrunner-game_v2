import { React, useEffect, useState } from "react";

import CommandHistory from "./commandHistory";
import { cmdParser } from "../functions/cmdParser";
import { isObjectEmpty } from "../functions/isObjectEmpty";

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

  class Directory {
    constructor(dirName, parentDirName) {
      this._dirName = dirName;
      this._parentDirName = parentDirName;
      this._linkedDirs = {};
      this._fileDirLink = {};
    }
  }

  return (
    <>
      <div className="border centrePanel panel scroll">
        <div>
          <p> Current:</p>
        </div>
        <hr />
        <div>
          <span>{uname}</span>
          <form onSubmit={(e) => inputHandler(e)}>
            <input
              id="commandInput"
              autoFocus
              name="cmd"
              type="text"
              placeholder="$:"
            />
          </form>
        </div>
        <hr />
        <CommandHistory arr={cmdHistory} />
      </div>
    </>
  );
}

export default Terminal;
