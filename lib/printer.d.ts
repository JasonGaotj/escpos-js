export declare type ControlType = "LF" | "GLF" | "FF" | "CR" | "HT" | "VT";
export declare type StyleType = "B" | "I" | "U" | "U2" | "BI" | "BIU" | "BIU2" | "BU" | "NORMAL";
export declare type FontType = "A" | "B" | "C";
export declare type BarcodeFontType = "A" | "B";
export declare type BarcodePositionType = "OFF" | "ABV" | "BLW" | "BTH";
export declare type BarcodeType = "EAN13" | "EAN8" | "CODE128" | "CODE93";
export interface IBarcodeOptions {
    width?: number | string;
    height?: number;
    position?: BarcodePositionType;
    font?: BarcodeFontType;
    includeParity?: boolean;
}
export interface PrinterOptions {
    encoding?: string;
}
declare class Printer {
    static create(device: any): Promise<any>;
    adapter: any;
    buffer: any;
    encoding: any;
    _model: any;
    model: (model: any) => Printer;
    marginBottom: (size: number) => Printer;
    marginLeft: (size: number) => Printer;
    marginRight: (size: number) => Printer;
    print: (content: string) => Printer;
    println: (content: string) => Printer;
    text: (content: string, encoding?: string) => Printer;
    info: (content: string, encoding?: string) => Printer;
    pureText: (content: string, encoding?: string) => Printer;
    encode: (encoding: string) => Printer;
    feed: (n: number) => Printer;
    control: (ctrl: ControlType) => Printer;
    align: (align: "lt" | "ct" | "rt") => Printer;
    font: (font: FontType) => Printer;
    style: (align?: StyleType) => Printer;
    size: (width: number, height: number) => Printer;
    spacing: (n?: null | number) => Printer;
    lineSpace: (n?: null | number) => Printer;
    hardware: (hw: "A" | "B" | "C") => Printer;
    cashdraw: (pin?: 2 | 5) => Printer;
    beep: (n: any, t: any) => Printer;
    flush: (callback: void) => Printer;
    cut: (part: boolean, feed?: number) => Printer;
    close: (callback: void, options: any) => Printer;
    color: (color?: 0 | 1) => Printer;
    barcode: (code: string, type?: BarcodeType | null, options?: IBarcodeOptions, ...args: any[]) => Printer;
    qrcode: (code: string, version?: number, level?: "L" | "M" | "Q" | "H", size?: number) => Printer;
    constructor(adapter: any, options?: PrinterOptions);
    table(columns: (string | number)[][], widths?: number[], control?: ControlType[]): this;
}
export default Printer;
