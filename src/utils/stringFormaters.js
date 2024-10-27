export const toCamelCase = (str, separator = " ") => {
    if(typeof str !== "string") return

    const words = str.toLowerCase().split(separator);
    const capitalizedWords = []
    
    for(let i = 1; i < words.length; i++) {
        const capitaliced = words[i].split("")
        capitaliced[0] = capitaliced[0].toUpperCase()
        capitalizedWords.push(capitaliced.join(""))
    }
    
    return `${words[0]}${capitalizedWords.join("")}`
}