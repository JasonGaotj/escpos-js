// const Printer = require("../lib/printer").default;
// const Console = require("../lib/console").default;
const { Printer, Console } = require("../lib/index");
// console.log(Console);
let resultStr;
const printOut = function(data) {
  resultStr = data.toString("hex");
};

const device = new Console(printOut);

const options = {
  encoding: "GB18030"
};

const printer = new Printer(device, options);

const receive = (data = {}) => {
  device.open(function() {
    printer
      .align("ct")
      .size(2, 2)
      .text("测试打印机")
      .marginBottom(10)
      .size(1, 1)
      .align("lt")
      .text("这里是打印机描述")
      .marginBottom(10)
      // .print("\x1B\x44\x12\x19\x24\x00")
      // .pureText("商品名称")
      // .control("HT")
      // .pureText("数量")
      // .control("HT")
      // .pureText("金额")
      // .control("LF")
      // .pureText("泰国金枕榴莲")
      // .control("HT")
      // .pureText("5")
      // .control("HT")
      // .pureText("$120")
      // .control("LF")
      .table([
        ["商品名称", "规格", "数量", "金额"],
        ["泰国金枕榴莲", "4kg", "2", "￥120"],
        ["北京水蜜桃", "500g", "1", "￥22.5"]
      ])
      .text("_______________________________________")
      .marginBottom(10)
      .barcode("0201902018", "CODE39", {
        width: 3,
        height: 100
      });
    printer.cut();
    printer.close();
  });
  return resultStr;
};

// export default {
//   receive: receive
// };
const str = receive();
console.log("*************");
console.log(str);
console.log("*************");

module.exports = receive;
