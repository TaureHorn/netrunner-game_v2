import { isArrayEmpty, isObjectEmpty } from "./isEmpty";

export class Directory {
  constructor(dirName) {
    this._dirName = dirName;
    this._linkedParentDir = {}
    this._linkedDirs = {};
    this._fileDirLink = {};
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

    get data(){
        return this._fileInfo
    }

    get metadata(){
        // command: file "fileName"

    }
}
