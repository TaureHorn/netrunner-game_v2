import { File } from "../functions/classes";
import { daemonPass } from "./network";

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
