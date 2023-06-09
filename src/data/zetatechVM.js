import { Directory, File } from "../functions/classes";
import { getUsername } from "../functions/getUsername";

import { resoagwePass } from "./network";

const username = getUsername();

///////////////////////////////// DIRECTORIES ////////////////////////////////////////////
//
export const zetatechDir = {
  rootDir: new Directory("root"),
  bootDir: new Directory("boot"),
  etcDir: new Directory("etc"),
  homeDir: new Directory("home"),
  usrDir: new Directory("usr"),
  commandsDir: new Directory("commands"),
  filesDir: new Directory("files"),
  sshDir: new Directory("ssh"),
  ircHome: new Directory("irc"),
};
//
///// LINKING /////
//
zetatechDir.rootDir.linkDirectories("boot", zetatechDir.bootDir);
zetatechDir.rootDir.linkDirectories("etc", zetatechDir.etcDir);
zetatechDir.rootDir.linkDirectories("home", zetatechDir.homeDir);
zetatechDir.rootDir.linkDirectories("usr", zetatechDir.usrDir);

zetatechDir.bootDir.linkParentDirectory(zetatechDir.rootDir);
zetatechDir.etcDir.linkParentDirectory(zetatechDir.rootDir);
zetatechDir.homeDir.linkParentDirectory(zetatechDir.rootDir);
zetatechDir.usrDir.linkParentDirectory(zetatechDir.rootDir);

zetatechDir.homeDir.linkDirectories("commands", zetatechDir.commandsDir);
zetatechDir.homeDir.linkDirectories("files", zetatechDir.filesDir);
zetatechDir.homeDir.linkDirectories("ssh", zetatechDir.sshDir);
zetatechDir.homeDir.linkDirectories("irc", zetatechDir.ircHome);

zetatechDir.commandsDir.linkParentDirectory(zetatechDir.homeDir);
zetatechDir.filesDir.linkParentDirectory(zetatechDir.homeDir);
zetatechDir.sshDir.linkParentDirectory(zetatechDir.homeDir);
zetatechDir.ircHome.linkParentDirectory(zetatechDir.homeDir);
//
///////////////////////////////// FILES ////////////////////////////////////////////
//
export const zetatechFS = {
  boot: new File(
    "boot",
    "elf",
    "root systemd init storage",
    "root",
    "root",
    "permission denied",
    "permission denied"
  ),

  etc: new File(
    "etc",
    "elf",
    "root systemd storage",
    "root",
    "root",
    "permission denied",
    "permission denied"
  ),

  usr: new File(
    "usr",
    "elf",
    "storage systemd",
    "root",
    "root",
    "permission denied",
    "permission denied"
  ),
  cmds: {
    cat: new File(
      "cat",
      "bash script",
      "storage",
      username,
      "root",
      "print the contents of a file",
      "n/a"
    ),
    cd: new File(
      "cd",
      "bash script",
      "term storage",
      username,
      "root",
      "navigate to a directory",
      "n/a"
    ),
    clear: new File(
      "clear",
      "bash script",
      "term",
      username,
      "root",
      "clear the terminal",
      "n/a"
    ),
    cmds: new File(
      "cmds",
      "bash script",
      "term storage",
      username,
      "root",
      "list available terminal commands",
      "n/a"
    ),
    exit: new File(
      "exit",
      "bash script",
      "term session storage root",
      username,
      "root",
      "exit session",
      "n/a"
    ),
    file: new File(
      "file",
      "bash script",
      "storage",
      username,
      "root",
      "prints the metadata of a file",
      "n/a"
    ),
    irc: new File(
      "irc",
      "bash script",
      "storage network dbus systemd gpg-sha",
      username,
      "root",
      "Internet Relay Chat client",
      "n/a"
    ),
    ls: new File(
      "ls",
      "bash script",
      "storage",
      username,
      "root",
      "lists files in current directory",
      "n/a"
    ),
    scp: new File(
      "scp",
      "bash script",
      "storage network repeat cron",
      username,
      "root",
      "copy file to remote directory using ssh",
      "n/a"
    ),
    ssh: new File(
      "ssh",
      "bash script",
      "network dbus systemd gpg-sha",
      username,
      "root",
      "Secure Shell is a protocol to securely log onto remote systems to execute commands on a remote server",
      "n/a"
    ),
    steghide: new File(
      "steghide",
      "bash script",
      "storage systemd gpg-sha",
      username,
      "root",
      "steganography tool to extract data hidden within a file",
      "well done. You've successfully used steghide!"
    ),
  },
  files: {
    bbsMaskPayload: new File(
      "bbs_mask_9SOCqTxfm2Zi.dat",
      "encrypted archive",
      "root network systemd init storage cpustate powerstate i/o-bus repeat cron",
      "root",
      "r-As;31zpIk^x+w[|94-2R4u1hb8^$M0-PH94QX1nZt-glInS02vzT3X*~q-a",
      "&5MXk5V9g341mizPw0MMy+#1vHTkbSe?3%%3_[+#8X#52w-3MDmztR|yaL?WWo^G%",
      "^V&IWyy!Y[?PSjwLcN8XcK-I*wGb'970CgCTMilETAo$!SrJ~zW2QauG2MvgAD'x"
    ),
    resoAgweDatamap: new File(
      "reso-agwe-datamap",
      "text",
      "storage",
      "shade",
      "shade",
      "See map in help section of the interface. Data too precious to have just sitting in a live environment here",
      "reso-agwe ssh pass " + resoagwePass
    ),
    task: new File(
      "task",
      "text",
      "storage",
      username + " shade",
      "root",
      "Once you've gotten to grips with using the terminal a bit I have a task for you. A test of competency. I left you some data you will need and a file 'bbs_mask_9SOCqTxfm2Zi.dat'. I need you to get that file on the Reso Agwe server. You'll need to copy the file with scp onto the server.",
      "hint: password is hidden in datamap file"
    ),
  },
  ssh: {
    edgerunnerFtp: new File(
      "edgerunnerFTP",
      "text",
      "storage",
      username + " shade",
      "shade",
      "Shade is not to be trusted. Find me in the 7th circle. - a friend",
      "253.209.6.253"
    ),
    resoAgweBBS: new File(
      "reso-agwe",
      "text",
      "storage",
      username + " shade",
      "shade",
      "The server I need you to get onto. Peep the task if you haven't yet - shade",
      "47.227.191.100"
    ),
    zetatechVM: new File(
      "zetatech-vm-manager",
      "text",
      "storage",
      username + " shade",
      "shade",
      "This is the zombie VME you're currently using - shade",
      "100.216.236.215"
    ),
  },
  irc: {
    seventhCircle: new File(
      "7th-Circle",
      "text",
      "storage",
      username + " shade",
      "shade",
      "A few netrunners hang out here sometimes. No monochromers thankfully, though that doesn't mean no danger! - shade",
      "81.125.191.122"
    ),
  },
};
//
///// LINKING /////
//
zetatechDir.bootDir.linkFiles("boot", zetatechFS.boot);
zetatechDir.etcDir.linkFiles("etc", zetatechFS.etc);
zetatechDir.usrDir.linkFiles("usr", zetatechFS.usr);

