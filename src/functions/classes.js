export class Directory {
  constructor(dirName, parentDirName) {
    this._dirName = dirName;
    this._parentDirName = parentDirName;
    this._linkedDirs = [];
    this._fileDirLink = [];
  }
    set dirName(value) {
        if (typeof value != String){
            return console.log(value + " is not a string")
        } else if (value.length === 0) {
            return console.log("cannot set dirName to empty value")
        } else if (value.length > 32) {
            return console.log(value + " cannot be more than 32 characters in length")
        }
        this._dirName = value;
    } 
    set parentDirName(value) {
        if (typeof value != String){
            return console.log(value + " is not a string")
        } else if (value.length === 0) {
            return console.log("cannot set parentDirName to empty value")
        } else if (value.length > 32) {
            return console.log(value + " cannot be more than 32 characters in length")
        }
        this._parentDirName = value;
    }
    linkDirectories(direction, directoryToLink){
        this._linkedDirs[direction] = directoryToLink
    }
    linkFiles(index, file){
        this._fileDirLink[index] = file
    }

    ls(){
        const entries = Object.entries(this._fileDirLink);
        let ls = []
        for (const [directory] of entries) {
            let text = `Current directory ${directory._dirName} contains the following subdirectories`
        }
        return ls
    }
    cd(direction) {
        if (direction in this._linkedDirs){
            return this._linkedDirs[direction]
        } else {
            return "No such directory"
        }
    }

}

export class File {
    constructor(fileName, fileType, fileAccess, fileOwner, fileCreator, fileInfo, fileHiddenInfo) {
        this._fileName = fileName;
        this._fileType = fileType;
        this._fileOwner = fileOwner;
        this._fileCreator = fileCreator;
        this._fileInfo = fileInfo;
        this._fileHidenInfo = fileHiddenInfo;
    }

}
