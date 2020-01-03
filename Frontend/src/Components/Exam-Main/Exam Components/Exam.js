export function splitParagraph(content) {
    if (typeof(content) === undefined) return
    
    var s = content.split("\\n")

    return s;
}