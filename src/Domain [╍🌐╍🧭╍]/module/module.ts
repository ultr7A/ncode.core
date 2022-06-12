import { CodeData }        from "src/Domain [╍🌐╍🧭╍]/source/source-code.js";
import { IBlockStatement } from "src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";
import { ModuleExport }    from "src/Domain [╍🌐╍🧭╍]/module/module-export.js";
import { ModuleTopology_Name } from "src/Domain [╍🌐╍🧭╍]/module/module-structure.enum.js";



 
export class Module<ModuleTopology extends CodeData> {
    Name: string;
    Code: ModuleTopology;
    AST: IBlockStatement
    Topology: ModuleTopology_Name;
    Exports: ModuleExport[]
}