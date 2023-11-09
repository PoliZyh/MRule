

export function deepCopy(obj) {
    let newObj = null
    if (typeof obj === 'object' && obj !== null) {
        newObj = Array.isArray(obj) ? [] : {}
        for (let key in obj) {
            newObj[key] = deepCopy(obj[key])
        }
    } else {
        newObj = obj
    }
    return newObj
}


