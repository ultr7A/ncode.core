import { CodeData }        from "../source/source-code.js";
import { Node, IIdentifier, Statement } from "../syntax/0_1_0_structure-concept.js";
import { ModuleExport }    from "./module-export.js";
import { ModuleImport } from "./module-import.js";
import { ModuleTopology_Name } from "./module-structure.enum.js";


 
export class Module<ModuleTopology extends CodeData> {
    Name: IIdentifier;
    AST: Statement;
    AST_RAW: Node;
    Code: ModuleTopology;
    Topology: ModuleTopology_Name;
    Exports: ModuleExport[];
    Imports: ModuleImport[];
}

