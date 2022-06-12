import { ErrorObject } from "src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";
import { ModuleExport } from "./module/module-export";
import { ModuleImport } from "./module/module-import";
import { IBlockStatement } from "./syntax/0_1_0_structure-concept";

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