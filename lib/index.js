"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printer_1 = require("./printer");
exports.Printer = printer_1.default;
const console_1 = require("./console");
exports.Console = console_1.default;
global.Buffer = global.Buffer || require("buffer").Buffer;
let resultStr;
const printOut = function (data) {
    resultStr = data.toString("hex");
};
const device = new console_1.default(printOut);
const options = {
    encoding: "GB18030"
};
const printer = new printer_1.default(device, options);
const printerOpen = (callback) => printer.open(() => {
    callback(printer);
    return resultStr;
});
exports.default = printerOpen;
//# sourceMappingURL=index.js.map