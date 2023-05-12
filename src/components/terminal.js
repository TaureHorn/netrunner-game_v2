import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { commandParser } from "../functions/cmdParser";
import { dnsTransfer, ircTransfer } from "../functions/dnsTransfer";
import { gameWinMonitor } from "../functions/gameWinState";
import { isObjectEmpty } from "../functions/isEmpty";
import { passwdParser } from "../functions/passwdParser";
import { shutDown } from "../functions/shutDown";
import { toggleElement } from "../functions/toggleElement";

import { net } from "../data/network";
import { rootFS } from "../data/rootFS";
import { usrFS } from "../data/usrFS";
import { zetaTechVM } from "../data/zetatechVM";
import { uiElements } from "../functions/toggleElement";

function Terminal(props) {
  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  //
  // -- DIRECTORY LINKING
  //
  //VM

  net.zombie.linkNetworkedDirectories(zetaTechVM.homeDir);

  zetaTechVM.rootDir.linkDirectories("boot", zetaTechVM.bootDir);
  zetaTechVM.rootDir.linkDirectories("etc", zetaTechVM.etcDir);
  zetaTechVM.rootDir.linkDirectories("home", zetaTechVM.homeDir);
  zetaTechVM.rootDir.linkDirectories("usr", zetaTechVM.usrDir);

  zetaTechVM.bootDir.linkParentDirectory(zetaTechVM.rootDir);
  zetaTechVM.etcDir.linkParentDirectory(zetaTechVM.rootDir);
  zetaTechVM.homeDir.linkParentDirectory(zetaTechVM.rootDir);
  zetaTechVM.usrDir.linkParentDirectory(zetaTechVM.rootDir);

  zetaTechVM.homeDir.linkDirectories("commands", zetaTechVM.commandsDir);
  zetaTechVM.homeDir.linkDirectories("files", zetaTechVM.filesDir);
  zetaTechVM.homeDir.linkDirectories("ssh", zetaTechVM.sshDir);
  zetaTechVM.homeDir.linkDirectories("irc", zetaTechVM.ircHome);

  zetaTechVM.commandsDir.linkParentDirectory(zetaTechVM.homeDir);
  zetaTechVM.filesDir.linkParentDirectory(zetaTechVM.homeDir);
  zetaTechVM.sshDir.linkParentDirectory(zetaTechVM.homeDir);
  zetaTechVM.ircHome.linkParentDirectory(zetaTechVM.homeDir);
  //
  // -- FILE LINKING
  //
  //VM
  zetaTechVM.bootDir.linkFiles("boot", rootFS.boot);
  zetaTechVM.etcDir.linkFiles("etc", rootFS.etc);
  zetaTechVM.usrDir.linkFiles("usr", rootFS.usr);

  zetaTechVM.commandsDir.linkFiles("cat", usrFS.cmds.cat);
  zetaTechVM.commandsDir.linkFiles("cd", usrFS.cmds.cd);
  zetaTechVM.commandsDir.linkFiles("clear", usrFS.cmds.clear);
  zetaTechVM.commandsDir.linkFiles("cmds", usrFS.cmds.cmds);
  zetaTechVM.commandsDir.linkFiles("exit", usrFS.cmds.exit);
  zetaTechVM.commandsDir.linkFiles("file", usrFS.cmds.file);
  zetaTechVM.commandsDir.linkFiles("irc", usrFS.cmds.irc);
  zetaTechVM.commandsDir.linkFiles("ls", usrFS.cmds.ls);
  zetaTechVM.commandsDir.linkFiles("scp", usrFS.cmds.scp);
  zetaTechVM.commandsDir.linkFiles("ssh", usrFS.cmds.ssh);
  zetaTechVM.commandsDir.linkFiles("steghide", usrFS.cmds.steghide);

  zetaTechVM.filesDir.linkFiles(
    "bbs_mask_9SOCqTxfm2Zi.dat",
    usrFS.files.bbsMaskPayload
  );
  zetaTechVM.filesDir.linkFiles(
    "reso-agwe-datamap",
    usrFS.files.resoAgweDatamap
  );
  zetaTechVM.filesDir.linkFiles("task", usrFS.files.task);

  zetaTechVM.sshDir.linkFiles("edgerunnerFTP", usrFS.ssh.edgerunnerFtp);
  zetaTechVM.sshDir.linkFiles("reso-agwe", usrFS.ssh.resoAgweBBS);
  zetaTechVM.sshDir.linkFiles("zetatech-vm-manager", usrFS.ssh.zetatechVM);

  zetaTechVM.ircHome.linkFiles("7th-Circle", usrFS.irc.seventhCircle);

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
          result = currentDirectory.cat(instr.arg1);
          break;
        case "cd":
          const changeDirectory = currentDirectory.cd(instr.arg1);
          if (isObjectEmpty(changeDirectory) === false) {
            setCurrentDirectory(changeDirectory);
            if (changeDirectory._dirName === currentDirectory._dirName) {
              result = "no such directory";
            } else result = changeDirectory._dirName;
          } else {
            result = "you are already at the root directory";
          }
          break;

        case "clear":
          return setCmdHistory([{}]);
        case "cmds":
          result = "cat cd clear cmds exit file irc ls scp ssh steghide toggle";
          break;
        case "exit":
          result = "Exiting virtual machine environment session...";
          shutDown();
          break;
        case "file":
          const file = currentDirectory.file(instr.arg1);
          result = "name: " + file._fileName;
          result2 = "type: " + file._fileType;
          result3 = "access: " + file._fileAccess;
          result4 = "owner: " + file._fileOwner;
          result5 = "creator: " + file._fileCreator;
          break;
        case "irc":
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
        case "ls":
          result = currentDirectory.ls();
          break;
        case "scp":
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
        case "ssh":
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
        case "steghide":
          result = currentDirectory.steghide(instr.arg1);
          break;
        case "toggle":
          if (instr.arg1 in uiElements === true) {
            result = "toggled UI element " + instr.arg1;
            toggleElement(uiElements[instr.arg1]);
          } else {
              result = " ~~ no such UI element"
          }
          break;
        default:
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
  const [currentDirectory, setCurrentDirectory] = useState(zetaTechVM.homeDir);
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
