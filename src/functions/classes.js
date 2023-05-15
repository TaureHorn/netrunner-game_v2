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
    set name(value){
        if (value.length < 2 || value.length > 30) {
            alert("name is too short / too long")
        } this._name = value
    }
    set alias(value){
        if (value.length < 2 || value.length > 30){
            alert(this._name + ": alias is too short/ too long")
        } this._alias = value
    }
    set pronoun(value){
        if (value === "he/him" || value === "she/her" || value === "they/them"){
            this._pronoun = value
        } alert(this._name + ": that pronoun is not accepted")
    }
    set status(value){
        if (value.length > 100){
            alert(this._name + ": status cannot be more than 100 characters")
        }
    }
    set connectionStatus(value){
        if (value !== "online" || value !== "offline"){
            alert (this._name + ": connectionStatus must be either online or offline")
        } this._connectionStatus = value 
    }

}

export class Directory {
  constructor(dirName) {
    this._dirName = dirName;
    this._linkedParentDir = {}
    this._linkedDirs = {};
    this._fileDirLink = {};
  }
    set dirName(value) {
        if (typeof value !== String){
            return console.log(value + " is not a string")
        } else if (value.length === 0) {
            return console.log("cannot set dirName to empty value")
        } else if (value.length > 32) {
            return console.log(value + " cannot be more than 32 characters in length")
        }
        this._dirName = value;
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

    ls(){
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

    cat(fileSearch){
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            return file._fileInfo
        } else return " ~~ no such file"
    }
    file(fileSearch){
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            return file
        } else return " ~~ no such file"
}

    steghide(fileSearch){
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            if (file._fileHiddenInfo === "n/a"){
                return " file does not contain any hidden data"
            } else return file._fileHiddenInfo
        } else return " ~~ no such file"
    }
    cd(directory) {
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
    linkMember(member){
        this._members = member
    }
    assignNetwork(net){
        this._network = net
    }
    appendMessage(user, message){
        this._messageHistory.push("[" + user + "]: " + message)
    }
    findUser(alias){
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
    linkNetworkedDirectories(directories){
        this._linkedNetworkDirectories = directories
    }
}
