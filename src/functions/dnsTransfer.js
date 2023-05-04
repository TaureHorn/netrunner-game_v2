import { net } from "../data/network";

export function dnsTransfer(ip) {
  switch (ip) {
    case net.edgerunnerFTP._ipAddress:
      return net.edgerunnerFTP;
    case net.resoAgwe._ipAddress:
      return net.resoAgwe;
    case net.seventhCircle._ipAddress:
      return net.seventhCircle;
    case net.zombie._ipAddress:
      return net.zombie;
    case net.angryDaemons._ipAddress:
      return net.angryDaemons;
    default:
      return ip + ": ip address not found in dns cache";
  }
}
