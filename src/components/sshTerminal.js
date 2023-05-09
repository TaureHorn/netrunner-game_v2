import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { commandParser } from "../functions/cmdParser";

import { net } from "../data/network";
import { reso } from "../data/reso";
import { ResoAgweBBS } from "../data/resoAgwe";
import { edgeDirs } from "../data/dirsEdgerunnerFTP";
import { edgeFS } from "../data/filesEdgerunnerFTP";
import { angryDir, angryFS } from "../data/angryDaemon";
import { passwdParser } from "../functions/passwdParser";

function SshTerminal(props) {
  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  //
  // -- DIRECTORY LINKING
  //
  //RESO AGWE BBS
  net.resoAgwe.linkNetworkedDirectories(ResoAgweBBS.resoAgwe);
  net.edgerunnerFTP.linkNetworkedDirectories(edgeDirs.homeDir);
  net.angryDaemons.linkNetworkedDirectories(angryDir.homeDir);

  ResoAgweBBS.resoAgwe.linkDirectories(
    "bbs_mask_2mGUUHfQIk0t",
    ResoAgweBBS.bbs_mask_2mGUUHfQIk0t
  );
  ResoAgweBBS.resoAgwe.linkDirectories(
    "bbs_mask_9SOCqTxfm2Zi",
    ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
  );
  ResoAgweBBS.resoAgwe.linkDirectories(
    "bbs_mask_XpPkmHxDgPfn",
    ResoAgweBBS.bbs_mask_XpPkmHxDgPfN
  );
  ResoAgweBBS.resoAgwe.linkDirectories(
    "bbs_mask_hMlMhTNGxi05",
    ResoAgweBBS.bbs_mask_hMlMhTNGxi05
  );
  ResoAgweBBS.resoAgwe.linkDirectories("root", ResoAgweBBS.resoRoot);

  ResoAgweBBS.bbs_mask_2mGUUHfQIk0t.linkParentDirectory(ResoAgweBBS.resoAgwe);
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkParentDirectory(ResoAgweBBS.resoAgwe);
  ResoAgweBBS.bbs_mask_XpPkmHxDgPfN.linkParentDirectory(ResoAgweBBS.resoAgwe);
  ResoAgweBBS.bbs_mask_hMlMhTNGxi05.linkParentDirectory(ResoAgweBBS.resoAgwe);
  ResoAgweBBS.resoRoot.linkParentDirectory(ResoAgweBBS.resoAgwe);

  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    "91E0C5NMg5xE",
    ResoAgweBBS.p91E0C5NMg5xE
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    "HjTESlk7aw4b",
    ResoAgweBBS.HjTESlk7aw4b
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    "M9KFZKULring",
    ResoAgweBBS.M9KFZKUlring
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    "p7FzTKa13OhG",
    ResoAgweBBS.p7FzTKa13OhG
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    "saoXGjvToAlh",
    ResoAgweBBS.saoXGjvToAlh
  );

  ResoAgweBBS.p91E0C5NMg5xE.linkParentDirectory(
    ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
  );
  ResoAgweBBS.HjTESlk7aw4b.linkParentDirectory(
    ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
  );
  ResoAgweBBS.M9KFZKUlring.linkParentDirectory(
    ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
  );
  ResoAgweBBS.p7FzTKa13OhG.linkParentDirectory(
    ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
  );
  ResoAgweBBS.saoXGjvToAlh.linkParentDirectory(
    ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
  );

  ResoAgweBBS.p7FzTKa13OhG.linkDirectories("whitelist", ResoAgweBBS.whitelist);
  ResoAgweBBS.whitelist.linkParentDirectory(ResoAgweBBS.p7FzTKa13OhG);
  // EDGERUNNERS FTP
  edgeDirs.rootDir.linkDirectories("home", edgeDirs.homeDir);

  edgeDirs.homeDir.linkParentDirectory(edgeDirs.rootDir);
  edgeDirs.homeDir.linkDirectories("archive", edgeDirs.archiveDir);
  edgeDirs.homeDir.linkDirectories("software", edgeDirs.softwareDir);
  edgeDirs.homeDir.linkDirectories("targets", edgeDirs.targetsDir);

  edgeDirs.archiveDir.linkParentDirectory(edgeDirs.homeDir);
  edgeDirs.softwareDir.linkParentDirectory(edgeDirs.homeDir);
  edgeDirs.targetsDir.linkParentDirectory(edgeDirs.homeDir);

  // ANGRY DAEMON TESTER
  angryDir.homeDir.linkDirectories("tools", angryDir.toolsDir);
  angryDir.toolsDir.linkParentDirectory(angryDir.homeDir);
  angryDir.homeDir.linkDirectories("export", angryDir.exportDir);
  angryDir.exportDir.linkParentDirectory(angryDir.homeDir);

  //
  // -- FILE LINKING
  //
  //RESO AGWE BBS
  ResoAgweBBS.p91E0C5NMg5xE.linkFiles(
    "91EOC5NMg5xE",
    reso.bbs_mask.a91EOC5NMg5xE
  );
  ResoAgweBBS.HjTESlk7aw4b.linkFiles(
    "HjTRSLk7aw4b",
    reso.bbs_mask.bHjTRSlk7aw4b
  );
  ResoAgweBBS.M9KFZKUlring.linkFiles(
    "M9KFZKUlring",
    reso.bbs_mask.cM9KFZKUlring
  );
  ResoAgweBBS.saoXGjvToAlh.linkFiles(
    "saoXGjvToAlh",
    reso.bbs_mask.esaoXGjvToAlh
  );

  ResoAgweBBS.p7FzTKa13OhG.linkFiles("ruleset", reso.p7FzTKa13Ohg.ruleset);
  ResoAgweBBS.p7FzTKa13OhG.linkFiles("ufw.conf.d", reso.p7FzTKa13Ohg.ufwConf);

  ResoAgweBBS.whitelist.linkFiles("jeon-kiri", reso.whitelist.jeonKiri);
  ResoAgweBBS.whitelist.linkFiles("leon", reso.whitelist.leon);
  ResoAgweBBS.whitelist.linkFiles(
    "maman-briggite",
    reso.whitelist.mamanBriggite
  );
  ResoAgweBBS.whitelist.linkFiles("moseley", reso.whitelist.moseley);
  ResoAgweBBS.whitelist.linkFiles("mr-hands", reso.whitelist.mrHands);
  ResoAgweBBS.whitelist.linkFiles("placide", reso.whitelist.placide);
  ResoAgweBBS.whitelist.linkFiles("ti-neptune", reso.whitelist.tiNeptune);

  //EDGERUNNERS FTP
  edgeDirs.rootDir.linkFiles("root", edgeFS.root.root);
  edgeDirs.archiveDir.linkFiles("archive", edgeFS.archive.archive);
  edgeDirs.softwareDir.linkFiles("software", edgeFS.software.software);
  edgeDirs.targetsDir.linkFiles("shade", edgeFS.targets.shade);
  edgeDirs.targetsDir.linkFiles("newbie-readme", edgeFS.targets.newbie_readme);

  //ANGRY DAEMON TESTER
  angryDir.homeDir.linkFiles("readme", angryFS.readme);
  angryDir.exportDir.linkFiles("export", angryFS.export);
  angryDir.toolsDir.linkFiles("tools", angryFS.tools);

  ////////////// COMMANDS INPUT HANDLING /////////////////////////////////////////////////////////
  const [cmdHistory, setCmdHistory] = useState([{}]);
  const [passwdReq, setPasswdReq] = useState(true);
  const username = props.username.split("@");
  const uname = username[0] + "@" + props.sshLoc + " $: ";
  const navigate = useNavigate();

  useEffect(() => {
    if (cmdHistory[0].cmd != uname.toString()) {
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
      if (judgePass === true) {
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
  function assignNetLoc(loc) {
    switch (loc) {
      case "reso_agweBBS":
        setCurrentNetworkLocation(net.resoAgwe);
        break;
      case "EdgerunnersFTP":
        setCurrentNetworkLocation(net.edgerunnerFTP);
        break;
      case "AngryDaemons":
        setCurrentNetworkLocation(net.angryDaemons);
        break;
      default:
        props.alert(
          "Secure shell failed to spawn at specified ip address. Returning to host shell session"
        );
        navigate("/");
    }
  }

  useEffect(() => {
    if (currentNetworkLocation === "") {
      assignNetLoc(props.sshLoc);
    }
  }, [props.sshLoc]);

  const [currentDirectory, setCurrentDirectory] = useState("");

  useEffect(() => {
    if (currentNetworkLocation !== "") {
      setCurrentDirectory(currentNetworkLocation._linkedNetworkDirectories);
    }
    if (currentNetworkLocation._password === " ") {
      setPasswdReq(false);
    }
  }, [currentNetworkLocation]);

  const [childDirs, setChildDirs] = useState([]);

  useEffect(() => {
    if (currentDirectory !== "") {
      setChildDirs(Object.entries(currentDirectory._linkedDirs));
    }
  }, [currentDirectory]);

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
