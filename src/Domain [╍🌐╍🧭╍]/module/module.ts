import { CodeData }        from "../source/source-code.js";
import { IBlockStatement, IIdentifier } from "../syntax/0_1_0_structure-concept.js";
import { ModuleExport }    from "./module-export.js";
import { ModuleTopology_Name } from "./module-structure.enum.js";



 
export class Module<ModuleTopology extends CodeData> {
    Name: IIdentifier;

    AST: IBlockStatement;
    Code: ModuleTopology;
    Topology: ModuleTopology_Name;
    Exports: ModuleExport[]
}

