"use strict";
import Printer from "./printer";
import Console from "./console";

global.Buffer = global.Buffer || require("buffer").Buffer;

export { Printer };
export { Console };

let resultStr;
const printOut = function(data) {
  resultStr = data.toString("hex");
};

const device = new Console(printOut);

const options = {
  encoding: "GB18030"
};

const printer = new Printer(device, options);

const printerOpen = (callback: (printer: Printer) => Printer) =>
  printer.open(() => {
    callback(printer);
    return resultStr;
  });
export default printerOpen;
