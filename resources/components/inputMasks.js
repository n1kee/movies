
export function numericMask(text) {
    return text.match(/^\d+$/) ? text : "";
}
