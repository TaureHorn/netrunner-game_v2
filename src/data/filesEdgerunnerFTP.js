import { File } from "../functions/classes";

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
      "we've had eyes on shade some time now. they've set you up to clash with the Voodoo Boys 'thout realising. Lose - lose sitch. choom, for your own sake, abandon the task they set you. drop the dat file shade wants you to upload  on the ip hidden in this file - not the Reso Agwe BSS server like shade asked. i'll take care of the rest and you peace the fuck out, k?",
      "239.149.68.33"
    ),
  },
};
