import Printer from "./printer";
import Console from "./console";
export { Printer };
export { Console };
declare const printerOpen: (callback: (printer: Printer) => Printer) => Printer;
export default printerOpen;
