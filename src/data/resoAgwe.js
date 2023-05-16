import { Directory, File } from "../functions/classes";
import { getUsername } from "../functions/getUsername";

import { net } from "./network";

const username = getUsername();

///////////////////////////////// DIRECTORIES ////////////////////////////////////////////
//
export const ResoAgweBBS = {
  resoAgwe: new Directory("reso-agwe"),
  bbs_mask_2mGUUHfQIk0t: new Directory("bbs_mask_2mGUUHfQIk0t"),
  bbs_mask_9SOCqTxfm2Zi: new Directory("bbs_mask_9SOCqTxfm2Zi"),
  bbs_mask_XpPkmHxDgPfN: new Directory("bbs_mask_XpPkmHxDgPfN"),
  bbs_mask_hMlMhTNGxi05: new Directory("bbs_mask_hMlMhTNGxi05"),
  resoRoot: new Directory("root"),
  p91E0C5NMg5xE: new Directory("91E0C5NMg5xE"),
  HjTESlk7aw4b: new Directory("HjTESlk7aw4b"),
  M9KFZKUlring: new Directory("M9KFZKULring"),
  p7FzTKa13OhG: new Directory("p7FzTKa13OhG"),
  saoXGjvToAlh: new Directory("saoXGjvToAlh"),
  whitelist: new Directory("whitelist"),
};
//
///// LINKING /////
//
ResoAgweBBS.resoAgwe.linkDirectories(
  "bbs_mask_2mGUUHfQIk0t",
  ResoAgweBBS.bbs_mask_2mGUUHfQIk0t
);
ResoAgweBBS.resoAgwe.linkDirectories(
  "bbs_mask_9SOCqTxfm2Zi",
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
);
ResoAgweBBS.resoAgwe.linkDirectories(
  "bbs_mask_XpPkmHxDgPfn",
  ResoAgweBBS.bbs_mask_XpPkmHxDgPfN
);
ResoAgweBBS.resoAgwe.linkDirectories(
  "bbs_mask_hMlMhTNGxi05",
  ResoAgweBBS.bbs_mask_hMlMhTNGxi05
);
ResoAgweBBS.resoAgwe.linkDirectories("root", ResoAgweBBS.resoRoot);

ResoAgweBBS.bbs_mask_2mGUUHfQIk0t.linkParentDirectory(ResoAgweBBS.resoAgwe);
ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkParentDirectory(ResoAgweBBS.resoAgwe);
ResoAgweBBS.bbs_mask_XpPkmHxDgPfN.linkParentDirectory(ResoAgweBBS.resoAgwe);
ResoAgweBBS.bbs_mask_hMlMhTNGxi05.linkParentDirectory(ResoAgweBBS.resoAgwe);
ResoAgweBBS.resoRoot.linkParentDirectory(ResoAgweBBS.resoAgwe);

ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
  "91E0C5NMg5xE",
  ResoAgweBBS.p91E0C5NMg5xE
);
ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
  "HjTESlk7aw4b",
  ResoAgweBBS.HjTESlk7aw4b
);
ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
  "M9KFZKULring",
  ResoAgweBBS.M9KFZKUlring
);
ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
  "p7FzTKa13OhG",
  ResoAgweBBS.p7FzTKa13OhG
);
ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi.linkDirectories(
  "saoXGjvToAlh",
  ResoAgweBBS.saoXGjvToAlh
);

ResoAgweBBS.p91E0C5NMg5xE.linkParentDirectory(
  ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi
);
ResoAgweBBS.HjTESlk7aw4b.linkParentDirectory(ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi);
ResoAgweBBS.M9KFZKUlring.linkParentDirectory(ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi);
ResoAgweBBS.p7FzTKa13OhG.linkParentDirectory(ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi);
ResoAgweBBS.saoXGjvToAlh.linkParentDirectory(ResoAgweBBS.bbs_mask_9SOCqTxfm2Zi);

ResoAgweBBS.p7FzTKa13OhG.linkDirectories("whitelist", ResoAgweBBS.whitelist);
ResoAgweBBS.whitelist.linkParentDirectory(ResoAgweBBS.p7FzTKa13OhG);
//
///////////////////////////////// FILES ////////////////////////////////////////////
//

