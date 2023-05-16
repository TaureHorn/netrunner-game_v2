import { Directory, File } from "../functions/classes";
import { getUsername } from "../functions/getUsername";

import { daemonPass } from "./network";

const username = getUsername();

///////////////////////////////// DIRECTORIES ////////////////////////////////////////////
//
export const edgeDir = {
  rootDir: new Directory("root"),
  homeDir: new Directory("home"),
  archiveDir: new Directory("archive"),
  softwareDir: new Directory("software"),
  targetsDir: new Directory("targets"),
};
//
///// LINKING /////
//
edgeDir.rootDir.linkDirectories("home", edgeDir.homeDir);

edgeDir.homeDir.linkParentDirectory(edgeDir.rootDir);
edgeDir.homeDir.linkDirectories("archive", edgeDir.archiveDir);
edgeDir.homeDir.linkDirectories("software", edgeDir.softwareDir);
edgeDir.homeDir.linkDirectories("targets", edgeDir.targetsDir);

edgeDir.archiveDir.linkParentDirectory(edgeDir.homeDir);
edgeDir.softwareDir.linkParentDirectory(edgeDir.homeDir);
edgeDir.targetsDir.linkParentDirectory(edgeDir.homeDir);
//
///////////////////////////////// FILES ////////////////////////////////////////////
//
export const edgeFS = {
  root: {
    root: new File(
      "root",
      "elf",
      "root systemd init storage users",
      username + " root",
      "root",
      "permission denied",
      "permission denied"
    ),
  },
  archive: {
    archive: new File(
      "archive",
      "elf",
      "root storage users",
      username + " kiwi root",
      "kiwi",
      "permission denied",
      "permission denied"
    ),
  },
  software: {
    software: new File(
      "software",
      "elf",
      "root storage users",
      username + " kiwi root",
      "kiwi",
      "permission denied",
      "permission denied"
    ),
  },
  targets: {
    shade: new File(
      "shade",
      "text",
      "storage",
      username + " kiwi root",
      "kiwi",
      "shade: works primarily for Regina Jones, means mostly Watson jobs. been lurking around Pacifica located nets and skirting around the edge of the VDBs cyberspace turf. suspect allegiance bought by NetWatch or some chinese ghost corp, maybe AI.",
      "proxy ip: 50.237.253.197, aliases: shade c4t4kly5m n0elle kR00z3r"
    ),
    newbie_readme: new File(
      "newbie-readme",
      "text",
      "storage",
      username + " kiwi root",
      "kiwi",
      "We've had eyes on shade for some time now. He's set you up to clash with the Voodoo Boys without you realising. Lose - lose sitch... Choom, for your own sake, abandon the task he set you. Drop the dat file shade wants you to upload onto the Angry Daemon server - not the Reso Agwe BBS like he wants. Credentials for Angry Daemon are hidden in this file. I'll take care of the rest and you peace the fuck out, k?",
      "239.149.68.33, pass: " + daemonPass
    ),
  },
};
//
///// LINKING /////
//
edgeDir.rootDir.linkFiles("root", edgeFS.root.root);
edgeDir.archiveDir.linkFiles("archive", edgeFS.archive.archive);
edgeDir.softwareDir.linkFiles("software", edgeFS.software.software);
edgeDir.targetsDir.linkFiles("shade", edgeFS.targets.shade);
edgeDir.targetsDir.linkFiles("newbie-readme", edgeFS.targets.newbie_readme);
