"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const iconv = require("iconv-lite");
const mutable_buffer_1 = require("mutable-buffer");
const EventEmitter = require("events");
const utils = require("./utils");
const commands_1 = require("./commands");
const promiseify_1 = require("./promiseify");
const DEFAULT_INITIAL_SIZE = 1024;
const DEFAULT_BLOCK_SIZE = 1024;
class Printer {
    static create(device) {
        const printer = new Printer(device);
        return Promise.resolve(promiseify_1.default(printer));
    }
    constructor(adapter, options) {
        if (!(this instanceof Printer)) {
            return new Printer(adapter, options);
        }
        var self = this;
        EventEmitter.call(this);
        this.adapter = adapter;
        this.buffer = new mutable_buffer_1.MutableBuffer(DEFAULT_INITIAL_SIZE, DEFAULT_BLOCK_SIZE);
        this.encoding = (options && options.encoding) || "GB18030";
        this._model = null;
    }
    table(columns, widths, control) {
        if (!Array.isArray(columns)) {
            throw new Error("columns must is a array!");
        }
        if (!columns.every(arr => Array.isArray(arr))) {
            throw new Error("columns item must is a array!");
        }
        this.buffer.write(commands_1.default.TAB_FORMAT.HORIZONTAL);
        if (Array.isArray(widths)) {
            widths.forEach(n => this.buffer.writeUInt8(n));
        }
        else {
            const len = columns[0].length;
            Array.from({ length: len }).forEach((_, i) => this.buffer.writeUInt8(i + 1));
        }
        this.buffer.writeUInt8(0);
        columns.forEach(cols => {
            cols.forEach((str, idx) => {
                const isLast = cols.length === idx - 1;
                this.pureText(String(str)).control((control && control[idx]) || (isLast ? "LF" : "HT"));
            });
        });
        return this;
    }
}
util.inherits(Printer, EventEmitter);
Printer.prototype.model = function (_model) {
    this._model = _model;
    return this;
};
Printer.prototype.marginBottom = function (size) {
    this.buffer.write(commands_1.default.MARGINS.BOTTOM);
    this.buffer.writeUInt8(size);
    return this;
};
Printer.prototype.marginLeft = function (size) {
    this.buffer.write(commands_1.default.MARGINS.LEFT);
    this.buffer.writeUInt8(size);
    return this;
};
Printer.prototype.marginRight = function (size) {
    this.buffer.write(commands_1.default.MARGINS.RIGHT);
    this.buffer.writeUInt8(size);
    return this;
};
Printer.prototype.print = function (content) {
    this.buffer.write(content);
    return this;
};
Printer.prototype.println = function (content) {
    return this.print(content + commands_1.default.EOL);
};
Printer.prototype.text = function (content, encoding) {
    return this.print(iconv.encode(content + commands_1.default.EOL, encoding || this.encoding));
};
Printer.prototype.info = function (content, encoding) {
    return this.print(iconv.encode(content, encoding || this.encoding));
};
Printer.prototype.pureText = function (content, encoding) {
    return this.print(iconv.encode(content, encoding || this.encoding));
};
Printer.prototype.encode = function (encoding) {
    this.encoding = encoding;
    return this;
};
Printer.prototype.feed = function (n) {
    this.buffer.write(new Array(n || 1).fill(commands_1.default.EOL).join(""));
    return this;
};
Printer.prototype.control = function (ctrl) {
    this.buffer.write(commands_1.default.FEED_CONTROL_SEQUENCES["CTL_" + ctrl.toUpperCase()]);
    return this;
};
Printer.prototype.align = function (align) {
    this.buffer.write(commands_1.default.TEXT_FORMAT["TXT_ALIGN_" + align.toUpperCase()]);
    return this;
};
Printer.prototype.font = function (family) {
    this.buffer.write(commands_1.default.TEXT_FORMAT["TXT_FONT_" + family.toUpperCase()]);
    return this;
};
Printer.prototype.style = function (type) {
    switch (type.toUpperCase()) {
        case "B":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_OFF);
            break;
        case "I":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_OFF);
            break;
        case "U":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_ON);
            break;
        case "U2":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL2_ON);
            break;
        case "BI":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_OFF);
            break;
        case "BIU":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_ON);
            break;
        case "BIU2":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL2_ON);
            break;
        case "BU":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_ON);
            break;
        case "BU2":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL2_ON);
            break;
        case "IU":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_ON);
            break;
        case "IU2":
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_ON);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL2_ON);
            break;
        case "NORMAL":
        default:
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_BOLD_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_ITALIC_OFF);
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_UNDERL_OFF);
            break;
    }
    return this;
};
Printer.prototype.size = function (width, height) {
    if (2 >= width && 2 >= height) {
        this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_NORMAL);
        if (2 == width && 2 == height) {
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_4SQUARE);
        }
        else if (1 == width && 2 == height) {
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_2HEIGHT);
        }
        else if (2 == width && 1 == height) {
            this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_2WIDTH);
        }
    }
    else {
        this.buffer.write(commands_1.default.TEXT_FORMAT.TXT_CUSTOM_SIZE(width, height));
    }
    return this;
};
Printer.prototype.spacing = function (n) {
    if (n === undefined || n === null) {
        this.buffer.write(commands_1.default.CHARACTER_SPACING.CS_DEFAULT);
    }
    else {
        this.buffer.write(commands_1.default.CHARACTER_SPACING.CS_SET);
        this.buffer.writeUInt8(n);
    }
    return this;
};
Printer.prototype.lineSpace = function (n) {
    if (n === undefined || n === null) {
        this.buffer.write(commands_1.default.LINE_SPACING.LS_DEFAULT);
    }
    else {
        this.buffer.write(commands_1.default.LINE_SPACING.LS_SET);
        this.buffer.writeUInt8(n);
    }
    return this;
};
Printer.prototype.hardware = function (hw) {
    this.buffer.write(commands_1.default.HARDWARE["HW_" + hw.toUpperCase()]);
    return this;
};
Printer.prototype.barcode = function (code, type, options) {
    options = options || {};
    var width, height, position, font, includeParity;
    if (typeof width === "string" || typeof width === "number") {
        width = arguments[2];
        height = arguments[3];
        position = arguments[4];
        font = arguments[5];
    }
    else {
        width = options.width;
        height = options.height;
        position = options.position;
        font = options.font;
        includeParity = options.includeParity !== false;
    }
    type = type || "EAN13";
    var convertCode = String(code), parityBit = "", codeLength = "";
    if (typeof type === "undefined" || type === null) {
        throw new TypeError("barcode type is required");
    }
    if (type === "EAN13" && convertCode.length !== 12) {
        throw new Error("EAN13 Barcode type requires code length 12");
    }
    if (type === "EAN8" && convertCode.length !== 7) {
        throw new Error("EAN8 Barcode type requires code length 7");
    }
    if (this._model === "qsprinter") {
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.BARCODE_MODE.ON);
    }
    if (this._model === "qsprinter") {
    }
    else if (width >= 2 || width <= 6) {
        this.buffer.write(commands_1.default.BARCODE_FORMAT.BARCODE_WIDTH[width]);
    }
    else {
        this.buffer.write(commands_1.default.BARCODE_FORMAT.BARCODE_WIDTH_DEFAULT);
    }
    if (height >= 1 || height <= 255) {
        this.buffer.write(commands_1.default.BARCODE_FORMAT.BARCODE_HEIGHT(height));
    }
    else {
        if (this._model === "qsprinter") {
            this.buffer.write(commands_1.default.MODEL.QSPRINTER.BARCODE_HEIGHT_DEFAULT);
        }
        else {
            this.buffer.write(commands_1.default.BARCODE_FORMAT.BARCODE_HEIGHT_DEFAULT);
        }
    }
    if (this._model === "qsprinter") {
    }
    else {
        this.buffer.write(commands_1.default.BARCODE_FORMAT["BARCODE_FONT_" + (font || "A").toUpperCase()]);
    }
    this.buffer.write(commands_1.default.BARCODE_FORMAT["BARCODE_TXT_" + (position || "BLW").toUpperCase()]);
    this.buffer.write(commands_1.default.BARCODE_FORMAT["BARCODE_" + (type || "EAN13").replace("-", "_").toUpperCase()]);
    if (type === "EAN13" || type === "EAN8") {
        parityBit = utils.getParityBit(code);
    }
    if (type == "CODE128" || type == "CODE93") {
        codeLength = utils.codeLength(code);
    }
    this.buffer.write(codeLength + code + (includeParity ? parityBit : "") + "\x00");
    if (this._model === "qsprinter") {
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.BARCODE_MODE.OFF);
    }
    return this;
};
Printer.prototype.qrcode = function (code, version, level, size) {
    if (this._model !== "qsprinter") {
        this.buffer.write(commands_1.default.CODE2D_FORMAT.TYPE_QR);
        this.buffer.write(commands_1.default.CODE2D_FORMAT.CODE2D);
        this.buffer.writeUInt8(version || 3);
        this.buffer.write(commands_1.default.CODE2D_FORMAT["QR_LEVEL_" + (level || "L").toUpperCase()]);
        this.buffer.writeUInt8(size || 6);
        this.buffer.writeUInt16LE(code.length);
        this.buffer.write(code);
    }
    else {
        const dataRaw = iconv.encode(code, "utf8");
        if (dataRaw.length < 1 && dataRaw.length > 2710) {
            throw new Error("Invalid code length in byte. Must be between 1 and 2710");
        }
        if (!size || (size && typeof size !== "number"))
            size = commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.DEFAULT;
        else if (size && size < commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MIN)
            size = commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MIN;
        else if (size && size > commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MAX)
            size = commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MAX;
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.CMD);
        this.buffer.writeUInt8(size);
        if (!version || (version && typeof version !== "number"))
            version = commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.DEFAULT;
        else if (version && version < commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MIN)
            version = commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MIN;
        else if (version && version > commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MAX)
            version = commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MAX;
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.CMD);
        this.buffer.writeUInt8(version);
        if (!level || (level && typeof level !== "string"))
            level = commands_1.default.CODE2D_FORMAT.QR_LEVEL_L;
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.LEVEL.CMD);
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.LEVEL.OPTIONS[level.toUpperCase()]);
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.SAVEBUF.CMD_P1);
        this.buffer.writeUInt16LE(dataRaw.length + commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.LEN_OFFSET);
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.SAVEBUF.CMD_P2);
        this.buffer.write(dataRaw);
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PRINTBUF.CMD_P1);
        this.buffer.writeUInt16LE(dataRaw.length + commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.LEN_OFFSET);
        this.buffer.write(commands_1.default.MODEL.QSPRINTER.CODE2D_FORMAT.PRINTBUF.CMD_P2);
    }
    return this;
};
Printer.prototype.cashdraw = function (pin) {
    this.buffer.write(commands_1.default.CASH_DRAWER["CD_KICK_" + (pin || 2)]);
    return this;
};
Printer.prototype.beep = function (n, t) {
    this.buffer.write(commands_1.default.BEEP);
    this.buffer.writeUInt8(n);
    this.buffer.writeUInt8(t);
    return this;
};
Printer.prototype.flush = function (callback) {
    var buf = this.buffer.flush();
    this.adapter.write(buf, callback);
    return this;
};
Printer.prototype.cut = function (part, feed) {
    this.feed(feed || 3);
    this.buffer.write(commands_1.default.PAPER[part ? "PAPER_PART_CUT" : "PAPER_FULL_CUT"]);
    return this;
};
Printer.prototype.close = function (callback, options) {
    var self = this;
    return this.flush(function () {
        self.adapter.close(callback, options);
    });
};
Printer.prototype.color = function (color) {
    this.buffer.write(commands_1.default.COLOR[color === 0 || color === 1 ? color : 0]);
    return this;
};
exports.default = Printer;
//# sourceMappingURL=printer.js.map