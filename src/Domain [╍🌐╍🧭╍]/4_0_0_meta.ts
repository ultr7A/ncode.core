import { IBlockStatement } from "./syntax/0_1_0_structure-concept.js";

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
    tree: IBlockStatement;
    analysis: ParseTreeAnalysis;
}