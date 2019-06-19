"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getParityBit(str) {
    var parity = 0, reversedCode = str
        .split("")
        .reverse()
        .join("");
    for (var counter = 0; counter < reversedCode.length; counter += 1) {
        parity +=
            parseInt(reversedCode.charAt(counter), 10) *
                Math.pow(3, (counter + 1) % 2);
    }
    return String((10 - (parity % 10)) % 10);
}
exports.getParityBit = getParityBit;
function codeLength(str) {
    return str.length;
}
exports.codeLength = codeLength;
//# sourceMappingURL=utils.js.map