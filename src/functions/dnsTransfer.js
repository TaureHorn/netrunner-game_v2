import { net } from "../data/network";

// functions called from terminals when networked commands called
// e.g. ssh, irc, scp
// takes in input of terminal command arguement and checks if argument matches known ip
// if yes, returns matching network location data as object

export function dnsTransfer(ip) {
  switch (ip) {
    case net.edgerunnerFTP._ipAddress:
      return net.edgerunnerFTP;
    case net.resoAgwe._ipAddress:
      return net.resoAgwe;
    case net.angryDaemons._ipAddress:
      return net.angryDaemons;
    default:
      return ip + ": ip address not found in dns cache";
  }
}

export function ircTransfer(ip) {
  switch (ip) {
      case net.seventhCircle._ipAddress:
      return net.seventhCircle;
    default:
      return ip + ": ip address not found in irc dns cache";
  }
}
