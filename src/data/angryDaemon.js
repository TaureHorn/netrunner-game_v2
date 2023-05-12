import { Directory, File } from "../functions/classes";

let username = "";
const getUsername = () => {
  if (!window.localStorage.getItem("username")) {
    return "";
  } else {
    const userID = window.localStorage.getItem("username").split("@");
    return (username = userID[0]);
  }
};
getUsername();

export const angryDir = {
    homeDir: new Directory("home"),
    toolsDir: new Directory("tools"),
    exportDir: new Directory("export")
}
export const angryFS = {
    readme: new File(
        "readme",
        "text",
        "storage",
        username + " root",
        "root",
        "AngryDaemonTester: a hardware airgapped cage to poke and prod whatever potentially malicious software you've 'stumbled upon'. Copy a file to this servers ip (IMPORTANT: use scp ONLY) and the testing environment tools are ready to go. Note: For security reasons AngryDaemonTester is compatible with only the most current BCI Controllers",
        "n/a",
    ),
    tools: new File(
        "tools",
        "elf",
        "root storage users",
        username + " root",
        "root",
        "permission denied",
        "permission denied",
    ),
    export: new File(
        "export",
        "elf",
        "root storage users",
        username + " root",
        "permission denied",
        "permission denied",
    ),
    bbsMaskPayloadDecrypt: new File(
        "bbs_mask_9SOCqTxfm2Zi.dat.decrypt",
        "elf",
        "storage",
        "angryDaemon kiwi " + username,
        "angryDaemon",
        "author: unknown, compiler licence user: shade, compiler: zetatech mammoth, encyrption: AES4 8kb, polymorphism?: no",
        "file generated by Angry Daemon Tester(™ NetWatch)"
    ),
    testReport: new File(
        "test-report_1545",
        "text",
        "storage",
        "angryDaemon kiwi " + username,
        "angryDaemon",
        "bbs_mask_9SOCqTxfm2Zi.dat report ||  filetype: encrypted archive, executable: fireshaft, function: monitor, report and manipulate network traffic, icebreakers: delete logs at root level / dynamic name and credential morphing and obfuscation, tags: extraBlackwall, transBlackwall, AGI, state actor",
        "file generated by Angry Daemon Tester(™ NetWatch)"
    ),
}