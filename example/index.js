const { Printer, Console } = require("../lib/index");

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
      .init()
      // logo
      .align("ct")
      .size(2, 2)
      .text("优托邦物流配送")
      .marginBottom(10)
      // 备注
      .size(1, 1)
      .align("lt")
      // .size(1, 1)
      .marginLeft(5)
      .text("这里是订单的备注，顾客的要求，晚上7点后再配送。。。")
      .marginBottom(20)
      // 商家信息
      .text("商家：海底捞火锅（奥体中心店）")
      .text("地址：天河区奥体南路优托邦购物中心市场C203A、C203B号")
      .text("----------------------------------------------")
      // 订单信息
      .text("订单号：30122019061400001701189562")
      .text("下单时间：2019-6-17 15:17:16")
      .table([["重量：0.8kg", "种类：冷冻生鲜"]], [20])
      .text("----------------------------------------------")
      .text("配送时段：2019-6-17 18:00 ~ 20:00")
      .text("天河区珠江新城冼村路高德置地冬广场F座9楼")
      .table([["陈某人", "13812341234"]], [5])
      .text("----------------------------------------------")
      .barcode("0201902018", "CODE128", {
        width: 1,
        height: 100
      });
    // 收件人
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

// .align("ct")
//       .size(2, 2)
//       .text("测试打印机")
//       .marginBottom(10)
//       .size(1, 1)
//       .align("lt")
//       .text("这里是打印机描述")
//       .marginBottom(10)
//       .table(
//         [
//           ["商品名称", "规格", "数量", "金额"],
//           ["泰国金枕榴莲", "4kg", "2", "￥120"],
//           ["北京水蜜桃", "500g", "1", "￥22.5"]
//         ],
//         [20, 35, 45]
//       )
//       .text("____________________________________________")
//       .marginBottom(10)
//       .barcode("0201902018", "CODE39", {
//         width: 1,
//         height: 100
//       });
