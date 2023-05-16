const alphanumeric = /[^A-Za-z0-9]/g

export function regexAlpha(exp){
    // checks if inputed expression contains non-alphanumeric characters
    // returns boolean, does contain alphanumeric characters = false, no output for true
    const replace = exp.replace(alphanumeric, "")
    if (replace !== exp){
        return false
    }
}

