import { React, useEffect, useState } from "react";

import CommandHistory from "./commandHistory";
import { cmdParser } from "../functions/cmdParser";
import { isObjectEmpty } from "../functions/isObjectEmpty";

import { rootFS } from "../data/rootFS";
import { usrFS } from "../data/usrFS";
import { reso } from "../data/reso";
import { ResoAgweBBS } from "../data/resoAgwe";
import { zetaTechVM } from "../data/zetatechVM";

function Terminal(props) {
  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  //
  // -- DIRECTORY LINKING
  //
  //VM
  zetaTechVM.rootDir.linkDirectories(0, zetaTechVM.bootDir);
  zetaTechVM.rootDir.linkDirectories(1, zetaTechVM.etcDir);
  zetaTechVM.rootDir.linkDirectories(2, zetaTechVM.homeDir);
  zetaTechVM.rootDir.linkDirectories(3, zetaTechVM.usrDir);

  zetaTechVM.homeDir.linkDirectories(0, zetaTechVM.commandsDir);
  zetaTechVM.homeDir.linkDirectories(1, zetaTechVM.filesDir);
  zetaTechVM.homeDir.linkDirectories(2, zetaTechVM.sshDir);
  zetaTechVM.homeDir.linkDirectories(3, zetaTechVM.ircHome);

  //RESO AGWE BBS
  ResoAgweBBS.resoAgwe.linkDirectories(0, ResoAgweBBS.bbs_mask_2mGUUHfQIk0t);
  ResoAgweBBS.resoAgwe.linkDirectories(1, ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi);
  ResoAgweBBS.resoAgwe.linkDirectories(2, ResoAgweBBS.bbs_mask_XpPkmHxDgPfN);
  ResoAgweBBS.resoAgwe.linkDirectories(3, ResoAgweBBS.bbs_mask_hMlMhTNGxi05);
  ResoAgweBBS.resoAgwe.linkDirectories(4, ResoAgweBBS.resoRoot);

  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    0,
    ResoAgweBBS.p91E0C5NMg5xE
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    1,
    ResoAgweBBS.HjTESlk7aw4b
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    2,
    ResoAgweBBS.M9KFZKUlring
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    3,
    ResoAgweBBS.p7FzTKa13OhG
  );
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
    4,
    ResoAgweBBS.saoXGjvToAlh
  );

  ResoAgweBBS.p7FzTKa13OhG.linkDirectories(0, ResoAgweBBS.whitelist);

  //
  // -- FILE LINKING
  //
  //VM
  zetaTechVM.bootDir.linkFiles(0, rootFS.boot);
  zetaTechVM.etcDir.linkFiles(0, rootFS.etc);
  zetaTechVM.usrDir.linkFiles(0, rootFS.usr);

  zetaTechVM.commandsDir.linkFiles(0, usrFS.cmds.cat);
  zetaTechVM.commandsDir.linkFiles(1, usrFS.cmds.clear);
  zetaTechVM.commandsDir.linkFiles(2, usrFS.cmds.file);
  zetaTechVM.commandsDir.linkFiles(3, usrFS.cmds.irc);
  zetaTechVM.commandsDir.linkFiles(4, usrFS.cmds.ls);
  zetaTechVM.commandsDir.linkFiles(5, usrFS.cmds.scp);
  zetaTechVM.commandsDir.linkFiles(6, usrFS.cmds.ssh);
  zetaTechVM.commandsDir.linkFiles(7, usrFS.cmds.steghide);

  zetaTechVM.filesDir.linkFiles(0, usrFS.files.bbsMaskPayload);
  zetaTechVM.filesDir.linkFiles(1, usrFS.files.resoAgweDatamap);
  zetaTechVM.filesDir.linkFiles(2, usrFS.files.task);

  zetaTechVM.sshDir.linkFiles(0, usrFS.ssh.edgerunnerFtp);
  zetaTechVM.sshDir.linkFiles(1, usrFS.ssh.resoAgweBBS);
  zetaTechVM.sshDir.linkFiles(2, usrFS.ssh.zetatechVM);

  //RESO AGWE BBS
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkFiles(0, reso.bbs_mask.a91EOC5NMg5xE);
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkFiles(1, reso.bbs_mask.bHjTRSlk7aw4b);
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkFiles(2, reso.bbs_mask.cM9KFZKUlring);
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkFiles(3, reso.bbs_mask.esaoXGjvToAlh);

  ResoAgweBBS.p7FzTKa13OhG.linkFiles(0, reso.p7FzTKa13Ohg.ruleset);
  ResoAgweBBS.p7FzTKa13OhG.linkFiles(1, reso.p7FzTKa13Ohg.ufwConf);

  ResoAgweBBS.whitelist.linkFiles(0, reso.whitelist.jeonKiri);
  ResoAgweBBS.whitelist.linkFiles(1, reso.whitelist.leon);
  ResoAgweBBS.whitelist.linkFiles(2, reso.whitelist.mamanBriggite);
  ResoAgweBBS.whitelist.linkFiles(3, reso.whitelist.moseley);
  ResoAgweBBS.whitelist.linkFiles(4, reso.whitelist.mrHands);
  ResoAgweBBS.whitelist.linkFiles(5, reso.whitelist.placide);
  ResoAgweBBS.whitelist.linkFiles(6, reso.whitelist.tiNeptune);

  ////////////// COMMANDS INPUT HANDLING /////////////////////////////////////////////////////////
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
      return setCmdHistory([{}]);
    } else {
      const newCmd = [...cmdHistory];
      newCmd.unshift(cmd);
      setCmdHistory(newCmd);
    }
  }

  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  //
  const [currentDirectory, setCurrentDirectory] = useState(zetaTechVM.homeDir);
  return (
    <>
      <div className="border centrePanel panel scroll centreImage hover">
        <div className="terminalText">
          <p> Parent directory: {currentDirectory._parentDirName}</p>
          <p> Current directory: {currentDirectory._dirName}</p>
          <span> Child directories: </span>
          {currentDirectory._linkedDirs.map((dir) => {
            return <span key={crypto.randomUUID()}>{dir._dirName} </span>;
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
