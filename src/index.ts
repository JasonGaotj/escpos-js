"use strict";
/**
 * Adapters
 */
// exports.USB     = require('./adapter/usb');
// exports.Serial  = require('./adapter/serial');
// exports.Network = require('./adapter/network');
// exports.Console = require('./console');

/**
 * Printer Supports
 */
// exports.Image    = require('./image');
// exports.Server   = require('./server');
// exports.Printer  = require('./printer');
// exports.Adapter  = require('./adapter');
// exports.command  = require('./commands');
// exports.Printer2 = require('./promiseify');

import Printer from "./printer";
import Console from "./console";

global.Buffer = global.Buffer || require("buffer").Buffer;

export { Printer };
export { Console };

export default Printer;
// export default {
//   Console, //打印console.log
//   Printer //打印命令
// };
