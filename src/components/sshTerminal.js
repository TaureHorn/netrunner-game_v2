import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { commandParser } from "../functions/cmdParser";
import { isObjectEmpty } from "../functions/isEmpty";
import { passwdParser } from "../functions/passwdParser";
import { scpParser } from "../functions/scpParser";
import { toggleElement } from "../functions/toggleElement";
import { uiElements } from "../functions/toggleElement";

import { angryDir, angryFS } from "../data/angryDaemon";
import { edgeDir } from "../data/edgeRunnerFTP";
import { net } from "../data/network";
import { ResoAgweBBS } from "../data/resoAgwe";

function SshTerminal(props) {
  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  //
  // -- DIRECTORY LINKING
  //
  //RESO AGWE BBS
  net.resoAgwe.linkNetworkedDirectories(ResoAgweBBS.resoAgwe);
  net.edgerunnerFTP.linkNetworkedDirectories(edgeDir.homeDir);
  net.angryDaemons.linkNetworkedDirectories(angryDir.homeDir);

  ////////////// COMMANDS INPUT HANDLING /////////////////////////////////////////////////////////
  const [cmdHistory, setCmdHistory] = useState([{}]);
  const [passwdReq, setPasswdReq] = useState(true);
  const username = props.username.split("@");
  const uname = username[0] + "@" + props.sshLoc + " $: ";
  const navigate = useNavigate();

  useEffect(() => {
    if (cmdHistory[0].cmd !== uname.toString()) {
      cmdLogger({ cmd: "", result: "enter password for " + props.sshLoc });
    }
  }, [passwdReq === true]);

  const inputHandler = (e) => {
    e.preventDefault();
    const input = e.target.cmd.value.toString();
    document.getElementById("commandInput").value = ""; // reset command input field
    // input interpreter
    if (input.length === 0) {
      return cmdLogger({ cmd: uname, result: "cmd empty" });
    } else if (input.length > 100) {
      return cmdLogger({
        cmd: uname,
        result: "command cannot be more than 100 characters in length",
      });
    } else if (passwdReq === true) {
      const judgePass = passwdParser(currentNetworkLocation, input);
      if (input === "exit") {
        cmdLogger({
          cmd: uname,
          result: "Exiting SSH session and returning to host session",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (judgePass === true) {
        setPasswdReq(false);
        cmdLogger({
          cmd: uname,
          result: "authentication successful!",
        });
      } else {
        cmdLogger({
          cmd: uname,
          result: "authentication unsuccessful. please try again",
        });
      }
    } else {
      const parsedCmd = commandParser(input);
      commandHandler(parsedCmd, input);
    }
  };

  function commandHandler(instr, command) {
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
          result = "Exiting SSH session, and returning to host session";
          setTimeout(() => {
            navigate("/");
          }, 2000);
          break;
        case "file":
          const file = currentDirectory.file(instr.arg1);
          result = "name: " + file._fileName;
          result2 = "type: " + file._fileType;
          result3 = "access: " + file._fileType;
          result4 = "owner: " + file._fileOwner;
          result5 = "creator: " + file._fileCreator;
          break;
        case "irc":
        case "ls":
          result = currentDirectory.ls();
          break;
        case "scp":
        case "ssh":
          result = "Cannot recursively spawn shells";
          break;
        case "steghide":
          result = currentDirectory.steghide(instr.arg1);
          break;
        case "toggle":
          if (instr.arg1 in uiElements === true) {
            result = "toggled UI element " + instr.arg1;
            toggleElement(uiElements[instr.arg1]);
          } else {
            result = " ~~ no such UI element";
          }
          break;

        default:
          console.log(
            "An error has occurred. Somehow commandParser has output an invalid command"
          );
      }
    }
    const output = {
      cmd: uname + command,
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
  const [currentNetworkLocation, setCurrentNetworkLocation] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("");
  // const childDirs = Object.entries(currentDirectory?._linkedDirs);
  const [childDirs, setChildDirs] = useState([]);

  const [fileSystem, updateFileSystem] = useState("");

  function assignNetLoc(loc) {
    switch (loc) {
      case "reso_agweBBS":
        setCurrentNetworkLocation(net.resoAgwe);
        setCurrentDirectory(net.resoAgwe._linkedNetworkDirectories);
        break;
      case "EdgerunnersFTP":
        setCurrentNetworkLocation(net.edgerunnerFTP);
        setCurrentDirectory(net.edgerunnerFTP._linkedNetworkDirectories);
        break;
      case "AngryDaemons":
        setCurrentNetworkLocation(net.angryDaemons);
        setCurrentDirectory(net.angryDaemons._linkedNetworkDirectories);
        break;
      default:
        props.alert(
          "Secure shell failed to spawn at specified ip address. Returning to host shell session"
        );
        navigate("/");
    }
    if (currentNetworkLocation._password === " ") {
      setPasswdReq(false);
    }
  }

  useEffect(() => {
    // set location based on input
    if (currentNetworkLocation === "") {
      assignNetLoc(props.sshLoc);
    }
  }, [props.sshLoc]);

  useEffect(() => {
    // creating assignment of scp transferred file to ssh directories
    if (
      typeof props.scp === "object" &&
      props.scp.loc._netLocName === currentNetworkLocation._netLocName
    ) {
      const dirLoc = scpParser(props.scp);
      const file = props.scp.file;
      updateFileSystem("scpTriggered");
      return dirLoc.linkFiles(file._fileName, file); // file linking
    }
  }, [passwdReq]);

  useEffect(() => {
    if (currentDirectory !== "") {
      setChildDirs(Object.entries(currentDirectory._linkedDirs));
    }
  }, [currentDirectory]);

  function daemonTesterDecrypt() {
    if (
      "bbs_mask_9SOCqTxfm2Zi.dat" in
      currentNetworkLocation._linkedNetworkDirectories._fileDirLink
    ) {
      const decrypted = net.angryDaemons._linkedNetworkDirectories.linkFiles(
        "bbs_mask_9SOCqTxfm2Zi.dat.decrypt",
        angryFS.bbsMaskPayloadDecrypt
      );
      return decrypted;
    }
  }

  function daemonTesterReport() {
    if (
      "bbs_mask_9SOCqTxfm2Zi.dat" in
      currentNetworkLocation._linkedNetworkDirectories._fileDirLink
    ) {
      const report = net.angryDaemons._linkedNetworkDirectories.linkFiles(
        "test-report_1545",
        angryFS.testReport
      );
      return report;
    }
  }

  useEffect(() => {
    let decrypted = "";
    let report = "";
    if (currentDirectory === net.angryDaemons._linkedNetworkDirectories) {
      decrypted = daemonTesterDecrypt();
      report = daemonTesterReport();
    }
  }, [fileSystem]);

  return (
    <>
      <div className="border centrePanel panel scroll centreImage hover">
        <div className="terminalText">
          <p>
            {" "}
            Parent directory: {currentDirectory?._linkedParentDir?._dirName}
          </p>
          <p> Current directory: {currentDirectory?._dirName}</p>
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

export default SshTerminal;
