import { angryDir } from "../data/angryDaemon";
import { edgeDir } from "../data/edgeRunnerFTP";
import { ResoAgweBBS } from "../data/resoAgwe";

export function scpParser(object){
    switch(object.loc._netLocName){
        case "reso_agweBBS":
            return ResoAgweBBS.resoAgwe
        case "EdgerunnerFTP":
            return edgeDir.rootDir
        case "AngryDaemons":
            return angryDir.homeDir
        default:
            return "Something went wrong"
    }
}