export const ResoAgweFS = {
  multi: {
    permissions: new File(
      "permission denied",
      "text",
      "root",
      "root",
      "you do not have permission to access this directory",
      "n/a"
    ),
  },
  root: {
    userLog0: new File(
      "connections-logs_0",
      "text",
      "storage",
      "tiNeptune",
      "tiNeptune",
      "New user " +
        username +
        " spawned shell from " +
        net.zombie._ipAddress +
        ". Latency geolocation cache connection location: Pallo Alto, California",
      "n/a"
    ),
    userLog1: new File(
      "connections-logs_1",
      "text",
      "storage",
      "tiNeptune",
      "tiNeptune",
      username +
        "@" +
        net.zombie._ipAddress +
        ": password authenticated successfully"
    ),
  },
  bbs_mask: {
    a91EOC5NMg5xE: new File(
      "91E0C5NMg5xE",
      "encrypted archive",
      "root storage network",
      "root",
      "root",
      "JKJSxHQ~3kLe[B*6d9AslIly2B4UZbhiRd3~Pr^HzdSeoFprA1~0DG;9K1'HQUUQ",
      "n/a"
    ),
    bHjTRSlk7aw4b: new File(
      "HjTRSlk7aw4b",
      "encrypted archive",
      "root storage network",
      "root",
      "root",
      "zQungkqNf*j?-TQ0~?q[rHEXWDph~vk-UHef8[g1Pm|~ucVJcDloQ:E::Wht;ej-",
      "n/a"
    ),
    cM9KFZKUlring: new File(
      "M9KFZKUlring",
      "encrypted archive",
      "root storage network",
      "root",
      "root",
      "5GuLEnMe|9[x3%riy]QQyx~p_T,Wh1:AzYzcjg[!*'_4!~FV?#0Cy?;,o'+4p+[",
      "n/a"
    ),
    esaoXGjvToAlh: new File(
      "saoXGjvToAlh",
      "encrypted archive",
      "root network i/o-bus gpg-sha",
      "root tiNeptune",
      "root",
      "DcfkzA2v~0OU7:N**VFV+|O8ZqG~[RK1Dl!s8IXuHZ:_tcOdkktA4GmE,h[O#Z_",
      "pa tèlman parese tan sa a, gen aksè konfigirasyon"
    ),
  },
  p7FzTKa13Ohg: {
    ruleset: new File(
      "ruleset",
      "text",
      "storage network cron",
      "root tiNeptune",
      "root",
      "tcp/ip i/o = in | udp i/o = i/o | bbs mask protocol = sha2048{key = root/var/sha.d/lA&yhTW-.hash}",
      "n/a"
    ),
    ufwConf: new File(
      "ufw.conf.d",
      "text",
      "root storage network cron",
      "root tiNeptune",
      "root",
      "tcp/udp-ip: port 5133 = open | tcp/udp-ip: port 1-5132 = closed && tcp/udp-ip: port 5134-* = closed",
      "n/a"
    ),
  },
  whitelist: {
    jeonKiri: new File(
      "jeon-kiri",
      "text",
      "storage network",
      "root tiNeptune",
      "tiNeptune",
      "static ip: 251.45.27.176",
      "n/a"
    ),
    leon: new File(
      "leon",
      "text",
      "storage network",
      "root tiNeptune",
      "tiNepture",
      "static ip: 56.35.227.238",
      "n/a"
    ),
    mamanBriggite: new File(
      "maman-briggite",
      "text",
      "storage network",
      "root tiNeptune",
      "tiNeptune",
      "static ip: 68.225.7.23",
      "n/a"
    ),
    moseley: new File(
      "moseley",
      "text",
      "storage network",
      "root",
      "root",
      "static ip: 106.14.156.224",
      "casefile:cYt]09*n!,H+ operation: golden jackal"
    ),
    mrHands: new File(
      "mr-hands",
      "text",
      "storage network",
      "root tiNeptune",
      "tiNeptune",
      "static ip: 226.126.32.203",
      "n/a"
    ),
    placide: new File(
      "placide",
      "text",
      "storage network",
      "root tiNeptune",
      "tiNeptune",
      "static ip: 211.98.124.26",
      "n/a"
    ),
    tiNeptune: new File(
      "ti-neptune",
      "text",
      "storage network",
      "root tiNeptune",
      "tiNeptune",
      "static ip: 36.155.4.191",
      "n/a"
    ),
  },
};
//
///// LINKING /////
//
ResoAgweBBS.resoAgwe.linkFiles("connections-logs_0", ResoAgweFS.root.userLog0);
ResoAgweBBS.resoAgwe.linkFiles("connections-logs_1", ResoAgweFS.root.userLog1);

ResoAgweBBS.p91E0C5NMg5xE.linkFiles(
  "91EOC5NMg5xE",
  ResoAgweFS.bbs_mask.a91EOC5NMg5xE
);
ResoAgweBBS.HjTESlk7aw4b.linkFiles("HjTRSLk7aw4b", ResoAgweFS.bbs_mask.bHjTRSlk7aw4b);
ResoAgweBBS.M9KFZKUlring.linkFiles("M9KFZKUlring", ResoAgweFS.bbs_mask.cM9KFZKUlring);
ResoAgweBBS.saoXGjvToAlh.linkFiles("saoXGjvToAlh", ResoAgweFS.bbs_mask.esaoXGjvToAlh);

ResoAgweBBS.p7FzTKa13OhG.linkFiles("ruleset", ResoAgweFS.p7FzTKa13Ohg.ruleset);
ResoAgweBBS.p7FzTKa13OhG.linkFiles("ufw.conf.d", ResoAgweFS.p7FzTKa13Ohg.ufwConf);

ResoAgweBBS.whitelist.linkFiles("jeon-kiri", ResoAgweFS.whitelist.jeonKiri);
ResoAgweBBS.whitelist.linkFiles("leon", ResoAgweFS.whitelist.leon);
ResoAgweBBS.whitelist.linkFiles("maman-briggite", ResoAgweFS.whitelist.mamanBriggite);
ResoAgweBBS.whitelist.linkFiles("moseley", ResoAgweFS.whitelist.moseley);
ResoAgweBBS.whitelist.linkFiles("mr-hands", ResoAgweFS.whitelist.mrHands);
ResoAgweBBS.whitelist.linkFiles("placide", ResoAgweFS.whitelist.placide);
ResoAgweBBS.whitelist.linkFiles("ti-neptune", ResoAgweFS.whitelist.tiNeptune);
