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
}
