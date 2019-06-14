"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stdout(data, bit) {
    bit = bit || 8;
    for (var i = 0; i < data.length; i += bit) {
        var arr = [];
        for (var j = 0; j < bit && i + j < data.length; j++)
            arr.push(data[i + j]);
        arr = arr
            .map(function (b) {
            return b.toString(16).toUpperCase();
        })
            .map(function (b) {
            if (b.length == 1)
                b = "0" + b;
            return b;
        });
        console.log(arr.join(" "));
    }
    console.log();
}
class Console {
    constructor(handler) {
        this.handler = handler || stdout;
    }
    open(callback) {
        callback && callback();
    }
    write(data) {
        this.handler && this.handler(data);
    }
}
exports.default = Console;
//# sourceMappingURL=console.js.map