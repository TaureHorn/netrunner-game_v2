// game win triggered on upload of payload to malware tester server
// scp $payload $testerServerIP $serverPassword
//
// game loss triggered on upload of payload to reso agwe server
// scp $payload $resoAgweIP $resoAgwePassword

import { usrFS } from "../data/usrFS";
import { net } from "../data/network";

import VDBs from "../resources/resoAgwe.jpg";

export function gameWinMonitor(file, ip) {
  // inputs have already been checked for errors and validity when function is called
  if (file !== usrFS.files.bbsMaskPayload) {
    return " ";
  }
  if (ip === net.angryDaemons._ipAddress) {
    return true;
  } else if (ip === net.resoAgwe._ipAddress) {
    return false;
  } else {
    return " ";
  }
}

export function gameWinAppearance(bool) {
  if (bool === false) {
    document.getElementById("header").style.backgroundColor = "#FF0055";
    document.getElementById("footer").style.backgroundColor = "#FF0055";
    const bg = "url(" + VDBs + ")";
    document.getElementById("centrePanel").style.background = "url()"
    document.querySelector("body").style.background = bg;
  } else if (bool === true) {
    document.getElementById("header").style.backgroundColor = "#41F395";
    document.getElementById("footer").style.backgroundColor = "#41F395";
  }
}
