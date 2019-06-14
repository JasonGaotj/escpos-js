"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printer = printer => {
    const Printer = printer.constructor;
    const names = Object.getOwnPropertyNames(Printer.prototype);
    names
        .filter(name => ~["constructor", "flush", "close"].indexOf(name))
        .forEach(name => {
        const fn = printer[name];
        printer[name] = function () {
            return Promise.resolve(fn.apply(printer, arguments));
        };
    });
    ["flush", "close"].forEach(name => {
        const fn = printer[name];
        printer[name] = (...args) => {
            return new Promise((resolve, reject) => {
                fn(...args, (err, ...others) => {
                    if (err)
                        return reject(err);
                    resolve(others);
                });
            });
        };
    });
    return printer;
};
exports.default = printer;
//# sourceMappingURL=promiseify.js.map