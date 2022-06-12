import { CodeData } from "src/Domain [╍🌐╍🧭╍]/source/source-code.js";
import { ModuleExport } from "./module-export.js";



 
export class Module<ModuleTopology extends CodeData> {
    Name: string;
    Code: ModuleTopology;
    Dependencies: string[];
    Exports: ModuleExport[]
}