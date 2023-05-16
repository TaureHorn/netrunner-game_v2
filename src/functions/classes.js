import { isArrayEmpty} from "./isEmpty";
import { genRand } from "./randStr";

export class Character {
    constructor(name, alias, greeting, advice, resoAgweAdvice, shadeWarning, status, connectionStatus, pfp) {
        this._name = name;
        this._alias = alias;
        this._greeting = greeting;
        this._advice = advice;
        this._resoAgweAdvice = resoAgweAdvice;
        this._shadeWarning = shadeWarning;
        this._status = status;
        this._connectionStatus = connectionStatus;
        this._pfp = pfp;
        this._userID = genRand(16)
        this._ircChannel = {}
    }
    linkToIRC(netLoc){
        this._ircChannel = netLoc
    }
}

export class Directory {
  constructor(dirName) {
    this._dirName = dirName;
    this._linkedParentDir = {}
    this._linkedDirs = {};
    this._fileDirLink = {};
  }
    linkParentDirectory(directory){
        this._linkedParentDir = directory
    }
    linkDirectories(index, directoryToLink){
        this._linkedDirs[index] = directoryToLink
    }
    linkFiles(name, file){
        this._fileDirLink[name] = file
    }

    ls(){ // list files in directory
        const files = Object.entries(this._fileDirLink)
        const fileList = files.map(file => {
            return file[1]._fileName
        })
        if (Object.keys(fileList).length === 0){
            return " ~~ directory empty "
        } else {
            return fileList.join(" ")
        }
    }

    cat(fileSearch){ // print file in this directory
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            return file._fileInfo
        } else return " ~~ no such file"
    }
    file(fileSearch){ // print metadata of file in this directory
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            return file
        } else return " ~~ no such file"
}

    steghide(fileSearch){ // print hidden data of file in this directory
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            if (file._fileHiddenInfo === "n/a"){
                return " file does not contain any hidden data"
            } else return file._fileHiddenInfo
        } else return " ~~ no such file"
    }
    cd(directory) { // change to a directory linked to this one
        if (directory === ".."){
            if (isArrayEmpty(this._linkedParentDir) === true){
                return this
            } else {
                return this._linkedParentDir
            }
        } else if (directory in this._linkedDirs){
            const dir = Object.getOwnPropertyDescriptor(this._linkedDirs, directory).value
            return dir
        } else {
            return this
        }
    }

}

export class File {
    constructor(fileName, fileType, fileAccess, fileOwner, fileCreator, fileInfo, fileHiddenInfo) {
        this._fileName = fileName;
        this._fileType = fileType;
        this._fileAccess = fileAccess;
        this._fileOwner = fileOwner;
        this._fileCreator = fileCreator;
        this._fileInfo = fileInfo;
        this._fileHiddenInfo = fileHiddenInfo;
    }
}
export class IRC {
    constructor(name, tagline){
        this._name = name;
        this._tagline = tagline
        this._network = {}
        this._members = {}
        this._messageHistory = []
    }
    linkMember(member){ // add member(s) to irc channel 
        this._members = member
    }
    assignNetwork(net){ // assing irc channel to network location
        this._network = net
    }
    appendMessage(user, message){
        this._messageHistory.push("[" + user + "]: " + message)
    }
    findUser(alias){ // check in inputed user is in this irc channel
        if (alias in this._members){
            return Object.getOwnPropertyDescriptor(this._members, alias).value
        } else {
            return " ~~ no such user"
        }
    }
}

export class NetworkLocation{
    constructor(netLocName, ipAddress, password){
        this._netLocName = netLocName;
        this._ipAddress = ipAddress;
        this._password = password;
        this._linkedNetworkDirectories = {}
    }
    linkNetworkedDirectories(directories){ // link network location and directory
        this._linkedNetworkDirectories = directories
    }
}
