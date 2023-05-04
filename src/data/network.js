import { NetworkLocation } from "../functions/classes";

export const resoagwePass = "z${4_U<enWo//;]y6dx5iEHD:7PDK]e!";
export const edgerunnerPass = "qG&;k<n'a}&{F;WY";

let zombieInstance = "";
const getZombieID = () => {
  if (window.localStorage.getItem("username")) {
    const instanceID = window.localStorage.getItem("username").split("@");
    return (zombieInstance = instanceID[1]);
  }
};
getZombieID();

export const net = {
  zombie: new NetworkLocation(
    "Z.O.M.B.I.E@" + zombieInstance,
    "100.216.236.215",
    " "
  ),
  resoAgwe: new NetworkLocation("reso_agweBBS", "47.227.191.100", resoagwePass),
  edgerunnerFTP: new NetworkLocation(
    "EdgerunnersFTP",
    "253.209.6.253",
    edgerunnerPass
  ),
  seventhCircle: new NetworkLocation("7th-Circle", "81.125.191.122", " "),
  angryDaemons: new NetworkLocation("AngryDaemons", "239.149.68.33"),
};
