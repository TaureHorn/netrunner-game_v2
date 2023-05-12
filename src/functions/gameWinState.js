// game win triggered on upload of payload to malware tester server
// scp $payload $testerServerIP $serverPassword
//
// game loss triggered on upload of payload to reso agwe server
// scp $payload $resoAgweIP $resoAgwePassword

import { usrFS } from "../data/usrFS";
import { net } from "../data/network";

import VDBs from "../resources/resoAgwe.jpg";

import lossSound from "../resources/badAlarm.mp3";
import winSound from "../resources/msgAlarm.mp3";

const lossAlarm = new Audio(lossSound);
const winAlarm = new Audio(winSound);

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
    lossAlarm.play();
    document.getElementById("header").style.backgroundColor = "#FF0055";
    document.getElementById("footer").style.backgroundColor = "#FF0055";
    const bg = "url(" + VDBs + ")";
    document.getElementById("centrePanel").style.background = "url()";
    document.querySelector("body").style.background = bg;
    document.getElementById("title").innerHTML = "You have lost the game!";
    document.getElementById("footerTitle").innerHTML = "TRY AGAIN";
  } else if (bool === true) {
    winAlarm.play();
    document.getElementById("header").style.backgroundColor = "#41F395";
    document.getElementById("footer").style.backgroundColor = "#41F395";
    document.getElementById("title").innerHTML =
      "Congratulations. You have completed the game!";
    document.getElementById("footerTitle").innerHTML = "THANKS FOR PLAYING!";
  }
}
