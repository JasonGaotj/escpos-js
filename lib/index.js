"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printer_1 = require("./printer");
exports.Printer = printer_1.default;
const console_1 = require("./console");
exports.Console = console_1.default;
global.Buffer = global.Buffer || require("buffer").Buffer;
exports.default = printer_1.default;
//# sourceMappingURL=index.js.map