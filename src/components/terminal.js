import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { commandParser } from "../functions/cmdParser";
import { dnsTransfer } from "../functions/dnsTransfer";
import { shutDown } from "../functions/shutDown";

import { net } from "../data/network";
import { rootFS } from "../data/rootFS";
import { usrFS } from "../data/usrFS";
import { zetaTechVM } from "../data/zetatechVM";

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
    e.preventDefault();
    const input = e.target.cmd.value.toString();
    document.getElementById("commandInput").value = "";
    if (input.length === 0) {
      return props.alert("cmd empty");
    } else if (input.length > 100) {
      return props.alert("cmd too long");
    } else {
      const parsedCmd = commandParser(input);
      commandHandler(parsedCmd, input);
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
          setCurrentDirectory(changeDirectory);
          if (changeDirectory._dirName === currentDirectory._dirName) {
            result = "no such directory";
          } else result = changeDirectory._dirName;
          break;
        case "clear":
          return setCmdHistory([{}]);
        case "cmds":
          result = "cat cd clear cmds exit file irc ls scp ssh steghide";
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
        case "ls":
          result = currentDirectory.ls();
          break;
        case "scp":
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
      <div className="border centrePanel panel scroll centreImage hover">
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
