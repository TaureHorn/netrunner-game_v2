import { Directory } from "../functions/classes";

export const zetaTechVM = {
    rootDir: new Directory("root"),
    bootDir: new Directory("boot"),
    etcDir: new Directory("etc"),
    homeDir: new Directory("home"),
    usrDir: new Directory("usr"),
    commandsDir: new Directory("commands"),
    filesDir: new Directory("files"),
    sshDir: new Directory("ssh"),
    ircHome: new Directory("irc")
}