zetatechDir.commandsDir.linkFiles("cat", zetatechFS.cmds.cat);
zetatechDir.commandsDir.linkFiles("cd", zetatechFS.cmds.cd);
zetatechDir.commandsDir.linkFiles("clear", zetatechFS.cmds.clear);
zetatechDir.commandsDir.linkFiles("cmds", zetatechFS.cmds.cmds);
zetatechDir.commandsDir.linkFiles("exit", zetatechFS.cmds.exit);
zetatechDir.commandsDir.linkFiles("file", zetatechFS.cmds.file);
zetatechDir.commandsDir.linkFiles("irc", zetatechFS.cmds.irc);
zetatechDir.commandsDir.linkFiles("ls", zetatechFS.cmds.ls);
zetatechDir.commandsDir.linkFiles("scp", zetatechFS.cmds.scp);
zetatechDir.commandsDir.linkFiles("ssh", zetatechFS.cmds.ssh);
zetatechDir.commandsDir.linkFiles("steghide", zetatechFS.cmds.steghide);

zetatechDir.filesDir.linkFiles(
  "bbs_mask_9SOCqTxfm2Zi.dat",
  zetatechFS.files.bbsMaskPayload
);
zetatechDir.filesDir.linkFiles(
  "reso-agwe-datamap",
  zetatechFS.files.resoAgweDatamap
);
zetatechDir.filesDir.linkFiles("task", zetatechFS.files.task);

zetatechDir.sshDir.linkFiles("edgerunnerFTP", zetatechFS.ssh.edgerunnerFtp);
zetatechDir.sshDir.linkFiles("reso-agwe", zetatechFS.ssh.resoAgweBBS);
zetatechDir.sshDir.linkFiles("zetatech-vm-manager", zetatechFS.ssh.zetatechVM);

zetatechDir.ircHome.linkFiles("7th-Circle", zetatechFS.irc.seventhCircle);
