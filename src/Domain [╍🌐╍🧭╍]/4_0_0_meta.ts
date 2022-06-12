import { ErrorObject }     from "src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js";
import { ModuleExport }    from "src/Domain [╍🌐╍🧭╍]/module/module-export.js";
import { ModuleImport }    from "src/Domain [╍🌐╍🧭╍]/module/module-import.js";
import { IBlockStatement } from "src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";

export interface ParseTreeAnalysis {
    hasLoops: boolean;
    hasRecursion: boolean;
    declaredVariables: {
        [identName: string]: string;
    };
    undeclaredVariables: {
        [identName: string]: boolean;
    };
}

export interface ParseResult {
    tree:     IBlockStatement;
    analysis: ParseTreeAnalysis;
    errors:   ErrorObject[];
    imports: ModuleImport[];
    exports: ModuleExport[];
}