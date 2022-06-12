import { CodeData } from "src/Domain [╍🌐╍🧭╍]/source/source-code.js";
import { IBlockStatement } from "../syntax/0_1_0_structure-concept.js";
import { ModuleExport } from "./module-export.js";
import { ModuleTopology_Name } from "./module-structure.enum.js";



 
export class Module<ModuleTopology extends CodeData> {
    Name: string;
    Code: ModuleTopology;
    AST: IBlockStatement
    Topology: ModuleTopology_Name;
    Exports: ModuleExport[]
}