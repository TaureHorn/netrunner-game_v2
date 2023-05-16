// does what it says on the tin
// checks if an object / array is empty, return boolean value ==> empty = true
export function isObjectEmpty(obj){
    return Object.keys(obj).length === 0
}

export function isArrayEmpty(arr){
    return arr.length === 0
}
