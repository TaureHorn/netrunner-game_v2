import { React, useEffect, useState } from "react";

import CommandHistory from "./commandHistory";

function Terminal(props) {
  ////////////// COMMANDS INPUT HANDLING ///////////////////////
  const [cmdHistory, setCmdHistory] = useState([{}]);
  const uname = props.username + " $: ";

  const inputHandler = (e) => {
    e.preventDefault();
    const output = e.target.cmd.value.toString().toLowerCase();
    if (output.length === 0) {
      inputClearer("commandInput");
      return props.alert("cmd empty");
    } else if (output.length > 100) {
      inputClearer("commandInput");
      return props.alert("cmd too long");
    } else {
      inputClearer("commandInput");
      cmdInterpreter(output);
    }
  };

  function inputClearer(element) {
    document.getElementById(element).value = "";
  }

  ////////////// COMMANDS INPUT PARSING ///////////////////////

  const cmdInterpreter = (command) => {
    const cmd = command.split(" ");
    const prependReturn = (uname + command).toString();
    switch (cmd[0]) {
      case "cat":
        // cat ////////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1: "print content of a file",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1: "data goes here",
          });
        }
        break;
      case "clear":
        // clear //////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1: "clear the terminal",
          });
        } else {
          setCmdHistory([{}]);
        }
        break;
      case "cmds":
        // cmds ////////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1: "lists available terminal comands",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1:
              "cat, clear, cmds, exit, file,  irc, ls, scp, ssh, steghide,",
            return2:
              "append any of these commands with --help or -h to learn what it does",
          });
        }
        break;
      case "exit":
        // exit ///////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1:
              "exits session. erases all virtual machine environment data",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1: "erasing Virtual Machine Environment!",
          });
          shutDown();
        }
        break;
      case "file":
        // file ////////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1: "prints metadata of file",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1: "data goes here",
          });
        }
        break;
      case "irc":
        // irc ////////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1:
              "moves session to Internet Relay Chat. append with IRC server ip address",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1: "... attempting to migrate tty session to BBS @" + cmd[1],
          });
        }
        break;
      case "ls":
        // ls ////////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1: "list files in current directory",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1: "data goes here",
          });
        }
        break;
      case "scp":
        // scp //////////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1:
              "copies a file to a networked location. append with file name and network location ip address",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1: "moved file " + cmd[1] + " to location " + cmd[2],
          });
        }
        break;
      case "ssh":
        // ssh //////////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1:
              "securely log into remote system. append with remote system ip address",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1:
              "... attempting to migrate tty session to shell @" + cmd[1],
          });
        }
        break;
      case "steghide":
        // steghide /////////
        if (cmd[1] === "--help" || cmd[1] === "-h") {
          cmdHandler({
            cmd: prependReturn,
            return1:
              "prints any information hidden in a file using steganography. append with filename",
          });
        } else {
          cmdHandler({
            cmd: prependReturn,
            return1: "data goes here",
          });
        }
        break;
      default:
        // command not found /////////
        const err = (cmd[0] + ": command not found ...").toString();
        cmdHandler({
          cmd: prependReturn,
          return1: err,
        });
    }
  };

  function cmdHandler(cmd) {
    const newCmd = [...cmdHistory];
    newCmd.unshift(cmd);
    setCmdHistory(newCmd);
  }

  function shutDown() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("gameState");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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
