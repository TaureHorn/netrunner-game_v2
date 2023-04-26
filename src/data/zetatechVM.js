import { Directory } from "../functions/classes";

export const zetaTechVM = {
    rootDir: new Directory("root", "n/a"),
    bootDir: new Directory("boot", "root"),
    etcDir: new Directory("etc", "root"),
    homeDir: new Directory("home", "root"),
    usrDir: new Directory("usr", "root"),
    commandsDir: new Directory("commands", "home"),
    filesDir: new Directory("files", "home"),
    sshDir: new Directory("ssh", "files"),
    ircHome: new Directory("irc", "n/a")
}
