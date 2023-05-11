const alphanumeric = /[^A-Za-z0-9]/g

export function regexAlpha(exp){
    const replace = exp.replace(alphanumeric, "")
    if (replace !== exp){
        return false
    }
}

